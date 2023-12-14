import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
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
import styles from '../WriterDraft/style';
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
import {
  deleteRequestWithId,
  getRequestWithOutBody,
  patchRequest,
  postRequestWithToken,
  putRequestWithToken,
} from '../../App/fetch';
import {BASE_URL} from '../../App/api';
import {MyUserStoriesUpdateLocally} from '../../Store/Reducers/UserStoriesReducer';

const EditStory = ({route}) => {
  console.log('route.params', route.params);
  const dataFromParams = route.params;
  const richText = useRef();
  const Navigation = useNavigation();
  const swipeableRef = useRef(null);
  const [loading, setLoading] = useState(false);
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
  const [date, setDate] = useState(null);
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
  //   console.log('arrayDraft:', arrayDraft);
  //   console.log('arrayDraft:', arrayDraft.length);

  useEffect(() => {
    setLeaguearray([
      {
        label: SingleLeague.title,
        value: SingleLeague.title,
      },
    ]);
  }, [SingleLeague]);

  useEffect(() => {
    setLoading(true);
    setTitle(dataFromParams?.storyData?.title);
    setDescHTML(dataFromParams?.storyData?.content);

    // Set the content of the  RichEditor from params
    const storyData = dataFromParams?.storyData?.content;
    // console.log('storyData on edit page', storyData);
    richText.current.setContentHTML(storyData);
    setLoading(false);
  }, [dataFromParams]);

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

  const richTextHandle = descriptionText => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML('');
    }
  };
  //   console.log('testing Draft Data:', arrayDraft);
  //   console.log('SingleLeague.id', SingleLeague.id);

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

    // All fields are valid
    return isValid;
  };

  const toggleModal = () => {
    const isValid = validateFields(title, descHTML);
    // console.log('isValid: ', isValid);
    console.log('title on editprofile', title);
    console.log('descHTML on editprofile', descHTML);
    console.log('story_ide', dataFromParams?.storyData?.id);

    setLoading(true);
    var formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', descHTML);
    formdata.append('story_id', dataFromParams?.storyData?.id);

    putRequestWithToken(
      `${BASE_URL}/stories/update-story/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(result => {
        // setLoading(false);
        console.log('result on edit', result);
        getRequestWithOutBody(
          `${BASE_URL}/stories/user-stories/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            setLoading(false);
            // setloader(false);
            // console.log('result on home', result);
            setUserStories(result);
            dispatch(MyUserStoriesUpdateLocally(result));
            Navigation.goBack();
          })
          .catch(error => {
            setLoading(false);

            // setloader(false);
            console.log('errorbbbbbaaaa', error);
          });
        // setLeagueStories(result);
        // dispatch(SingleLeagueUpdateLocally(result));
      })
      .catch(error => {
        setLoading(false);
        // setloader(false);
        console.log('errorbbbbb', error);
      });
  };

  const deleteStory = () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append('story_id', dataFromParams?.storyData?.id);

    deleteRequestWithId(
      `${BASE_URL}/stories/delete-story/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(result => {
        setLoading(false);
        console.log('result on delete', result);
        Navigation.goBack();
      })
      .catch(error => {
        setLoading(false);
        console.log('errorbbbbb', error);
        Navigation.goBack();
      });
  };

  const publishStory = () => {
    setLoading(true);
    const isValid = validateFields(title, descHTML);
    // console.log('isValid: ', isValid);
    console.log('title on editprofile', title);
    console.log('descHTML on editprofile', descHTML);
    console.log('story_ide', dataFromParams?.storyData?.id);

    var formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', descHTML);
    formdata.append('story_id', dataFromParams?.storyData?.id);

    putRequestWithToken(
      `${BASE_URL}/stories/update-story/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(result => {
        // setloader(false);
        console.log('result on edit', result.story.id);
        var formdata = new FormData();
        formdata.append('story_id', result.story.id);

        patchRequest(
          `${BASE_URL}/stories/publish-story/`,
          formdata,
          AuthReducer.userData.token,
        )
          .then(result => {
            setLoading(false);
            console.log('result on delete', result);
            Navigation.goBack();
          })
          .catch(error => {
            setLoading(false);
            console.log('errorbbbbb', error);
            // Navigation.goBack();
          });
      })
      .catch(error => {
        setLoading(false);
        console.log('errorbbbbb', error);
      });
  };

  return (
    <SafeArea>
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
        <View style={{flex: 1, paddingBottom: '9%'}}>
          <MainHeader title={'Edit'} />
          <ScrollView
            alwaysBounceVertical={true}
            keyboardShouldPersistTaps="always">
            <SafeAreaView edges={['bottom', 'left', 'right']} style={{flex: 1}}>
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
                      initialContentHTML={dataFromParams?.storyData?.content}
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
                </View>
              </View>
              <View style={{marginLeft: 30}}>
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
                <TouchableOpacity
                  onPress={publishStory}
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
                  }}>
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
                  onPress={deleteStory}
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
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleModal}
                  // onPress={submitContentHandle}
                  style={{
                    width: 123,
                    height: 30,
                    // backgroundColor: '#994E9F',
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

export default EditStory;
