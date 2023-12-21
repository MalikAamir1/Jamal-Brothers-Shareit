import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {ImageBackground, Pressable, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function ButtonComp(props) {
  let {btnText, press} = props;

  return (
    <LinearGradient
      colors={['#927bae', '#84acbc']}
      style={{
        flex: 1,
        padding: 13,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
      }}>
      <TouchableOpacity
        onPress={press}
        style={{
          flex: 1,
          width: '100%',
          // padding: 12,
          alignItems: 'center',
          height: '50%',
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
          {btnText}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default ButtonComp;

// import React, {useState} from 'react';
// import {Button} from 'react-native-paper';
// import COLORS from '../../../Assets/Style/Color';
// import FONT from '../../../Assets/Style/Font';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useSelector} from 'react-redux';

// function ButtonComp(props) {
//   // const reducerData = useSelector(state => state);
//   const isDark = useSelector(state => state.isDark);
//   // const [isdark, setisDark] = useState(reducerData?.isDark?.isdark)

//   let {btnText} = props;

//   return (
//     <Button
//       mode={props.mode ? props.mode : 'contained'}
//       disabled={props.disable}
//       color={props.color ? props.color : COLORS.primary}
//       labelStyle={{
//         fontFamily: FONT.pop,
//         fontSize: props.fontSize,
//         fontWeight: props.fontStyle,
//         marginTop: props.txtRightMargin,
//         marginLeft: props.txtLeftMargin,
//         color: props.txtColor ? props.txtColor : COLORS.primary,
//         width: props.txtwidth,
//       }}
//       loading={props.load}
//       dark={true}
//       uppercase={false}
//       style={{
//         margin: props.mar,
//         height: props.btnHeight,
//         width: props.btnwidth,
//         borderRadius: props.radius,
//         justifyContent: props.justify,
//         alignItems: props.align,
//         marginRight: props.rightMargin,
//         marginLeft: props.leftMargin,
//         marginTop: props.topMargin,
//         marginHorizontal: props.horizontalMargin,
//         shadowColor: props.shadow,
//         borderColor: isDark?.isdark ? COLORS.white : COLORS.border_color,
//         borderWidth: props.Borderwidth,
//         backgroundColor: props.bg,
//         padding: props.p,
//       }}
//       onPress={props.press}>
//       <Icon
//         name={props.icon1}
//         color={props.iconColor1}
//         size={props.iconSize1 ? props.iconSize1 : 28}
//       />
//       <MaterialCommunityIcons
//         name={props.icon2}
//         color={props.iconColor2}
//         size={props.iconSize2 ? props.iconSize2 : 28}
//       />

//       {btnText}
//     </Button>
//   );
// }

// export default ButtonComp;
