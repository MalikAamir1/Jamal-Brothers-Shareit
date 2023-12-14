import * as React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import avt from '../../Assets/Images/profile/dummyImg.png';
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
  const userAuth = useSelector(state => state.userAuth);
  // const state = useSelector(state => state);
  // const {userAuth} = state;
  console.log('Data From reducer in Edit Profile', userAuth?.userData);
  // ===================================================================
  return (
    <SafeArea>
      <View style={{flex: 1}}>
        <View style={{marginHorizontal: '3%'}}>
          <View
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
          </View>
          <View style={{alignContent: 'center', alignSelf: 'center'}}>
            <Image
              source={
                userAuth?.userData.profile_pic
                  ? {uri: userAuth?.userData.profile_pic}
                  : avt
              }
              style={{width: 160, height: 160, borderRadius: 80}}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: '2%'}}>
            <Heading
              Stylefont={'normal'}
              Fontweight={'900'}
              Fontsize={16}
              Heading={'Name: '}
              //   Color={COLORS.dark}
              mv={'3%'}
              ml={'5%'}
            />
            <InteractParagraph
              algnSlf={'center'}
              p={
                userAuth?.userData.username
                  ? userAuth.userData.username
                  : userAuth?.userData.name
              }
            />
          </View>
          <Divider style={{marginHorizontal: '5%'}} />
          <View style={{flexDirection: 'row', marginTop: '2%'}}>
            <Heading
              Stylefont={'normal'}
              Fontweight={'900'}
              Fontsize={16}
              Heading={'Mobile Number: '}
              //   Color={COLORS.dark}
              mv={'3%'}
              ml={'5%'}
            />
            <InteractParagraph
              algnSlf={'center'}
              p={userAuth?.userData.phoneNumber}
            />
          </View>
          <Divider style={{marginHorizontal: '5%'}} />
          <View style={{flexDirection: 'row', marginTop: '2%'}}>
            <Heading
              Stylefont={'normal'}
              Fontweight={'900'}
              Fontsize={16}
              Heading={'Email: '}
              mv={'3%'}
              ml={'5%'}
            />
            <InteractParagraph
              p={userAuth?.userData.email}
              algnSlf={'center'}
            />
          </View>
          <Divider style={{marginHorizontal: '5%'}} />
          <Divider style={{marginHorizontal: '5%'}} />
        </View>
      </View>
    </SafeArea>
  );
};
export default Profile;
