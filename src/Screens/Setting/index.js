import * as React from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import BasicBtn from '../../Components/ReusableComponent/ButtonBasic';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import RadioBtn from '../../Components/RadioButton';
import ThemeSwitch from '../../Components/SwitchButton';
import Header from '../../Components/ReusableComponent/Header';
import { removeUserDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';
import {
  removeDataToAsync,
  setDataToAsync,
} from '../../utils/getAndSetAsyncStorage';
import MiniHeader from '../../Components/MiniHeader';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
import { ModalView } from '../../Components/ReusableComponent/Modal';
import { deleteRequest } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';

const Setting = () => {
  const navigation = useNavigation();

  const AuthReducer = useSelector(state => state.AuthReducer);
  const isDark = useSelector(state => state.isDark);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [secondModalVisible, setSecondModalVisible] = React.useState(false);

  const userSignOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      LoginManager.logOut();
    } catch (error) {
      console.log(error);
    }
  };

  function deleteAccount() {
    setLoading(true);
    setSecondModalVisible(false);
    deleteRequest(
      `${BASE_URL}/users/delete-account/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log('result on delete', result);
        removeDataToAsync('token');
        removeDataToAsync('user');
        dispatch(removeUserDataFromAsyncStorage());
        userSignOut();
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('errorbbbbb 10', error);
      });
  }

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        txt={'Are you sure you want to logout?'}
        no={() => {
          setModalVisible(false);
        }}
        yes={() => {
          setModalVisible(false);
          dispatch(removeUserDataFromAsyncStorage());
          removeDataToAsync('token');
          removeDataToAsync('user');
        }}
      />

      <ModalView
        set={setSecondModalVisible}
        get={secondModalVisible}
        txt={'Are you sure you want to delete your account?'}
        no={() => {
          setSecondModalVisible(false);
        }}
        yes={deleteAccount}
      />

      <SafeArea>
        {loading ? (
          <Loader />
        ) : (
          <View style={{ flex: 1, marginHorizontal: '3%' }}>
            {/* <Header /> */}
            <MiniHeader />
            <View
              style={{
                // marginHorizontal: 30,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginBottom: 20,
                marginLeft: 5,
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderColor: '#7D7D7D',
                  borderWidth: 2,
                  borderRadius: 55,
                }}
                resizeMode={'stretch'}
                source={{
                  uri: `https://shareitstoryapp.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                }}
              // source={require('../../Assets/Images/profileIcon.png')}
              />
              <View style={{ alignSelf: 'center', marginLeft: 15, marginTop: 5 }}>
                <Heading
                  Heading={AuthReducer?.userData?.user?.profile?.first_name + ' ' + AuthReducer?.userData?.user?.profile?.last_name}
                  Fontsize={17}
                  color={COLORS.dark}
                  Fontweight={'bold'}
                // txtAlign={'center'}
                />
                <Heading
                  Heading={AuthReducer?.userData?.user?.email}
                  Fontsize={13}
                  color={COLORS.dark}
                // Fontweight={'bold'}
                // txtAlign={'center'}
                />
              </View>
            </View>
            <View></View>
            <Pressable onPress={() => navigation.navigate('editProfile')}>
              <View
                style={{
                  backgroundColor: '#404652',
                  height: 52,
                  width: '98%',
                  marginHorizontal: '2%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../Assets/Images/editprofiledrawer.png')}
                    style={{
                      width: 25,
                      height: 25,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginLeft: 15,
                    }}
                  />
                  <Heading
                    // mt={0}
                    ml={25}
                    Stylefont={'normal'}
                    Fontweight={'600'}
                    Fontsize={18}
                    Heading={'Edit Profile'}
                    Color={'#FFFFFF'}
                  />
                </View>
                <View style={{ margin: 15 }}>
                  <Ionicons
                    name={'chevron-forward-sharp'}
                    // style={{fontWeight: '1300'}}
                    color="#FFFFFF"
                    size={24}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('changePassword')}>
              <View
                style={{
                  backgroundColor: '#404652',
                  width: '98%',
                  marginHorizontal: '2%',
                  height: 52,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../Assets/Images/changepassword.png')}
                    style={{
                      width: 23,
                      height: 23,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginLeft: 16,
                    }}
                  />
                  <Heading
                    // mt={0}
                    ml={25}
                    Stylefont={'normal'}
                    Fontweight={'600'}
                    Fontsize={18}
                    Heading={'Change Password'}
                    Color={'#FFFFFF'}
                  />
                </View>
                <View style={{ margin: 15 }}>
                  <Ionicons
                    name={'chevron-forward-sharp'}
                    // style={{fontWeight: '1300'}}
                    color="#FFFFFF"
                    size={24}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('title10')}>
              <View
                style={{
                  backgroundColor: '#404652',
                  width: '98%',
                  marginHorizontal: '2%',
                  height: 52,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../Assets/Images/Notificationdrawer.png')}
                    style={{
                      width: 21,
                      height: 23.4,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginLeft: 19,
                    }}
                  />
                  <Heading
                    // mt={0}
                    ml={23}
                    Stylefont={'normal'}
                    Fontweight={'600'}
                    Fontsize={18}
                    Heading={'Notification'}
                    Color={'#FFFFFF'}
                  />
                </View>
                <View style={{ margin: 15 }}>
                  <Ionicons
                    name={'chevron-forward-sharp'}
                    // style={{fontWeight: '1300'}}
                    color="#FFFFFF"
                    size={24}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('bookmark')}>
              <View
                style={{
                  backgroundColor: '#404652',
                  width: '98%',
                  marginHorizontal: '2%',
                  height: 52,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../Assets/Images/bm2.png')}
                    style={{
                      width: 15,
                      height: 19,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginLeft: 23,
                    }}
                  />
                  <Heading
                    // mt={0}
                    ml={25}
                    Stylefont={'normal'}
                    Fontweight={'600'}
                    Fontsize={18}
                    Heading={'Bookmark'}
                    Color={'#FFFFFF'}
                  />
                </View>
                <View style={{ margin: 15 }}>
                  <Ionicons
                    name={'chevron-forward-sharp'}
                    // style={{fontWeight: '1300'}}
                    color="#FFFFFF"
                    size={24}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('contextPrizes')}>
              <View
                style={{
                  backgroundColor: '#404652',
                  width: '98%',
                  marginHorizontal: '2%',
                  height: 52,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../Assets/Images/coinsrawer.png')}
                    style={{
                      width: 30.4,
                      height: 30.4,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginLeft: 15,
                      marginTop: 7,
                    }}
                  />
                  <Heading
                    // mt={0}
                    ml={20}
                    Stylefont={'normal'}
                    Fontweight={'600'}
                    Fontsize={18}
                    Heading={'Coins'}
                    Color={'#FFFFFF'}
                  />
                </View>
                <View style={{ margin: 15 }}>
                  <Ionicons
                    name={'chevron-forward-sharp'}
                    // style={{fontWeight: '1300'}}
                    color="#FFFFFF"
                    size={24}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('paymentmethod')}>
              <View
                style={{
                  backgroundColor: '#404652',
                  width: '98%',
                  marginHorizontal: '2%',
                  height: 52,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../Assets/Images/paymentdrawer.png')}
                    style={{
                      width: 24,
                      height: 17,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginLeft: 17,
                    }}
                  />
                  <Heading
                    // mt={0}
                    ml={24}
                    Stylefont={'normal'}
                    Fontweight={'600'}
                    Fontsize={18}
                    Heading={'Payment Method'}
                    Color={'#FFFFFF'}
                  />
                </View>
                <View style={{ margin: 15 }}>
                  <Ionicons
                    name={'chevron-forward-sharp'}
                    // style={{fontWeight: '1300'}}
                    color="#FFFFFF"
                    size={24}
                  />
                </View>
              </View>
            </Pressable>

            {/* <View
            style={{
              backgroundColor: '#404652',
              width: 365,
              height: 52,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 6,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../Assets/Images/privacydrawer.png')}
                style={{
                  width: 20,
                  height: 24,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginLeft: 20,
                }}
              />
              <Heading
                // mt={0}
                ml={25}
                Stylefont={'normal'}
                Fontweight={'600'}
                Fontsize={18}
                Heading={'Privacy'}
                Color={'#FFFFFF'}
              />
            </View>
            <View style={{margin: 15}}>
              <Ionicons
                name={'chevron-forward-sharp'}
                // style={{fontWeight: '1300'}}
                color="#FFFFFF"
                size={24}
              />
            </View>
          </View> */}

            {/* <View
          style={{
            backgroundColor: '#404652',
            width: 365,
            height: 52,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 6,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../Assets/Images/legaldrawer.png')}
              style={{
                width: 24.4,
                height: 24.4,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginLeft: 20,
              }}
            />
            <Heading
              // mt={0}
              ml={22}
              Stylefont={'normal'}
              Fontweight={'600'}
              Fontsize={18}
              Heading={'Legal'}
              Color={'#FFFFFF'}
            />
          </View>
          <View style={{margin: 15}}>
            <Ionicons
              name={'chevron-forward-sharp'}
              // style={{fontWeight: '1300'}}
              color="#FFFFFF"
              size={24}
            />
          </View>
        </View> */}

            <Pressable onPress={() => {
              setSecondModalVisible(true);
            }}>
              <View
                style={{
                  backgroundColor: '#404652',
                  width: '98%',
                  marginHorizontal: '2%',
                  height: 52,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../Assets/Images/deletedrawer.png')}
                    style={{
                      width: 20,
                      height: 22.4,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginLeft: 21,
                    }}
                  />
                  <Heading
                    // mt={0}
                    ml={25}
                    Stylefont={'normal'}
                    Fontweight={'600'}
                    Fontsize={18}
                    Heading={'Delete Account'}
                    Color={'#FFFFFF'}
                  />
                </View>
                <View style={{ margin: 15 }}>
                  <Ionicons
                    name={'chevron-forward-sharp'}
                    // style={{fontWeight: '1300'}}
                    color="#FFFFFF"
                    size={24}
                  />
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}>
              <View
                style={{
                  backgroundColor: '#404652',
                  width: '98%',
                  marginHorizontal: '2%',
                  height: 52,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../Assets/Images/logoutdrawer.png')}
                    style={{
                      width: 27.4,
                      height: 27.4,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginLeft: 20,
                    }}
                  />
                  <Heading
                    // mt={0}
                    ml={20}
                    Stylefont={'normal'}
                    Fontweight={'600'}
                    Fontsize={18}
                    Heading={'Log Out'}
                    Color={'#FFFFFF'}
                  />
                </View>
                <View style={{ margin: 15 }}>
                  <Ionicons
                    name={'chevron-forward-sharp'}
                    // style={{fontWeight: '1300'}}
                    color="#FFFFFF"
                    size={24}
                  />
                </View>
              </View>
            </Pressable>
          </View>
        )}
      </SafeArea>
    </>
  );
};

export default Setting;
