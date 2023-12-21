import React, {useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import InteractParagraph from '../Paragraph';
import Ionicons from 'react-native-vector-icons/Ionicons';
import coins from '../../../Assets/Images/Header/coins.png';
import COLORS from '../../../Assets/Style/Color';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Heading from '../Heading';

export default function Header(props) {
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  const navigation = useNavigation();
  // alert(navigation.navigate())

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '8%',
      }}>
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name={'chevron-back'}
            style={{fontWeight: '1300'}}
            color={isDark?.isdark ? COLORS.white : COLORS.dark}
            size={35}
          />
        </Pressable>
      </View>
      {/* <View> */}
      {props.cen && (
        <Heading
          mt={0}
          Stylefont={'normal'}
          Fontweight={'700'}
          Fontsize={25}
          txtAlign={'left'}
          pt={5}
          Heading={props.cen}
        />
      )}
      {/* </View> */}

      <Pressable onPress={() => navigation.navigate('contextPrizes')}>
        <View>
          <Image source={coins} style={{width: 33, height: 25}} />
          <InteractParagraph
            p={'2350'}
            colors={isDark?.isdark ? COLORS.white : COLORS.dark}
            Fontsize={12}
            fw={'bold'}
          />
        </View>
      </Pressable>
    </View>
  );
}
