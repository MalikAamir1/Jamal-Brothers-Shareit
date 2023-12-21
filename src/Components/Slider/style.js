import {StyleSheet} from 'react-native';
import {ITEM_WIDTH} from './carousel';
import COLORS from '../../Assets/Style/Color';
import FONT from '../../Assets/Style/Font';
import {ITEM_HEIGHT} from '../Slider/carousel';

export const styles = StyleSheet.create({
  Slider_container: {
    width: ITEM_WIDTH,
  },
  Slider_logoContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    // marginTop:'3%'
  },
  Slider_image: {
    width: ITEM_WIDTH,

    borderRadius: 26,
    height: ITEM_HEIGHT,
  },
  Slider_logoImg: {
    height: 66,
    width: 66,
  },
  Slider_header: {
    fontFamily: FONT.pop,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.primary,
    // marginTop:'5%'
  },
  Slider_Mainheader: {
    fontFamily: FONT.pop,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.primary,
  },
  Slider_body: {
    color: COLORS.txt_color,
    fontFamily: FONT.pop,
    fontSize: 14,

    textAlign: 'center',
  },
});
