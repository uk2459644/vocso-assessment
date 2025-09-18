// utils/notifications.js
import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

import { Alert } from 'react-native';

/**
 * Requests notification permission on iOS and Android.
 * Returns true if granted, false otherwise.
 */

export async function requestNotificationPermission() {
  try {
    let granted = false;

    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      granted =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        // Android 13+ requires POST_NOTIFICATIONS permission
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        granted = result === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // Older Android versions grant permission automatically
        granted = true;
      }
    }

    if (!granted) {
      Alert.alert(
        'Notification Permission',
        'Please enable notifications to receive updates.'
      );
    }

    return granted;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

/**
 * Get FCM token for device
 */
export async function getFcmToken() {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

/**
 * Foreground listener
 */
export function setupForegroundNotificationListener(onMessageHandler) {
  return messaging().onMessage(async remoteMessage => {
    console.log('📩 Foreground FCM:', remoteMessage);
    if (onMessageHandler) {
      onMessageHandler(remoteMessage);
    }
  });
}

/**
 * Background & quit state listener
 */
export function setupBackgroundNotificationHandler(onMessageHandler) {
  // Runs when the app is in background
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📩 Background FCM:', remoteMessage);
    if (onMessageHandler) {
      onMessageHandler(remoteMessage);
    }
  });

  // Runs when the app is opened by tapping notification
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('📩 Notification opened:', remoteMessage);
    if (onMessageHandler) {
      onMessageHandler(remoteMessage);
    }
  });

  // Runs when app was quit and opened by notification
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('📩 App opened from quit state:', remoteMessage);
        if (onMessageHandler) {
          onMessageHandler(remoteMessage);
        }
      }
    });
}
