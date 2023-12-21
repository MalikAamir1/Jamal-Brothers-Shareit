import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

const ForegroundNotificationHandler = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Handle in foreground', remoteMessage);
      const {notification, messageId} = remoteMessage;
      console.log(Platform.OS);
      if (Platform.OS == 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: 'default',
        });
      } else {
        PushNotification.createChannel(
          {
            channelId: 'channel-id-1', // (required)
            channelName: 'My channel', // (required)
            channelDescription: 'A channel to categorize your notifications', // (optional) default: undefined.
            // playSound: true, // (optional) default: true
            // soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            // vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );

        PushNotification.localNotification({
          channelId: 'channel-id-1', // (required)
          channelName: 'My channel', // (required)
          // message: remoteMessage?.data?.body,  // for Aws
          // title: remoteMessage?.data?.title,
          body: notification.body, // for Firebase
          title: notification.title,
          // message: 'android testing',
          // title: 'android Titles`',
          //   bigPictureUrl: remoteMessage?.notification?.android?.imageUrl,
          //   smallIcon: remoteMessage?.notification?.android?.imageUrl,
          // channelId
          playSound: true,
          vibrate: true,
        });
      }
    });
    return unsubscribe;
  }, []);
  return null;
};

export default ForegroundNotificationHandler;
