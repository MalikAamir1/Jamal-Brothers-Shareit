import {StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';

export default StyleSheet.create({
  container: {flex: 1, marginHorizontal: '5%'},
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
  body__head: {
    // backgroundColor: 'blue',
    height: 70,
    borderBottomColor: COLORS.border_color,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body__item: {justifyContent: 'space-between', flexDirection: 'row'},
  list__item: {
    borderBottomColor: COLORS.border_color,
    borderBottomWidth: 1,
    padding: 5,
    paddingBottom: 15,
  },
});
