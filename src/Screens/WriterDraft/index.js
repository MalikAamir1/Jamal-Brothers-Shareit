import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Platform,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TextInput,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../Assets/Style/Color';
import coins from '../../Assets/Images/Header/coins.png';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import Heading from '../../Components/ReusableComponent/Heading';
import styles from './style';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {ScrollView, Swipeable} from 'react-native-gesture-handler';
import avt from '../../Assets/Images/profile/dummyImg.png';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {useDispatch, useSelector} from 'react-redux';
import MiniHeader from '../../Components/MiniHeader';
import {getDraftStories} from '../../Store/Reducers/DraftStoriesReducer';
import base64 from 'react-native-base64';
import Modal from 'react-native-modal';
import SearchableDropDown from 'react-native-searchable-dropdown';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {HEIGHT, WIDTH} from '../../utils/globelVariables';
import {postRequest} from '../../utils/fetch';
import {GetCoin} from '../../Store/Reducers/CoinReducer';
import {showMessage} from 'react-native-flash-message';
import Loader from '../../Components/ReusableComponent/Loader';
import SaveStoriesCard from '../../Components/SaveStoriesCard';
import {getBookmarkStories} from '../../Store/Reducers/BookmarkStoriesReducer';
import {getStoriesList} from '../../Store/Reducers/StoriesReducer';
import MainHeader from '../../Components/MainHeader';
import Input from '../../Components/ReusableComponent/Input';
import DropdownComponent from '../../Components/ReusableComponent/Dropdown';
import {getRequestWithOutBody, postRequestWithToken} from '../../App/fetch';
import {BASE_URL} from '../../App/api';
import {MyUserStoriesUpdateLocally} from '../../Store/Reducers/UserStoriesReducer';

