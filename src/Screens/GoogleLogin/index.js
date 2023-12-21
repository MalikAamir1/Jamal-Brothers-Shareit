import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BackHandler} from 'react-native';
import {styles} from './style';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';

import SafeArea from '../../Components/ReusableComponent/SafeArea';
import Heading from '../../Components/ReusableComponent/Heading';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
// import BasicBtn from '../../Components/ReusableComponent/Button Basic';
import {Divider} from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import {ScrollView} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import axios from 'axios';
import Loader from '../../Components/ReusableComponent/Loader';
import {BASE_URL} from '../../utils/api';
import {addPro} from '../../redux/reducers/profile';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../utils/getAndSetAsyncStorage';
import {getNewUserFromAsyncStorage} from '../../Store/Reducers/NewUserCheckReducer';
import {postRequest} from '../../utils/fetch';
import BasicBtn from '../../Components/ReusableComponent/ButtonBasic';

export default function Login() {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  let signInSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be atleast ${min} characters`)
      .required('Password is required')
      .matches(
        /^(?=.*[0-9])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
  });

  const onGoogleSignIn = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(googleCredential);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const onFacebookLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  const navigation = useNavigation();
  let value;
  const [err, setErr] = useState('');

  const login = value => {
    setLoader(true);
    postRequest(`${BASE_URL}/signin`, {
      email: value.email.toLowerCase(),
      password: value.password,
      usertype: 'email',
    })
      .then(async res => {
        // setLoader(false);
        console.log('Login Response From Backend:', res);
        // console.log(typeof res.data);
        // console.log(typeof res.data[0]);
        // console.log('res[0]["status"]:', res.data[0].status);
        // console.log("res[0].status:",typeof res.data[0].status);
        // console.log('res[0]["status"]:', res.data[0]["status"]);
        // console.log("res[0][status]:",typeof res.data[0]["status"]);
        // console.log(res.data.user);
        if (res[0].status === 'true') {
          setLoader(false);
          try {
            const v = {
              name: res[0].data.username ? res[0].data.username : 'user',
              phoneNumber: res[0].data.phoneNumber,
              profile_pic: res[0].data.profile_pic,
              email: res[0].data.email,
              role: res[0].data.role ? res[0].data.role : 2,
              type: 'email',
              userId: res[0].data.user_id,
            };

            setDataToAsync('token', JSON.stringify(v));
            setDataToAsync('user', JSON.stringify(v));

            getDataFromAsync('user').then(res => {
              dispatch(userDataFromAsyncStorage(JSON.parse(res)));
            });
          } catch (e) {
            console.log(e);
          }
        } else if (
          res[0].status === 'false' &&
          res[0].message == 'invalid userid or password.'
        ) {
          setLoader(false);
          showMessage({
            message: 'Please Enter Correct Email & Password',
            type: 'danger',
            color: 'white',
          });
          // alert('Please Enter Correct Email & Password')
        } else {
          setLoader(false);
          showMessage({
            message: 'Something went wrong please try again',
            type: 'danger',
            color: 'white',
          });
        }
      })
      .catch(error => {
        setLoader(false);
        if (error.response.status == 404) {
          setErr('Email Not Found');
        } else if (error.response.status == 401) {
          setErr('Invalid email or password');
        }
      });
  };

  // ============New User Auth Data from New Reducer===================
  // const reducerData = useSelector(state => state);
  const userAuth = useSelector(state => state.userAuth);
  const isDark = useSelector(state => state.isDark);
  // const {userAuth} = reducerData;
  console.log('Data From reducer in Google Login', userAuth.userData);
  // ===============================

  useEffect(() => {
    return () => {
      console.log('unmount: success');
    };
  }, []);

  return (
    <>
      <SafeArea>
        {loader ? (
          <Loader />
        ) : (
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1}}>
              <View style={{marginHorizontal: '5%'}}>
                <Heading
                  mt={0}
                  Stylefont={'normal'}
                  Fontweight={'700'}
                  Fontsize={30}
                  txtAlign={'left'}
                  pt={30}
                  lh={40}
                  Heading={'Welcome '}
                  wd={'100%'}
                />
                <Heading
                  mt={0}
                  Stylefont={'normal'}
                  Fontweight={'700'}
                  Fontsize={30}
                  txtAlign={'left'}
                  lh={40}
                  Heading={'Back!'}
                  wd={'100%'}
                />
              </View>

              <View
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingVertical: '5%',
                }}>
                <Pressable
                  style={{width: '100%'}}
                  onPress={() =>
                    onGoogleSignIn()
                      .then(async res => {
                        console.log('Google login res:', res);
                        var data = new FormData();
                        data.append(
                          'username',
                          `${res.user._user.displayName}`,
                        );
                        data.append('email', `${res.user._user.email}`);
                        data.append('password', '');
                        data.append('usertype', `gmail`);
                        data.append('roletype', `public`);
                        data.append('phone', `${res.user._user.phoneNumber}`);
                        var requestOptions = {
                          method: 'POST',
                          body: data,
                          headers: {
                            'Cache-Control': 'no-cache',
                          },
                        };
                        try {
                          setLoader(true);
                          const pushData = await fetch(
                            `${BASE_URL}/signup.php`,
                            requestOptions,
                          );
                          await pushData
                            .json()

                            .then(async response => {
                              setLoader(false);
                              console.log('res from backend', response);

                              if (response[0]?.status == 'true') {
                                setLoader(false);
                                const v = {
                                  name: response[0].data.username
                                    ? response[0].data.username
                                    : '',
                                  phoneNumber: response[0].data.phoneNumber,
                                  profile_pic: response[0].data.profile_pic,
                                  email: response[0].data.email,
                                  role: response[0].data.role
                                    ? response[0].data.role
                                    : 2,
                                  type: 'gmail',
                                  userId: response[0].data.user_id,
                                };

                                setDataToAsync(
                                  'token',
                                  JSON.stringify(v.userId),
                                );
                                setDataToAsync('user', JSON.stringify(v));

                                getDataFromAsync('user').then(resp => {
                                  dispatch(
                                    userDataFromAsyncStorage(JSON.parse(resp)),
                                  );
                                });
                                //for async storage and redux
                                // alert('Account Created Successfully');
                              } else if (response[0]?.status == 'false') {
                                setLoader(false);
                                showMessage({
                                  message: 'Something Went Wrong 1',
                                  type: 'danger',
                                  color: 'white',
                                });
                              }
                            })
                            .catch(err => {
                              showMessage({
                                message: 'Something Went Wrong 2',
                                type: 'danger',
                                color: 'white',
                              });
                              console.log('err', err);
                              setLoader(false);
                            });
                        } catch (err) {
                          setLoader(false);
                          showMessage({
                            message: 'Something Went Wrong 3',
                            type: 'danger',
                            color: 'white',
                          });
                          console.log(
                            '🚀 ~ file: index.js ~ line 187 ~ signUp ~ err',
                            err,
                          );
                        }
                      })
                      .catch(err => {
                        console.log(err);
                        showMessage({
                          message: 'Please check internet connection',
                          type: 'danger',
                          color: 'white',
                        });
                      })
                  }>
                  <BasicBtn
                    btnText={'SigniN With Google'}
                    icon={'logo-google'}
                    txtColor={COLORS.dark}
                    fontSize={15}
                    fontStyle={'700'}
                    iconSize={21}
                    bgcolor={COLORS.bg_btn_clr}
                    mainWidth={'95%'}
                    jstCnt={'center'}
                    pad={'1%'}
                  />
                </Pressable>

                <Pressable
                  style={{width: '100%'}}
                  onPress={() =>
                    onFacebookLogin()
                      .then(async res => {
                        console.log('res', res);
                        // var data = new FormData();
                        // data.append(
                        //   'username',
                        //   `${res.user._user.displayName}`,
                        // );
                        // data.append('email', `${res.user._user.email}`);
                        // data.append('usertype', `fb`);
                        // data.append('roletype', `public`);
                        // data.append('phone', `${res.user._user.phoneNumber}`);
                        // var requestOptions = {
                        //   method: 'post',
                        //   // body: data,
                        //   headers: {
                        //     'Cache-Control': 'no-cache',
                        //   },
                        //   data: data,
                        //   url: `${BASE_URL}/signup.php`,
                        // };

                        // try {
                        //   setLoader(true);
                        //   const pushData = await axios(requestOptions)
                        //     .then(async response => {
                        //       setLoader(false);
                        //       console.log('res', typeof response.data);
                        //       console.log('res', response.data);

                        //       if (response.data[0]?.status == 'true') {
                        //         setLoader(false);
                        //         navigation.navigate('googleSignIn');
                        //         //for async storage and redux
                        //         const v = {
                        //           name: response.data[0].data.username
                        //             ? response.data[0].data.username
                        //             : 'Aamir',
                        //           phoneNumber:
                        //             response.data[0].data.phoneNumber,
                        //           profile_pic:
                        //             response.data[0].data.profile_pic,
                        //           email: response.data[0].data.email,
                        //           role: response.data[0].data.role
                        //             ? response.data[0].data.role
                        //             : 2,
                        //           type: 'fb',
                        //           userId: response.data[0].data.user_id,
                        //         };

                        //         setDataToAsync('token', JSON.stringify(v));
                        //         setDataToAsync('user', JSON.stringify(v));

                        //         getDataFromAsync('user').then(resp => {
                        //           dispatch(
                        //             userDataFromAsyncStorage(JSON.parse(resp)),
                        //           );
                        //         });
                        //         //for async storage and redux
                        //         alert('Account Created Successfully');
                        //       } else if (response.data[0]?.status == 'false') {
                        //         setLoader(false);
                        //         showMessage({
                        //           message: 'Something Went Wrong',
                        //           type: 'danger',
                        //           color: 'white',
                        //         });
                        //       }
                        //     })
                        //     .catch(err => {
                        //       showMessage({
                        //         message: 'Something Went Wrong 4',
                        //         type: 'danger',
                        //         color: 'white',
                        //       });
                        //       console.log('err', err);
                        //       setLoader(false);
                        //     });
                        //   // console.log(formdata);
                        // } catch (err) {
                        //   setLoader(false);
                        //   showMessage({
                        //     message: 'Something Went Wrong',
                        //     type: 'danger',
                        //     color: 'white',
                        //   });
                        //   console.log(
                        //     '🚀 ~ file: index.js ~ line 187 ~ signUp ~ err',
                        //     err,
                        //   );
                        // }
                      })
                      .catch(err => {
                        console.log('.catch of facebook:', err);
                        showMessage({
                          message: 'Something went wrong',
                          type: 'danger',
                          color: 'white',
                        });
                      })
                  }>
                  <BasicBtn
                    btnText={'Signin With Facebook'}
                    icon={'logo-facebook'}
                    txtColor={COLORS.dark}
                    fontSize={15}
                    fontStyle={'700'}
                    iconSize={21}
                    bgcolor={COLORS.bg_btn_clr}
                    mainWidth={'95%'}
                    jstCnt={'center'}
                    pad={'1%'}
                  />
                </Pressable>

                {/* <Pressable
                  style={{width: '100%'}}
                  onPress={() => {
                    navigation.navigate('phone');
                  }}>
                  <BasicBtn
                    btnText={'Sign in With Phone'}
                    icon={'phone-portrait-outline'}
                    txtColor={COLORS.dark}
                    fontSize={15}
                    fontStyle={'700'}
                    iconSize={21}
                    bgcolor={COLORS.bg_btn_clr}
                    mainWidth={'95%'}
                    jstCnt={'center'}
                    pad={'1%'}
                  />
                </Pressable> */}
              </View>

              <View style={styles.mainDivider}>
                <Divider style={styles.divider} />
                <Text
                  style={{
                    color: isDark?.isdark ? COLORS.white : COLORS.dark,
                  }}>
                  OR
                </Text>
                <Divider style={styles.divider} />
              </View>
              <Formik
                initialValues={{email: '', password: ''}}
                validateOnMount={true}
                onSubmit={values => {
                  value = values;
                  login(value);
                }}
                validationSchema={signInSchema}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                  isValid,
                }) => (
                  <>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: '2%',
                        fontWeight: 'bold',
                      }}>
                      {err && (
                        <InteractParagraph
                          mt={'2%'}
                          fw={'bold'}
                          pAlign={'center'}
                          txtAlign={'center'}
                          p={err}
                          colors={'red'}
                        />
                      )}
                    </Text>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Input
                        outline={'#E8E6EA'}
                        width={'95%'}
                        top={'2%'}
                        Onblur={handleBlur('email')}
                        value={values.email}
                        Onchange={handleChange('email')}
                        mode={'outlined'}
                        label={'Email'}
                        Keyboard={'email-address'}
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginTop: '2%',
                          marginLeft: '3%',
                        }}>
                        {errors.email}
                      </Text>
                    )}

                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Input
                        style={{backgroundColor: COLORS.white}}
                        Onblur={handleBlur('password')}
                        value={values.password}
                        Onchange={handleChange('password')}
                        outline={'#E8E6EA'}
                        width={'95%'}
                        top={'2%'}
                        mode={'outlined'}
                        Pass={true}
                        label={'Password'}
                      />
                    </View>
                    {errors.password && touched.password && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginTop: '2%',
                          marginLeft: '3%',
                        }}>
                        {errors.password}
                      </Text>
                    )}

                    <ButtonComp
                      mode={'text'}
                      justify={'flex-end'}
                      align={'flex-end'}
                      btnText={'Forgot Password?'}
                      fontStyle={'bold'}
                      txtColor={isDark?.isdark ? COLORS.white : COLORS.dark}
                      fontSize={12}
                      press={() => navigation.navigate('forgetPassword')}
                    />

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '4%',
                      }}>
                      <ButtonComp
                        btnHeight={45}
                        mode={'contained'}
                        justify={'center'}
                        align={'center'}
                        btnText={'Sign In'}
                        fontStyle={'bold'}
                        fontSize={20}
                        bg={COLORS.sign_In_btn_bg_clr}
                        txtColor={COLORS.white}
                        txtwidth={'87%'}
                        radius={5}
                        press={handleSubmit}
                      />
                    </View>
                  </>
                )}
              </Formik>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: '10%',
                  alignItems: 'center',
                }}>
                <InteractParagraph
                  pAlign={'center'}
                  txtAlign={'center'}
                  p={'Not have an account? '}
                  // bg={COLORS.white}
                />
                <ButtonComp
                  mode={'text'}
                  btnText={'SignUp'}
                  txtColor={'#418EAD'}
                  fontSize={12}
                  p={0}
                  txtLeftMargin={0}
                  press={() => navigation.navigate('googleSignUp')}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </SafeArea>
    </>
  );
}
