import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import InteractParagraph from '../ReusableComponent/Paragraph';
import base64 from 'react-native-base64';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import COLORS from '../../Assets/Style/Color';
import {useSelector} from 'react-redux';

const SaveStoriesCard = ({item, removeBookmarkList, index}) => {
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);
  console.log('item in SaveStories Component:', item);
  return (
    <View style={styles.card}>
      <Avatar.Image
        style={{borderWidth: 1, borderColor: 'grey'}}
        size={45}
        source={{uri: item.cover_pic}}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          // backgroundColor: 'coral',
        }}>
        <View
          style={{
            // width: '25%',
            alignItems: 'flex-start',
            marginHorizontal: '2%',
          }}>
          <InteractParagraph
            p={base64.decode(item.league_title)}
            // colors={COLORS.dark}
            Fontsize={12}
            fw={'bold'}
          />
          <InteractParagraph
            p={item.created_on}
            // colors={COLORS.border_color}
            Fontsize={12}
            fw={'bold'}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() =>
              Alert.alert(
                'Are you sure?',
                'Do you really want to remove this bookmark?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      removeBookmarkList(index, item.bookmark_id);
                      console.log('OK Pressed');
                    },
                  },
                ],
              )
            }
            style={({pressed}) => [
              styles.iconBtn,
              {
                backgroundColor: pressed
                  ? isDark?.isdark
                    ? '#ffffff30'
                    : '#80808030'
                  : null,
              },
            ]}>
            <Ionicons
              name={'trash-outline'}
              color={isDark?.isdark ? COLORS.white : COLORS.dark}
              size={22}
            />
          </Pressable>
          {/* <Pressable
            onPress={() => EditData(item, key)}
            style={({pressed}) => [
              styles.iconBtn,
              {
                backgroundColor: pressed
                  ? isDark.isdark
                    ? '#ffffff30'
                    : '#80808030'
                  : null,
              },
            ]}>
            <Ionicons
              name={'create-outline'}
              color={isDark.isdark ? COLORS.white : COLORS.dark}
              size={22}
            />
          </Pressable> */}
        </View>
      </View>
    </View>
  );
};

export default SaveStoriesCard;
