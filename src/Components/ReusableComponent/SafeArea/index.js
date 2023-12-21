import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import COLORS from '../../../Assets/Style/Color';
import {useDispatch, useSelector} from 'react-redux';
import darkmodebgimg from '../../../Assets/Images/newimages/bgImg2.png';

function SafeArea(props) {
  const isDark = useSelector(state => state.isDark);
  // const {
  //   isDark: {isdark},
  // } = useSelector(state => state);
  // const {
  //   isDark: {isdark},
  // } = state;
  return (
    <View style={{height: '100%'}}>
      {isDark?.isdark ? (
        <ImageBackground
          source={darkmodebgimg}
          resizeMode="cover"
          style={styles.image}>
          {props.children}
        </ImageBackground>
      ) : (
        props.children
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default SafeArea;
