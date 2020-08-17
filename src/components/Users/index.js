import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  AppState,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isEqual} from 'lodash';
import invokeApp from 'react-native-invoke-app';

import styles from './styles';
import {logout} from '../../state/Users/actions';
import {startCall} from '../../state/Users/operations';
import Layout from '../Layout';

const Users = (props) => {
  const [users, handleUsers] = useState([]);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const {actions, isAdmin, currentUser, navigation} = props;
  const user = currentUser;

  const _handleAppStateChange = (nextAppState) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    database()
      .ref('/callRecords/')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const keys = Object.keys(snapshot.val());
          if (keys.includes(user.mobile)) {
            const {type, receiver, channel} = snapshot.val()[user.mobile];
            const dbUser = snapshot.val()[user.mobile].user;

            if (!isEqual(appStateVisible, 'active')) {
              invokeApp();
            }
            navigation.navigate('Call', {
              type,
              user: dbUser,
              receiver,
              channel,
            });
          }
        }
      });
    database()
      .ref('/users/')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const keys = Object.keys(snapshot.val());
          const allUsers = [];
          keys.map((mobile) => {
            if (mobile.toString() !== user.mobile) {
              const obj = {
                mobile,
                name: snapshot.val()[mobile].name,
                fcmToken: snapshot.val()[mobile].fcmToken,
                img: snapshot.val()[mobile].img,
                isActive: snapshot.val()[mobile].isActive,
              };
              allUsers.push(obj);
            }
          });
          handleUsers(allUsers);
        }
      });
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const deleteUser = (item) => {
    Alert.alert('Delete User', 'Are you sure you want to delete ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => database().ref(`/users/${item.mobile}`).remove(),
      },
    ]);
  };

  const initiateCall = (type, receiver) => {
    const channel1 = `${user.mobile}-${receiver.mobile}`;
    const channel2 = `${receiver.mobile}-${user.mobile}`;
    let channel = channel1;
    database()
      .ref(`/channels/${channel1}`)
      .once('value')
      .then((snapshot) => {
        if (!snapshot.val()) {
          database()
            .ref(`/channels/${channel2}`)
            .once('value')
            .then((data) => {
              if (data.val()) {
                if (data.val().isActive) {
                  Alert.alert(
                    'Channel busy !!!',
                    'It seems some one is already trying to contact you !',
                  );
                  return false;
                }
                channel = channel2;
              } else {
                database()
                  .ref(`/channels/${channel1}`)
                  .set({channel: channel1});
              }
            });
        }
        if (snapshot.val() && snapshot.val().isActive) {
          Alert.alert(
            'Channel busy !!!',
            'It seems some one is already trying to contact you !',
          );
          return false;
        }

        database()
          .ref(`/active/${receiver.mobile}`)
          .once('value')
          .then((data) => {
            if (data.val()) {
              Alert.alert(
                'User Unavailable',
                'User is on another call, try again later!',
              );
            } else {
              actions.startCall({receiver, user, channel, type});
              database().ref(`/channels/${channel}`).update({isActive: true});
              database()
                .ref(`/active/${receiver.mobile}`)
                .set({isActive: true});
              database().ref(`/active/${user.mobile}`).set({isActive: true});
              database()
                .ref(`/callRecords/${receiver.mobile}`)
                .set({receiver, user, channel, type});
              navigation.navigate(type, {
                user,
                receiver,
                channel,
                type,
              });
            }
          });
      });
  };

  const renderItem = (item) => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
    return (
      <View key={item.item.mobile} style={styles.listItemContainer}>
        <View style={[styles.row, {width: '55%'}]}>
          {item.item.isActive && <View style={styles.active} />}
          {isEqual(item.item.img, '') ? (
            <View style={[styles.outerCircle, {backgroundColor: randomColor}]}>
              <View
                style={[styles.innerCircle, {backgroundColor: randomColor}]}>
                <Text style={{fontSize: 18}}>
                  {item.item.name[0].toUpperCase()}
                </Text>
              </View>
            </View>
          ) : (
            <Image
              source={{uri: `data:image/png;base64,${item.item.img}`}}
              style={styles.userImg}
            />
          )}
          <Text
            numberOfLines={1}>{`${item.item.name} (${item.item.mobile})`}</Text>
        </View>
        <View style={styles.row}>
          {isAdmin && (
            <TouchableOpacity
              style={[styles.callBtn, {marginRight: 5}]}
              onPress={() => deleteUser(item.item)}>
              <MaterialIcons size={30} color="#0093E9" name="delete" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => initiateCall('Audio', item.item)}
            style={[styles.callBtn, {marginRight: 5}]}>
            <MaterialIcons size={30} color="#0093E9" name="local-phone" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => initiateCall('Video', item.item)}
            style={styles.callBtn}>
            <MaterialIcons size={30} color="#0093E9" name="video-call" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  console.log('in users');
  return (
    <Layout navigation={navigation}>
      <View style={styles.body}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.mobile}
        />
      </View>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.Users.currentUser,
  isAdmin: state.Users.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({logout, startCall}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
