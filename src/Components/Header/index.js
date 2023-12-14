import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import coins from '../../Assets/Images/newimages/coins.png';
import COLORS from '../../Assets/Style/Color';
import styles from './style';
import Heading from '../ReusableComponent/Heading';

const Header = ({title}) => {
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
    <View style={styles.Headsection__one}>
      {/* <View style={{flexDirection: 'row'}}> */}
      <Pressable
        style={({pressed}) => ({
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
        onPress={() => goBack()}>
        <Ionicons
          name={'chevron-back'}
          style={{fontWeight: '1300'}}
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
        pt={5}
        Heading={title}
      />
      <Heading
        mt={4}
        Stylefont={'normal'}
        Fontweight={'700'}
        Fontsize={23}
        txtAlign={'center'}
        pt={5}
        Heading={'        '}
      />
      {/* </View> */}
    </View>
  );
};

export default Header;
