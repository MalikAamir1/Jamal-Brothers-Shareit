import {useNavigation} from '@react-navigation/native';
import MainHeader from '../../Components/MainHeader';
import RatingStars from '../../Components/RatingStars';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import HTMLView from 'react-native-htmlview';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';

const {View, Image, Text, StyleSheet, RefreshControl} = require('react-native');

const Bookmark = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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
    <>
      <SafeArea>
        <View style={{flex: 1}}>
          <MainHeader title={'Bookmarks'} />

          <FlatList
            style={{marginBottom: 70}}
            // data={allLeagueStories?.results || []}
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
