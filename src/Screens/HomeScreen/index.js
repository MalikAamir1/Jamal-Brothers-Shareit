// import * as React from 'react';
import {
  Dimensions,
  Image,
  RecyclerViewBackedScrollView,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import {Avatar, Headline, Badge} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-snap-carousel';
import Heading from '../../Components/ReusableComponent/Heading';
import {
  animatedStyles,
  scrollInterpolator,
} from '../../Components/Slider/animation';
import avt from '../../Assets/Images/profile/dummyImg.png';
import COLORS from '../../Assets/Style/Color';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {Pressable} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {styles} from '../../Components/Slider/style';
import {useSelector, useDispatch} from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import {GetLeagues} from '../../Store/Reducers/League';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {lime100} from 'react-native-paper/lib/typescript/styles/colors';
import {RefreshControl} from 'react-native';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {ToastAndroid} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import ImageLoad from 'react-native-image-placeholder';
import {GetCoin} from '../../Store/Reducers/CoinReducer';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Card} from 'react-native-paper';
import {iteratorSymbol} from 'immer/dist/internal';
import base64 from 'react-native-base64';
import HTMLView from 'react-native-htmlview';
import {StyleSheet} from 'react-native';
import {BASE_URL} from '../../App/api';
import {getRequestWithOutBody, postRequestWithoutBody} from '../../App/fetch';
import {SingleLeagueUpdateLocally} from '../../Store/Reducers/SingleLeagueReducer';
import StoriesReducer, {
  updateStoriesList,
} from '../../Store/Reducers/StoriesReducer';
import RatingStars from '../../Components/RatingStars';
import {MyUserStoriesUpdateLocally} from '../../Store/Reducers/UserStoriesReducer';
import {Loader} from '../../Components/ReusableComponent/Loader';

