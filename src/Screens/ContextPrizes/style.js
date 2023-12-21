import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    // height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  tabTitle: {
    paddingVertical: 5,
    color: '#FFFFFF',
  },
  isFocusHeading: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabHeadings: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  thirdTab: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  statusBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
  },
  firstTabList: {
    width: 162,
    height: 90,
    alignItems: 'center',
    backgroundColor: '#7ACCCA',
    borderRadius: 10,
    margin: 5,
    marginVertical: 10,
    // marginLeft: 7,
    marginHorizontal: 6
  },
});

export default styles;
