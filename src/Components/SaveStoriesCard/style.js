import {StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';

const styles = StyleSheet.create({
  card: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: '2%',
    borderBottomColor: COLORS.border_color,
    borderBottomWidth: 1,
    paddingBottom: '2%',
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
