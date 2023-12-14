import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Dimensions, Image, Animated, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {Headline} from 'react-native-paper';

// import { FlatList } from 'react-native-gesture-handler';
import {Pagination} from 'react-native-snap-carousel';
import InteractParagraph from '../ReusableComponent/Paragraph';
import data from './data';
import {styles} from './style';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const SLIDER_HEIGHT = Dimensions.get('window').height;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6);
export const ITEM_HEIGHT = Math.round((SLIDER_HEIGHT * 1.2) / 3);

const CarouselCardItem = ({item, index}) => {
  // const navigation = useNavigation();
  const {height} = Dimensions.get('screen');

  return (
    <View key={index} style={{marginBottom: -50}}>
      <Pressable onPress={() => navigation.navigate('setting')}>
        <Image
          style={styles.Slider_image}
          source={item.imgUrl}
          resizeMode="contain"
          resizeMethod="resize"
        />
      </Pressable>

      {item.logoUrl ? (
        <View style={styles.Slider_logoContainer}>
          <Image source={item.logoUrl} style={styles.Slider_logoImg} />
        </View>
      ) : (
        <></>
      )}
      {item.title1 ? (
        <Headline style={styles.Slider_Mainheader}>{item.title1}</Headline>
      ) : (
        <></>
      )}
      <Headline style={styles.Slider_header}>{item.title}</Headline>

      <InteractParagraph txtAlign={'center'} p={item.body} />
    </View>
  );
};

export default CarouselCardItem;
