import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, TextInput, Alert} from 'react-native';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isEqual} from 'lodash';

import styles from './styles';
import colors from '../../constants/colors';

const SignUp = (props) => {
  const [mobile, handleMobileNo] = useState('');
  const [name, handleName] = useState('');
  const [password, handlePassword] = useState('');
  const [gender, handleGender] = useState('');
  const [isUserExisting, handleExistingUser] = useState(false);

  const {toggleSignIn} = props;

  useEffect(() => {
    if (mobile.trim().length === 10) {
      database()
        .ref(`/users/${mobile}`)
        .on('value', (snapshot) => {
          if (snapshot.val()) {
            handleExistingUser(true);
          } else {
            handleExistingUser(false);
          }
        });
    }
  }, [mobile]);

  const handleGo = () => {
    const user = {mobile, name, password, gender, img: ''};
    if (
      user.name.trim().length > 0 &&
      user.mobile.trim().length === 10 &&
      user.password.trim().length > 2 &&
      user.gender.trim().length > 0 &&
      !isUserExisting
    ) {
      database().ref(`/users/${mobile}`).set(user);
      props.navigation.navigate('Auth');
      Alert.alert(
        'Successful',
        'You have registered successfully, please login to continue',
      );
    } else {
      console.log(user, isUserExisting);
      Alert.alert(
        'Please fill the details',
        'Mobile number and user name are compulsory to add. Password must be greater then 3 digits',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <Text style={styles.headingText}>Enter all details for sign up.</Text>
      <TextInput
        editable={!isUserExisting}
        style={styles.input}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={handleName}
      />
      <TextInput
        maxLength={10}
        style={styles.input}
        placeholder="Enter Your Mobile Number"
        value={mobile}
        onChangeText={handleMobileNo}
      />
      <TextInput
        secureTextEntry
        maxLength={10}
        style={styles.input}
        placeholder="Enter Password (min length 3)"
        value={password}
        onChangeText={handlePassword}
      />
      <View style={[styles.input, styles.genderView]}>
        <Text>Gender: </Text>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => handleGender('male')}>
          <MaterialIcons
            name={
              isEqual(gender, 'male')
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            color={colors.primaryColor}
            size={25}
          />
          <Text style={styles.radioBtnText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => handleGender('female')}>
          <MaterialIcons
            name={
              isEqual(gender, 'female')
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            color={colors.primaryColor}
            size={25}
          />
          <Text style={styles.radioBtnText}>Female</Text>
        </TouchableOpacity>
      </View>
      {isUserExisting && (
        <Text>User Already exist, Please use another mobile number!</Text>
      )}
      <TouchableOpacity style={styles.btn} onPress={handleGo}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => toggleSignIn(true)}>
        <Text style={styles.btnText}>Log-In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
