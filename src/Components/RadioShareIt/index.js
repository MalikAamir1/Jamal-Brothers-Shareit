import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RadioButton} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import InteractParagraph from '../ReusableComponent/Paragraph';
import {useDispatch, useSelector} from 'react-redux';

export default function Radio(props) {
  const {radio_text} = props;
  // const [checked, setChecked] = React.useState('');

  // const reducerData = useSelector(state => state);
  // const [isdark, setisDark] = useState(reducerData?.isDark?.isdark);
  const isdark = useSelector(state => state.isDark.isdark);
  // console.log('safe', reducerData?.isDark?.isdark);
  console.log('state', isdark);

  return (
    <ScrollView style={{flex: 1, flexGrow: 1}}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <RadioButton.Android
          onPress={props.press}
          value={props.val}
          status={props.status}
          uncheckedColor={isdark ? COLORS.blue__color : COLORS.dark}
          color={isdark ? COLORS.blue__color : COLORS.dark}
        />
        <InteractParagraph
          p={radio_text}
          Fontsize={16}
          mt={10}
          ml={10}
          txt_color={COLORS.dark}
        />
        <AntDesign
          name={props.antDesign}
          size={20}
          style={{marginTop: 5, marginLeft: 15}}
        />
      </View>
    </ScrollView>
  );
}
