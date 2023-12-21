import * as React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import BasicBtn from '../../Components/ReusableComponent/ButtonBasic';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import RadioBtn from '../../Components/RadioButton';
import ThemeSwitch from '../../Components/SwitchButton';
import Header from '../../Components/ReusableComponent/Header';
import logo from '../../Assets/Images/logo/logo.png';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import style from '../logoutBefore/style';
import MiniHeader from '../../Components/MiniHeader';

const AccountSetting = () => {
  const HEIGHT = Dimensions.get('window').height;

  const LIST_WIDTH = Dimensions.get('window').width;
  const LIST_HEIGHT = Dimensions.get('window').height;
  const LIST_ITEM_WIDTH = Math.round(LIST_WIDTH * 0.3);
  const LIST_ITEM_HEIGHT = Math.round(LIST_HEIGHT / 4);
  const navigation = useNavigation();

  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  return (
    <SafeArea>
      <View style={{flex: 1, marginHorizontal: 13}}>
        {/* <Header cen={'Account Setting'} /> */}
        <MiniHeader title="Account Setting" />

        <Pressable onPress={() => navigation.navigate('editProfile')}>
          <View
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
                source={require('../../Assets/Images/newimages/profile.png')}
                style={{
                  width: 27.4,
                  height: 27.4,
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
            <View style={{margin: 15}}>
              <Ionicons
                name={'chevron-forward-sharp'}
                // style={{fontWeight: '1300'}}
                color="#FFFFFF"
                size={24}
              />
            </View>
          </View>
        </Pressable>

        <View
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
              source={require('../../Assets/Images/newimages/profile.png')}
              style={{
                width: 27.4,
                height: 27.4,
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
              Heading={'Change Password'}
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
        </View>

        <Pressable onPress={() => navigation.navigate('paymentmethod')}>
          <View
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
                source={require('../../Assets/Images/newimages/profile.png')}
                style={{
                  width: 27.4,
                  height: 27.4,
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
                Heading={'Payment Method'}
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
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('title10')}>
          <View
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
                source={require('../../Assets/Images/newimages/profile.png')}
                style={{
                  width: 27.4,
                  height: 27.4,
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
                Heading={'Notification'}
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
          </View>
        </Pressable>

        <View
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
              source={require('../../Assets/Images/newimages/profile.png')}
              style={{
                width: 27.4,
                height: 27.4,
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
        </View>

        <View
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
              source={require('../../Assets/Images/newimages/profile.png')}
              style={{
                width: 27.4,
                height: 27.4,
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
        </View>

        <Pressable onPress={() => navigation.navigate('logOutBefore')}>
          <View
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
                source={require('../../Assets/Images/newimages/profile.png')}
                style={{
                  width: 27.4,
                  height: 27.4,
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
                Heading={'Delete Account'}
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
          </View>
        </Pressable>
        {/* <View>
          <Image
            source={require('../../Assets/Images/newimages/shareitLogo.png')}
            style={{
              width: 254.83,
              height: 189,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              // marginLeft: 15,
              marginTop: 20,
            }}
          />
        </View> */}
      </View>
    </SafeArea>
  );
};

export default AccountSetting;
