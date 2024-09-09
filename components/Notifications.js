import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// This function will request permissions for notifications and return the Expo push token
export async function registerForPushNotificationsAsync() {
  let token;
  // Set up the notification channels for Android
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Request notification permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  // Get the push notification token
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Push Token:', token);

  return token;
}

// This function will schedule a local notification
export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Travel Companion",
      body: "You have a trip coming up soon!",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 5 },
  });
}
