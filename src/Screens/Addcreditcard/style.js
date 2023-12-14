import {StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';
export default StyleSheet.create({
  container: {paddingHorizontal: '5%', flex: 1},
  Headsection: {
    // backgroundColor: COLORS.primary,
    height: 70,
    paddingVertical: '8%',
    paddingHorizontal: '5%',
  },

  body__head: {
    height: 60,
    borderBottomColor: COLORS.border_color,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  txt__fields: {marginTop: 10},
  text__field: {
    height: 80,
    marginTop: 10,
  },
  txt: {
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 7,
    height: 40,
    padding: 10,
  },
});
