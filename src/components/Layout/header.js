import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonActions} from '@react-navigation/native';
import {isEqual} from 'lodash';

import styles from './styles';
import {logout} from '../../state/Users/actions';

const Header = (props) => {
  const {currentUser, navigation, actions} = props;
  const handleLogout = () => {
    actions.logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    );
  };
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Available Users</Text>
      <View style={styles.rightView}>
        <Pressable
          style={[
            styles.settingBtn,
            {padding: !isEqual(currentUser.img, '') ? 5 : 0},
          ]}>
          {isEqual(currentUser.img, '') ? (
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Text style={styles.bubbleText}>
                  {currentUser.name[0].toUpperCase()}
                </Text>
              </View>
            </View>
          ) : (
            <Image source={{uri: currentUser.img}} style={styles.userImg} />
          )}
        </Pressable>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="exit-to-app" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({logout}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
