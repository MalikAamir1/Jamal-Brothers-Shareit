import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Assets/Style/Color';
import AvatarImage from '../../Assets/Images/profile/dummyImg.png';
import Icon1 from '../../Assets/Images/Iconimage/postcircle.png';
import Icon2 from '../../Assets/Images/Iconimage/rating.png';
import starsColored from '../../Assets/Images/Iconimage/starsColored.png';
import Icondark1 from '../../Assets/Images/Iconimage/circle.png';
import Icondark2 from '../../Assets/Images/Iconimage/star.png';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import InteractAvatar from '../../Components/ReusableComponent/Avatar';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {useDispatch, useSelector} from 'react-redux';
import {getRequest, postRequest} from '../../utils/fetch';
// import {BASE_URL} from '../../utils/api';
// import RenderHTML from 'react-native-render-html';
import Loader from '../../Components/ReusableComponent/Loader';
import NetInfo from '@react-native-community/netinfo';
import {RefreshControl} from 'react-native';
import {ToastAndroid} from 'react-native';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import base64 from 'react-native-base64';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';
//Refresh Leagues Code
import {showMessage, hideMessage} from 'react-native-flash-message';
import MiniHeader from '../../Components/MiniHeader';
import {SingleStoryUpdateLocally} from '../../Store/Reducers/SingleStoryReducer';
import Story2 from '../Story2';
import MainHeader from '../../Components/MainHeader';
import Heading from '../../Components/ReusableComponent/Heading';
import RatingStars from '../../Components/RatingStars';
import {getRequestWithOutBody, postRequestWithToken} from '../../App/fetch';
import {BASE_URL} from '../../App/api';
import {ModalView} from '../../Components/Modal';
import {updateStoriesList} from '../../Store/Reducers/StoriesReducer';

