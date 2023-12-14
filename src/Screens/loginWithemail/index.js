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
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Loader from '../../Components/ReusableComponent/Loader';

export default function SignUpWithNumber({
  route: {
    params: {phoneNum},
  },
}) {
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    confirmPassword: yup
      .string()
      .min(8, ({min}) => `Password must be atleast ${min} characters`)
      .required(' Confirm password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
  });

  const [errMain, setErrMain] = useState('');
  const [loader, setLoader] = useState(false);

  let value;

  const signUp = () => {
    setLoader(true);
    console.log(value.confirmPassword, value.password);
    if (value.confirmPassword === value.password) {
      axios
        .post(`http://192.168.18.227:5000/login/signup`, {
          name: value.userName,
          email: value.email,
          phoneNumber: phoneNum,
          profile_pic: '',
          password: value.password,
          role: 2,
        })
        .then(async () => {
          setLoader(false);
          console.log('User account created & signed in!');
          try {
            const v = {
              email: value.email,
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
          } catch (e) {
            console.log(e);
          }
        })
        .catch(error => {
          setLoader(false);
          setErrMain(error);
        });
    } else {
      setLoader(false);
      setErrMain('password and comfirm password should be same');
    }
  };

  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  return (
    <>
      <SafeArea>
        {loader ? (
          <Loader />
        ) : (
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1}}>
              <View style={{marginTop: 20, marginHorizontal: 10}}>
                <Pressable onPress={() => navigation.navigate('phone')}>
                  <Ionicons
                    name={'chevron-back'}
                    style={{fontWeight: '1300'}}
                    color={isDark?.isdark ? COLORS.white : COLORS.dark}
                    size={35}
                  />
                </Pressable>
              </View>
              <View style={{marginHorizontal: '5%'}}>
                <Heading
                  mt={0}
                  Stylefont={'normal'}
                  Fontweight={'700'}
                  Fontsize={30}
                  txtAlign={'left'}
                  pt={30}
                  lh={40}
                  Heading={'Welcome'}
                  wd={'50%'}
                />
                <InteractParagraph
                  p={'Use your personal info to get registered '}
                  fw={'bold'}
                />
              </View>

              <Formik
                initialValues={{
                  userName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                validateOnMount={true}
                onSubmit={values => {
                  // setValues(values)
                  value = values;
                  signUp();
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
              </Formik>
            </View>
          </ScrollView>
        )}
      </SafeArea>
    </>
  );
}
