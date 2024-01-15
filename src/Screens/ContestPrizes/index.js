import React, { useEffect, useState } from 'react';
// import { View, Image, ScrollView, FlatList, Pressable } from 'react-native';
// import React from 'react';
import {
  View,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Button from '../../Components/ReusableComponent/Button';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
// import coins from '../../Assests/Images/Header/coins.png';
import COLORS from '../../Assets/Style/Color';
import styles from './style';
import InteractAvatar from '../../Components/ReusableComponent/Avatar';
import AvatarImage from '../../Assets/Images/AvtarImages/avt.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import { useDispatch, useSelector } from 'react-redux';
import MiniHeader from '../../Components/MiniHeader';
import MainHeader from '../../Components/MainHeader';
import Heading from '../../Components/ReusableComponent/Heading';
import RatingStars from '../../Components/RatingStars';
import HTMLView from 'react-native-htmlview';
import { Loader } from '../../Components/ReusableComponent/Loader';
import { BASE_URL } from '../../App/api';
import { getRequestWithOutBody } from '../../App/fetch';
import { MyUserStoriesUpdateLocally } from '../../Store/Reducers/UserStoriesReducer';
import { RefreshControl } from 'react-native-gesture-handler';
import Navigation from '../../Navigation/Stack';

export default function Contestprizes() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  // const UserStoriesReducer = useSelector(
  //   state => state.UserStoriesReducer.UserStoriesData.results,
  // );
  // console.log('UserStoriesReducer', UserStoriesReducer);
  const [loading, setLoading] = useState(false);
  const [userStories, setUserStories] = useState([]);
  const [publishedStories, setPublishedStories] = useState([]);
  const [draftStories, setDraftStories] = useState([]);

  function gettingData() {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/stories/user-stories/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        // setloader(false);
        // console.log('result on contestprize', result);
        setUserStories(result.results);
        dispatch(MyUserStoriesUpdateLocally(result.results));
      })
      .catch(error => {
        // setloader(false);
        console.log('errorbbbbb 2', error);
      });
  }

  useEffect(() => {
    // setloader(true);
    gettingData();
  }, [AuthReducer]);

  // React.useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // console.log('AuthReducer', AuthReducer);
  useEffect(() => {
    setLoading(true);
    setPublishedStories(userStories?.filter(item => item.is_published));
    setDraftStories(userStories?.filter(item => !item.is_published));
    setLoading(false);
  }, [userStories]);

  useFocusEffect(
    React.useCallback(() => {
      gettingData();
    }, []),
  );

  const isDark = useSelector(state => state.isDark);

  const renderItem = ({ item, index }) => {
    const formattedDate = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(item.updated));
    // console.log('item in MY STORIES PUBLISH PORTION: ', item);
    return (
      <>
        <View
          style={{
            width: '92%',
            height: 129,
            backgroundColor: '#404652',
            borderRadius: 22,
            marginHorizontal: '4%',
            marginTop: 20,
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              marginTop: 2,
              padding: 10,
            }}
          >
            <View style={{ marginLeft: 5 }}>
              <Heading
                Stylefont={'normal'}
                Fontweight={'400'}
                Fontsize={15.65}
                Heading={item.title}
                Color={'#FFFFFF'}
              />
              <Heading
                mt={2}
                Stylefont={'normal'}
                Fontweight={'400'}
                Fontsize={9}
                Heading={'Date: ' + formattedDate}
                Color={'#AAAAAA'}
              />
              <View style={{ minWidth: 327 }}>
                <Text style={{ marginTop: 8 }}>
                  <HTMLView
                    stylesheet={stylesshow}
                    value={`<div style="color:green">${item.content.slice(
                      0,
                      40,
                    )}...`}
                    onLinkPress={url => {
                      // Handle the link press here
                      if (url === 'title8') {
                        navigation.navigate('title8', {
                          storyData: item,
                        });
                      }
                    }}
                  />
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', marginLeft: 18 }}>
                <Image
                  source={require('../../Assets/Images/newimages/like.png')}
                  style={{
                    width: 13.89,
                    height: 14.31,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginRight: 6,
                  }}
                />
                <Heading
                  Stylefont={'normal'}
                  Fontweight={'400'}
                  Fontsize={11.11}
                  Heading={item.likes}
                  Color={'#7ACCCA'}
                />
              </View>
              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <Image
                  source={require('../../Assets/Images/newimages/eye.png')}
                  style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginRight: 6,
                  }}
                />
                <Heading
                  Stylefont={'normal'}
                  Fontweight={'400'}
                  Fontsize={11.11}
                  Heading={item.views}
                  Color={'#7ACCCA'}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <RatingStars rating={item.rating} />
            </View>
          </View>
        </View>
      </>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
          width: '92%',
          height: 129,
          backgroundColor: '#404652',
          borderRadius: 22,
          marginHorizontal: '4%',
          padding: 10,
        }}>
        <Image
          source={require('../../Assets/Images/newimages/sadface.png')}
          style={{
            height: 44,
            width: 33,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginRight: 6,
          }}
        />
        <Heading
          mt={4}
          // Stylefont={'normal'}
          Fontweight={500}
          Fontsize={12}
          Heading={'No Story'}
          Color={'#FFFFFF'}
        // mb={7}
        />
        <Heading
          mt={2}
          // Stylefont={'normal'}
          Fontweight={500}
          Fontsize={10}
          Heading={'Start writing your stories'}
          Color={'#AAAAAA'}
        // mb={7}
        />
        <TouchableOpacity
          // onPress={toggleModal}
          onPress={() => {
            navigation.navigate('title5');
          }}
          style={{
            width: 95,
            height: 21,
            backgroundColor: '#7ACCCA',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4,
          }}>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 600,
              color: '#404552',
            }}>
            Write Your Story
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem2 = ({ item, index }) => {
    const formattedDate = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(item.updated));
    return (
      <>
        <View
          style={{
            width: '92%',
            height: 129,
            backgroundColor: '#404652',
            borderRadius: 22,
            marginHorizontal: '4%',
            marginTop: 20,
            padding: 10,
          }}>
          <View style={{ flexDirection: 'row', marginTop: 2 }}>
            <View style={{ marginLeft: 5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Heading
                    // ml={45}
                    Stylefont={'normal'}
                    Fontweight={'400'}
                    Fontsize={15.65}
                    Heading={item.title}
                    Color={'#FFFFFF'}
                  />
                  <Heading
                    mt={2}
                    // ml={45}
                    Stylefont={'normal'}
                    Fontweight={'400'}
                    Fontsize={9}
                    Heading={'Date: ' + formattedDate}
                    Color={'#AAAAAA'}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    // top: 0,
                    right: Platform.OS === 'ios' ? 0 : 20,
                    // bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('editStory', { storyData: item });
                    }}>
                    <View>
                      <Image
                        source={require('../../Assets/Images/newimages/editDraft.png')}
                        style={{
                          width: 18,
                          height: 18,
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          // marginLeft: 'auto',
                          // marginRight: 20
                        }}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={{ minWidth: 327 }}>
                <Text style={{ marginTop: 12 }}>
                  <HTMLView
                    stylesheet={stylesshow}
                    value={`<div style="color:green">${item.content.slice(
                      0,
                      30,
                    )}...`}
                    onLinkPress={url => {
                      // Handle the link press here
                      if (url === 'title8') {
                        // Navigate to the desired screen
                        // navigation.navigate('title8');
                        // console.log('log');
                        navigation.navigate('editStory', { storyData: item });
                      }
                    }}
                  />
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <Heading
          mt={14}
          ml={'5%'}
          // Stylefont={'normal'}
          Fontweight={500}
          Fontsize={25}
          Heading={'Publish Stories:'}
          Color={'#FFFFFF'}
        // mb={7}
        />
      </>
    );
  };

  const ListHeaderComponent2 = () => {
    return (
      <>
        <Heading
          mt={14}
          ml={'5%'}
          // Stylefont={'normal'}
          Fontweight={500}
          Fontsize={25}
          Heading={'Draft Stories :'}
          Color={'#FFFFFF'}
        // mb={7}
        />
      </>
    );
  };
  const ListFooterComponent = () => {
    return (
      <>
        <View style={{ marginTop: 30 }}>
          <FlatList
            data={draftStories}
            ListHeaderComponent={ListHeaderComponent2}
            renderItem={renderItem2}
            keyExtractor={item => item.id}
            ListEmptyComponent={ListEmptyComponent} // Rendered when the list is empty
          />
        </View>
      </>
    );
  };

  return (
    <SafeArea>
      <MainHeader title={'My Stories'} />
      {loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1, marginTop: 10, marginBottom: 70 }}>
          {/* head section */}
          {/* body section */}
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View>
            {/* List Part */}
            <FlatList
              data={publishedStories}
              ListHeaderComponent={ListHeaderComponent}
              ListFooterComponent={ListFooterComponent}
              ListEmptyComponent={ListEmptyComponent} // Rendered when the list is empty
              renderItem={renderItem}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    // setRefreshing(true); // Start the refresh animation
                    gettingData(); // Fetch new data
                  }}
                />
              }
            />

            {/* List Part */}
          </View>
          {/* </ScrollView> */}
          {/* body section */}
        </View>
      )}
    </SafeArea>
  );
}

const stylesshow = StyleSheet.create({
  div: {
    // fontWeight: '300',
    color: '#AAAAAA',
    fontSize: 12, // make links coloured pink
  },
  a: {
    color: '#7ACCCA',
  },
});
