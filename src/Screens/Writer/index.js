import React, {useState, useEffect} from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../Assets/Style/Color';
import coins from '../../Assets/Images/Header/coins.png';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import Heading from '../../Components/ReusableComponent/Heading';
import styles from './style';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {ScrollView, Swipeable} from 'react-native-gesture-handler';
import avt from '../../Assets/Images/AvtarImages/avt.png';
import {Avatar} from 'react-native-paper';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {useSelector, useDispatch} from 'react-redux';
// import {CreateStory} from '../../redux/reducers/story';
import {postRequest} from '../../utils/fetch';
import {BASE_URL} from '../../utils/api';
import Loader from '../../Components/ReusableComponent/Loader';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import MiniHeader from '../../Components/MiniHeader';
import {GetCoin} from '../../Store/Reducers/CoinReducer';

const Writer = ({route}) => {
  const {league_id} = route.params;
  console.log('league_id', league_id);
  const richText = React.useRef();
  // const {createstry} = useSelector(state => state);
  const dispatch = useDispatch();
  // const {reducerData} = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);
  const [text, setText] = React.useState('');
  const [expanded1, setExpanded1] = React.useState(false);
  const handlePress1 = () => setExpanded1(!expanded1);
  const [expanded2, setExpanded2] = React.useState(false);
  const handlePress2 = () => setExpanded2(!expanded2);
  const [descHTML, setDescHTML] = React.useState('');
  const [showDescError, setShowDescError] = React.useState(false);
  const [toolbarShown, setToolbarShown] = useState(true);

  // ==================Date========================
  const [date, setDate] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    setDate(date);
  }, []);
  // ==================Date========================

  // const {
  //   userAuth,
  //   // leagues,
  //   SingleLeague: {SingleLeagueData},
  // } = useSelector(state => state);
  const userAuth = useSelector(state => state.userAuth);
  const SingleLeague = useSelector(state => state.SingleLeague);
  console.log('LeaguesData in Add Post:', SingleLeague.SingleLeagueData);

  const richTextHandle = descriptionText => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML('');
    }
  };
  // const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
  //   const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();
  // console.log("replaceHtml:",`${btoa(descHTML)}`)

  const submitContentHandle = async () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      try {
        setloader(true);
        // console.log(
        //   'writerid: ',
        //   userAuth.userData.userId,
        //   'story:',
        //   `${btoa(descHTML)}`,
        //   'leagueid:',
        //   id,
        //   'statusid:',
        //   2,
        // );
        console.log('DescHtml:', descHTML);
        await postRequest(`${BASE_URL}/addstory.php`, {
          writerid: userAuth.userData.userId,
          story: base64.encode(descHTML),
          leagueid: league_id,
          statusid: 2,
          // Title: userAuth.userData.name
          //   ? userAuth.userData.name
          //   : userAuth.userData.username,
          // Thumbnail: userAuth.userData.profile_pic,
          // Rating: [0, 1, 2, 3, 4, 5],
          // Monitor_Rating: [0, 1, 2, 3, 4, 5],
          // Admin_Rating: 12345,
          // Liked: 12345,
          // Report: 12345,
          // Comments: [1, 2, 3, 4, 5],
          // Ranking: 0,
          // Win: [1, 2, 3, 4, 5],
        }).then(res => {
          console.log(res);
          dispatch(GetCoin({writer_id: userAuth.userData.userId}));
          if (res[0].status == 'true') {
            // setshow(false);
            // setToolbarShown(false)
            setloader(false);
            alert('Story Created Successfully');
            // navigation.navigate('title1');
          } else if (
            res[0].message == 'you have not enough coins to post story.'
          ) {
            alert(
              'You have not enough Coins to post story. please recharge your Coins to participate',
            );
          } else {
            showMessage({
              message: 'else Something went wrong',
              type: 'danger',
              color: 'white',
            });
          }
        });
      } catch (err) {
        setloader(false);
        showMessage({
          message: 'Something went wrong',
          type: 'danger',
          color: 'white',
        });
        console.log(err);
      }
    }
  };
  const [show, setshow] = React.useState(false);
  const [loader, setloader] = React.useState(false);

  const onPressFunction = () => {
    if (show) {
      setshow(false);
    } else {
      setshow(true);
    }
  };
  const navigation = useNavigation();
  // console.log(createStoryReducer);

  return (
    <SafeArea>
      {loader ? (
        <Loader />
      ) : (
        <ScrollView style={{flex: 1}}>
          <Pressable
            onPress={() => {
              // Keyboard.dismiss;
              console.log('writer keyboard working');
            }}
            style={{flex: 1}}
            // accessible= {false}
          >
            <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
              <View style={{flex: 1, paddingBottom: '20%'}}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: '5%',
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                  }}>
                  {/* <Header cen={'Add Post'} /> */}
                  <MiniHeader title={'Add Post'} />
                </View>

                <View>
                  <Heading
                    mt={'2%'}
                    ml={'5%'}
                    Stylefont={'normal'}
                    Fontweight={'700'}
                    Fontsize={18}
                    Heading={'Add Post'}
                  />
                </View>

                <ScrollView>
                  <SafeAreaView
                    edges={['bottom', 'left', 'right']}
                    style={{flex: 1}}>
                    <View
                      style={[
                        styles.container,
                        {
                          backgroundColor: isDark?.isdark
                            ? 'transparent'
                            : 'transparent',
                        },
                      ]}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          paddingVertical: '2%',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            padding: 0,
                            flexDirection: 'row',
                          }}>
                          {/* <Avatar.Image
                            size={45}
                            source={{uri: userAuth.userData.profile_pic}}
                          /> */}
                          <View
                            style={{
                              flexDirection: 'column',
                              marginHorizontal: '4%',
                            }}>
                            <InteractParagraph
                              p={
                                userAuth.userData.name
                                  ? userAuth.userData.name
                                  : userAuth.userData.username
                              }
                              // colors={COLORS.dark}
                              Fontsize={16}
                              fw={'bold'}
                            />
                            <InteractParagraph
                              p={date}
                              Fontsize={12}
                              fw={'bold'}
                            />
                          </View>
                        </View>
                        <Pressable
                          onPress={onPressFunction}
                          style={{alignItems: 'center', alignSelf: 'center'}}>
                          <View
                            style={{alignItems: 'center', alignSelf: 'center'}}>
                            <Icon
                              name={'square-edit-outline'}
                              style={{fontWeight: '1300'}}
                              color={COLORS.sign_In_btn_bg_clr}
                              size={25}
                            />
                          </View>
                        </Pressable>
                      </View>
                      <View style={styles.richTextContainer}>
                        <View></View>
                        {/* {toolbarShown && ( */}
                        <KeyboardAvoidingView
                          behavior={
                            Platform.OS === 'ios' ? 'padding' : 'height'
                          }
                          style={{flex: 1}}>
                          <RichEditor
                            ref={richText}
                            onChange={richTextHandle}
                            placeholder="Please type something."
                            // androidHardwareAccelerationDisabled={true}
                            style={styles.richTextEditorStyle}
                            initialHeight={200}
                          />
                        </KeyboardAvoidingView>
                        {/* )} */}
                        {show ? (
                          <RichToolbar
                            editor={richText}
                            selectedIconTint={COLORS.primary}
                            iconTint="#312921"
                            actions={[
                              actions.setBold,
                              actions.undo,
                              actions.redo,
                              actions.setItalic,
                              actions.insertBulletsList,
                              actions.setStrikethrough,
                              actions.setUnderline,
                            ]}
                            style={styles.richTextToolbarStyle}
                          />
                        ) : null}

                        {showDescError && (
                          <Text style={styles.errorTextStyle}>
                            Please Enter Something
                          </Text>
                        )}
                      </View>

                      <View>
                        <InteractParagraph
                          pAlign={'center'}
                          txtAlign={'center'}
                          p={`Note: You will be charge ${SingleLeague.SingleLeagueData?.charges} coins against each post`}
                          Fontsize={13}
                          fw={'bold'}
                        />
                      </View>

                      <TouchableOpacity
                        style={styles.saveButtonStyle}
                        onPress={submitContentHandle}>
                        <Text style={styles.textButtonStyle}>Post Story</Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View>{createStoryReducer}</View> */}
                  </SafeAreaView>
                </ScrollView>
              </View>
            </Pressable>
          </Pressable>
        </ScrollView>
      )}
    </SafeArea>
  );
};

export default Writer;
