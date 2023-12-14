import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../../Screens/Onboarding';
import Splash from '../../Screens/Splash';
// import TermAndCOndition from '../../Screens/TermCondition';
import GoogleSignIn from '../../Screens/GoogleLogin';
import GoogleSignUp from '../../Screens/GoogleSignUp';
import ContestAbout from '../../Screens/ContestAbout';
import ForReader from '../../Screens/ForReader';
import Story from '../../Screens/Story';
import Story2 from '../../Screens/Story2';
import Winner from '../../Screens/Winners';
import Contestprizes from '../../Screens/ContestPrizes';
import Paymentmethod from '../../Screens/Paymentmethod';
import Addcreditcard from '../../Screens/Addcreditcard';
import BottomBar from '../BottomTab';
import Setting from '../../Screens/Setting';
import ContextPrizes from '../../Screens/ContextPrizes';
import Profile from '../../Screens/Profile';
import Writer from '../../Screens/Writer';
import Otp from '../../Screens/OTP';
import Phone from '../../Screens/Phone';
import LogOutBefore from '../../Screens/logoutBefore';
import AccountSetting from '../../Screens/AccountSetting';
import EditProfile from '../../Screens/EditProfile';
import SignUpWithNumber from '../../Screens/loginWithemail';
import ForgetPassword, {ForgotPassword} from '../../Screens/ForgetPassword';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {ToastAndroid} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../Screens/NoInternet';
import {ScrollView} from 'react-native-gesture-handler';
import {RefreshControl} from 'react-native';
import {View} from 'react-native';
import {GetLeagues} from '../../Store/Reducers/League';
import {Text} from 'react-native-paper';
import TestingScreen from '../../Screens/testingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {Login} from '../../Screens/Login';
import {SignUp} from '../../Screens/SignUp';
import {TermCondition} from '../../Screens/TermCondition';
import {OtpScreen} from '../../Screens/OtpScreen';
import {ProfileCreateStart} from '../../Screens/ProfileCreateStart';
import {PasswordChange} from '../../Screens/PasswordChange';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import EditStory from '../../Screens/EditStory';
import Bookmark from '../../Screens/Bookmark';
import {ChangePassword} from '../../Screens/ChangePassword';
// import { TermCondition } from '../../Screens/TermCondition';

//Refresh Leagues Code
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Stack = createNativeStackNavigator();
export default function Navigation() {
  // const {userAuth, userCheck} = useSelector(state => state);
  const dispatch = useDispatch();
  const userCheck = useSelector(state => state.userCheck);

  const [userData, setUserData] = useState({});
  const [OnboardingScreen, setOnboardingScreen] = useState(true);
  const userAuth = useSelector(state => state.AuthReducer);
  const otpScreenBool = useSelector(state => state.ScreenReducer.userData);

  console.log('otpScreenBool: ', otpScreenBool);

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

  React.useEffect(() => {
    (async () => {
      let value = getData().then(res => {
        // console.log('this is res in APp');
        console.log(res);
        let v = JSON.parse(res);

        console.log('v:', v);

        if (v?.user.id) {
          dispatch(userDataFromAsyncStorage(v));
          //  SplashScreen.hide();
        } else {
          //  SplashScreen.hide();
        }
      });
    })().catch(err => {
      console.error(err);
    });
  }, []);

  //Internet State
  const [isInternet, setIsInternet] = React.useState(true);
  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsInternet(state.isConnected);
    });
  };

  React.useEffect(() => {
    console.log('userAuth: ', userAuth);
    if (userAuth.userData?.user?.id) {
      setUserData(userAuth.userData);
    } else {
      setUserData(null);
    }
  }, [userAuth.userData]);

  useEffect(() => {
    console.log('userData:', userData);
  }, [userData]);
  useEffect(() => {
    console.log('otpScreenBool:', otpScreenBool);
  }, [otpScreenBool]);

  React.useEffect(() => {
    checkInternet();
    SplashScreen.hide();
  }, []);

  React.useEffect(() => {
    checkInternet();
    if (!isInternet) {
      ToastAndroid.show('No Internet Connection!', ToastAndroid.SHORT);
    }
  }, [isInternet]);

  //Refresh Leagues Code
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checkInternet();
    wait(2000).then(() => {
      //disable refreshing
      setRefreshing(false);
    });
  }, []);

  if (isInternet === false)
    return (
      <SafeArea>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              marginTop: '90%',
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                paddingHorizontal: '7%',
                textAlign: 'center',
                color: 'white',
              }}>
              Oops! Looks like your device is not connected to the Internet.
            </Text>
          </View>
        </ScrollView>
      </SafeArea>
    );
  // console.log(userData.userId, 'userData')
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="onboarding">
        {/* {userCheck?.NewUser === null && (
          <>
            <Stack.Screen name="onboarding" component={Onboarding} />
            <Stack.Screen
              name="termAndCOndition"
              component={TermAndCOndition}
            />
          </>
        )} */}

        {userData == null ? (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="TermCondition" component={TermCondition} />
            <Stack.Screen
              name="signUpWithNumber"
              component={SignUpWithNumber}
            />
            {/* <Stack.Screen name="phone" component={Phone} /> */}
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="PasswordChange" component={PasswordChange} />
          </>
        ) : otpScreenBool ? (
          <Stack.Screen
            name="ProfileCreateStart"
            component={ProfileCreateStart}
          />
        ) : (
          <>
            <Stack.Screen name="bottombar" component={BottomBar} />
            <Stack.Screen name="contestabout" component={ContestAbout} />
            <Stack.Screen name="title6" component={Writer} />
            <Stack.Screen name="title7" component={ForReader} />
            <Stack.Screen name="title8" component={Story} />
            <Stack.Screen name="title9" component={Story2} />
            <Stack.Screen name="setting" component={Setting} />
            <Stack.Screen name="winner" component={Winner} />
            <Stack.Screen name="contextPrizes" component={ContextPrizes} />
            <Stack.Screen name="paymentmethod" component={Paymentmethod} />
            <Stack.Screen name="addcreditcard" component={Addcreditcard} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="writer" component={Writer} />
            <Stack.Screen name="logOutBefore" component={LogOutBefore} />
            <Stack.Screen name="accountSetting" component={AccountSetting} />
            <Stack.Screen name="editProfile" component={EditProfile} />
            <Stack.Screen name="TestingScreen" component={TestingScreen} />
            <Stack.Screen name="editStory" component={EditStory} />
            <Stack.Screen name="bookmark" component={Bookmark} />
            <Stack.Screen name="changePassword" component={ChangePassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
