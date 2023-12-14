import React, {useState} from 'react';
// import { View } from 'react-native'
import {Paragraph} from 'react-native-paper';
import COLORS from '../../../Assets/Style/Color';
import {useSelector} from 'react-redux';
import FONT from '../../../Assets/Style/Font';

function InteractParagraph(props) {
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);
  // const [isdark, setisDark] = useState(reducerData?.isDark?.isdark);

  const {
    pWidth,
    Direction,
    pAlign,
    txtAlign,
    ml,
    p,
    fw,
    Fontsize,
    mt,
    Padding,
    just,
    algnSlf,
    mx,
    btc,
    btw,
    pv,
    bg,
    mv,
    pHeight,
    lh,
    Pos,
    lf,
    tp,
  } = props;

  return (
    <Paragraph
      style={{
        fontFamily: FONT.pop,
        fontSize: Fontsize,
        width: pWidth,
        height: pHeight,
        flexDirection: Direction,
        alignItems: pAlign,
        textAlign: txtAlign,
        marginLeft: ml,
        fontWeight: fw,
        marginTop: mt,
        justifyContent: just,
        color: props.colors ? props.colors : 'white',
        padding: Padding,
        alignSelf: algnSlf,
        marginHorizontal: mx,
        borderTopColor: btc,
        borderTopWidth: btw,
        paddingVertical: pv,
        backgroundColor: bg,
        marginVertical: mv,
        lineHeight: lh,
        position: Pos,
        left: lf,
        top: tp,
      }}>
      {p}
    </Paragraph>
  );
}

export default InteractParagraph;
