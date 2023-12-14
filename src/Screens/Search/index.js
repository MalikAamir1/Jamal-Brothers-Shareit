import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, Image, Pressable, Text, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../Assets/Style/Color';
import {ScrollView} from 'react-native-gesture-handler';
import coins from '../../Assets/Images/Header/coins.png';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {getRequest} from '../../utils/fetch';
import {BASE_URL} from '../../utils/api';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
import {lime100} from 'react-native-paper/lib/typescript/styles/colors';
import {RefreshControl} from 'react-native';
import {GetLeagues} from '../../Store/Reducers/League';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../Components/ReusableComponent/Loader';
import NetInfo from '@react-native-community/netinfo';
import ImageLoad from 'react-native-image-placeholder';
import MiniHeader from '../../Components/MiniHeader';
import base64 from 'react-native-base64';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import MainHeader from '../../Components/MainHeader';
import Heading from '../../Components/ReusableComponent/Heading';
import RatingStars from '../../Components/RatingStars';
import HTMLView from 'react-native-htmlview';
import {showMessage} from 'react-native-flash-message';
import {getRequestWithOutBody} from '../../App/fetch';
import {SingleLeagueUpdateLocally} from '../../Store/Reducers/SingleLeagueReducer';
import {MyUserStoriesUpdateLocally} from '../../Store/Reducers/UserStoriesReducer';
import {updateStoriesList} from '../../Store/Reducers/StoriesReducer';

