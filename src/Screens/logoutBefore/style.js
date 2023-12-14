import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';

export default StyleSheet.create({
  conatiner: {
    // backgroundColor: 'green',
    flex: 1,
    marginHorizontal: '5%',
    paddingBottom: '30%',
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
  button__style: {
    flexDirection: 'row',
    // borderTopWidth: 1,
    borderTopColor: COLORS.border_color,
    paddingTop: 7,
    justifyContent: 'flex-end',
    marginTop: 5,
    // right:Dimensions.get('screen').width/8
  },
  textAreaContainer: {
    borderColor: COLORS.border_color,
    borderWidth: 1,
    padding: 5,
    // backgroundColor: 'black',
  },
  textArea: {
    // color: 'white',
    height: 150,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
