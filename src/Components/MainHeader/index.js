import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import coins from '../../Assets/Images/newimages/coins.png';
import COLORS from '../../Assets/Style/Color';
import Heading from '../ReusableComponent/Heading';

const MainHeader = ({title}) => {
  const {navigate, goBack} = useNavigation();
  // const {
  //   isDark: {isdark},
  //   Coin,
  // } = useSelector(state => state);
  // const {
  //   isDark: {isdark},
  // } = useSelector(state => state.isDark);
  const isDark = useSelector(state => state.isDark);
  const Coin = useSelector(state => state.Coin);
  console.log('Coin:', Coin);
  return (
    <View
      style={{
        // zIndex: 1,
        position: 'fix',
        // flex: 1,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 128,
        paddingTop: '17%',
        paddingHorizontal: '5%',
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
      }}>
      <View style={{flexDirection: 'row'}}>
        {/* <Pressable onPress={() => navigation.navigate('h')}> */}
        <Pressable
          style={({pressed}) => ({
            width: 35,
            height: 35,
            backgroundColor: pressed
              ? isDark?.isdark
                ? '#ffffff30'
                : '#80808030'
              : null,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          })}
          onPress={() => goBack()}>
          <Ionicons
            name={'chevron-back'}
            style={{fontWeight: '1300'}}
            color={isDark?.isdark ? COLORS.white : COLORS.dark}
            size={34}
          />
        </Pressable>
        {/* </Pressable> */}
      </View>
      <Heading
        mt={0}
        ml={10}
        Stylefont={'normal'}
        Fontweight={'600'}
        Fontsize={30}
        Heading={title}
        Color={'#FFFFFF'}
      />
      <Pressable onPress={() => navigate('contextPrizes')}>
        <View style={{alignItems: 'center', marginTop: 0, marginRight: 7}}>
          <Image source={coins} style={{width: 35, height: 35}} />
        </View>
      </Pressable>
    </View>
  );
};

export default MainHeader;
