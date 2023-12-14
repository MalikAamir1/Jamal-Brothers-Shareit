import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import styles from './style';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import InteractAvatar from '../../Components/ReusableComponent/Avatar';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {getRequest, postRequest} from '../../utils/fetch';
import {BASE_URL} from '../../utils/api';
import Loader from '../../Components/ReusableComponent/Loader';
import avt from '../../Assets/Images/profile/dummyImg.png';
import {ToastAndroid} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {RefreshControl} from 'react-native';
// import {postRequest} from '../../App/fetch';
import axios from 'axios';
import {Avatar} from 'react-native-paper';
import MiniHeader from '../../Components/MiniHeader';
import {useDispatch, useSelector} from 'react-redux';
import {SingleStoryUpdateLocally} from '../../Store/Reducers/SingleStoryReducer';
import COLORS from '../../Assets/Style/Color';
import {showMessage} from 'react-native-flash-message';
import {getStoriesList} from '../../Store/Reducers/StoriesReducer';

//Refresh Leagues Code
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function ForReader({route}) {
  const {league_id} = route.params;
  console.log(league_id);
  const navigation = useNavigation();
  // const {SingleStory, userAuth, Stories} = useSelector(state => state);
  const Stories = useSelector(state => state.Stories);
  const userAuth = useSelector(state => state.userAuth);
  // console.log('SingleStory', SingleStory);

  const [ApiData, setApiData] = React.useState([]);
  const [loder, setLoader] = React.useState(true);
  const [nostory, setNostory] = React.useState(false);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  console.log('Stores:', Stories);

  const gettingData = async () => {
    let obj = {
      leagueid: league_id,
      userid: userAuth.userData.userId,
    };
    console.log('Obj:', obj);
    const res = await fetch(`${BASE_URL}/getstories.php`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(obj),
    })
      .then(res => res.text())
      // postRequest(`${BASE_URL}/getstories`, obj)
      .then(data => {
        let res = JSON.parse(data);
        console.log('Response of stories===>', res);

        if (res[0].status !== 'false') {
          setApiData(res);
          setNostory(false);
          console.log('Data Found');
          setLoader(false);
        } else if (res[0].status === 'false') {
          console.log('Data Not Found');
          setLoader(false);
          setNostory(true);
        } else {
          console.log('something went wrong: 84L ForReader.js ');
        }

        // console.log(res);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    dispatch(getStoriesList());
    // gettingData();
    // console.log(ApiData);
    if (Stories?.status == 'ok') {
      setApiData(Stories?.StoriesList);
      setNostory(false);
    } else {
      setLoader(false);
      setNostory(true);
      console.log('something went wrong: 84L ForReader.js ');
    }
  }, []);
  useEffect(() => {
    if (isFocus === true) {
      gettingData();
      console.log(ApiData);
    }
  }, [isFocus]);
  // useFocusEffect(
  //   useCallback(()=>{
  //     console.log('testing')
  //   },[])
  // )

  //Internet State
  const [isInternet, setIsInternet] = React.useState(true);
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
      // ToastAndroid.show('No Internet Connection!', ToastAndroid.SHORT);
      showMessage({
        message: 'No internet connection',
        type: 'danger',
        color: 'white',
      });
    }
  }, [isInternet]);

  //Refresh Leagues Code
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checkInternet();

    wait(2000).then(() => {
      //disable refreshing
      setRefreshing(false);
    });
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Pressable
          key={index}
          onPress={() => {
            console.log('index Number:', item);
            dispatch(SingleStoryUpdateLocally(item));
            navigation.navigate('title8', {item});
          }}>
          <View style={styles.Bodylist}>
            <View style={{flexDirection: 'row'}}>
              <Avatar.Image
                size={35}
                source={
                  item?.writer_pic
                    ? {
                        uri: `${item?.writer_pic}`,
                      }
                    : avt
                }
              />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <InteractParagraph
                  p={item?.writer_name}
                  Fontsize={18}
                  fw={'bold'}
                />
                <InteractParagraph p={item?.created_on} />
              </View>
            </View>
          </View>
        </Pressable>
      );
    },
    [ApiData],
  );
  const itemSeparatorComponent = useCallback(() => {
    return <View style={styles.separatorStyle} />;
  }, [ApiData]);

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

  // if (loder) return <ActivityIndicator />;

  if (nostory)
    return (
      <SafeArea>
        <View style={{marginHorizontal: '5%', flex: 1}}>
          <Header />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <InteractParagraph
              p={'No Story Found'}
              Fontsize={18}
              fw={'bold'}
              txtAlign={'center'}
            />
          </View>
        </View>
      </SafeArea>
    );

  return (
    <>
      {loder ? (
        <Loader />
      ) : (
        <SafeArea>
          <View style={styles.container}>
            {/* head section */}
            {/* <Header /> */}
            <MiniHeader />
            {/* <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }> */}
            <View style={{marginTop: 5, marginBottom: 100}}>
              {/* item  */}

              <FlatList
                data={ApiData}
                renderItem={renderItem}
                ItemSeparatorComponent={itemSeparatorComponent}
              />

              {/* item */}
            </View>
            {/* </ScrollView> */}
            {/* Body Section */}
          </View>
        </SafeArea>
      )}
    </>
  );
}
