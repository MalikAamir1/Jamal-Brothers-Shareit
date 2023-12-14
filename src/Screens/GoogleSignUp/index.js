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
  Alert,
} from 'react-native';
import {styles} from './style';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import BorderingBorder from '../../Components/BorderingBorder';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import Heading from '../../Components/ReusableComponent/Heading';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import BasicBtn from '../../Components/ReusableComponent/ButtonBasic';
import {Divider} from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import {ScrollView} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {
  UserData,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {addPro, PostProfile} from '../../redux/reducers/profile';
import axios from 'axios';
import Loader from '../../Components/ReusableComponent/Loader';
import {BASE_URL} from '../../utils/api';
import {BackHandler} from 'react-native';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../utils/getAndSetAsyncStorage';
import dummyImg from '../../Assets/Images/profile/dummyImg.png';
import NetInfo from '@react-native-community/netinfo';

export default function GoogleSignUp() {
  const navigation = useNavigation();

  const signupValidationSchema = yup.object().shape({
    userName: yup.string().required('User Name is required'),
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
    confirmPassword: yup
      .string()
      .min(8, ({min}) => `Password must be atleast ${min} characters`)
      .required(' Confirm password is required')
      .matches(
        /^(?=.*[0-9])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
  });

  const onGoogleSignIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const onFacebookLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager?.logInWithPermissions([
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

  const [errMain, setErrMain] = useState('');
  const [loader, setLoader] = useState(false);
  let value;

  const dispatch = useDispatch();

  const signUp = async values => {
    setLoader(true);
    console.log('values: ', values);
    if (values.confirmPassword === values.password) {
      var data = new FormData();
      let email = values.email;
      let emailInLowerCase = email.toLowerCase();
      data.append('email', `${emailInLowerCase}`);
      data.append('password', `${values.password}`);
      data.append('usertype', `email`);
      data.append('roletype', `public`);
      data.append('username', `${values.userName}`);
      data.append('phone', ``);

      var requestOptions = {
        method: 'post',
        // url: `${BASE_URL}/signup`,
        body: data,
        // data: data,
        headers: {
          'Cache-Control': 'no-cache',
        },
      };
      console.log('requestOptions: ', requestOptions);
      //  pushData.json()
      try {
        const pushData = await fetch(`${BASE_URL}/signup`, requestOptions);
        pushData
          .json()
          .then(async res => {
            setLoader(false);
            console.log('res', res);
            if (res[0]?.status == 'true') {
              setLoader(false);
              navigation.navigate('googleSignIn');
              alert('Account Created Successfully');
            } else if (res[0]?.status == 'false') {
              setLoader(false);
              showMessage({
                message: 'Something Went Wrong',
                type: 'danger',
                color: 'white',
              });
            }
          })
          .catch(err => {
            showMessage({
              message: 'Something Went Wrong',
              type: 'danger',
              color: 'white',
            });
            console.log('err', err);
            setLoader(false);
          });
        // console.log(formdata);
      } catch (err) {
        setLoader(false);
        showMessage({
          message: 'Something Went Wrong',
          type: 'danger',
          color: 'white',
        });
        console.log('🚀 ~ file: index.js ~ line 187 ~ signUp ~ err', err);
      }
    } else {
      setErrMain('password and comfirm password should be same');
      setLoader(false);
    }
  };

  // const {reducerData} = useSelector(state => state);

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
                  Heading={'Create An '}
                  // Color={COLORS.primary}
                  wd={'100%'}
                />
                <Heading
                  mt={0}
                  Stylefont={'normal'}
                  Fontweight={'700'}
                  Fontsize={30}
                  txtAlign={'left'}
                  lh={40}
                  Heading={'Account'}
                  // Color={COLORS.primary}
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
                                  message: 'Something Went Wrong',
                                  type: 'danger',
                                  color: 'white',
                                });
                              }
                            })
                            .catch(err => {
                              showMessage({
                                message: 'Something Went Wrong',
                                type: 'danger',
                                color: 'white',
                              });
                              console.log('err', err);
                              setLoader(false);
                            });
                        } catch (err) {
                          setLoader(false);
                          showMessage({
                            message: 'Something Went Wrong',
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
                    btnText={'Sign UP With Google'}
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
                        var data = new FormData();
                        data.append(
                          'username',
                          `${res.user._user.displayName}`,
                        );
                        data.append('email', `${res.user._user.email}`);
                        data.append('usertype', `fb`);
                        data.append('roletype', `public`);
                        data.append('phone', `${res.user._user.phoneNumber}`);

                        // data.append('pic', {
                        //   uri: '',
                        //   type: 'image/jpeg',
                        //   name: 'photo.jpg',
                        // });

                        var requestOptions = {
                          method: 'post',
                          // body: data,
                          headers: {
                            'Cache-Control': 'no-cache',
                          },
                          data: data,
                          url: `${BASE_URL}/signup.php`,
                        };

                        try {
                          setLoader(true);
                          const pushData = await axios(requestOptions)
                            .then(async response => {
                              setLoader(false);
                              console.log('res', typeof response.data);
                              console.log('res', response.data);

                              if (response.data[0]?.status == 'true') {
                                setLoader(false);
                                navigation.navigate('googleSignIn');
                                //for async storage and redux
                                const v = {
                                  name: response.data[0].data.username
                                    ? response.data[0].data.username
                                    : 'Aamir',
                                  phoneNumber:
                                    response.data[0].data.phoneNumber,
                                  profile_pic:
                                    response.data[0].data.profile_pic,
                                  email: response.data[0].data.email,
                                  role: response.data[0].data.role
                                    ? response.data[0].data.role
                                    : 2,
                                  type: 'fb',
                                  userId: response.data[0].data.user_id,
                                };

                                setDataToAsync('token', JSON.stringify(v));
                                setDataToAsync('user', JSON.stringify(v));

                                getDataFromAsync('user').then(resp => {
                                  dispatch(
                                    userDataFromAsyncStorage(JSON.parse(resp)),
                                  );
                                });
                                //for async storage and redux
                                alert('Account Created Successfully');
                              } else if (response.data[0]?.status == 'false') {
                                setLoader(false);
                                showMessage({
                                  message: 'Something Went Wrong',
                                  type: 'danger',
                                  color: 'white',
                                });
                              }
                            })
                            .catch(err => {
                              showMessage({
                                message: 'Something Went Wrong',
                                type: 'danger',
                                color: 'white',
                              });
                              console.log('err', err);
                              setLoader(false);
                            });
                          // console.log(formdata);
                        } catch (err) {
                          setLoader(false);
                          showMessage({
                            message: 'Something Went Wrong',
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
                        // console.log('.catch of facebook:', err);
                        showMessage({
                          message: 'Something went wrong',
                          type: 'danger',
                          color: 'white',
                        });
                      })
                  }>
                  <BasicBtn
                    btnText={'Sign Up With Facebook'}
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
                  style={{ width: '100%' }}
                  onPress={() => {
                    navigation.navigate('phone');
                  }}
                >
                  <BasicBtn
                    btnText={'Sign Up With Phone'}
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
                <Heading
                  mt={0}
                  Stylefont={'normal'}
                  Fontweight={'700'}
                  txtAlign={'left'}
                  Heading={'OR'}
                />
                <Divider style={styles.divider} />
              </View>
              {/* <Formik
                initialValues={{
                  userName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                validateOnMount={true}
                onSubmit={values => {
                  // // setValues(values)
                  // value = values;
                  signUp(values);
                }}
                validationSchema={signupValidationSchema}>
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
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Input
                        style={{backgroundColor: COLORS.white}}
                        Onblur={handleBlur('userName')}
                        value={values.userName}
                        Onchange={handleChange('userName')}
                        outline={'#E8E6EA'}
                        width={'95%'}
                        top={'2%'}
                        mode={'outlined'}
                        label={'User Name'}
                      />
                    </View>
                    {errors.userName && touched.userName && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginTop: '2%',
                          marginLeft: '3%',
                        }}>
                        {errors.userName}
                      </Text>
                    )}

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
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Input
                        style={{backgroundColor: COLORS.white}}
                        Onblur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        Onchange={handleChange('confirmPassword')}
                        outline={'#E8E6EA'}
                        width={'95%'}
                        top={'2%'}
                        mode={'outlined'}
                        Pass={true}
                        label={'Confirm Password'}
                      />
                    </View>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginTop: '2%',
                          marginLeft: '3%',
                        }}>
                        {errors.confirmPassword}
                      </Text>
                    )}

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
                        btnText={'Sign up'}
                        fontStyle={'bold'}
                        fontSize={20}
                        bg={COLORS.sign_In_btn_bg_clr}
                        txtColor={COLORS.white}
                        press={handleSubmit}
                        txtwidth={'87%'}
                        radius={5}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: '2%',
                          fontWeight: 'bold',
                        }}>
                        {errMain && (
                          <InteractParagraph
                            mt={'2%'}
                            pAlign={'center'}
                            txtAlign={'center'}
                            p={errMain}
                            colors={'red'}
                          />
                        )}
                      </Text>
                    </View>
                  </>
                )}
              </Formik> */}

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
                  p={'Already have an account? '}
                  // bg={COLORS.white}
                />
                <ButtonComp
                  mode={'text'}
                  btnText={'Sign IN'}
                  txtColor={'#418EAD'}
                  fontSize={12}
                  p={0}
                  txtLeftMargin={0}
                  // bg={'black'}
                  // txtwidth={15}
                  press={() => navigation.navigate('googleSignIn')}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </SafeArea>
    </>
  );
}
