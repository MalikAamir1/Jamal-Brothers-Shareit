import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, Pressable} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import styles from './style';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../Assets/Style/Color';
import {useNavigation} from '@react-navigation/native';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {useSelector} from 'react-redux';

const Phone = () => {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNum, setphonenum] = useState('');
  const [valid, setValid] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const phoneInput = useRef(PhoneInput);
  const navigation = useNavigation();

  const GetOTP = () => {
    if (phoneNum && phoneNum.length > 9) {
      navigation.navigate('otp', {phoneNum});
    } else {
      alert('Please Enter correct  phone number');
    }
  };

  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  return (
    <SafeArea>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '8%',
            marginBottom: '6%',
          }}>
          <Pressable onPress={() => navigation.navigate('googleSignIn')}>
            <View>
              <Ionicons
                name={'chevron-back'}
                style={{fontWeight: '900'}}
                color={isDark?.isdark ? COLORS.white : COLORS.dark}
                size={30}
              />
            </View>
          </Pressable>
        </View>
        <View style={{marginTop: 40, padding: 5, alignItems: 'center'}}>
          <Text
            style={{
              color: isDark?.isdark ? COLORS.white : COLORS.dark,
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            Enter your mobile number
          </Text>
          <Text
            style={{
              color: isDark?.isdark ? COLORS.white : COLORS.dark,
            }}>
            You will receive a 6 digit code to verify next
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="US"
            layout="first"
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setphonenum(text);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
            }}
            countryPickerProps={{withAlphaFilter: true}}
            withDarkTheme
            withShadow
            autoFocus
            containerStyle={{height: 60, borderRadius: 15}}
            textContainerStyle={{
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              backgroundColor: '#EEEEEE',
            }}
            textInputStyle={{height: 60, marginTop: 3}}
            flagButtonStyle={{backgroundColor: '#EEEEEE'}}
          />
          <TouchableOpacity style={styles.button} onPress={GetOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

export default Phone;