const WriterDraft = () => {
  const richText = useRef();
  const swipeableRef = useRef(null);
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorDesc, setErrorDesc] = useState('');
  const [descHTML, setDescHTML] = useState('');
  const [plainText, setPlainText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [valInd, setValInd] = useState(null);
  const [selectedStory, setSelectedStory] = useState('');
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.userAuth);
  const leagues = useSelector(state => state.leagues);
  const DraftStories = useSelector(state => state.DraftStories);
  const isDark = useSelector(state => state.isDark);
  const BookmarkStoriesList = useSelector(state => state.BookmarkStoriesList);
  const SingleLeague = useSelector(
    state => state.SingleLeague.SingleLeagueData.results[0],
  );
  const AuthReducer = useSelector(state => state.AuthReducer);
  // const {userAuth, DraftStories, leagues, isDark, BookmarkStoriesList} =
  //   useSelector(state => state);
  console.log('BookmarkStoriesList:', BookmarkStoriesList);
  const isFocus = useIsFocused();
  const [date, setDate] = useState(null);
  console.log('SingleLeague', SingleLeague);
  // console.log('userAuth', userAuth?.userData?.userId);
  const [leaguearray, setLeaguearray] = useState([]);
  const [text, setText] = useState('<h1>data</h1> ');
  const [expanded1, setExpanded1] = useState(false);
  const handlePress1 = () => setExpanded1(!expanded1);

  const [expanded2, setExpanded2] = useState(false);
  const handlePress2 = () => setExpanded2(!expanded2);

  const [showDescError, setShowDescError] = useState(false);
  const [userStories, setUserStories] = React.useState();
  const [arrayDraft, setArrayDraft] = useState([]);
  const [arraySaveStories, setarraySaveStories] = useState(
    BookmarkStoriesList?.BookmarkStories,
  );
  const navigation = useNavigation();
  const [selectData, setSelectData] = useState([]);
  const [isLoadingModalVisible, setLoadingModalVisible] = useState(false);
  console.log('arrayDraft:', arrayDraft);
  console.log('arrayDraft:', arrayDraft.length);
  const getStoriesData = () => {
    dispatch(getDraftStories({userid: userAuth?.userData?.userId}));
    dispatch(getBookmarkStories({userid: userAuth?.userData?.userId}));

    console.log(
      'BookmarkStoriesList?.BookmarkStories',
      BookmarkStoriesList?.BookmarkStories,
    );
  };

  useEffect(() => {
    setLeaguearray([
      {
        label: SingleLeague.title,
        value: SingleLeague.title,
      },
    ]);
  }, [SingleLeague]);

  let prevOpenedDraftRow;

  const setDropdownData = () => {
    let newArr = [];
    leagues?.Leagues.map((item, index) => {
      let obj = {
        league_id: item.league_id,
        name: base64.decode(item.league_title),
      };
      newArr.push(obj);
    });
    setSelectData(newArr);
    console.log('selectData:', newArr);
  };

  useEffect(() => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    setDate(date);
    // setDropdownData();
  }, []);

  const emptyIcon = expended => {
    return (
      <Icon
        name={expended ? 'chevron-right' : 'chevron-down'}
        color={isDark?.isdark ? COLORS.white : COLORS.dark}
        size={22}
      />
    );
  };

  const richTextHandle = descriptionText => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML('');
    }
  };
  console.log('testing Draft Data:', arrayDraft);
  console.log('SingleLeague.id', SingleLeague.id);

  const [show, setshow] = useState(false);

  const onPressFunction = () => {
    if (show) {
      setshow(false);
    } else {
      setshow(true);
    }
  };

  // const reducerData = useSelector(state => state);
  const validateFields = (title, descHTML) => {
    let isValid = true;

    // Validation for Full Name
    if (!title.trim()) {
      // onChangeError('Full Name Should not be empty.');
      setErrorTitle('Please Enter Title');
      isValid = false;
      // return false;
    } else {
      setErrorTitle(''); // Clear error if the field is not empty
    }
    if (!descHTML.trim()) {
      // onChangeError('Full Name Should not be empty.');
      setErrorDesc('Please Enter Description');
      isValid = false;
      // return false;
    } else {
      setErrorDesc(''); // Clear error if the field is not empty
    }

    // const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
    // console.log('replaceHTML', replaceHTML);
    // setPlainText(replaceHTML);
    // const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

    // if (replaceWhiteSpace.length <= 0) {
    //   // onChangeError('Full Name Should not be empty.');
    //   setErrorDesc('Please Enter Description');
    //   console.log('aaa');
    //   isValid = false;
    //   // return false;
    // } else {
    //   setErrorDesc(''); // Clear error if the field is not empty
    //   console.log('aaaa');
    // }

    // All fields are valid
    return isValid;
  };

  const [loader, setLoader] = useState(false);

  const toggleModal = () => {
    const isValid = validateFields(title, descHTML);
    console.log('isValid: ', isValid);

    var formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', descHTML);
    formdata.append('league', SingleLeague.id);
    setLoader(true);
    postRequestWithToken(
      `${BASE_URL}/stories/add-story/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(result => {
        setLoader(false);
        console.log('result on home', result);
        getRequestWithOutBody(
          `${BASE_URL}/stories/user-stories/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            setLoader(false);
            // console.log('result on home', result);
            setUserStories(result);
            dispatch(MyUserStoriesUpdateLocally(result));
            navigation.navigate('Stories');
          })
          .catch(error => {
            setloader(false);
            console.log('errorbbbbb', error);
          });
        // setLeagueStories(result);
        // dispatch(SingleLeagueUpdateLocally(result));
      })
      .catch(error => {
        // setloader(false);
        console.log('errorbbbbb', error);
      });
  };

  const EditData = (item, key) => {
    setIsEdit(true);
    setValInd(key);
    setSelectedStory(item);
    // navigation.navigate('TestingScreen')
    // console.log('working:', '<h6>testing success</h6>');
    console.log('item Data:', item);
    console.log('key:', key);

    let storyData = base64.decode(item.story);
    richText.current.setContentHTML(storyData);
    showMessage({
      message: 'Please check Editor for update',
      type: 'success',
      color: 'white',
    });
  };
  console.log('arraySaveStories.length', arraySaveStories);

  // const renderItem = ({item, index}) => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           borderBlockColor: '#8F9095',
  //           borderBottomWidth: 0.2,
  //           justifyContent: 'space-between',
  //         }}>
  //         <View>
  //           <Heading
  //             mt={14}
  //             // ml={'5%'}
  //             // Stylefont={'normal'}
  //             // Fontweight={'regular'}
  //             Fontsize={12.5}
  //             Heading={item.title}
  //             Color={'#AAAAAA'}
  //             mb={7}
  //           />
  //         </View>
  //         <View style={{flexDirection: 'row'}}>
  //           <Image
  //             source={require('../../Assets/Images/newimages/editDraft.png')}
  //             style={{
  //               // width: 15,
  //               // height: 15,
  //               alignContent: 'center',
  //               alignItems: 'center',
  //               alignSelf: 'center',
  //               marginLeft: 20,
  //             }}
  //           />
  //           <Image
  //             source={require('../../Assets/Images/newimages/deleteDraft.png')}
  //             style={{
  //               // width: 15,
  //               // height: 15,
  //               alignContent: 'center',
  //               alignItems: 'center',
  //               alignSelf: 'center',
  //               marginLeft: 20,
  //             }}
  //           />
  //           <Image
  //             source={require('../../Assets/Images/newimages/publishDraft.png')}
  //             style={{
  //               // width: 15,
  //               // height: 15,
  //               alignContent: 'center',
  //               alignItems: 'center',
  //               alignSelf: 'center',
  //               marginLeft: 20,
  //             }}
  //           />
  //         </View>
  //       </View>
  //     </>
  //   );
  // };

  // const renderItem2 = ({item, index}) => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           borderBlockColor: '#8F9095',
  //           borderBottomWidth: 0.2,
  //           justifyContent: 'space-between',
  //         }}>
  //         <View>
  //           <Heading
  //             mt={14}
  //             // ml={'5%'}
  //             // Stylefont={'normal'}
  //             // Fontweight={'regular'}
  //             Fontsize={12.5}
  //             Heading={item.title}
  //             Color={'#AAAAAA'}
  //             mb={7}
  //           />
  //         </View>
  //         <View style={{flexDirection: 'row'}}>
  //           <Image
  //             source={require('../../Assets/Images/newimages/editDraft.png')}
  //             style={{
  //               // width: 15,
  //               // height: 15,
  //               alignContent: 'center',
  //               alignItems: 'center',
  //               alignSelf: 'center',
  //               marginLeft: 20,
  //             }}
  //           />
  //           <Image
  //             source={require('../../Assets/Images/newimages/deleteDraft.png')}
  //             style={{
  //               // width: 12,
  //               // height: 13,
  //               alignContent: 'center',
  //               alignItems: 'center',
  //               alignSelf: 'center',
  //               marginLeft: 20,
  //             }}
  //           />
  //         </View>
  //       </View>
  //     </>
  //   );
  // };

  const renderItem3 = ({item, index}) => {
    return (
      <>
        <View
          style={{
            borderBlockColor: '#8F9095',
            borderBottomWidth: 0.2,
          }}>
          <View>
            <Heading
              mt={14}
              // ml={'5%'}
              // Stylefont={'normal'}
              // Fontweight={'regular'}
              Fontsize={12.5}
              Heading={item.title}
              Color={'#AAAAAA'}
              mb={4}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeArea>
      {loader ? (
        <>
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
        </>
      ) : (
        <View style={{flex: 1, paddingBottom: '20%'}}>
          <MainHeader title={'Draft'} />

          <ScrollView
            alwaysBounceVertical={true}
            keyboardShouldPersistTaps="always">
            <SafeAreaView edges={['bottom', 'left', 'right']} style={{flex: 1}}>
              <View>
                <Heading
                  mt={'7%'}
                  ml={'5%'}
                  Stylefont={'normal'}
                  Fontweight={'700'}
                  Fontsize={15.78}
                  Heading={'Add Post'}
                />
              </View>
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
                      marginBottom: 15,
                    }}>
                    <Image
                      source={require('../../Assets/Images/newimages/profile2.png')}
                      // source={{ uri: 'http://23.26.137.178/media/media/john.png'}}
                      style={{
                        width: 32,
                        height: 32,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        // marginLeft: 20,
                        // marginRight: 10,
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'column',
                        marginHorizontal: '5%',
                      }}>
                      <InteractParagraph
                        p={'asdasdsd'}
                        colors={'#D5D5D5'}
                        Fontsize={16}
                        fw={'bold'}
                      />
                      <InteractParagraph
                        p={date}
                        Fontsize={10}
                        fw={'bold'}
                        colors={'#D5D5D5'}
                      />
                    </View>
                  </View>
                </View>

                <View style={{marginTop: 5}}>
                  <Heading
                    // mt={'5%'}
                    ml={5}
                    Stylefont={'normal'}
                    Fontweight={'700'}
                    Fontsize={19}
                    Heading={'League'}
                    Color={'#F5F5F5'}
                    mb={15}
                  />
                  <DropdownComponent
                    data={leaguearray}
                    defaultValue={
                      leaguearray.length > 0 ? leaguearray[0].value : null
                    }
                    value={selectedLeague}
                    setValue={setSelectedLeague}
                  />
                </View>

                <View style={{}}>
                  <Heading
                    mt={'5%'}
                    ml={5}
                    Stylefont={'normal'}
                    Fontweight={'700'}
                    Fontsize={19}
                    Heading={'Title'}
                    Color={'#F5F5F5'}
                  />
                  <TextInput
                    // multiline
                    onChangeText={text => setTitle(text)}
                    value={title}
                    style={{
                      width: '95%',
                      color: '#F5F5F5',
                      fontSize: 13,
                      marginTop: 10,
                      marginBottom: 15,
                      padding: 10,
                      marginLeft: 5,
                    }}
                    placeholder={'Title'}
                    placeholderTextColor={'#A8A8A8'}
                    borderBottomWidth={0.5}
                    borderColor={'#8F9095'}
                  />
                </View>

                <View style={{marginLeft: 10}}>
                  {/* {errorTitle && (
                    <Text style={styles.errorTextStyle}>
                      Please Enter Title
                    </Text>
                  )} */}
                  {!!errorTitle && (
                    <Text style={styles.errorTextStyle}>{errorTitle}</Text>
                  )}
                </View>

                <View style={styles.richTextContainer}>
                  <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={65}>
                    <RichEditor
                      ref={richText}
                      // onChange={richTextHandle}
                      onChange={richTextHandle}
                      placeholder="Write your Description here......"
                      // androidHardwareAccelerationDisabled={true}
                      styleWithCSS={true}
                      style={styles.richTextEditorStyle}
                      initialHeight={164}
                      initialFocus={false}
                      // onMessage={({type, id, data})=>{
                      //   console.log('type:',type, 'id:',id, "data:",data)
                      // }}
                      // disabled
                      source={'<h1>testing Data</h1>'}
                      editorStyle={{
                        backgroundColor: '#404552',
                        color: '#ffffff',
                        caretColor: '#ffffff',
                        placeholderColor: '#A7A7A7',
                        padding: 10,
                        margin: 10,
                      }}
                    />
                  </KeyboardAvoidingView>
                  {/* </KeyboardAvoidingView> */}
                  {/* {show ? ( */}
                  <RichToolbar
                    editor={richText}
                    // selectedIconTint={COLORS.primary}
                    iconTint="#ffffff"
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
                  {/* ) : null} */}

                  {/* {showDescError && (
                    <Text style={styles.errorTextStyle}>
                      Please Enter Something
                    </Text>
                  )} */}
                </View>
              </View>
              {/* <View style={{marginLeft: 30}}>
                {showDescError && (
                  <Text style={styles.errorTextStyle}>
                    Please Enter Description
                  </Text>
                )}
              </View> */}
              <View style={{marginLeft: 30}}>
                {/* {errorTitle && (
                    <Text style={styles.errorTextStyle}>
                      Please Enter Title
                    </Text>
                  )} */}
                {!!errorDesc && (
                  <Text style={styles.errorTextStyle}>{errorDesc}</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 'auto',
                  marginRight: 20,
                }}>
                {/* <TouchableOpacity
                    style={{
                      width: 75,
                      height: 30,
                      backgroundColor: '#994E9F',
                      // borderWidth: 1,
                      borderColor: '#FFFFFF',
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                    }}
                    onPress={submitContentHandle}>
                    <Text
                      style={{
                        fontSize: 13.59,
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}>
                      Publish
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={toggleModal}
                    // onPress={submitContentHandle}
                    style={{
                      width: 73,
                      height: 30,
                      // backgroundColor: '#994E9F',
                      borderWidth: 1,
                      borderColor: '#994E9F',
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 13.59,
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}>
                      Delete
                    </Text>
                  </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={toggleModal}
                  // onPress={submitContentHandle}
                  style={{
                    width: 123,
                    height: 30,
                    backgroundColor: '#994E9F',
                    borderWidth: 1,
                    borderColor: '#994E9F',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 13.59,
                      fontWeight: 600,
                      color: '#FFFFFF',
                    }}>
                    Save as draft
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View>
                  <Pressable
                    onPress={() => {
                      setDraftDropdown(!draftDropdown);
                    }}>
                    <View
                      style={{
                        width: 351,
                        height: 61,
                        marginHorizontal: 20,
                        backgroundColor: '#404552',
                        borderRadius: 12,
                        flexDirection: 'row',
                        borderColor: '#7ACCCA',
                        borderWidth: 0.7,
                        justifyContent: 'space-between',
                      }}>
                      <View style={{justifyContent: 'center', marginLeft: 15}}>
                        <Heading
                          // mt={'7%'}
                          // ml={'5%'}
                          // Stylefont={'normal'}
                          Fontweight={'600'}
                          Fontsize={18}
                          Heading={'Drafts'}
                          Color={'#7ACCCA'}
                        />
                      </View>
                      <View style={{justifyContent: 'center', marginRight: 15}}>
                        {!draftDropdown ? (
                          <AntDesign
                            name={'right'}
                            color={'#7ACCCA'}
                            size={24}
                          />
                        ) : (
                          <AntDesign
                            name={'down'}
                            color={'#7ACCCA'}
                            size={24}
                          />
                        )}
                      </View>
                    </View>
                  </Pressable>

                  {draftDropdown ? (
                    <View
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        width: 351,
                        marginHorizontal: 20,
                        backgroundColor: '#404552',
                        borderRadius: 12,
                        marginTop: 15,
                        paddingBottom: 25,
                      }}>
                      <FlatList
                        data={draftarray}
                        renderItem={renderItem}
                        keyExtractor={item => item.metal_id}
                        contentContainerStyle={{flexDirection: 'column'}}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  ) : null}

                  <Pressable
                    onPress={() => {
                      setStoryDropdown(!storyDropdown);
                    }}>
                    <View
                      style={{
                        width: 351,
                        height: 61,
                        marginHorizontal: 20,
                        backgroundColor: '#404552',
                        borderRadius: 12,
                        flexDirection: 'row',
                        borderColor: '#7ACCCA',
                        borderWidth: 0.7,
                        justifyContent: 'space-between',
                        marginTop: 15,
                      }}>
                      <View style={{justifyContent: 'center', marginLeft: 15}}>
                        <Heading
                          // mt={'7%'}
                          // ml={'5%'}
                          // Stylefont={'normal'}
                          Fontweight={'600'}
                          Fontsize={18}
                          Heading={'Save Stories'}
                          Color={'#7ACCCA'}
                        />
                      </View>
                      <View style={{justifyContent: 'center', marginRight: 15}}>
                        {!storyDropdown ? (
                          <AntDesign
                            name={'right'}
                            color={'#7ACCCA'}
                            size={24}
                          />
                        ) : (
                          <AntDesign
                            name={'down'}
                            color={'#7ACCCA'}
                            size={24}
                          />
                        )}
                      </View>
                    </View>
                  </Pressable>

                  {storyDropdown ? (
                    <View
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        width: 351,
                        marginHorizontal: 20,
                        backgroundColor: '#404552',
                        borderRadius: 12,
                        marginTop: 15,
                        paddingBottom: 25,
                      }}>
                      <FlatList
                        data={storyarray}
                        renderItem={renderItem2}
                        keyExtractor={item => item.metal_id}
                        contentContainerStyle={{flexDirection: 'column'}}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  ) : null}
                </View> */}
              {/* <Modal isVisible={isModalVisible}>
                  <SafeAreaView style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor: 'white'
                      }}>
                      <View
                        style={[
                          styles.modalStyle,
                          {
                            backgroundColor: 'white',
                          },
                        ]}>
                        <View style={{paddingBottom: 10, paddingTop: 20}}>
                          <InteractParagraph
                            p={'Please select League to continue'}
                            colors={COLORS.txt_color}
                            Fontsize={16}
                            fw={'bold'}
                          />
                        </View>

                        <SearchableDropDown
                          onItemSelect={item => {
                            console.log('working', item);
                            submitContentHandle(item.league_id);
                            setIsModalVisible(!isModalVisible);
                          }}
                          // onItemSelect={()=>console.log('Working onItemSelect')}
                          // onItemSelect={item => {
                          //   console.log('Selected item:', item);
                          // }}
                          containerStyle={{
                            padding: 5,
                            // maxHeight: Platform.ios ? 140 : 110,
                            width: WIDTH - 90,
                          }}
                          onRemoveItem={(item, index) => {
                            const items = this.state.selectedItems.filter(
                              sitem => sitem.id !== item.id,
                            );
                            this.setState({selectedItems: items});
                          }}
                          itemStyle={{
                            padding: 10,
                            // marginTop: 2,
                            // backgroundColor: '#ddd',
                            // borderColor: '#bbb',
                            // borderWidth: 1,
                            // borderRadius: 5,
                            backgroundColor: '#6d6d6d30',
                          }}
                          itemTextStyle={{color: '#222'}}
                          itemsContainerStyle={{
                            maxHeight: Platform.ios ? 140 : 110,
                            width: WIDTH - 100,
                          }}
                          items={selectData}
                          // defaultIndex={2}
                          resetValue={false}
                          textInputProps={{
                            placeholder: 'Please Select League to continue',
                            // underlineColorAndroid: 'transparent',
                            style: {
                              padding: 12,
                              borderWidth: 1,
                              borderColor: '#ccc',
                              borderRadius: 5,
                            },
                            onTextChange: text =>
                              console.log('onChange Text', text),
                          }}
                          listProps={{
                            nestedScrollEnabled: true,
                          }}
                        />
                        <View
                          style={{
                            // backgroundColor: 'coral',
                            // width: WIDTH - 100,
                            // alignItems: 'flex-end',
                            // height: HEIGHT / 5,
                            // justifyContent:'flex-end'
                            position: 'absolute',
                            bottom: 20,
                            right: 40,
                          }}>
                          <Button title="Cancel" onPress={toggleModal} />
                        </View>
                      </View>
                    </View>
                  </SafeAreaView>
                </Modal> */}
              <Modal isVisible={isLoadingModalVisible}>
                <SafeAreaView style={{flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 50,
                    }}>
                    <ActivityIndicator size={40} color={COLORS.primary} />
                    <Text style={{color: COLORS.primary}}>Loading....</Text>
                  </View>
                </SafeAreaView>
              </Modal>
            </SafeAreaView>
          </ScrollView>
        </View>
        // {/* </TouchableWithoutFeedback> */}
      )}
    </SafeArea>
  );
};

export default WriterDraft;

const arrayDraftStories = [
  {
    imgUrl: avt,
    name: 'abc',
    date: '19 Dec 2022',
  },
  {
    imgUrl: avt,
    name: 'def',
    date: '11 Jan 2022',
  },
  {
    imgUrl: avt,
    name: 'ghi',
    date: '13 Feb 2022',
  },
  {
    imgUrl: avt,
    name: 'jkl',
    date: '17 Mar 2022',
  },
  {
    imgUrl: avt,
    name: 'mno',
    date: '10 Nov 2022',
  },
];

const arraySaveStoriesData = [
  {
    imgUrl: avt,
    name: 'abc',
    date: '19 Dec 2022',
  },
  {
    imgUrl: avt,
    name: 'def',
    date: '11 Jan 2022',
  },
  {
    imgUrl: avt,
    name: 'ghi',
    date: '13 Feb 2022',
  },
  {
    imgUrl: avt,
    name: 'jkl',
    date: '17 Mar 2022',
  },
  {
    imgUrl: avt,
    name: 'mno',
    date: '10 Nov 2023',
  },
];

var items = [
  {
    id: 1,
    name: 'JavaScript',
    testingKey: 'testingValue',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];
