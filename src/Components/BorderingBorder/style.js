import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import DIM, {HeightDIM} from '../../Assets/Style/dimension';
import FONT from '../../Assets/Style/Font';

export const styles = StyleSheet.create({
  onBorderingImg: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height / 2.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  logoImg: {
    height: Dimensions.get('window').height / 5.5,
    marginTop: '5%',
    alignContent: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
