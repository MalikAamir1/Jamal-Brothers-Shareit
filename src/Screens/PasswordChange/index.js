import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
// import SafeArea from '../../Components/ReusableComponent/Safearea';
import {Loader} from '../../Components/ReusableComponent/Loader';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {BASE_URL} from '../../App/api';
import {postRequestWithToken} from '../../App/fetch';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const PasswordChange = ({route}) => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valuePass, onChangeTextPass] = useState('');
  const [valueConfirmPass, onChangeTextConfirmPass] = useState('');
  const [error, onChangeError] = useState('');

  let loginValidationScheme = yup.object().shape({
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required '),
  });

  const simpleLogin = value => {
    console.log('Values: ', value);
  };
  const Navigation = useNavigation();
  // console.log('route.params at password change', route.params);
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

  function updatePassword() {
    if (valuePass !== '') {
      if (valueConfirmPass !== '') {
        if (valuePass === valueConfirmPass) {
          if (hasValidPassword(valuePass)) {
            console.log('valuePass: ', valuePass);
            console.log('valueConfirmPass: ', valueConfirmPass);
            console.log('Match');

            // var formdata = new FormData();
            var formdataUpdatePasswrod = new FormData();
            formdataUpdatePasswrod.append('new_password', valuePass);

            setLoading(true);

            postRequestWithToken(
              `${BASE_URL}/users/update-password/`,
              formdataUpdatePasswrod,
              route.params,
            )
              .then(result => {
                console.log(result);
                Alert.alert('Success', 'Password updated successfully');
                setLoading(false);
                Navigation.navigate('login');
              })
              .catch(error => {
                console.log('error', error);
                setLoading(false);
              });
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
  }
  return (
    <>
      {/* <SafeArea> */}
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
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                  {/* <ImageBackground
                  source={require('../../Assets/Images/bg.png')}
                  resizeMode="cover"
                  style={{flex: 1}}> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: '8%',
                      marginTop: Platform.OS === 'ios' ? '18%' : 30,
                    }}>
                    <View
                      style={{
                        alignSelf: 'center',
                        backgroundColor: '#ffffff',
                        borderRadius: 10,
                      }}>
                      <Pressable
                        onPress={() => {
                          Navigation.goBack();
                        }}>
                        {/* <Image
                        source={require('../../Assets/Images/back.png')}
                        style={{
                          width: 30,
                          height: 30,
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}
                      /> */}

                        <Ionicons
                          name="chevron-back"
                          size={30}
                          color={'black'}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      // justifyContent: 'space-between',
                      flexGrow: 1,
                      marginHorizontal: '5%',
                      padding: 15,
                      borderRadius: 15,
                      // marginTop: '15%',
                    }}>
                    <View style={{marginVertical: '5%'}}>
                      <Heading
                        Stylefont={'normal'}
                        Fontweight={'bold'}
                        Fontsize={34}
                        txtAlign={'center'}
                        p={10}
                        lh={40}
                        Heading={'Enter New Password'}
                        Color={'#ffffff'}
                      />
                    </View>
                    <View style={{marginBottom: '8%'}}>
                      <Heading
                        Fontsize={15}
                        txtAlign={'center'}
                        Heading={'Please enter your new password'}
                        Color={'#ffffff'}
                      />
                    </View>
                    <View style={{marginTop: 10}}>
                      <View>
                        <Input
                          title={'New Password'}
                          urlImg={require('../../Assets/Images/loginpassword.png')}
                          placeholder={'************0'}
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

                      <View style={{marginTop: '8%', marginBottom: '5%'}}>
                        <Input
                          title={'Confirm New Password'}
                          urlImg={require('../../Assets/Images/loginpassword.png')}
                          placeholder={'************0'}
                          pass={'true'}
                          value={valueConfirmPass}
                          onChangeText={onChangeTextConfirmPass}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
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

                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          // Call the function with the data to be sent
                          updatePassword();
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
                          marginTop: 30,
                          marginBottom: 50,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#373B44',
                          }}>
                          Reset
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* </ImageBackground> */}
                </ScrollView>
              )}
            </SafeArea>
          </>
        )}
      </Formik>
      {/* </SafeArea> */}
    </>
  );
};
