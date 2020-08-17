import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {isEqual} from 'lodash';
import database from '@react-native-firebase/database';

import store from '../state/store';
import Auth from './Auth';
import Video from './Call/Video';
import Audio from './Call/Audio';
import Call from './Call';
import UsersComponent from './Users';
import Entry from './index';
import Settings from './Settings';
import { updateProfile } from '../state/Users/actions';

const Stack = createStackNavigator();

PushNotification.configure({
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  default: true,
  popInitialNotification: true,
  requestPermissions: true,
});

const Navigation = () => {
  const _handleAppStateChange = (nextAppState) => {
    const {Users} = store.getState();
    if (Users) {
      let isActive = false;
      if (isEqual(nextAppState, 'active')) {
        isActive = true;
      }
      database()
        .ref(`/users/${Users.currentUser.mobile}`)
        .update({isActive})
        .then(() => {
          store.dispatch(updateProfile({isActive}));
        });
    }
  };

  const displayNotification = (message) => {
    const title = isEqual(message.data.status, 'start')
      ? 'Incoming Call !'
      : 'Missed Call !';
    PushNotification.localNotification({
      ticker: 'My Notification Ticker',
      showWhen: true,
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      bigText: message.data.message,
      color: 'green',
      vibrate: true,
      vibration: 300,
      priority: 'high',
      visibility: 'private',
      ignoreInForeground: false,
      messageId: 'google:message_id',
      invokeApp: true,
      title,
      message: message.data.message,
      userInfo: {},
      playSound: false,
      soundName: 'default',
    });
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    messaging().onMessage(async (remoteMessage) => {
      console.log('Message handled in the active!', remoteMessage);

      displayNotification(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      displayNotification(remoteMessage);
    });
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoute="Entry" headerMode="none">
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="Audio" component={Audio} />
        <Stack.Screen name="Users" component={UsersComponent} />
        <Stack.Screen name="Call" component={Call} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
