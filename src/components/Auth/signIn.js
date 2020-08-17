import React, {useState} from 'react';
import {View, TouchableOpacity, Text, TextInput, Alert} from 'react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isEqual} from 'lodash';

import {loginDetails} from '../../state/Users/actions';
import styles from './styles';

const SignIn = (props) => {
  const [mobile, handleMobileNo] = useState('');
  const [password, handlePassword] = useState('');
  const [errorMessage, handleErrorMessage] = useState('');

  const {toggleSignIn} = props;

  const handleGo = () => {
    let user = {mobile, password, name: 'test'};
    if (user.password.trim().length > 0 && user.mobile.trim().length === 10) {
      messaging()
        .getToken()
        .then((fcmToken) => {
          database()
            .ref(`/users/${mobile}`)
            .once('value')
            .then((res) => {
              if (res.val() && isEqual(res.val().password, user.password)) {
                user = res.val();
                database()
                  .ref(`/users/${mobile}`)
                  .update({fcmToken})
                  .then(() => {
                    handleErrorMessage('');
                    handleMobileNo('');
                    handlePassword('');
                    props.actions.loginDetails(user);
                    props.navigation.navigate('Users', {
                      user: {...user, fcmToken},
                    });
                  });
              } else {
                handleErrorMessage('Incorrect Id or Password');
              }
            });
        });
    } else {
      Alert.alert(
        'Please fill the details',
        'Mobile number and password are compulsory to add.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LOG-IN</Text>
      <Text style={styles.headingText}>
        Enter Mobile Number and Password for login.
      </Text>
      <TextInput
        maxLength={10}
        style={styles.input}
        placeholder="Enter Your Mobile Number"
        value={mobile}
        onChangeText={handleMobileNo}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Enter Your Password"
        value={password}
        onChangeText={handlePassword}
      />
      <Text style={styles.errMsg}>{errorMessage}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleGo}>
        <Text style={styles.btnText}>Log-in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => toggleSignIn(false)}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loginDetails}, dispatch),
});

export default connect(null, mapDispatchToProps)(SignIn);
