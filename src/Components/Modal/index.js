import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Image, ImageBackground, Pressable, View, Modal} from 'react-native';
// import COLORS from '../../../Assets/Style/Color';
import {Button, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Heading from '../ReusableComponent/Heading';
import {Rating} from 'react-native-ratings';

export const ModalView = props => {
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // Add this line
  const [like, setLike] = useState(false); // Add this line

  const handleButtonPress = () => {
    console.log('Button pressed');
  };

  const handleSuggestionPress = suggestion => {
    // Set the selected suggestion in the TextInput
    setComment(prevComment => prevComment + suggestion + ' ');
  };

  function onPressSubmit() {
    if (comment == '') {
      setError('* Submit Your comment');
    } else {
      onDataSubmit(comment, rating, like);
      yes();
      setComment('');
    }
  }

  function onPressSubmitReport() {
    if (comment == '') {
      setError('* Submit Your comment');
    } else {
      onDataSubmit(comment);
      yes();
      setComment('');
    }
  }

  // const [modalVisible, setModalVisible] = useState(true);

  let {
    set,
    get,
    cross,
    txt,
    suggestion,
    yes,
    btnText,
    onDataSubmit,
    modalType,
  } = props;
  const headings = suggestion;

  return (
    <Modal animationType="none" transparent={true} visible={get}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              marginBottom: 10,
              marginHorizontal: 2,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Heading
              Heading={txt}
              Fontsize={17}
              //   color={COLORS.dark}
              //   Fontweight={'bold'}
              txtAlign={'center'}
              color={'#FFFFFF'}
            />
            <Pressable onPress={cross} style={{justifyContent: 'center'}}>
              <Image source={require('../../Assets/Images/crossmodal.png')} />
            </Pressable>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {headings.map((txt, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSuggestionPress(txt)}
                style={{
                  borderColor: '#7ACCCA',
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: '#565B68',
                  padding: 9,
                  marginRight: 6,
                  marginTop: 6,
                }}>
                <Heading
                  Heading={txt}
                  Fontsize={10}
                  //   color={COLORS.dark}
                  //   Fontweight={'bold'}
                  //   txtAlign={'center'}
                  color={'#7ACCCA'}
                />
              </TouchableOpacity>
            ))}
          </View>

          {!!error && (
            <Text
              style={{
                fontSize: 12,
                color: '#F43535',
                marginTop: 10,
                // marginLeft: 37,
                marginBottom: -10,
              }}>
              {error}
            </Text>
          )}

          <View
            style={{
              backgroundColor: '#565B68',
              borderRadius: 10,
              height: 70,
              marginTop: 15,
              padding: 5,
            }}>
            <TextInput
              //   editable={false}
              multiline={true}
              style={{
                // width: '85%',
                color: 'white',
                backgroundColor: 'transparent',
                marginBottom: -3,
                marginLeft: 3,
                fontSize: 12,
                height: 60,

                // marginTop: -45,
              }}
              placeholder="Write your comment here......"
              placeholderTextColor={'#CBCBCB'}
              activeUnderlineColor={'transparent'}
              underlineColorAndroid={'transparent'}
              underlineColor={'transparent'}
              value={comment}
              onChangeText={setComment}
              scrollEnabled={true}
              // secureTextEntry={props.pass && !props.dob ? notPressed : false}
            />
          </View>
          {modalType ? (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Pressable onPress={() => setLike(!like)}>
                  <View style={{margin: 5, marginTop: 15, marginLeft: 10}}>
                    {like ? (
                      <Image
                        source={require('../../Assets/Images/likefill.png')}
                        style={{width: 14, height: 14}}
                      />
                    ) : (
                      <Image
                        source={require('../../Assets/Images/likeoutline.png')}
                        style={{width: 14, height: 14}}
                      />
                    )}
                  </View>
                </Pressable>
                <View>
                  <Rating
                    defaultRating={10}
                    type="custom"
                    ratingCount={5}
                    style={{margin: 5, marginTop: 16, marginLeft: 10}}
                    // showRating={true}
                    count={5}
                    onFinishRating={rating => {
                      setRating(rating);
                    }}
                    imageSize={13}
                    ratingColor={'#FFC700'}
                    ratingBackgroundColor={'#707687'}
                    tintColor={'#373B44'}
                    startingValue={0}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // Call the function with the data to be sent
                    onPressSubmit();
                    // onDataSubmit(comment, rating, like);
                    // yes();
                    // setComment('');
                    // setRating(undefined);
                    // setLike(false); // Reset the like state after submitting
                    // Reset the rating after submitting
                  }}
                  style={{
                    width: 60,
                    height: 25,
                    backgroundColor: '#7ACCCA',
                    // borderWidth: 1,
                    // borderColor: '#FFFFFF',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginRight: 5,
                    marginLeft: 'auto',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#373B44',
                    }}>
                    {btnText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  // Call the function with the data to be sent
                  onPressSubmitReport();
                  //   onDataSubmit(comment);
                  //   yes();
                  //   setComment('');
                }}
                style={{
                  width: 60,
                  height: 25,
                  backgroundColor: '#7ACCCA',
                  // borderWidth: 1,
                  // borderColor: '#FFFFFF',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginRight: 5,
                  marginLeft: 'auto',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#373B44',
                  }}>
                  {btnText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* <View style={{flexDirection: 'row', marginBottom: 20}}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#E1E1E1',
                borderWidth: 1,
                borderColor: 'rgba(11, 16, 92, 0.2)',
                // borderColor: '#0B105C',
                // padding: 5,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 111,
                height: 36,
                borderRadius: 7,
              }}
              onPress={no}>
              <Text
                style={{
                  color: '#0B105C',
                  fontSize: 14,
                  // fontWeight: 'bold',
                }}>
                No
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={['#FCDD8E', '#F9B401']}
              start={{x: 0.5, y: -5}}
              end={{x: 0.4, y: 4}}
              style={{
                flex: 1,
                marginLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 111,
                borderRadius: 7,
              }}>
              <TouchableOpacity
                style={{
                  width: 190,
                  alignItems: 'center',
                }}
                onPress={yes}>
                <Text
                  style={{
                    color: '#0B105C',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    // opacity: 0.9,
  },
  modalView: {
    // margin: 50,
    width: 344,
    backgroundColor: '#373B44',
    borderRadius: 10,
    paddingHorizontal: 20,
    // paddingTop: 0,
    // paddingBottom: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 200,
    opacity: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: 'red',
  // },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: 'black',
    // borderWidth: 1,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius:100
    // backgroundColor: 'pink',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 35,
    backgroundColor: 'transparent',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  buttonShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    // backgroundColor: 'red',
    width: '100%',
  },
});
