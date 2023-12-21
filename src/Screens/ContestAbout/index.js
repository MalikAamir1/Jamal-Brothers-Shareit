import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import COLORS from '../../Assets/Style/Color';
import coins from '../../Assets/Images/Header/coins.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {useDispatch, useSelector} from 'react-redux';
import base64 from 'react-native-base64';
import MiniHeader from '../../Components/MiniHeader';
import {SingleLeagueUpdateLocally} from '../../Store/Reducers/SingleLeagueReducer';
// import {BASE_URL} from '../../utils/api';
// import {getRequest} from '../../utils/fetch';
// import Loader from '../../Components/Reusable Component/Loader';
// import NetInfo from '@react-native-community/netinfo';
// import {RefreshControl} from 'react-native';
// import {ToastAndroid} from 'react-native';

//Refresh Leagues Code
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function ContestAbout({route}) {
  const navigation = useNavigation();
  const [colorCHange, setColorCHange] = useState(false);
  // const reducerData = useSelector(state => state);
  const dispatch = useDispatch();
  // const [LeagueData, setLeagueData] = useState();
  // const [loader, setloader] = React.useState(true);

  const obj = route.params;
  console.log(obj.obj);
  const {
    obj: {league_id, league_description, term_conditions, league_title},
  } = obj;

  useEffect(() => {
    dispatch(SingleLeagueUpdateLocally(obj?.obj));
  }, []);
  // let decodedLeagueDescription = atob(league_description); // atob we using for decoding data base64 to string
  // let decodedTermConditions = atob(term_conditions);
  // let decodedLeagueTitle = atob(league_title);

  let decodedLeagueDescription = base64.decode(league_description);
  let decodedTermConditions = base64.decode(term_conditions);
  let decodedLeagueTitle = base64.decode(league_title);
  //Internet State
  // const [isInternet, setIsInternet] = React.useState(true);
  // const checkInternet = () => {
  //   NetInfo.fetch().then(state => {
  //     console.log('Connection type', state.type);
  //     console.log('Is connected?', state.isConnected);
  //     setIsInternet(state.isConnected);
  //   });
  // };

  // React.useEffect(() => {
  //   getRequest(`${BASE_URL}/leagues/getleaguebyparam/${id}`)
  //     .then(res => {
  //       setLeagueData(res);
  //       console.log(
  //         '🚀 ~ file: index.js ~ line 31 ~ React.useEffect ~ res',
  //         res,
  //       );
  //       // console.log(LeagueData)
  //       console.log(
  //         '🚀 ~ file: index.js ~ line 32 ~ React.useEffect ~ LeagueData',
  //         LeagueData,
  //       );
  //       setloader(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  // React.useEffect(() => {
  //   checkInternet();
  //   if (!isInternet) {
  //     ToastAndroid.show('No Internet Connection!', ToastAndroid.SHORT);
  //   }
  // }, [isInternet]);

  //Refresh Leagues Code
  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   checkInternet();

  //   wait(2000).then(() => {
  //     //disable refreshing
  //     setRefreshing(false);
  //   });
  // }, []);

  // if (isInternet === false)
  //   return (
  //     <SafeArea>
  //       <ScrollView
  //         refreshControl={
  //           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  //         }>
  //         <View
  //           style={{
  //             marginTop: '90%',
  //             flex: 1,
  //             alignContent: 'center',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}></View>
  //         <View style={{alignItems: 'center'}}>
  //           <Text
  //             style={{
  //               fontSize: 15,
  //               paddingHorizontal: '7%',
  //               textAlign: 'center',
  //             }}>
  //             Oops! Looks like your device is not connected to the Internet.
  //           </Text>
  //         </View>
  //       </ScrollView>
  //     </SafeArea>
  //   );

  const addToBookmark = () => {};

  return (
    <SafeArea>
      {/* {loader ? (
        <Loader />
      ) : ( */}
      <View style={styles.container}>
        {/* head section */}
        <View>
          <MiniHeader />
        </View>
        <View style={styles.Headsection}>
          <View style={{flexDirection: 'column'}}>
            <InteractParagraph
              p={decodedLeagueTitle}
              Fontsize={20}
              fw={'bold'}
              txt_color={COLORS.dark}
            />
            <InteractParagraph
              p={obj?.obj?.created_on}
              Fontsize={20}
              fw={'bold'}
              txt_color={'#757575'}
            />
          </View>
          {/* <View>
                <Pressable
                style={styles.Headsection__second__right}
                  onPress={() =>
                    colorCHange ? setColorCHange(false) : setColorCHange(true)
                  }>
                  <Ionicons
                    name={colorCHange ? 'bookmark' : 'bookmarks-outline'}
                    size={23}
                    style={{textAlign: 'center', color: COLORS.primary}}
                  />
                </Pressable>
              </View> */}
        </View>
        {/* head section */}
        {/* body section */}

        <ScrollView>
          <View style={{marginTop: 30}}>
            {/* first head */}
            <View>
              <View>
                <InteractParagraph
                  p={'About Story'}
                  fw={'bold'}
                  Fontsize={20}
                  txt_color={COLORS.dark}
                />
              </View>
              <View>
                <InteractParagraph
                  p={decodedLeagueDescription}
                  Fontsize={17}
                  tp={4}
                  txt_color={'#757575'}
                />
              </View>
            </View>
            {/* first head */}
            {/* second head */}
            <View style={{marginTop: 50}}>
              <View>
                <InteractParagraph
                  p={'Rules and Regulations'}
                  fw={'bold'}
                  Fontsize={20}
                  txt_color={COLORS.dark}
                />
              </View>
              <View>
                <InteractParagraph
                  // p={obj?.obj?.term_conditions}
                  p={decodedTermConditions}
                  Fontsize={17}
                  tp={4}
                  txt_color={'#757575'}
                />
              </View>
            </View>
            {/* second head */}
            {/* third head */}
            <View style={{marginTop: 50}}>
              <View>
                <InteractParagraph
                  p={'Deadlines:'}
                  fw={'bold'}
                  Fontsize={20}
                  txt_color={COLORS.dark}
                />
              </View>
              <View>
                <InteractParagraph
                  p={'This Competition runs on the monthly basis.'}
                  Fontsize={17}
                  tp={4}
                  txt_color={'#757575'}
                />
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '35%'}}>
                    <InteractParagraph
                      p={'Start Date :'}
                      Fontsize={17}
                      tp={4}
                      txt_color={'#757575'}
                      fw={'bold'}
                    />
                  </View>
                  <View>
                    <InteractParagraph
                      p={obj?.obj?.created_on}
                      Fontsize={17}
                      tp={4}
                      txt_color={'#757575'}
                      ml={10}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '35%'}}>
                    <InteractParagraph
                      p={'End Date :'}
                      Fontsize={17}
                      tp={4}
                      txt_color={'#757575'}
                      fw={'bold'}
                    />
                  </View>
                  <InteractParagraph
                    p={obj?.obj?.end_date}
                    Fontsize={17}
                    tp={4}
                    txt_color={'#757575'}
                    ml={10}
                  />
                </View>
              </View>
            </View>
            {/* third head */}
            <View style={styles.Footer}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.footericon}>
                  <InteractParagraph
                    p={'Read'}
                    Fontsize={16}
                    txt_color={COLORS.dark}
                  />
                  <Pressable
                    onPress={() => navigation.navigate('title7', {league_id})}>
                    <Icon name="menu-book" size={25} color={COLORS.primary} />
                  </Pressable>
                </View>
                <View style={styles.footericon}>
                  <InteractParagraph
                    p={'Post Story'}
                    Fontsize={16}
                    txt_color={COLORS.dark}
                  />
                  <Pressable
                    onPress={() => navigation.navigate('title6', {league_id})}>
                    <MaterialIcons
                      name="square-edit-outline"
                      size={25}
                      color={COLORS.primary}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* body section */}
      </View>
      {/* )} */}
    </SafeArea>
  );
}
