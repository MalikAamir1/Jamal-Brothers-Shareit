import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../Assets/Style/Color';
import coins from '../../Assets/Images/Header/coins.png';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import Heading from '../../Components/ReusableComponent/Heading';
import styles from './style';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {FlatList, ScrollView, Swipeable} from 'react-native-gesture-handler';
import avt from '../../Assets/Images/AvtarImages/avt.png';
import {Avatar, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import MiniHeader from '../../Components/MiniHeader';
import {useDispatch, useSelector} from 'react-redux';
import {getCoinsHistory} from '../../Store/Reducers/CoinHistoryReducer';
import Loader from '../../Components/ReusableComponent/Loader';
import NetInfo from '@react-native-community/netinfo';
import {showError} from '../../utils/PopupFunctions';
import MainHeader from '../../Components/MainHeader';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ContextPrizes = () => {
  const [refreshing, setRefreshing] = useState(false);
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);
  const [isOffline, setOfflineStatus] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.userAuth);
  // const {CoinsHistory, userAuth} = useSelector(state => state);
  const CoinsHistory = useSelector(state => state.CoinsHistory);
  const [first, setfirst] = useState([
    {
      coins: '1,000',
      buyRate: 1000,
    },
    {
      coins: '2,000',
      buyRate: 2000,
    },
    {
      coins: '3,000',
      buyRate: 3000,
    },
    {
      coins: '4,000',
      buyRate: 4000,
    },
    {
      coins: '5,000',
      buyRate: 5000,
    },
    {
      coins: '6,000',
      buyRate: 6000,
    },
    {
      coins: '7,000',
      buyRate: 7000,
    },
    {
      coins: '8,000',
      buyRate: 8000,
    },
  ]);
  const [second, setSecond] = useState([
    {
      status: 'up',
      price: 1000,
      buyRate: 1000,
      date: '29 Jun 2022',
    },
    {
      status: 'down',
      price: 2000,
      buyRate: 2000,
      date: '19 July 2023',
    },
    {
      status: 'up',
      price: 3000,
      buyRate: 3000,
      date: '09 Aug 2024',
    },
    {
      status: 'down',
      price: 4000,
      buyRate: 4000,
      date: '15 Jan 2025',
    },
    {
      status: 'up',
      price: 5000,
      buyRate: 5000,
      date: '29 Sepn 2022',
    },
    {
      status: 'up',
      price: 1000,
      buyRate: 1000,
      date: '29 Jun 2022',
    },
    {
      status: 'down',
      price: 2000,
      buyRate: 2000,
      date: '19 July 2023',
    },
    {
      status: 'up',
      price: 3000,
      buyRate: 3000,
      date: '09 Aug 2024',
    },
    {
      status: 'down',
      price: 4000,
      buyRate: 4000,
      date: '15 Jan 2025',
    },
    {
      status: 'up',
      price: 5000,
      buyRate: 5000,
      date: '29 Sepn 2022',
    },
    {
      status: 'down',
      price: 4000,
      buyRate: 4000,
      date: '15 Jan 2025',
    },
    {
      status: 'up',
      price: 5000,
      buyRate: 5000,
      date: '29 Sepn 2022',
    },
  ]);
  console.log('CoinsHistory:', CoinsHistory);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const getCoins = () => {
    let obj = {
      userid: userAuth?.userData?.userId,
    };
    dispatch(getCoinsHistory(obj));
  };
  // useEffect(() => {
  //   getCoins();
  // }, []);
  console.log('isOffline', isOffline);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    getCoins();
    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    if (isOffline) {
      showError('Please check your Internet');
    }
  }, [isOffline]);

  return (
    <SafeArea>
      {isOffline ? (
        <View style={styles.statusBox}>
          <View>
            <Text style={styles.statusText}>
              Please check your internet and try again
            </Text>
          </View>
        </View>
      ) : (
        <>
          <MainHeader title={'Coins'} />
          <ScrollView
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }>
            <View style={{flex: 1}}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: '5%',
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}>
                {/* <Header cen={'Coins'} /> */}
                {/* <MiniHeader title={'Coins'} /> */}

                <View style={styles.box}>
                  <Pressable
                    onPress={() => setTab(0)}
                    style={[
                      styles.tabTitle,
                      tab === 0 && styles.isFocusHeading,
                    ]}>
                    <Text
                      style={[
                        styles.tabHeadings,
                        // {
                        // color:
                        //   tab === 0
                        //     ? COLORS.primary
                        //     : isDark?.isdark
                        //     ? COLORS.white
                        //     : COLORS.border_color,
                        // },
                      ]}>
                      Coin Deals
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setTab(1)}
                    style={[
                      styles.tabTitle,
                      tab === 1 && styles.isFocusHeading,
                    ]}>
                    <Text
                      style={[
                        styles.tabHeadings,
                        // {
                        //   color:
                        //     tab === 1
                        //       ? COLORS.primary
                        //       : isDark?.isdark
                        //       ? COLORS.white
                        //       : COLORS.border_color,
                        // },
                      ]}>
                      Purchase History
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setTab(2)}
                    style={[
                      styles.tabTitle,
                      tab === 2 && styles.isFocusHeading,
                    ]}>
                    <Text
                      style={[
                        styles.tabHeadings,
                        // {
                        //   color:
                        //     tab === 2
                        //       ? COLORS.primary
                        //       : isDark?.isdark
                        //       ? COLORS.white
                        //       : COLORS.border_color,
                        // },
                      ]}>
                      Used History
                    </Text>
                  </Pressable>
                </View>
                {tab === 0 && (
                  <>
                    <View>
                      <Heading
                        mt={5}
                        Stylefont={'normal'}
                        Fontweight={'700'}
                        Fontsize={15}
                        Heading={'Coins Deal'}
                        Color={'#FFFFFF'}
                        wd={'28%'}
                      />
                    </View>
                    <Divider
                      style={{
                        marginTop: '4%',
                        height: 2,
                        color: '#8F9095',
                        opacity: 0.5,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 20,
                      }}>
                      {first.map((item, key) => {
                        return (
                          <Pressable
                            key={key}
                            onPress={() =>
                              navigation.navigate('paymentmethod')
                            }>
                            {/* <View
                            key={key}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignContent: 'space-between',
                              backgroundColor: COLORS.primary,
                              marginVertical: '2%',
                              padding: '2%',
                              borderRadius: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 120,
                                alignContent: 'center',
                                alignSelf: 'center',
                              }}>
                              <View>
                                <Image
                                  source={coins}
                                  style={{width: 33, height: 25}}
                                />
                              </View>
                              <View>
                                <InteractParagraph
                                  p={item.coins}
                                  colors={COLORS.white}
                                  Fontsize={19}
                                  fw={'700'}
                                  txtAlign={'center'}
                                  just={'center'}
                                  algnSlf={'center'}
                                  mt={'5%'}
                                />
                              </View>
                              <View>
                                <Ionicons
                                  name={
                                    item.status == 'up'
                                      ? 'arrow-down-outline'
                                      : 'arrow-up-outline'
                                  }
                                  style={{fontWeight: 'bold'}}
                                  color={
                                    item.status == 'up'
                                      ? COLORS.green
                                      : COLORS.btnred
                                  }
                                  size={25}
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: COLORS.btnBg,
                                paddingHorizontal: 20,
                                borderRadius: 5,
                                paddingVertical: 2,
                                margin: -3,
                              }}>
                              <View>
                                <InteractParagraph
                                  p={'Buy'}
                                  colors={COLORS.white}
                                  Fontsize={18}
                                  fw={'bold'}
                                  txtAlign={'center'}
                                />
                              </View>
                              <View>
                                <InteractParagraph
                                  p={`$${item.buyRate}`}
                                  colors={COLORS.dark}
                                  Fontsize={14}
                                  fw={'bold'}
                                />
                              </View>
                            </View>
                          </View> */}
                            <View style={styles.firstTabList}>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  source={require('../../Assets/Images/newimages/coinsdeals.png')}
                                  style={{
                                    width: 77,
                                    height: 77,
                                    // alignContent: 'center',
                                    // alignItems: 'center',
                                    // alignSelf: 'center',
                                    marginTop: 6,

                                    marginLeft: 3,
                                  }}
                                />
                                <View>
                                  <Heading
                                    // mt={0}
                                    // ml={45}
                                    // Stylefont={'normal'}
                                    Fontweight={'600'}
                                    Fontsize={15}
                                    Heading={item.coins + ' coins'}
                                    Color={'#FFFFFF'}
                                    mt={15}
                                    ml={-10}
                                  />
                                  <Heading
                                    // mt={0}
                                    // ml={45}
                                    Stylefont={'normal'}
                                    Fontweight={'600'}
                                    Fontsize={12}
                                    Heading={'Buy Now'}
                                    Color={'#373B44'}
                                    txtAlign={'center'}
                                    mt={5}
                                  />
                                  <Heading
                                    // mt={0}
                                    // ml={45}
                                    Stylefont={'normal'}
                                    Fontweight={'500'}
                                    Fontsize={12}
                                    Heading={'$ ' + item.buyRate}
                                    Color={'#373B44'}
                                    txtAlign={'center'}
                                  />
                                </View>
                              </View>
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  </>
                )}
                {tab === 1 && (
                  <>
                    <View>
                      {/* <Heading
                        mt={5}
                        Stylefont={'normal'}
                        Fontweight={'700'}
                        Fontsize={18}
                        // txtAlign={'right'}
                        Heading={'History'}
                        // Color={COLORS.dark}
                        wd={'28%'}
                      /> */}
                      <Heading
                        mt={5}
                        Stylefont={'normal'}
                        Fontweight={'700'}
                        Fontsize={15}
                        Heading={'History'}
                        Color={'#FFFFFF'}
                        wd={'28%'}
                      />
                    </View>
                    <Divider
                      style={{
                        marginTop: '4%',
                        height: 2,
                        color: '#8F9095',
                        opacity: 0.5,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 20,
                        marginHorizontal: -2,
                      }}>
                      {second.map((item, key) => {
                        return (
                          // <Pressable
                          //   key={key}
                          //   style={{
                          //     flexDirection: 'row',
                          //     justifyContent: 'space-between',
                          //     alignContent: 'space-between',
                          //     backgroundColor: COLORS.primary,
                          //     marginVertical: '2%',
                          //     padding: '2%',
                          //     borderRadius: 10,
                          //   }}>
                          //   <View
                          //     style={{
                          //       paddingHorizontal: 20,
                          //       borderRadius: 5,
                          //       paddingVertical: 2,
                          //       margin: -3,
                          //     }}>
                          //     <View style={{flexDirection: 'row'}}>
                          //       <InteractParagraph
                          //         p={'Buy Coins '}
                          //         colors={COLORS.white}
                          //         Fontsize={18}
                          //         fw={'bold'}
                          //         txtAlign={'center'}
                          //       />
                          //       <Ionicons
                          //         name={
                          //           item.status == 'up'
                          //             ? 'arrow-up-circle-sharp'
                          //             : 'arrow-down-circle-sharp'
                          //         }
                          //         style={{fontWeight: 'bold'}}
                          //         color={
                          //           item.status == 'up'
                          //             ? COLORS.green
                          //             : COLORS.btnred
                          //         }
                          //         size={22}
                          //       />
                          //     </View>
                          //     <View>
                          //       <InteractParagraph
                          //         p={`${item.price}`}
                          //         colors={COLORS.white}
                          //         Fontsize={14}
                          //         fw={'bold'}
                          //       />
                          //     </View>
                          //   </View>
                          //   <View
                          //     style={{
                          //       paddingHorizontal: 20,
                          //       borderRadius: 5,
                          //       paddingVertical: 2,
                          //       margin: -3,
                          //     }}>
                          //     <View>
                          //       <InteractParagraph
                          //         p={item.date}
                          //         colors={COLORS.white}
                          //         Fontsize={14}
                          //         fw={'bold'}
                          //         txtAlign={'center'}
                          //       />
                          //     </View>
                          //     <View>
                          //       <InteractParagraph
                          //         p={`$${item.buyRate}`}
                          //         colors={COLORS.white}
                          //         Fontsize={14}
                          //         fw={'bold'}
                          //         algnSlf={'flex-end'}
                          //       />
                          //     </View>
                          //   </View>
                          // </Pressable>
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: 170.04,
                                height: 60,
                                backgroundColor: '#994E9F',
                                borderRadius: 10,
                                margin: 4,
                                marginVertical: 10,
                                // marginLeft: 7,
                              }}>
                              <View style={{padding: 7, marginLeft: 5}}>
                                <Heading
                                  // mt={0}
                                  // ml={45}
                                  Stylefont={'normal'}
                                  Fontweight={'600'}
                                  Fontsize={14}
                                  Heading={'Buy Coins'}
                                  Color={'#FFFFFF'}
                                  txtAlign={'left'}
                                  mt={5}
                                />
                                <Heading
                                  // mt={0}
                                  // ml={45}
                                  Stylefont={'normal'}
                                  Fontweight={'500'}
                                  Fontsize={12}
                                  Heading={'$ ' + item.buyRate}
                                  Color={'#FFFFFF'}
                                  txtAlign={'left'}
                                />
                              </View>
                              <View
                                style={{marginLeft: 'auto', marginRight: 13}}>
                                {item.status == 'up' ? (
                                  <Image
                                    source={require('../../Assets/Images/newimages/purchaseUp.png')}
                                    style={{
                                      width: 14.39,
                                      height: 14,
                                      marginTop: 6,

                                      marginLeft: 'auto',
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={require('../../Assets/Images/newimages/purchaseDown.png')}
                                    style={{
                                      width: 14.39,
                                      height: 14,
                                      marginTop: 6,

                                      marginLeft: 'auto',
                                    }}
                                  />
                                )}
                                <Heading
                                  // mt={0}
                                  // ml={45}
                                  Stylefont={'normal'}
                                  Fontweight={'600'}
                                  Fontsize={10}
                                  Heading={item.date}
                                  Color={'#FFFFFF'}
                                  txtAlign={'right'}
                                  mt={5}
                                />
                                <Heading
                                  // mt={0}
                                  // ml={45}
                                  Stylefont={'normal'}
                                  Fontweight={'500'}
                                  Fontsize={12}
                                  Heading={'$ ' + item.buyRate}
                                  Color={'#FFFFFF'}
                                  txtAlign={'right'}
                                />
                              </View>
                            </View>
                          </>
                        );
                      })}
                    </View>
                  </>
                )}
                {tab === 2 && (
                  <>
                    {CoinsHistory?.coinsHistory?.status === 'pending' ? (
                      <Loader />
                    ) : (
                      <>
                        <View>
                          <Heading
                            mt={5}
                            Stylefont={'normal'}
                            Fontweight={'700'}
                            Fontsize={18}
                            Heading={'Used Coins History'}
                            // txtAlign={'right'}
                            // Color={COLORS.dark}
                            // wd={'28%'}
                          />
                        </View>
                        <Divider style={{marginTop: '2%'}} />
                        {CoinsHistory?.coinsHistory.map((item, key) => {
                          return (
                            <Pressable
                              key={key}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'space-between',
                                backgroundColor: COLORS.primary,
                                marginVertical: '2%',
                                padding: '2%',
                                borderRadius: 10,
                              }}>
                              <View
                                style={{
                                  paddingHorizontal: 20,
                                  borderRadius: 5,
                                  paddingVertical: 2,
                                  margin: -3,
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                  <InteractParagraph
                                    p={'Used Coins'}
                                    colors={COLORS.white}
                                    Fontsize={18}
                                    fw={'bold'}
                                    txtAlign={'center'}
                                  />
                                  {/* <Ionicons
                            name={
                              item.status == 'up'
                                ? 'arrow-up-circle-sharp'
                                : 'arrow-down-circle-sharp'
                            }
                            style={{fontWeight: 'bold'}}
                            color={
                              item.status == 'up' ? COLORS.green : COLORS.btnred
                            }
                            size={22}
                          /> */}
                                </View>
                                <View>
                                  <InteractParagraph
                                    p={`${item.amount}`}
                                    colors={COLORS.white}
                                    Fontsize={14}
                                    fw={'bold'}
                                  />
                                </View>
                              </View>
                              <View
                                style={{
                                  paddingHorizontal: 20,
                                  borderRadius: 5,
                                  paddingVertical: 2,
                                  margin: -3,
                                }}>
                                <View>
                                  <InteractParagraph
                                    p={item.date}
                                    colors={COLORS.white}
                                    Fontsize={14}
                                    fw={'bold'}
                                    txtAlign={'center'}
                                  />
                                </View>
                                <View>
                                  <InteractParagraph
                                    p={`${item.detail}`}
                                    colors={COLORS.white}
                                    Fontsize={14}
                                    fw={'bold'}
                                    algnSlf={'flex-end'}
                                  />
                                </View>
                              </View>
                            </Pressable>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeArea>
  );
};

export default ContextPrizes;
