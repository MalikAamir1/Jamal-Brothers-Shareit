import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {BASE_URL} from '../../App/api';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {postRequest} from '../../App/fetch';
import SafeArea from '../../Components/ReusableComponent/SafeArea';

export const SignUp = () => {
  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required '),
  });

  const simpleLogin = value => {
    console.log('Values: ', value);
  };

  const Navigation = useNavigation();

  const [valueEmail, onChangeTextEmail] = useState('');
  const [valuePass, onChangeTextPass] = useState('');
  const [valueConfirmPass, onChangeTextConfirmPass] = useState('');
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function hasValidPassword(password) {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
      return false;
    }

    // Check for at least one special character (non-alphanumeric)
    if (!/[^A-Za-z0-9]/.test(password)) {
      return false;
    }

    return true;
  }

  function onPressSignUp() {
    if (valueEmail !== '') {
      if (!isValidEmail(valueEmail)) {
        onChangeError('Invalid email format');
      } else if (valuePass !== '') {
        if (valueConfirmPass !== '') {
          if (valuePass === valueConfirmPass) {
            if (hasValidPassword(valuePass)) {
              console.log('valueEmail: ', valueEmail);
              console.log('valuePass: ', valuePass);
              console.log('valueConfirmPass: ', valueConfirmPass);
              console.log('Match');

              // Signup Backend Start

              var formdataEmail = new FormData();

              formdataEmail.append('email', valueEmail);

              setLoading(true);

              //Email Check Start

              postRequest(
                `${BASE_URL}/users/verify-email-exists/`,
                formdataEmail,
              )
                .then(result => {
                  // setLoading(false);
                  console.log('Result: ', result.success);

                  if (result.success) {
                    Alert.alert('Account Exists', result.message);
                    setLoading(false);
                    onChangeTextEmail('');
                    onChangeTextPass('');
                    onChangeTextConfirmPass('');
                  } else {
                    setLoading(false);
                    const data = {
                      valueEmail: valueEmail,
                      valuePass: valuePass,
                      screenName: 'ProfileCreated',
                    };
                    onChangeTextEmail('');
                    onChangeTextPass('');
                    onChangeTextConfirmPass('');
                    Navigation.navigate('TermCondition', data);
                  }
                })
                .catch(error => {
                  setLoading(false);
                  console.log('error', error);
                  onChangeTextEmail('');
                  onChangeTextPass('');
                  onChangeTextConfirmPass('');
                });
              //Email Check End

              // Signup Backend End

              onChangeError('');
            } else {
              console.log('Not Match');
              onChangeError(
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
              );
            }
          } else {
            console.log('Not Match');
            onChangeError('Password and confirm Password do not match');
          }
        } else {
          onChangeError('Confirm Password should not be Empty');
        }
      } else {
        onChangeError('Password should not be Empty');
      }
    } else {
      onChangeError('Email Id should not be Empty');
    }
  }

  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        validateOnMount={true}
        onSubmit={values => {
          simpleLogin(values);
        }}
        validationSchema={loginValidationScheme}>
        {({handleChange, handleBlur, r, values, touched, errors, isValid}) => (
          <>
            <SafeArea>
              {loading ? (
                <Loader />
              ) : (
                <ImageBackground
                  // source={require('../../Assets/Images/darkmodebgimg/bglmg.png')}
                  resizeMode="cover"
                  style={{flex: 1}}>
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      marginTop: Platform.OS === 'ios' ? '30%' : '20%',
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <Image
                        // source={require('../../Assets/Images/logIcon.png')}
                        source={require('../../Assets/Images/logo/logo.png')}
                        style={{width: 190, height: 190}}
                        resizeMode={'contain'}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        margin: '5%',
                        padding: 15,
                        borderRadius: 15,
                      }}>
                      <View>
                        <View style={{marginBottom: '2%', marginTop: '5%'}}>
                          <Input
                            title={'Email'}
                            urlImg={require('../../Assets/Images/emaillogin.png')}
                            placeholder={'John Doe@domain.com'}
                            pass={false}
                            value={valueEmail}
                            onChangeText={onChangeTextEmail}
                          />
                          {errors.email && touched.email && (
                            <Text
                              style={{
                                fontSize: 12,
                                color: 'pink',
                                marginTop: 5,
                                marginBottom: 5,
                                marginLeft: 15,
                              }}>
                              {errors.email}
                            </Text>
                          )}
                        </View>

                        <View style={{marginVertical: '2%'}}>
                          <Input
                            title={'Password'}
                            urlImg={require('../../Assets/Images/loginpassword.png')}
                            placeholder={'************'}
                            pass={'true'}
                            value={valuePass}
                            onChangeText={onChangeTextPass}
                          />
                          {errors.password && touched.password && (
                            <Text
                              style={{
                                fontSize: 12,
                                color: 'red',
                                marginTop: 5,
                                marginBottom: 5,
                                marginLeft: 15,
                              }}>
                              {errors.password}
                            </Text>
                          )}
                        </View>

                        <View style={{marginVertical: '2%'}}>
                          <Input
                            title={'Confirm Password'}
                            urlImg={require('../../Assets/Images/loginpassword.png')}
                            placeholder={'************'}
                            pass={'true'}
                            value={valueConfirmPass}
                            onChangeText={onChangeTextConfirmPass}
                          />
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'red',
                                  marginTop: 5,
                                  marginBottom: 5,
                                  marginLeft: 15,
                                }}>
                                {errors.confirmPassword}
                              </Text>
                            )}
                        </View>
                      </View>

                      <View>
                        {error && (
                          <>
                            <InteractParagraph
                              p={error}
                              mv={4}
                              colors={'#FA2D2D'}
                            />
                          </>
                        )}
                      </View>
                      {/* 
                      <View
                        style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          flexDirection: 'row',
                          marginVertical: '4%',
                        }}>
                        <ButtonComp
                          // btnwidth={'97%'}
                          btnHeight={56}
                          btnText={'Sign Up'}
                          justify={'center'}
                          align={'center'}
                          fontSize={16}
                          radius={15}
                          txtwidth={'100%'}
                          txtColor={COLORS.white}
                          press={() => {
                            // Navigation.navigate('TermCondition');
                            onPressSignUp();
                          }}
                        />
                      </View> */}

                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            // Call the function with the data to be sent
                            onPressSignUp();
                            // onDataSubmit(comment, rating, like);
                            // yes();
                            // setComment('');
                            // setRating(undefined);
                            // setLike(false); // Reset the like state after submitting
                            // Reset the rating after submitting
                          }}
                          style={{
                            flex: 1,
                            width: '90%',
                            marginHorizontal: '5%',
                            height: 50,
                            backgroundColor: '#7ACCCA',
                            // borderWidth: 1,
                            // borderColor: '#FFFFFF',
                            borderRadius: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginRight: 5,
                            // marginLeft: 'auto',
                            marginTop: 60,
                            marginBottom: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: '#373B44',
                            }}>
                            Login
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          alignContent: 'center',
                          alignSelf: 'center',
                          alignItems: 'center',
                        }}>
                        <Heading
                          Fontsize={15}
                          as={'center'}
                          Heading={'Already have an account?'}
                          Color={'#D0CBBB'}
                        />

                        <Button
                          textColor={'black'}
                          style={{marginLeft: -8}}
                          onPress={() => Navigation.navigate('login')}>
                          <Text
                            style={{
                              textDecorationLine: 'underline',
                              color: '#7ACCCA',
                              fontWeight: 'bold',
                            }}>
                            Sign In
                          </Text>
                        </Button>
                      </View>
                    </View>
                  </ScrollView>
                </ImageBackground>
              )}
            </SafeArea>
          </>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 4,
    flexDirection: 'row',
  },
  colorSection: {
    flex: 1,
  },
});
