import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
// import Heading from 'src/Components/Reusable Component/Heading';
// import ButtonComp from 'src/Components/ReusableComponent/Button';
import COLORS from '../../Assets/Style/Color';
// import SafeArea from 'src/Components/ReusableComponent/SafeArea';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import RNOtpVerify from 'react-native-otp-verify';
// import InteractParagraph from 'src/Components/ReusableComponent/Paragraph';
import {BASE_URL} from '../../utils/api';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Loading from '../../Components/ReusableComponent/Loader';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Heading from '../../Components/ReusableComponent/Heading';
import ButtonComp from '../../Components/ReusableComponent/Button';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';

export default function Otp({
  route: {
    params: {phoneNum},
  },
}) {
  const [error, setError] = useState('');
  const [otp, setOtp] = useState();
  const [otpCheck, setOtpcheck] = useState('');
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const [counter, setCounter] = useState(59);
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1500);
  }, [counter]);

  const signInWithPhoneNumber = () => {
    RNOtpVerify.getHash().then(res => {
      axios
        .post(`${BASE_URL}/user/twilio_sendmsg.php`, {
          phoneNum: phoneNum,
          appHashKey: res,
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log('Error from Sending', err);
          navigation.navigate('googleSignIn');
          showMessage({
            message: 'Something went wrong',
            type: 'danger',
            color: 'white',
          });
        });
    });
  };
  let KeyHash;

  useEffect(() => {
    signInWithPhoneNumber();
    console.log(phoneNum);
  }, []);

  useEffect(() => {
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => alert(p));
    return () => RNOtpVerify.removeListener();
  }, []);

  const otpHandler = message => {
    console.log('check');
    const checkotp = /(\d{6})/g.exec(message)[1];
    console.log(checkotp, 'useEffect auto get');
    setOtp(checkotp);
    setOtpcheck(checkotp);
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };

  useEffect(() => {
    checkOtp();
  }, [otpCheck]);

  const checkOtp = () => {
    // setLoader(true)
    let newCode = otpCheck;

    console.log(newCode);

    if (newCode.length === 6) {
      try {
        axios
          .post(`${BASE_URL}/user/twilio_verify`, {
            phoneNum: phoneNum,
            code: newCode,
          })
          .then(response => {
            console.log('Response From verify Number', response);
            setLoader(true);
            axios
              .post(`${BASE_URL}/login/checkphonenum`, {
                phoneNumber: phoneNum,
              })
              .then(async res => {
                console.log('Inside Check Phone Number', res, res.status);
                setLoader(true);
                if (res.status == 200) {
                  const v = {
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber,
                    username: res.data.username,
                    profile_pic: res.data.profile_pic,
                  };
                  await AsyncStorage.setItem('token', JSON.stringify(v));
                  await AsyncStorage.setItem('user', JSON.stringify(v));
                  let value1 = await AsyncStorage.getItem('token');
                  let value2 = await AsyncStorage.getItem('user').then(res => {
                    console.log('inside asyn');
                    let val = JSON.parse(res);
                    console.log(val);
                    navigation.navigate('bottomBar');
                  });
                } else {
                  console.log(res.status);
                  navigation.navigate('signUpWithNumber', {phoneNum});
                }
              })
              .catch(err => {
                console.log(err);
                navigation.navigate('signUpWithNumber', {phoneNum});
                setLoader(false);
              });
          })
          .catch(err => {
            console.log('Error from Sending', err);
            navigation.navigate('googleSignIn');
            showMessage({
              message: 'Something went wrong',
              type: 'danger',
              color: 'white',
            });
          });
      } catch (error) {
        alert(console.log(error));
        showMessage({
          message: 'Something went wrong',
          type: 'danger',
          color: 'white',
        });
      }
    }
  };

  const confirmCode = async val => {
    let newCode = val;
    setLoader(true);

    !otp ? setOtp(val) : null;
    try {
      axios
        .post(`${BASE_URL}/user/twilio_verify`, {
          phoneNum: phoneNum,
          code: newCode,
        })
        .then(response => {
          console.log('Response From verify Number', response);
          setLoader(true);
          axios
            .post(`${BASE_URL}/login/checkphonenum`, {
              phoneNumber: phoneNum,
            })
            .then(async res => {
              console.log('Inside Check Phone Number', res, res.status);
              setLoader(true);
              if (res.status == 200) {
                const v = {
                  email: res.data.email,
                  phoneNumber: res.data.phoneNumber,
                  username: res.data.username,
                  profile_pic: res.data.profile_pic,
                };
                await AsyncStorage.setItem('token', JSON.stringify(v));
                await AsyncStorage.setItem('user', JSON.stringify(v));
                let value1 = await AsyncStorage.getItem('token');
                let value2 = await AsyncStorage.getItem('user').then(res => {
                  console.log('inside asyn');
                  let val = JSON.parse(res);
                  console.log(val);
                  navigation.navigate('bottomBar');
                });
              } else {
                console.log(res.status);
                navigation.navigate('signUpWithNumber', {phoneNum});
              }
            })
            .catch(err => {
              console.log(err);
              navigation.navigate('signUpWithNumber', {phoneNum});
              setLoader(false);
            });
        })
        .catch(err => {
          console.log('Error from Sending', err);
          navigation.navigate('googleSignIn');
          showMessage({
            message: 'Something went wrong',
            type: 'danger',
            color: 'white',
          });
        });
    } catch (error) {
      alert(console.log(error));
      showMessage({
        message: 'Something went wrong',
        type: 'danger',
        color: 'white',
      });
    }
  };

  return (
    <SafeArea>
      {loader ? (
        <Loading />
      ) : (
        <View
          style={{margin: '8%', justifyContent: 'space-between', flexGrow: 1}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '8%',
                marginBottom: '6%',
              }}>
              <Pressable onPress={() => navigation.navigate('googleSignIn')}>
                <View>
                  <Ionicons
                    name={'chevron-back'}
                    style={{fontWeight: '900'}}
                    color={isDark?.isdark ? COLORS.white : COLORS.dark}
                    size={30}
                  />
                </View>
              </Pressable>
            </View>
            <View style={{alignItems: 'center'}}>
              <Heading
                Stylefont={'normal'}
                Fontweight={'700'}
                Fontsize={34}
                mt={'10%'}
                lh={40}
                Heading={`00: ${counter < 10 ? '0' + counter : counter}`}
              />
              <View style={{width: '70%'}}>
                <Heading
                  Stylefont={'normal'}
                  Fontsize={16}
                  lh={30}
                  txtAlign={'center'}
                  Heading={
                    'Type the verification code we’ve sent you on ' + phoneNum
                  }
                />
              </View>
            </View>
            <OTPInputView
              style={{width: '100%', height: 100}}
              pinCount={6}
              code={otp}
              codeInputFieldStyle={{color: '#000'}}
              autoFocusOnLoad={false}
              keyboardType={'number-pad'}
              keyboardAppearance={'default'}
              editable
              onCodeFilled={code => {
                confirmCode(code);
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: '100%',
              }}>
              <InteractParagraph p={`Didn't get the code?`} />
              {counter == 0 && (
                <Pressable
                  onPress={() => {
                    signInWithPhoneNumber();
                    setCounter(59);
                  }}>
                  <InteractParagraph
                    colors={COLORS.primary}
                    p={` Send Again`}
                  />
                </Pressable>
              )}
              <Text style={{color: 'red'}}>{error}</Text>
            </View>
            <View style={{marginTop: 20}}>
              <ButtonComp
                btnwidth={'100%'}
                btnHeight={56}
                btnText={'Send'}
                txtColor={COLORS.white}
                justify={'center'}
                align={'center'}
                fontSize={16}
                radius={15}
                fontStyle={'700'}
                txtwidth={'100%'}
                bg={COLORS.border_color}
                press={confirmCode}
                disable={true}
              />
            </View>
          </View>
        </View>
      )}
    </SafeArea>
  );
}