const Search = () => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const StoriesReducer = useSelector(
    state => state.StoriesReducer.StoriesList?.results,
  );
  // console.log('StoriesReducer', StoriesReducer);
  const [searchValue, setSearchValue] = useState('');
  const [searchTerms, setsearchTerms] = useState('');
  const [LeaguesData, setLeaguesData] = useState();
  const [loading, setLoading] = useState(false);
  // const [leagueList, setLeagueList] = useState(LeaguesData);
  const [leagueList, setLeagueList] = useState([]);
  const [btnloder, setbtnLoder] = useState(false);
  const [errmessage, setErrmessage] = useState(false);
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);
  const [LeagueImages, setLeagueImages] = useState([]);
  const [leagueStories, setLeagueStories] = React.useState();
  const [allLeagueStories, setAllLeagueStories] = React.useState();
  const [userStories, setUserStories] = React.useState();
  const [filteredStories, setFilteredStories] = useState([]);
  const leagues = useSelector(state => state.leagues);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial rendering, set the full list
    setFilteredStories(StoriesReducer || []);
  }, [StoriesReducer]);

  //   GET API DATA
  // console.log('🚀 ~ file: index.js ~ line 40 ~ Search ~ leagues', leagues);
  let tempInput;
  // const filterData = text => {
  //   setSearchValue(text);
  //   console.log('text', text);
  //   const newData = StoriesReducer.filter(item => {
  //     console.log('FilterItems', item);
  //     const itemData = item.title.toLowerCase();
  //     const searchText = text.toLowerCase();
  //     return itemData.indexOf(searchText) > -1;
  //   });
  //   console.log('NewData:', newData);
  //   setLeagueList(newData);
  // };

  const filterData = text => {
    setSearchValue(text);
    setsearchTerms(text.toLowerCase());

    const newData = StoriesReducer.filter(item => {
      const itemData = item.content.toLowerCase();
      return itemData.indexOf(text.toLowerCase()) > -1;
    });

    setFilteredStories(newData);
  };

  // useEffect(() => {
  //   if (leagues.Leagues.length > 0) {
  //     setLeaguesData(leagues.Leagues);
  //   }
  // }, [leagues]);

  // useEffect(() => {
  //   //setting image from reducer
  //   // const lImg = [];
  //   if (LeaguesData) {
  //     console.log('LeaguesData:', LeaguesData);
  //     const tempData = LeaguesData.map(i => {
  //       console.log('map:', base64.decode(i.league_title));
  //       return {imgUrl: i.cover_pic, Title: base64.decode(i.league_title)};
  //     });
  //     // lImg.push();
  //     console.log(
  //       '🚀 ~ file: index.js ~ line 61 ~ useEffect ~ LeaguesData',
  //       LeaguesData,
  //     ),
  //       console.log('tempData:', tempData);
  //     setLeagueImages(tempData);
  //     setLeagueList(tempData);
  //   }

  //   if (leagues.status === 'Ok') {
  //     setloader(false);
  //   }
  // }, [LeaguesData]);

  //Refresh Leagues Code
  // const [refreshing, setRefreshing] = React.useState(false);

  //Refresh Leagues Code
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  //Internet State
  const [isInternet, setIsInternet] = useState(true);
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

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   gettingData();
  //   checkInternet();
  //   console.log('working useEffect By Default');

  //   wait(2000).then(() => {
  //     //disable refreshing
  //     setRefreshing(false);
  //     gettingData();
  //   });
  // }, []);

  // const renderItem = useCallback(
  //   ({item, index}) => {
  //     return (
  //       <View
  //         style={{
  //           margin: 5,
  //         }}>
  //         <Pressable
  //           onPress={() => {
  //             let obj = leagues.Leagues[index];
  //             navigation.navigate('contestabout', {obj});
  //           }}>
  //           <ImageLoad
  //             source={{uri: item.imgUrl}}
  //             style={{
  //               width: 155,
  //               height: 200,
  //               borderRadius: 20,
  //               resizeMode: 'cover',
  //               alignContent: 'center',
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}
  //             loadingStyle={{size: 'large', color: 'black'}}
  //           />
  //         </Pressable>
  //         {console.log('Index Number:', index)}
  //       </View>
  //     );
  //   },
  //   [leagueList],
  // );

  if (isInternet === false)
    return (
      <SafeArea>
        <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        >
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
  //   GET API DATA

  if (loader) return <Loader />;

  console.log('leagues:', leagues);

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: '100%',
            height: 70,
            // paddingVertical: '3%',
            paddingHorizontal: '5%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable onPress={() => navigation.navigate('title1')}>
              <View>
                <Ionicons
                  name={'chevron-back'}
                  style={{fontWeight: '1300'}}
                  color={COLORS.white}
                  size={35}
                />
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('contextPrizes');
              }}>
              <View style={{marginTop: '2%'}}>
                <Image source={coins} style={{width: 33, height: 25}} />
                <Text style={{color: COLORS.white, fontSize: 12}}>2350</Text>
              </View>
            </Pressable>
          </View> */}
          {/* <MiniHeader /> */}
          <View style={styles.searchSection}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={20}
              color="#000"
            />
            <TextInput
              // style={styles.input}
              placeholder="Search"
              // onChangeText={search => {
              //   setsearchTerms(search);
              // }}
              onChangeText={setSearchValue}
              underlineColorAndroid="transparent"
              value={searchValue}
            />
            <Entypo
              style={styles.searchIcon}
              name="circle-with-cross"
              size={20}
              color="#000"
              onPress={() => {
                setSearchValue('');
              }}
            />
          </View>
        </View>
        {/* <ScrollView
          style={{flex: 1, flexGrow: 1, marginBottom: 75}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }> */}
        {/* <View
            style={{
              flexDirection: 'row',
              margin: '2%',
              // justifyContent: 'center',
              flexGrow: 1,
              flexWrap: 'wrap',
              marginBottom: 15,
            }}> */}
        {/* // ?.filter(val => {
              //   if (searchTerms === '') {
              //     return val;
              //   } else if (
              //     val.Title.toLowerCase().includes(
              //       searchTerms.toLocaleLowerCase(),
              //     )
              //   ) {
              //     return val;
              //   }
              // }) */}
      </>
    );
  };

  // const ListHeaderComponent = () => {
  //   return (
  //     <>
  //       <Heading
  //         mt={0}
  //         ml={45}
  //         Stylefont={'normal'}
  //         Fontweight={'600'}
  //         Fontsize={30}
  //         Heading={'Publish'}
  //         Color={'#FFFFFF'}
  //       />
  //     </>
  //   );
  // };

  const renderItem = ({item}) => (
    <>
      <View
        style={{
          width: 360,
          height: 119,
          backgroundColor: '#404652',
          borderRadius: 22,
          marginHorizontal: 15,
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
                  source={{uri: `http://23.26.137.178${item.user.profile_pic}`}}
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
            {/* <View
              style={{
                borderColor: '#F7FFFF',
                borderWidth: 0.8,
                borderRadius: 7,
                width: 31,
                height: 31,
                justifyContent: 'center',
                marginLeft: 20,
                marginRight: 10,
              }}> */}
            {/* </View> */}
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

  return (
    <SafeArea>
      <View style={{flex: 1}}>
        <MainHeader title={'Search'} />
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: '100%',
            height: 70,
            // paddingVertical: '3%',
            paddingHorizontal: '5%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View style={styles.searchSection}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={20}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Search by content"
              // onChangeText={search => {
              //   setsearchTerms(search);
              // }}
              onChangeText={filterData}
              underlineColorAndroid="transparent"
              value={searchValue}
              placeholderTextColor={'grey'}
            />
            <Entypo
              style={styles.searchIcon}
              name="circle-with-cross"
              size={20}
              color="#000"
              onPress={() => {
                setSearchValue('');
              }}
            />
          </View>
        </View>
        <FlatList
          style={{marginBottom: 70}}
          data={filteredStories}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={loading}
          //     onRefresh={() => {
          //       // setRefreshing(true); // Start the refresh animation
          //       gettingLeaguesData(); // Fetch new data
          //     }}
          //   />
          // }
          // ListHeaderComponent={<ListHeaderComponent />}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // stickyHeaderIndices={[0]}
        />

        {/* </View> */}
        {/* </ScrollView> */}
      </View>
    </SafeArea>
  );
};

export default Search;
