import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import avt from '../../Assets/Images/profile/dummyImg.png';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BottomSheet from '../../Components/ReusableComponent/BottomSheet';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../../Components/ReusableComponent/Loader';
import * as yup from 'yup';
import { Formik } from 'formik';
import Input from '../../Components/ReusableComponent/Input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPro } from '../../redux/reducers/profile';
import { showMessage, hideMessage } from 'react-native-flash-message';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../utils/getAndSetAsyncStorage';
import { userDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';
import { postRequest } from '../../utils/fetch';
import { set } from 'immer/dist/internal';
import MiniHeader from '../../Components/MiniHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  getRequestWithCookie,
  postRequestWithTokenAndCookie,
} from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import RBSheet from 'react-native-raw-bottom-sheet';
import Header from '../../Components/Header';

const EditProfile = () => {
  const Navigation = useNavigation();
  const rbSheetRef = useRef();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [dataFromDb, setDataFromDb] = useState({});
  // console.log('userAuth at editprofile', AuthReducer);
  // const state = useSelector(state => state);
  // const {userAuth} = state;
  const navigation = useNavigation();
  // const reducerData = useSelector(state => state);
  const [banner, setBanner] = useState();
  const [localImageStatus, setLocalImageStatus] = useState(false);
  const [valueFirstName, onChangeFirstName] = useState('');
  const [valueLastName, onChangeLastName] = useState(''); 
  const [valuePhoneNumber, onChangePhoneNumber] = useState('');
  const [valueAddress, onChangeAddress] = useState('');
  const [error, onChangeError] = useState('');
  const [profileImage, onChangeProfileImage] = useState('');
  const [loading, setLoading] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let signInSchema = yup.object().shape({
    username: yup.string(),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    email: yup.string().email('Please enter valid email'),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (AuthReducer?.userData?.user) {
      setLoading(true);
      onChangeFirstName(AuthReducer?.userData?.user?.profile?.first_name);
      onChangeLastName(AuthReducer?.userData?.user?.profile?.last_name);
      onChangePhoneNumber(AuthReducer?.userData?.user?.profile?.telephone);
      onChangeAddress(AuthReducer?.userData?.user?.profile?.street);
      onChangeProfileImage(
        '`http://23.26.137.178${AuthReducer?.userData?.user?.profile?.profile_pic`',
      );
      setLoading(false);
    }
  }, [dataFromDb]);

  const openGallery = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchImageLibrary(option, res => {
      console.log(res);
      if (res.assets) {
        // setBanner(res.assets[0].uri);
        console.log('library Image');
        console.log(res.assets[0].uri);
        onChangeProfileImage(res.assets[0].uri);
        UpploadProfileImage(res.assets[0].uri);
        rbSheetRef.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const openCamera = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchCamera(option, res => {
      console.log(res);
      if (res.assets) {
        // setBanner(res.assets[0].uri);
        console.log('lCamera Img');
        console.log(res.assets[0].uri);
        onChangeProfileImage(res.assets[0].uri);
        UpploadProfileImage(res.assets[0].uri);
        rbSheetRef.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };
  console.log('Image Uri:', banner);
  // ============New User Auth Data from New Reducer===================
  // console.log('Data From reducer in Edit Profile', userAuth?.userData);
  // console.log('profile pic Edit Profile', userAuth?.userData?.profile_pic);
  // ===================================================================
  let obj;

  const validateFields = (
    // valueFullName,
    valueFirstName,
    valueLastName,
    // valueEmail,
    valuePhoneNumber,
    valueAddress,
    // profileImage,
  ) => {
    // Validation for Full Name
    if (!valueFirstName.trim()) {
      onChangeError('First Name Should not be empty.');
      return false;
    }

    if (!valueLastName.trim()) {
      onChangeError('Last Name Should not be empty.');
      return false;
    }

    // Validation for Email
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!valueEmail.trim()) {
    //   onChangeError('Email is empty.');
    //   return false;
    // } else if (!emailPattern.test(valueEmail)) {
    //   onChangeError('Invalid Email format.');
    //   return false;
    // }

    // Validation for Phone Number
    const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!valuePhoneNumber.trim()) {
      onChangeError('Phone Number Should not be empty.');
      return false;
    } else if (valuePhoneNumber.length != 10) {
      onChangeError('Invalid phone number.');
      return false;
    }
    // } else if (!phoneNumberPattern.test(valuePhoneNumber)) {
    //   onChangeError('Invalid Phone Number format.');
    //   return false;
    // }

    // Validation for Address
    if (!valueAddress.trim()) {
      onChangeError('Address Should not be empty.');
      return false;
    }

    // Validation for Profile Image
    if (!profileImage) {
      onChangeError('Profile Image Should be uploaded.');
      return false;
    }

    // All fields are valid
    return true;
  };

  function EditProfile() {
    const isValid = validateFields(
      // valueFullName,
      valueFirstName,
      valueLastName,
      // valueEmail,
      valuePhoneNumber,
      valueAddress,
      // profileImage,
    );
    console.log('isValid: ', isValid);
    if (isValid) {
      onChangeError('');

      // console.log('values on edituserprofile', values);
      var formdataProfile = new FormData();

      formdataProfile.append('email', AuthReducer?.userData?.user?.email);
      // formdataProfile.append('display_name', valueFullName);
      formdataProfile.append('first_name', valueFirstName);
      formdataProfile.append('last_name', valueLastName);
      formdataProfile.append('telephone', valuePhoneNumber);
      formdataProfile.append('street', valueAddress);
      setLoading(true);

      postRequestWithTokenAndCookie(
        `${BASE_URL}/users/update-user-profile/`,
        formdataProfile,
        AuthReducer.userData.token,
      )
        .then(result => {
          console.log(
            'result of image',
            AuthReducer?.userData?.user?.profile?.profile_pic,
          );

          getRequestWithCookie(
            `${BASE_URL}/users/user-profile/`,
            AuthReducer.userData.token,
          )
            .then(result => {
              console.log(result);
              setLoading(false);

              setDataToAsync('user', JSON.stringify(result));

              getDataFromAsync('user')
                .then(res => {
                  dispatch(userDataFromAsyncStorage(JSON.parse(res)));
                })
                .catch(err => {
                  console.log('Error From getting from local storage: ', err);
                });
            })
            .catch(error => {
              console.log('error', error);
              setLoading(false);
            });
          setLoading(false);
          Navigation.goBack();
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
      onChangeError('');
    }
  }

  function UpploadProfileImage(imgUrl) {
    console.log('imgUrl: ', imgUrl);

    var formdata = new FormData();
    formdata.append(`media_file`, {
      uri: imgUrl,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formdata.append('title', 'big data');
    formdata.append('is_active', 'true');
    formdata.append('file_type', 'Profile Pictures');
    formdata.append('description', 'profile pictures details ...');

    console.log('formdata: ', formdata);

    setLoading(true);

    postRequestWithTokenAndCookie(
      `${BASE_URL}/users/upload/media-file/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log(result);

        setLoading(true);
        getRequestWithCookie(
          `${BASE_URL}/users/user-profile/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            console.log(result);
            setLoading(false);

            setDataToAsync('user', JSON.stringify(result));

            getDataFromAsync('user')
              .then(res => {
                dispatch(userDataFromAsyncStorage(JSON.parse(res)));
              })
              .catch(err => {
                console.log('Error From getting from local storage: ', err);
              });
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
        Alert.alert('Error', 'Something went wrong please try again');
      });
  }

  return (
    <>
      <RBSheet
        ref={rbSheetRef}
        height={100}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
          },
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            margin: '8%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                width: 45,
                height: 45,
                backgroundColor: '#7ACCCA',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={openCamera}>
              <Icons name="photo-camera" color={'#fff'} size={30} />
            </Pressable>
            <InteractParagraph p={'Camera'} fw={500} colors={'#7ACCCA'} />
          </View>
          <View
            style={{
              marginLeft: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                width: 45,
                height: 45,
                backgroundColor: '#7ACCCA',
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={openGallery}>
              <Icons name="photo-library" color={'#fff'} size={30} />
            </Pressable>
            <InteractParagraph p={' Gallery'} fw={500} colors={'#7ACCCA'} />
          </View>
        </View>
      </RBSheet>

      <SafeArea>
        {loading ? (
          <ImageBackground
            source={require('../../Assets/Images/newimages/bgImg2.png')}
            resizeMode="cover"
            style={{ flex: 1 }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <ActivityIndicator size="large" color="#7ACCCA" />
            </View>
          </ImageBackground>
        ) : (
          <View style={{ flex: 1, flexGrow: 1 }}>
            <View style={{ marginHorizontal: '5%' }}>
              <View style={{ flexDirection: 'column', marginTop: '2%', marginBottom: '2%' }}>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    username: AuthReducer.userData?.user?.profile?.display_name,
                    email: AuthReducer?.userData?.user?.email,
                    phoneNumber:
                      AuthReducer?.userData?.user?.profile?.telephone,
                  }}
                  validateOnMount={true}
                  onSubmit={values => {
                    editUserProfile(values);
                    console.log('values:', values);
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
                      <KeyboardAvoidingView
                      // style={{flex: 1}}
                      // behavior={Platform.OS === 'ios' ? 'padding' : null}
                      // keyboardVerticalOffset={65}
                      >
                        <ScrollView showsVerticalScrollIndicator={false}
                        >
                          <View style={{ marginVertical: 12 }}>
                            {/* <Header cen={'Edit Profile'} /> */}
                            <Header title={'Edit Profile'} />
                          </View>
                          <View
                            style={{
                              alignContent: 'center',
                              alignSelf: 'center',
                            }}>

                            <View
                              style={{
                                alignSelf: 'center',
                                marginTop: '8%',
                                marginBottom: '8%',
                              }}>
                              <Image
                                source={{
                                  uri: `https://shareitstoryapp.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                                }}
                                style={{
                                  width: 130,
                                  height: 130,
                                  borderWidth: 4,
                                  borderColor: '#7D7D7D',
                                  borderRadius: 75,
                                }}
                                resizeMode={'cover'}
                              />
                              <Pressable
                                onPress={() => {
                                  console.log('log');
                                  // rbSheetRef.open();
                                  rbSheetRef.current.open();
                                }}
                                style={{
                                  position: 'absolute',
                                  alignSelf: 'flex-end',
                                }}>
                                <Image
                                  source={require('../../Assets/Images/cameraicon.png')}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    position: 'absolute',
                                    alignSelf: 'flex-end',
                                    marginTop: 90,
                                  }}
                                />
                              </Pressable>
                            </View>
                          </View>
                          <View>
                            <View
                              style={{
                                flexDirection: 'column',
                                marginTop: '2%',
                              }}>
                              <View style={{ marginVertical: '4%' }}>
                                <Input
                                  title={'First Name'}
                                  urlImg={require('../../Assets/Images/nameprofile.png')}
                                  placeholder={'Enter first name'}
                                  value={valueFirstName}
                                  // value={dataFromOtpScreenOfSignUp.email}
                                  onChangeText={onChangeFirstName}
                                />
                                {errors.fullName && touched.fullName && (
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: 'red',
                                      marginTop: 5,
                                      marginBottom: 5,
                                      marginLeft: 15,
                                    }}>
                                    {errors.fullName}
                                  </Text>
                                )}
                              </View>

                              <View style={{ marginVertical: '4%' }}>
                                <Input
                                  title={'Last Name'}
                                  urlImg={require('../../Assets/Images/nameprofile.png')}
                                  placeholder={'Enter last name'}
                                  value={valueLastName}
                                  // value={dataFromOtpScreenOfSignUp.email}
                                  onChangeText={onChangeLastName}
                                />
                                {errors.fullName && touched.fullName && (
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: 'red',
                                      marginTop: 5,
                                      marginBottom: 5,
                                      marginLeft: 15,
                                    }}>
                                    {errors.fullName}
                                  </Text>
                                )}
                              </View>

                              <View style={{ marginVertical: '4%' }}>
                                <Input
                                  title={'Email'}
                                  urlImg={require('../../Assets/Images/emailcreate.png')}
                                  // placeholder={dataFromOtpScreenOfSignUp.Email}
                                  pass={false}
                                  // value={valueEmail}
                                  // onChangeText={onChangeEmail}
                                  value={AuthReducer?.userData?.user?.email}
                                  disabled={true}
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

                              <View style={{ marginVertical: '4%' }}>
                                <Input
                                  title={'Phone Number'}
                                  urlImg={require('../../Assets/Images/phone.png')}
                                  placeholder={'123 456 7890'}
                                  pass={false}
                                  value={valuePhoneNumber}
                                  onChangeText={onChangePhoneNumber}
                                  keyboardType={'numeric'}
                                />
                                {errors.phoneNumber && touched.phoneNumber && (
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: 'red',
                                      marginTop: 5,
                                      marginBottom: 5,
                                      marginLeft: 15,
                                    }}>
                                    {errors.phoneNumber}
                                  </Text>
                                )}
                              </View>

                              <View style={{ marginVertical: '4%' }}>
                                <Input
                                  title={'Adress'}
                                  urlImg={require('../../Assets/Images/address.png')}
                                  placeholder={'4010 Cliffside Drive'}
                                  pass={false}
                                  value={valueAddress}
                                  onChangeText={onChangeAddress}
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

                              {/* <View style={{height: 50, marginTop: 25}}>
                            <ButtonComp
                              btnHeight={45}
                              mode={'contained'}
                              justify={'center'}
                              align={'center'}
                              btnText={'Update'}
                              fontStyle={'bold'}
                              fontSize={20}
                              bg={COLORS.primary}
                              txtColor={COLORS.white}
                              txtwidth={'87%'}
                              radius={15}
                              press={handleSubmit}
                            />
                          </View> */}
                           <View>
                                {error && (
                                  <>
                                    <InteractParagraph
                                      txtAlign={'center'}
                                      p={error}
                                      // mv={4}
                                      colors={'#FA2D2D'}
                                    />
                                  </>
                                )}
                              </View>
                              <View>
                                <TouchableOpacity
                                  onPress={() => {
                                    // Call the function with the data to be sent
                                    EditProfile();
                                    // onDataSubmit(comment, rating, like);
                                    // yes();
                                    // setComment('');
                                    // setRating(undefined);
                                    // setLike(false); // Reset the like state after submitting
                                    // Reset the rating after submitting
                                  }}
                                  style={{
                                    flex: 1,
                                    width: '76%',
                                    marginHorizontal: '12%',
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
                                    Update
                                  </Text>
                                </TouchableOpacity>
                              </View>
                             
                            </View>
                          </View>
                        </ScrollView>
                      </KeyboardAvoidingView>
                    </>
                  )}
                </Formik>
              </View>
            </View>
          </View>
        )}
      </SafeArea>

    </>
  );
};

export default EditProfile;
