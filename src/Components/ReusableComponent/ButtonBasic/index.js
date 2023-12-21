import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import COLORS from '../../../Assets/Style/Color';
import FONT from '../../../Assets/Style/Font';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {View} from 'react-native';

function BasicBtn(props) {
  // const reducerData = useSelector(state => state);
  // const [isdark, setisDark] = useState(reducerData?.isDark?.isdark)

  let {btnText} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: props.jstCnt,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: COLORS.border_color,
        borderWidth: 1,
        width: props.mainWidth,
        alignSelf: 'center',
        backgroundColor: props.bgcolor,
        padding: props.pad,
        overflow: 'hidden',
        marginVertical: '3%',
      }}>
      <Button
        mode={'text'}
        labelStyle={{
          color: props.txtColor ? props.txtColor : COLORS.primary,
        }}
        dark={true}
        uppercase={false}
        style={{
          height: props.btnHeight,
          width: props.btnwidth,
          marginRight: props.rightMargin,
          shadowColor: props.shadow,
        }}
        onPress={props.press}>
        <Icon name={props.icon} size={props.iconSize ? props.iconSize : 28} />
      </Button>
      <Button
        mode={'text'}
        color={props.color ? props.color : COLORS.primary}
        labelStyle={{
          fontFamily: FONT.pop,
          fontSize: props.fontSize,
          fontWeight: props.fontStyle,
          marginRight: props.txtRightMargin,
          marginLeft: props.txtLeftMargin,
          color: props.txtColor ? props.txtColor : COLORS.primary,
          width: props.txtwidth,
        }}
        dark={true}
        uppercase={false}
        style={{
          height: props.btnHeight,
          width: props.btnwidth,
          marginRight: props.rightMargin,
          marginLeft: props.ml,
          marginTop: props.topMargin,
          shadowColor: props.shadow,
        }}
        onPress={props.press}>
        {btnText}
      </Button>
    </View>
  );
}

export default BasicBtn;
