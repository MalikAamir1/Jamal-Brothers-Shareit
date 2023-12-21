import {StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';
export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
    marginBottom: '5%',
  },
  Headsection: {
    // backgroundColor: COLORS.primary,
    height: 70,
    paddingVertical: '8%',
    paddingHorizontal: '5%',
  },
  Headsection__one: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 20,
    width: '110%',
  },
  Bodylist: {
    width: '100%',
    height: 50,
    // borderBottomWidth: 1,
    borderBottomColor: COLORS.border_color,
    marginTop: 10,
  },
  separatorStyle: {
    height: 1,
    backgroundColor: COLORS.border_color,
  },
});
