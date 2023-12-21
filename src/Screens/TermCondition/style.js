import {StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import FONT from '../../Assets/Style/Font';

export const styles = StyleSheet.create({
  mainBtn: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginVertical: '10%',
    paddingHorizontal: '8%',
  },
  lastCheckBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginVertical: '5%',
  },
  lastViewMain: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerMain: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    // backgroundColor: COLORS.white,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  mainScrollView: {
    paddingBottom: '70%',
  },
});
