import * as React from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import avt from '../../Assets/Images/profile/dummyImg.png';
import Input from '../../Components/ReusableComponent/Input';
const Profile = () => {
  const HEIGHT = Dimensions.get('window').height;
  const LIST_WIDTH = Dimensions.get('window').width;
  const LIST_HEIGHT = Dimensions.get('window').height;
  const LIST_ITEM_WIDTH = Math.round(LIST_WIDTH * 0.1);
  const LIST_ITEM_HEIGHT = Math.round(LIST_HEIGHT / 100);
  const navigation = useNavigation();
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  // ============New User Auth Data from New Reducer===================
  const AuthReducer = useSelector(state => state.AuthReducer);
  // const state = useSelector(state => state);
  // const {userAuth} = state;
  console.log('Data From reducer in Edit Profile', AuthReducer?.userData);
  // ===================================================================
  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: '3%' }}>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '8%',
              marginBottom: '6%',
            }}>
            <Pressable onPress={() => navigation.navigate('bottombar')}>
              <View>
                <Ionicons
                  name={'chevron-back'}
                  style={{fontWeight: '900'}}
                  color={isDark?.isdark ? COLORS.white : COLORS.dark}
                  size={30}
                />
              </View>
            </Pressable>
          </View> */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingVertical: 20,
            width: '100%',
            height: 118,
            paddingTop: Platform.OS == 'ios' ? '14%' : '8%',
          }}>
            {/* <View style={{flexDirection: 'row'}}> */}
            <Pressable
              style={({ pressed }) => ({
                width: 42,
                height: 42,
                backgroundColor: pressed
                  ? isDark?.isdark
                    ? '#ffffff30'
                    : '#80808030'
                  : null,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              })}
              onPress={() => navigation.goBack()}>
              <Ionicons
                name={'chevron-back'}
                style={{ fontWeight: '1300' }}
                color={isDark?.isdark ? COLORS.white : COLORS.dark}
                size={24}
              />
            </Pressable>
            <Heading
              mt={4}
              Stylefont={'normal'}
              Fontweight={'700'}
              Fontsize={23}
              txtAlign={'center'}
              pt={Platform.OS == 'ios' ? 4 : 1}
              Heading={'Profile'}
            />
            {/* </View> */}
            <Pressable onPress={() => navigation.navigate('editProfile')}>
              <View style={{ alignItems: 'center', marginTop: 10, marginRight: 7 }}>
                <Image source={require('../../Assets/Images/editprofilemain.png')}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            </Pressable>
          </View>
          <View style={{ alignContent: 'center', alignSelf: 'center' }}>
            <Image
              source={{
                uri: `https://shareitstoryapp.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
              }}
              style={{ width: 120, height: 120, borderWidth: 4,
                borderColor: '#7D7D7D',
                borderRadius: 75, marginTop: '5%' }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginTop: '15%',
              marginHorizontal: '4%'
            }}>
            <View style={{ marginVertical: '4%' }}>
              <Input
                title={'First Name'}
                urlImg={require('../../Assets/Images/nameprofile.png')}
                // placeholder={'Enter your name'}
                disabled={true}
                value={AuthReducer?.userData?.user?.profile?.first_name}
                // value={dataFromOtpScreenOfSignUp.email}
                // onChangeText={onChangeFullName}
              />
            </View>

            <View style={{ marginVertical: '4%' }}>
              <Input
                title={'Last Name'}
                urlImg={require('../../Assets/Images/nameprofile.png')}
                // placeholder={'Enter your name'}
                disabled={true}
                value={AuthReducer?.userData?.user?.profile?.last_name}
                // value={dataFromOtpScreenOfSignUp.email}
                // onChangeText={onChangeFullName}
              />
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
            </View>

            <View style={{ marginVertical: '4%' }}>
              <Input
                title={'Phone Number'}
                urlImg={require('../../Assets/Images/phone.png')}
                // placeholder={'123 456 7890'}
                pass={false}
                disabled={true}
                value={AuthReducer?.userData?.user?.profile?.telephone}
              />
            </View>

            <View style={{ marginVertical: '4%' }}>
              <Input
                title={'Adress'}
                urlImg={require('../../Assets/Images/address.png')}
                disabled={true}
                value={AuthReducer?.userData?.user?.profile?.street}
              />
            </View>

          </View>
        </View>
      </View>
    </SafeArea>
  );
};
export default Profile;
