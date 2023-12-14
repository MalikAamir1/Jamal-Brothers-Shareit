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
import MiniHeader from '../../Components/MiniHeader';

export const ChangePassword = ({route}) => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newConfirmPass, setNewConfirmPass] = useState('');

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
    if (oldPass !== '') {
      if (newConfirmPass !== '') {
        if (newPass === newConfirmPass) {
          if (hasValidPassword(newConfirmPass)) {
            console.log('valuePass: ', newPass);
            console.log('valueConfirmPass: ', newConfirmPass);
            console.log('Match');

            var formdataUpdatePasswrod = new FormData();
            formdataUpdatePasswrod.append('new_password', newConfirmPass);

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
                Navigation.navigate('bottombar');
              })
              .catch(error => {
                console.log('error', error);
                setLoading(false);
              });
          } else {
            console.log('Not Match');
            alert(
              'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
            );
          }
        } else {
          console.log('Not Match');
          alert('Password and confirm Password do not match');
        }
      } else {
        alert('Confirm Password should not be Empty');
      }
    } else {
      alert('Password should not be Empty');
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
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: '3%',
                      marginTop: Platform.OS === 'ios' ? '2%' : 30,
                    }}>
                    <MiniHeader title={'Change Password'} />
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
                    <View style={{marginTop: '8%', marginBottom: '5%'}}>
                      <View>
                        <Input
                          title={'Current Password'}
                          urlImg={require('../../Assets/Images/loginpassword.png')}
                          placeholder={'************0'}
                          pass={'true'}
                          value={oldPass}
                          onChangeText={setOldPass}
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

                      <View style={{marginTop: '8%'}}>
                        <Input
                          title={'New Password'}
                          urlImg={require('../../Assets/Images/loginpassword.png')}
                          placeholder={'************0'}
                          pass={'true'}
                          value={newPass}
                          onChangeText={setNewPass}
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
                          value={newConfirmPass}
                          onChangeText={setNewConfirmPass}
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
                            // fontWeight: 'bold',
                            color: 'black',
                          }}>
                          Change Password
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
