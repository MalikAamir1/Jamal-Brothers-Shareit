import React, {useState} from 'react';
import {Headline} from 'react-native-paper';
import FONT from '../../../Assets/Style/Font';
import COLORS from '../../../Assets/Style/Color';
import {useSelector} from 'react-redux';

function Heading(props) {
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);
  // const [isdark,setisDark] = useState(reducerData?.isDark?.isdark)

  const {
    Stylefont,
    Fontweight,
    Fontsize,
    txtAlign,
    ml,
    mt,
    p,
    lh,
    Heading,
    Color,
    bg,
    pt,
    wd,
    mv,
    mh,
    mx,
    as,
    borderRadius,
    aI,
    mb,
    mr,
    o,
  } = props;

  return (
    <Headline
      style={{
        // fontFamily: FONT.pop,
        fontStyle: Stylefont,
        fontWeight: Fontweight,
        fontSize: Fontsize,
        textAlign: txtAlign,
        marginHorizontal: mx,
        marginLeft: ml,
        marginTop: mt,
        padding: p,
        lineHeight: lh,
        backgroundColor: bg,
        paddingTop: pt,
        color: Color
          ? Color
          : COLORS.dark && isDark?.isdark
          ? COLORS.white
          : COLORS.dark,
        width: wd,
        marginVertical: mv,
        alignItems: aI,
        alignSelf: as,
        borderRadius: borderRadius,
        marginRight: mr,
        marginBottom: mb,
        opacity: o,
      }}>
      {Heading}
    </Headline>
  );
}

export default Heading;
