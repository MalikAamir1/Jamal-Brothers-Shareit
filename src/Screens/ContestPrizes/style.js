import {StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';
export default StyleSheet.create({
  container: {flex: 1, marginHorizontal: '4%', marginTop: 20},
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
  list__item: {
    width: 361,
    height: 61,
    marginTop: 15,
    borderColor: '#7ACCCA',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#404552',
    borderRadius: 10,
  },
  list__head: {margin: 9, marginLeft: 15},
});
