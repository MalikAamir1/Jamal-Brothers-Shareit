import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, Pressable, TextInput} from 'react-native';
import styles from './style';
import Button from '../../Components/ReusableComponent/Button';
import COLORS from '../../Assets/Style/Color';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
// import Radio from '../../Components/RadioSharelt';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {Divider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  userDataFromAsyncStorage,
  removeUserDataFromAsyncStorage,
} from '../../Store/Reducers/AuthReducer';
import MiniHeader from '../../Components/MiniHeader';
import Radio from '../../Components/RadioShareIt';
import {deleteRequest} from '../../App/fetch';
import {BASE_URL} from '../../App/api';
import {removeDataToAsync} from '../../utils/getAndSetAsyncStorage';
import { Loader } from '../../Components/ReusableComponent/Loader';

export default function LogOutBefore() {
  const [checked, setChecked] = React.useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // const reducerData = useSelector(state => state);
  const AuthReducer = useSelector(state => state.AuthReducer);
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);
  const dispatch = useDispatch();

  // ============New User Auth Data from New Reducer===================
  // const {userAuth} = reducerData;
  // console.log(
  //   'Data From reducer in delete page Login',
  //   userAuth.userData.userId,
  // );
  // ===============================

  useEffect(() => {
    console.log(checked);
  }, []);

  function deleteAccount() {
    setLoading(true);
    deleteRequest(
      `${BASE_URL}/users/delete-account/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        setLoading(false);
        console.log('result on delete', result);
        dispatch(removeUserDataFromAsyncStorage());
        removeDataToAsync('token');
        removeDataToAsync('user');
      })
      .catch(error => {
        setLoading(false);
        console.log('errorbbbbb 9', error);
      });
  }

  return (
    <SafeArea>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={{flexGrow: 1, flex: 1, paddingBottom: '25%'}}>
          <View style={styles.conatiner}>
            {/* head section */}
            {/* <Header cen={'Delete Account'} /> */}
            <MiniHeader title={'Delete Account'} />
            {/* head section */}
            <View style={{marginHorizontal: '4%'}}>
              <InteractParagraph
                p={'Are you sure you want to delete your account?'}
                Fontsize={21}
              />
              <View style={{marginVertical: '2%'}}>
                <Divider
                  style={{borderColor: COLORS.border_color, borderWidth: 1}}
                />
                <InteractParagraph
                  mv={'2%'}
                  pAlign={'center'}
                  p={'Please Let us know the reason you are leaving'}
                  Fontsize={16}
                />
                <Divider
                  style={{borderColor: COLORS.border_color, borderWidth: 1}}
                />
              </View>
              <ScrollView>
                <Radio
                  radio_text={'This app wasted my time'}
                  press={() => setChecked('first')}
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  val={'This app wasted my time'}
                  antDesign={'questioncircleo'}
                />
              </ScrollView>
              {/* buttons section */}
              <View style={styles.button__style}>
                <Button
                  disable={checked == '' ? true : false}
                  btnText={'Continue to Account Deletion'}
                  bg={checked == '' ? COLORS.border_color : COLORS.primary}
                  txtColor={checked == '' ? COLORS.dark : COLORS.white}
                  radius={10}
                  btnwidth={'100%'}
                  leftMargin={'5%'}
                  press={deleteAccount}
                />
              </View>
              {/* buttons section */}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeArea>
  );
}
