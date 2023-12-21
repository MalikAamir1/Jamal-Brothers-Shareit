import {useNavigation} from '@react-navigation/native';
import MainHeader from '../../Components/MainHeader';
import RatingStars from '../../Components/RatingStars';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import HTMLView from 'react-native-htmlview';
import {FlatList} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { getRequestWithOutBody } from '../../App/fetch';
import { BASE_URL } from '../../App/api';

const {View, Image, Text, StyleSheet, RefreshControl} = require('react-native');



const Bookmark = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [bookmarks, setBookmarks] = useState();
  console.log('AuthReducer', AuthReducer.userData.token)


  function gettingData() {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/stories/story-bookmarks-by-user`,
      AuthReducer.userData.token,
    )
      .then(result => {
        setLoading(false);
        console.log('result on bookmark', result);
        setBookmarks(result)
      })
      .catch(error => {
        setloader(false);
        console.log('errorbbbbb', error);
      });
  }

  useEffect(() => {
    // setloader(true);
    gettingData();
  }, [AuthReducer]);

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
            marginTop: 20
          }}
        />
        <Heading
          mt={10}
          // Stylefont={'normal'}
          Fontweight={500}
          Fontsize={12}
          Heading={'No Bookmark Story'}
          Color={'#FFFFFF'}
          // mb={7}
        />
      
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    const formattedDate = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(item.updated));
    console.log('item in MY STORIES PUBLISH PORTION: ', item);
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
          <View style={{flexDirection: 'row', marginTop: 2}}>
            <View style={{marginLeft: 5}}>
              <Heading
                // ml={45}
                Stylefont={'normal'}
                Fontweight={'400'}
                Fontsize={15.65}
                Heading={item.story.title.slice(
                  0,
                  30,
                )}
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
              <View style={{minWidth: 327}}>
                <Text style={{marginTop: 8,}}>
                  <HTMLView
                    stylesheet={stylesshow}
                    value={`<div style="color:green">${item.story.content.slice(
                      0,
                      50,
                    )}...<a href='bookmarkStory'>Read more</a></div>`}
                    onLinkPress={url => {
                      // Handle the link press here
                      if (url === 'bookmarkStory') {
                        navigation.navigate('bookmarkStory', {
                          storyData: item,
                        });
                      }
                    }}
                  />
                </Text>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              position: 'absolute',
              bottom: 15,
              // marginBottom: -6,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', marginLeft: 18}}>
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
                    Heading={item.likes}
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
                    Heading={item.views}
                    Color={'#7ACCCA'}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: -6,
                  left: 155,
                }}>
                <RatingStars rating={item.rating} />
              </View>
            </View>
          </View> */}
        </View>
      </>
    );
  };
  return (
    <>
      <SafeArea>
        <View style={{flex: 1}}>
          <MainHeader title={'Bookmarks'} />

          <FlatList
            style={{marginBottom: 70}}
            data={bookmarks?.results || []}
            ListEmptyComponent={ListEmptyComponent} // Rendered when the list is empty
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  // setRefreshing(true); // Start the refresh animation
                //   gettingLeaguesData(); // Fetch new data
                }}
              />
            }
            // ListHeaderComponent={<ListHeaderComponent />}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            // stickyHeaderIndices={[0]}
          />
        </View>
      </SafeArea>
    </>
  );
};

export default Bookmark;

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
