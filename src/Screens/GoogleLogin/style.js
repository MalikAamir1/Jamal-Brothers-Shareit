import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import COLORS from '../../Assets/Style/Color';
import DIM, {HeightDIM} from '../../Assets/Style/dimension';
import FONT from '../../Assets/Style/Font';

export const styles = StyleSheet.create({
  mainDivider: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  divider: {
    width: '42%',
    marginHorizontal: '3%',
    borderColor: COLORS.border_color,
    borderWidth: 1,
  },
});
