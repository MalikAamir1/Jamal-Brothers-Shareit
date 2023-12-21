import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {BASE_URL} from '../../App/api';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {postRequest} from '../../App/fetch';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeArea from '../../Components/ReusableComponent/SafeArea';

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [valueEmail, onChangeTextEmail] = useState('');
  const [error, onChangeError] = useState('');

  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
  });

  const simpleLogin = value => {
    console.log('Values: ', value);
  };

  const Navigation = useNavigation();

  function isValidEmail(valueEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(valueEmail);
  }

  function ForgetPassword() {
    if (valueEmail.trim() === '') {
      onChangeError('Email Id should not be Empty');
    } else if (!isValidEmail(valueEmail)) {
      onChangeError('Invalid email format');
    } else {
      var formdataEmail = new FormData();
      formdataEmail.append('email', valueEmail);

      setLoading(true);

      //Email Check Start
      postRequest(`${BASE_URL}/users/verify-email-exists/`, formdataEmail)
        .then(result => {
          // setLoading(false);
          console.log('Result: ', result.success);

          if (result.success) {
            setLoading(false);

            var formdata = new FormData();
            formdata.append('email', valueEmail);

            setLoading(true);

            postRequest(`${BASE_URL}/users/registration/resend-otp/`, formdata)
              .then(result => {
                console.log(result);
                setLoading(false);
                if (result.success) {
                  const data = {
                    valueEmail: valueEmail,
                  };
                  Navigation.navigate('OtpScreen', data);
                }
              })
              .catch(error => {
                console.log('error', error);
                Alert.alert('Error', 'Something went wrong please try again');
                setLoading(false);
              });
          } else {
            setLoading(false);
            onChangeError("Account Doesn't Exists");
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
          onChangeTextEmail('');
        });
      onChangeError('');
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
            <SafeArea>
              {loading ? (
                <Loader />
              ) : (
                <ImageBackground
                  // source={require('../../Assets/Images/bg.png')}
                  resizeMode="cover"
                  style={{flex: 1}}>
                  <ScrollView
                    contentContainerStyle={{flexGrow: 1, marginTop: '10%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: '8%',
                        marginTop: Platform.OS === 'ios' ? '12%' : 10,
                        marginBottom: Platform.OS === 'ios' ? '8%' : '8%',
                      }}>
                      <Pressable
                        onPress={() => {
                          Navigation.goBack();
                        }}>
                        <AntDesign
                          name={'leftcircle'}
                          size={30}
                          color={'#ffffff'}
                        />
                      </Pressable>
                    </View>
                    <View style={{alignItems: 'center'}}></View>
                    <View
                      style={{
                        flexGrow: 1,
                        marginHorizontal: '5%',
                        padding: 15,
                        borderRadius: 15,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginHorizontal: 35,
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: '#FFFFFF',
                          }}>
                          Forgot Password
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          width: '55%',
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#FFFFFF',
                            textAlign: 'center',
                          }}>
                          Please enter your email to reset your password
                        </Text>
                      </View>

                      <View>
                        <View style={{marginBottom: '1%', marginTop: '14%'}}>
                          <Input
                            title={'Email ID'}
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
                                color: 'red',
                                marginTop: 5,
                                marginBottom: 5,
                                marginLeft: 15,
                              }}>
                              {errors.email}
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

                      {/* <View
                        style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          flexDirection: 'row',
                          marginVertical: '4%',
                        }}>
                        <ButtonComp
                          btnwidth={'97%'}
                          btnHeight={56}
                          btnText={'Continue'}
                          justify={'center'}
                          align={'center'}
                          fontSize={16}
                          radius={15}
                          txtwidth={'100%'}
                          txtColor={COLORS.white}
                          color={isValid ? COLORS.primary : COLORS.border_color}
                          press={() => {
                            ForgetPassword();
                          }}
                        />
                      </View> */}
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            // Call the function with the data to be sent
                            ForgetPassword();
                            // onDataSubmit(comment, rating, like);
                            // yes();
                            // setComment('');
                            // setRating(undefined);
                            // setLike(false); // Reset the like state after submitting
                            // Reset the rating after submitting
                          }}
                          style={{
                            flex: 1,
                            width: '94%',
                            marginHorizontal: '3%',
                            height: 50,
                            backgroundColor: '#7ACCCA',
                            // borderWidth: 1,
                            // borderColor: '#FFFFFF',
                            borderRadius: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginRight: 5,
                            // marginLeft: 'auto',
                            marginTop: 30,
                            marginBottom: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: '#373B44',
                            }}>
                            Continue
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </ImageBackground>
              )}
            </SafeArea>
          </>
        )}
      </Formik>
      {/* </SafeArea> */}
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 8,
    flexDirection: 'row',
  },
  colorSection: {
    flex: 1,
  },
});
