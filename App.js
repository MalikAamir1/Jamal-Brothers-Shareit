import * as React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Navigation from './src/Navigation/Stack';
import {Store} from './src/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isDark} from './src/Store/slices';
import {
  ImageBackground,
  KeyboardAvoidingView,
  LogBox,
  Platform,
} from 'react-native';
import BottomTab from './src/Navigation/BottomTab';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import {userDataFromAsyncStorage} from './src/Store/Reducers/AuthReducer';
import {getDataFromAsync} from './src/utils/getAndSetAsyncStorage';
import {getNewUserFromAsyncStorage} from './src/Store/Reducers/NewUserCheckReducer';
import {useState} from 'react';
import darkmodebgimg from './src/Assets/Images/darkmodebgimg/bglmg.png';
import {
  NotificationServices,
  requestUserPermission,
} from './src/utils/NotificationServices';
import ForegroundNotificationHandler from './src/utils/ForegroundNotificationHandler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types",
  'ColorPropType will be removed',
  'Failed prop type',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
  // `Each child in a list should have a unique "key" prop.`,
  // 'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  // `Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.`,
]);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffffff',
    accent: '#373837',
  },
};
const getDark = async () => {
  try {
    let value = await AsyncStorage.getItem('isDark').then(res => {
      return res;
    });
    return value;
  } catch (e) {
    console.log('catch', e);
  }
};

// just replace reducerData with isDark from dependency of useEffect because of rerenders warning
const DarkMode = () => {
  const dispatch = useDispatch();
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  // console.log('reducer data', reducerData);
  React.useEffect(() => {
    (async () => {
      let value = getDark().then(res => {
        // console.log('response',res);
        let isSwitchOn = JSON.parse(res);
        if (isSwitchOn == true) {
          // console.log('dispatch',isDark( isSwitchOn))
          dispatch(isDark(isSwitchOn));
        }
      });
    })().catch(err => {
      console.log('catch', err);
    });
  }, [isDark]);
  return null;
};

export default function App() {
  React.useEffect(() => {
    // SplashScreen.hide();
    GoogleSignin.configure({
      webClientId:
        '1071565021359-0pmq5lra0ms000ifoal5l5ija45hr4hf.apps.googleusercontent.com',
    });
    // if (Platform.OS == 'android') {
    // }
  }, []);

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('user').then(res => {
        return res;
      });
      return value;
    } catch (e) {
      console.log(e);
    }
  };

  const UserAuthenticated = () => {
    const dispatch = useDispatch();
    // const state = useSelector(state => state);
    console.log(`this is state`);
    // console.log(state);

    React.useEffect(() => {
      // New User checking
      (async () => {
        let value = getDataFromAsync('NewUser').then(res => {
          console.log('this is res in APp.js NewUSer', res);
          let v = JSON.parse(res);
          if (v != null && v != undefined) {
            dispatch(getNewUserFromAsyncStorage(v));
          } else {
            console.log('old User ');
          }
        });
      })().catch(err => {
        console.error(err);
      });
      //    SplashScreen.hide();
      (async () => {
        let value = getData().then(res => {
          // console.log('this is res in APp');
          let v = JSON.parse(res);
          console.log('userData From Async in Homepage', v);

          console.log(v);

          if (v?.userId) {
            dispatch(userDataFromAsyncStorage(v));
            //  SplashScreen.hide();
          } else {
            //  SplashScreen.hide();
          }
          requestUserPermission();
          NotificationServices();
        });
      })().catch(err => {
        console.error(err);
      });
    }, []);

    return null;
  };

  const BgImage = props => {
    // const state = useSelector(state => state);
    // const {
    //   isDark: {isdark},
    // } = state;
    return (
      <ImageBackground
        source={darkmodebgimg}
        resizeMode="cover"
        style={{flex: 1, justifyContent: 'center'}}>
        {props.children}
      </ImageBackground>
    );
  };

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <ForegroundNotificationHandler />
        <Provider store={Store}>
          <UserAuthenticated />
          <DarkMode />
          <PaperProvider theme={theme}>
            <KeyboardAvoidingView
              style={{flex: 1, backgroundColor: 'black'}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Navigation />
            </KeyboardAvoidingView>
            <FlashMessage position="center" hideOnPress={true} />
          </PaperProvider>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}