//Refresh Leagues Code
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Header = () => {
  const navigation = useNavigation();
  const AuthReducer = useSelector(state => state.AuthReducer);
  // console.log('AuthReducer.userData in Home Screen: ', AuthReducer.userData);
  const dispatch = useDispatch();
  const [isInternet, setIsInternet] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [leagueStories, setLeagueStories] = React.useState();
  const [allLeagueStories, setAllLeagueStories] = React.useState();
  const [userStories, setUserStories] = React.useState();

  const [data, setData] = useState([
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
  ]);
  //Internet State
  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsInternet(state.isConnected);
    });
  };

  React.useEffect(() => {
    checkInternet();
    if (!isInternet) {
      showMessage({
        message: 'No Internet Connection!',
        type: 'danger',
        color: 'white',
      });
      // ToastAndroid.show('No Internet Connection!', ToastAndroid.SHORT);
    }
  }, [isInternet]);

  //Refresh Leagues Code

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    gettingData();
    checkInternet();
    console.log('working useEffect By Default');

    wait(2000).then(() => {
      //disable refreshing
      setRefreshing(false);
      gettingData();
    });
  }, []);

  if (isInternet === false)
    return (
      <SafeArea>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              marginTop: '90%',
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                paddingHorizontal: '7%',
                textAlign: 'center',
              }}>
              Oops! Looks like your device is not connected to the Internet.
            </Text>
          </View>
        </ScrollView>
      </SafeArea>
    );

  // const gettingData = async () => {
  //   let obj = {
  //     leagueid: 20,
  //     userid: userAuth.userData.userId,
  //   };
  //   console.log('Obj:', obj);
  //   setloader(true);
  //   const res = await fetch(`${BASE_URL}/getstories.php`, {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Cache-Control': 'no-cache',
  //     },
  //     body: JSON.stringify(obj),
  //   })
  //     .then(res => res.text())
  //     // postRequest(`${BASE_URL}/getstories`, obj)
  //     .then(data => {
  //       let res = JSON.parse(data);
  //       console.log('Response of stories===>', res);
  //       setData(res);
  //       console.log('data: ', data);
  //       setloader(false);

  //       // if (res[0].status !== 'false') {
  //       //   console.log('Data Found');
  //       //   // let dataToParse = JSON.parse(res[0]);
  //       //   setloader(false);
  //       // } else if (res[0].status === 'false') {
  //       //   console.log('Data Not Found');
  //       //   setloader(false);
  //       // } else {
  //       //   console.log('something went wrong: 84L ForReader.js ');
  //       // }

  //       // console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setloader(false);
  //     });
  // };

  function gettingData() {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/stories/active-leagues/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        // setLoading(false);
        // console.log('result on home', result);
        setLeagueStories(result);
        dispatch(SingleLeagueUpdateLocally(result));
        getRequestWithOutBody(
          `${BASE_URL}/stories/user-stories/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            // setloader(false);
            // console.log('result on home', result);
            setUserStories(result);
            dispatch(MyUserStoriesUpdateLocally(result));
          })
          .catch(error => {
            // setloader(false);
            console.log('errorbbbbb', error);
          });
      })
      .catch(error => {
        // setloader(false);
        console.log('errorbbbbb', error);
      });
  }

  function gettingLeaguesData() {
    if (leagueStories && leagueStories.results && leagueStories.results[0]) {
      getRequestWithOutBody(
        `${BASE_URL}/stories/stories-by-league/?league_id=${leagueStories.results[0].id}`,
        AuthReducer.userData.token,
      )
        .then(res => {
          setLoading(false);
          // console.log('stories by league', res);
          setAllLeagueStories(res);
          dispatch(updateStoriesList(res));
          // dispatch(SingleLeagueUpdateLocally(result));
        })
        .catch(err => {
          setLoading(false);
          console.log('erroraaaa', err);
        });
    } else {
      console.log('leagueStories or leagueStories.results[0] is undefined');
    }
  }

  useEffect(() => {
    // setloader(true);
    gettingData();
  }, [AuthReducer]);

  useEffect(() => {
    gettingLeaguesData();
    // setloader(false);
  }, [leagueStories]);

  useFocusEffect(
    React.useCallback(() => {
      gettingData();
    }, []),
  );
  // console.log('leagueStories', leagueStories);

  // gettingData();

  const LeftContent = props => (
    <Avatar.Image
      size={35}
      source={
        // userAuth.userData.profile_pic
        //   ? {
        //       uri: `${userAuth.userData.profile_pic}`,
        //     } :
        avt
      }
    />
  );

  const renderItem = ({item}) => {
    // console.log('item IN HOME SCREEN: ', item);
    return (
      <>
        <View
          style={{
            width: '92%',
            height: 119,
            backgroundColor: '#404652',
            borderRadius: 22,
            marginHorizontal: '4%',
            marginTop: 20,

          }}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <View>
              {item.user.profile_pic == '' ? (
                <Image
                  source={require('../../Assets/Images/newimages/profile2.png')}
                  // source={{ uri: 'http://23.26.137.178/media/media/john.png'}}
                  style={{
                    width: 31,
                    height: 31,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginLeft: 20,
                    marginRight: 10,
                  }}
                />
              ) : (
                <View
                  style={{
                    borderColor: '#F7FFFF',
                    borderWidth: 0.8,
                    borderRadius: 7,
                    width: 31,
                    height: 31,
                    justifyContent: 'center',
                    marginLeft: 20,
                    marginRight: 10,
                  }}>
                  <Image
                    // source={require('../../Assets/Images/newimages/profile2.png')}
                    source={{
                      uri: `http://23.26.137.178${item.user.profile_pic}`,
                    }}
                    style={{
                      width: 29,
                      height: 29,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      borderRadius: 7,
                    }}
                  />
                </View>
              )}
            </View>
            <View style={{marginLeft: 5}}>
              <Heading
                mt={-2}
                // ml={45}
                Stylefont={'normal'}
                Fontweight={'400'}
                Fontsize={17}
                Heading={item.user.first_name + ' ' + item.user.last_name}
                Color={'#FFFFFF'}
              />
              <View style={{width: 237}}>
                <Text style={{marginTop: 8}}>
                  <HTMLView
                    stylesheet={styles}
                    value={`<div style="color:green">${item.content.slice(
                      0,
                      30,
                    )}...<a href='title8'>Read more</a></div>`}
                    onLinkPress={url => {
                      // Handle the link press here
                      if (url === 'title8') {
                        // Navigate to the desired screen
                        navigation.navigate('title8', {
                          storyData: item,
                        });
                      }
                    }}
                  />
                </Text>
              </View>
            </View>

            {/* <View>
            <Image
              source={require('../../Assets/Images/newimages/bookmark.png')}
              style={{
                width: 14,
                height: 18,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginLeft: 20,
              }}
            />
          </View> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'space-between',
            }}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', marginLeft: 68}}>
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
                    // mt={0}
                    // ml={45}
                    Stylefont={'normal'}
                    Fontweight={'400'}
                    Fontsize={11.11}
                    Heading={item.likes_sum}
                    Color={'#7ACCCA'}
                  />
                </View>
                <View style={{flexDirection: 'row', marginLeft: 16}}>
                  <Image
                    source={require('../../Assets/Images/newimages/eye.png')}
                    style={{
                      // height: 17.78,
                      // width: 16.67,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginRight: 6,
                    }}
                  />
                  <Heading
                    // mt={0}
                    // ml={45}
                    Stylefont={'normal'}
                    Fontweight={'400'}
                    Fontsize={11.11}
                    Heading={item.views_sum ? item.views_sum : 0}
                    Color={'#7ACCCA'}
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginRight: 17}}>
              <RatingStars rating={item.rating} />
            </View>
          </View>
        </View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
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
            <Pressable onPress={() => navigation.navigate('setting')}>
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 10,
                }}>
                <Image
                  source={require('../../Assets/Images/newimages/drawerLogo.png')}
                  style={{
                    width: 22,
                    height: 16,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
            </Pressable>
          </View>
          <Heading
            mt={0}
            ml={45}
            Stylefont={'normal'}
            Fontweight={'600'}
            Fontsize={30}
            Heading={'Home'}
            Color={'#FFFFFF'}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Pressable onPress={() => navigation.navigate('profile')}>
              <View
                style={{
                  borderColor: '#BBBBBB',
                  borderWidth: 0.5,
                  borderRadius: 7,
                  width: 31,
                  height: 31,
                  justifyContent: 'center',
                  marginRight: 12,
                }}>
                <Image
                  source={require('../../Assets/Images/newimages/profile.png')}
                  style={{
                    width: 20,
                    height: 20,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('title10')}>
              <View>
                <Image
                  source={require('../../Assets/Images/newimages/notification.png')}
                  style={{
                    width: 30,
                    height: 30,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeArea>
      {/* <> */}
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          {/* Header Start */}

          {/* Header End */}
          {/* Body Start */}
          <View
            style={{
              // zIndex: 1,
              position: 'fix',
              // flex: 1,
              backgroundColor: COLORS.primary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              height: Platform.OS == 'ios' ? 108 : 98,
              paddingTop: Platform.OS == 'ios' ? '14%' : '10%',
              paddingHorizontal: '5%',
              // borderBottomLeftRadius: 30,
              // borderBottomRightRadius: 30,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => navigation.navigate('setting')}>
                <View
                  style={{
                    marginLeft: 5,
                    marginTop: Platform.OS == 'ios' ? 10 : 12,
                  }}>
                  <Image
                    source={require('../../Assets/Images/newimages/drawerLogo.png')}
                    style={{
                      width: 22,
                      height: 16,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </Pressable>
            </View>
            <Heading
              mt={0}
              ml={45}
              Stylefont={'normal'}
              Fontweight={'600'}
              Fontsize={30}
              Heading={'Home'}
              Color={'#FFFFFF'}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: Platform.OS == 'ios' ? 2 : 6,
              }}>
              <Pressable onPress={() => navigation.navigate('profile')}>
                <View
                  style={{
                    borderColor: '#BBBBBB',
                    borderWidth: 0.5,
                    borderRadius: 7,
                    width: 31,
                    height: 31,
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                  <Image
                    source={require('../../Assets/Images/newimages/profile.png')}
                    style={{
                      width: 20,
                      height: 20,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('title10')}>
                <View>
                  <Image
                    source={require('../../Assets/Images/newimages/notification.png')}
                    style={{
                      width: 30,
                      height: 30,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          <FlatList
            style={{marginBottom: 70}}
            data={allLeagueStories?.results || []}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  // setRefreshing(true); // Start the refresh animation
                  gettingLeaguesData(); // Fetch new data
                }}
              />
            }
            // ListHeaderComponent={<ListHeaderComponent />}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            // stickyHeaderIndices={[0]}
          />
          {/* Body End */}
        </View>
      )}
      {/* </> */}
    </SafeArea>
  );
};
// export default React.memo(Header);
export default Header;

const styles = StyleSheet.create({
  div: {
    // fontWeight: '300',
    color: '#AAAAAA',
    fontSize: 13, // make links coloured pink
  },
  a: {
    color: '#7ACCCA',
  },
});