export default function Story({route}) {
  // console.log('route.params', route.params.storyData.id);
  const dataFromParams = route.params.storyData;
  console.log('route.params', dataFromParams.id);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [reportText, setReportText] = useState('');
  const [rating, setrating] = useState(0);
  const [like, setLike] = useState(0);
  // console.log('comments', comments);

  const navigation = useNavigation();
  // const reducerData = useSelector(state => state);

  const data = [
    {
      id: 1,
    },
  ];

  const formattedDate = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dataFromParams.league.updated));
  const AuthReducer = useSelector(state => state.AuthReducer);
  const SingleLeague = useSelector(
    state => state.SingleLeague.SingleLeagueData.results[0].id,
  );
  const StoriesReducer = useSelector(
    state => state.StoriesReducer.StoriesList.results,
  );
  const targetStory = StoriesReducer.find(
    story => story.id === dataFromParams.id,
  );

  if (targetStory) {
    // console.log('Found Story:', targetStory);
  } else {
    console.log('Story not found with id:');
  }

  // console.log('SingleLeague: ', SingleLeague);

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.userAuth);
  // console.log('SingleStory:', SingleStory);

  //rating
  const showToast = data => {
    ToastAndroid.show(`${data} Successfully !`, ToastAndroid.SHORT);
  };

  function handleDataSubmit(comment, rating, like) {
    // console.log('Data submitted:', data);
    setCommentText(comment);
    setrating(rating);
    {
      like ? setLike(1) : setLike(0);
    }
    // Add your logic to handle the submitted data here
  }

  console.log('rating', rating);

  function handleReportSubmit(data) {
    // console.log('Data submitted:', data);
    setReportText(data);
    // Add your logic to handle the submitted data here
  }

  function gettingcomments() {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/stories/story-ratings-by-story/?story_id=${route.params.storyData.id}`,
      AuthReducer.userData.token,
    )
      .then(res => {
        setLoading(false);
        // console.log('story-ratings-by-story', res);
        setComments(res.results);
        // console.log('comments', comments);
        // dispatch(SingleLeagueUpdateLocally(result));
      })
      .catch(err => {
        setLoading(false);
        console.log('erroraaaa', err);
      });
  }

  useEffect(() => {
    gettingcomments();
    // console.log('route.params.storyData.id: ', route.params.storyData.id);
  }, []);

  useEffect(() => {
    // console.log('commentTextaaa', commentText);
    // console.log('route.params.storyData.id: ', route.params.storyData.id);
  }, [commentText]);

  useEffect(() => {
    console.log('reportText', reportText);

    var formdata = new FormData();
    formdata.append('story_id', dataFromParams.id);
    formdata.append('comments', reportText);
    setLoading(true);

    postRequestWithToken(
      `${BASE_URL}/stories/add-update-user-story-report/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(res => {
        setLoading(false);
        console.log('report resaaaaa', res);
        // setComments(res.results);
        // console.log('comments', comments);
        // dispatch(SingleLeagueUpdateLocally(result));
      })
      .catch(err => {
        setLoading(false);
        console.log('erroraaaa', err);
      });
    // console.log('route.params.storyData.id: ', route.params.storyData.id);
  }, [reportText]);

  function gettingLeaguesData() {
    getRequestWithOutBody(
      `${BASE_URL}/stories/stories-by-league/?league_id=${SingleLeague}`,
      AuthReducer.userData.token,
    )
      .then(res => {
        setLoading(false);
        // console.log('stories by league', res);
        // setAllLeagueStories(res);
        dispatch(updateStoriesList(res));
        // dispatch(SingleLeagueUpdateLocally(result));
      })
      .catch(err => {
        setLoading(false);
        console.log('erroraaaa', err);
      });
  }

  useEffect(() => {
    // console.log('reportText', reportText);

    var formdata = new FormData();
    formdata.append('story_id', dataFromParams.id);
    formdata.append('comments', commentText);
    formdata.append('is_liked', like);
    formdata.append('rating', rating);
    setLoading(true);

    postRequestWithToken(
      `${BASE_URL}/stories/add-update-user-story-rating/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(res => {
        setLoading(false);
        // console.log('rating res', res);
        gettingLeaguesData();
        gettingcomments();
        // setComments(res.results);
        // console.log('comments', comments);
        // dispatch(SingleLeagueUpdateLocally(result));
      })
      .catch(err => {
        setLoading(false);
        console.log('erroraaaa rating', err);
      });
    // console.log('route.params.storyData.id: ', route.params.storyData.id);
  }, [commentText, rating, like]);

  function BookmarkStory() {
    var formdata = new FormData();

    formdata.append('story_id', dataFromParams.id);

    setLoading(true);
    postRequest(`${BASE_URL}/stories/add-update-user-story-bookmark/`, formdata)
      .then(result => {
        setLoading(false);
        console.log('result: ', result);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  }

  // const RenderStars = () => {
  //   const stars = [];
  //   for (let i = 1; i <= maxStars; i++) {
  //     if (i <= filledStars) {
  //       // Render filled star
  //       stars.push(
  //         <Image
  //           key={i}
  //           source={require('../../Assets/Images/filled.png')}
  //           style={{width: 10, height: 15}}
  //         />,
  //       );
  //     } else {
  //       // Render empty star
  //       stars.push(
  //         <Image
  //           key={i}
  //           source={require('../../Assets/Images/withOutFilled.png')}
  //           style={{width: 10, height: 15}}
  //         />,
  //       );
  //     }
  //   }
  //   return stars;
  // };

  const renderItem = item => {
    return <></>;
  };

  const renderItem2 = item => {
    // console.log('item: ', item?.item?.updated);

    const formattedDateInner = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(item?.item?.updated));
    return (
      <>
        <View>
          <View
            style={{
              backgroundColor: '#535A6C',
              padding: 10,
              borderRadius: 10,
              marginTop: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View>
                {item?.item?.user?.profile_pic ? (
                  <View
                    style={{
                      borderColor: '#F7FFFF',
                      borderWidth: 0.8,
                      borderRadius: 7,
                      width: 31,
                      height: 31,
                      justifyContent: 'center',
                      marginLeft: 5,
                      marginRight: 10,
                    }}>
                    <Image
                      source={{
                        uri: `http://23.26.137.178${item?.item?.user?.profile_pic}`,
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
                ) : (
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
                )}
                {/* <Image
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
                /> */}
              </View>

              <View>
                <Heading
                  mt={-2}
                  // ml={45}
                  Stylefont={'normal'}
                  Fontweight={'400'}
                  Fontsize={14}
                  Heading={item?.item?.user?.first_name}
                  Color={'#7ACCCA'}
                />
                <Heading
                  mt={2}
                  // ml={45}
                  Stylefont={'normal'}
                  Fontweight={'400'}
                  Fontsize={9}
                  Heading={formattedDateInner}
                  Color={'#AAAAAA'}
                  ml={1}
                />
              </View>
            </View>
            <View style={{marginLeft: 47, marginTop: 5}}>
              <Text style={{fontSize: 10, color: '#CBCBCB'}}>
                {item?.item?.comments}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <MainHeader />
        <View
          style={{
            // width: '92%',
            backgroundColor: '#404552',
            marginHorizontal: '4%',
            // height: 100,
            marginVertical: '10%',
            borderRadius: 20,
            padding: 20,
            minHeight: 300,
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              {dataFromParams.user.profile_pic == '' ? (
                <Image
                  source={require('../../Assets/Images/newimages/profile2.png')}
                  // source={{ uri: 'http://23.26.137.178/media/media/john.png'}}
                  style={{
                    width: 31,
                    height: 31,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginLeft: 14,
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
                    marginLeft: 14,
                    marginRight: 10,
                  }}>
                  <Image
                    // source={require('../../Assets/Images/newimages/profile2.png')}
                    source={{
                      uri: `http://23.26.137.178${targetStory.user.profile_pic}`,
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

            <View>
              <Heading
                mt={-2}
                // ml={45}
                Stylefont={'normal'}
                Fontweight={'400'}
                Fontsize={14}
                Heading={
                  targetStory.user.first_name + ' ' + targetStory.user.last_name
                }
                Color={'#7ACCCA'}
              />
              <Heading
                mt={2}
                // ml={45}
                Stylefont={'normal'}
                Fontweight={'400'}
                Fontsize={9}
                Heading={formattedDate}
                Color={'#AAAAAA'}
              />
            </View>
            <View
              style={{
                marginLeft: 'auto',
              }}>
              <Pressable
                onPress={() => {
                  console.log('CLICK');
                  BookmarkStory();
                }}>
                <Image source={require('../../Assets/Images/bookmark.png')} />
              </Pressable>
            </View>
          </View>

          <View style={{marginHorizontal: '4%', marginTop: '4%'}}>
            <Heading
              mt={2}
              // ml={45}
              Stylefont={'normal'}
              Fontweight={'bold'}
              Fontsize={12}
              Heading={'Story Tittle: '}
              Color={'#AAAAAA'}
            />
          </View>

          <View style={{marginHorizontal: '4%', marginTop: '2%'}}>
            <Heading
              mt={2}
              // ml={45}
              Stylefont={'normal'}
              Fontweight={'bold'}
              Fontsize={12}
              Heading={targetStory.title}
              Color={'#7ACCCA'}
            />
          </View>

          <View style={{marginHorizontal: '4%', marginTop: '2%'}}>
            <HTMLView
              value={`<div>${targetStory.content}</div>`}
              stylesheet={stylesForHtmlText}
            />
          </View>

          <View style={{marginHorizontal: '4%'}}>
            <View
              style={{
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                marginVertical: 10, // Adjust the margin as needed
                opacity: 0.1,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => {
                    console.log('Like');
                  }}>
                  <Image
                    source={require('../../Assets/Images/like.png')}
                    style={{width: 13, height: 13}}
                  />
                </Pressable>
                <Text style={{color: '#7ACCCA', fontSize: 12}}>
                  {'  ' + targetStory.likes_sum !== 0 &&
                  targetStory.likes_sum !== null
                    ? '  ' + targetStory.likes_sum
                    : '  ' + 0}
                </Text>
                <Text>{'   '}</Text>
                <Pressable
                  onPress={() => {
                    console.log('comment');
                  }}>
                  <Image
                    source={require('../../Assets/Images/comment.png')}
                    resizeMode="contain"
                    style={{width: 13, height: 13}}
                  />
                </Pressable>
                <Text style={{color: '#7ACCCA', fontSize: 12}}>
                  {'  ' + targetStory.comments_sum !== 0 &&
                  targetStory.comments_sum !== null
                    ? '  ' + targetStory.comments_sum
                    : ' ' + 0}
                </Text>
                <Text>{'   '}</Text>
                <Pressable
                  onPress={() => {
                    setSecondModalVisible(true);
                  }}>
                  <Image
                    source={require('../../Assets/Images/report.png')}
                    style={{width: 15, height: 15}}
                  />
                </Pressable>
                <Text style={{color: '#7ACCCA', fontSize: 12}}>
                  {'  ' + targetStory.reports_sum !== 0 &&
                  targetStory.reports_sum !== null
                    ? '  ' + targetStory.reports_sum
                    : ' ' + 0}
                </Text>

                <Text>{'  '}</Text>
                <Pressable
                  onPress={() => {
                    console.log('report');
                  }}>
                  <Image
                    source={require('../../Assets/Images/view.png')}
                    style={{width: 14, height: 14}}
                    resizeMode="contain"
                  />
                </Pressable>
                <Text style={{color: '#7ACCCA', fontSize: 12}}>
                  {'  ' + targetStory.views_sum !== 0 &&
                  targetStory.views_sum !== null
                    ? '  ' + targetStory.likes_sum
                    : '  ' + 0}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                <RatingStars rating={targetStory.rating_avg} />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const ListHeaderComponent2 = () => {
    return (
      <>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}>
          <View style={{alignItems: 'flex-end'}}>
            <Image
              source={require('../../Assets/Images/commentoutline.png')}
              style={{width: 15, height: 15}}
            />
          </View>
        </Pressable>
      </>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <>
        <View>
          <View
            style={{
              backgroundColor: '#535A6C',
              padding: 20,
              borderRadius: 10,
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../../Assets/Images/nocomment.png')} />
            <Heading
              mt={10}
              // ml={45}
              Stylefont={'normal'}
              Fontweight={'400'}
              Fontsize={15}
              Heading={'No Comment Yet !'}
              Color={'#7ACCCA'}
            />
          </View>
        </View>
      </>
    );
  };

  const ListFooterComponent = () => {
    return (
      <>
        <View
          style={{
            // width: '92%',
            backgroundColor: '#373B44',
            marginHorizontal: '4%',
            borderRadius: 20,
            padding: 20,
            // minHeight: 200,
            justifyContent: 'space-between',
            flexDirection: 'column',
            // paddingBottom:1000
            marginBottom: 30,
          }}>
          <FlatList
            data={comments}
            ListHeaderComponent={ListHeaderComponent2}
            // ListFooterComponent={ListFooterComponent}
            renderItem={renderItem2}
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <ImageBackground
          source={require('../../Assets/Images/newimages/bgImg2.png')}
          resizeMode="cover"
          style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size="large" color="#7ACCCA" />
          </View>
        </ImageBackground>
      ) : (
        <>
          <ModalView
            set={setModalVisible}
            get={modalVisible}
            suggestion={[
              ' Nice',
              ' Memorable Moments',
              ' WOW',
              ' Storyteller Hub',
              ' Relate',
              ' Great Experience',
              ' Heartfelt Histories',
              ' Inspiring',
              ' Good Story',
            ]}
            cross={() => setModalVisible(false)}
            txt={'Comment'}
            onDataSubmit={(comment, rating, like) =>
              handleDataSubmit(comment, rating, like)
            }
            btnText={'Submit'}
            yes={() => {
              setModalVisible(false);
            }}
            modalType={true}
          />

          <ModalView
            set={setSecondModalVisible}
            get={secondModalVisible}
            suggestion={[
              ' Spam',
              ' Hate Speech',
              ' Illegal',
              ' Copywrite',
              ' Scam',
              ' Sucide or Self injury',
              ' Something Else',
            ]}
            cross={() => setSecondModalVisible(false)}
            txt={'Report'}
            btnText={'Report'}
            onDataSubmit={handleReportSubmit}
            yes={() => {
              setSecondModalVisible(false);
            }}
            modalType={false}
          />

          <SafeArea>
            <FlatList
              data={data}
              ListHeaderComponent={ListHeaderComponent}
              ListFooterComponent={ListFooterComponent}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </SafeArea>
        </>
      )}
    </>
  );
}

const stylesForHtmlText = StyleSheet.create({
  // a: {
  //   fontWeight: '300',
  //   color: 'coral', // make links coloured pink
  // },
  div: {
    color: '#CBCBCB',
    fontSize: 12,
  },
  p: {
    color: '#CBCBCB',
  },
  // dark: {
  //   color: 'pink',
  // },
});
