import React, {useState} from 'react';
import {View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import {styles} from './style';
import {useSelector} from 'react-redux';

function RadioBtn() {
  const isdark = useSelector(state => state.isDark.isdark);
  // const reducerData = useSelector(state => state);
  // const [isdark, setisDark] = useState(reducerData?.isDark?.isdark);
  const [checked, setChecked] = useState('');

  return (
    <View style={styles.borderView}>
      <View
        style={checked === 'first' ? styles.Mainborder2 : styles.Mainborder}>
        <Text
          theme={
            isdark
              ? {colors: {text: COLORS.white}}
              : {colors: {text: COLORS.dark}}
          }
          style={
            checked === 'first' ? styles.InnerBorder2 : styles.InnerBorder
          }>
          Men
        </Text>
        <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
          color={COLORS.white}
          theme={
            isdark
              ? {colors: {text: COLORS.white}}
              : {colors: {text: COLORS.dark}}
          }
        />
      </View>
      <View
        style={checked === 'second' ? styles.Mainborder2 : styles.Mainborder}>
        <Text
          theme={
            isdark
              ? {colors: {text: COLORS.white}}
              : {colors: {text: COLORS.dark}}
          }
          style={
            checked === 'second' ? styles.InnerBorder2 : styles.InnerBorder
          }>
          Women
        </Text>
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
          color={COLORS.white}
          theme={
            isdark
              ? {colors: {text: COLORS.white}}
              : {colors: {text: COLORS.dark}}
          }
        />
      </View>
      <View
        style={checked === 'third' ? styles.Mainborder2 : styles.Mainborder}>
        <Text
          theme={
            isdark
              ? {colors: {text: COLORS.white}}
              : {colors: {text: COLORS.dark}}
          }
          style={
            checked === 'third' ? styles.InnerBorder2 : styles.InnerBorder
          }>
          Choose another
        </Text>
        <RadioButton
          value="third"
          status={checked === 'third' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('third')}
          color={COLORS.white}
          theme={
            isdark
              ? {colors: {text: COLORS.white}}
              : {colors: {text: COLORS.dark}}
          }
        />
      </View>
    </View>
  );
}

export default RadioBtn;
