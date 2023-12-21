import {StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';
export default StyleSheet.create({
  conatiner: {
    backgroundColor: '#919191',
    flex: 1,
    marginHorizontal: '5%',
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom:10,backgroundColor:'green'
  },
  social__icons: {
    // backgroundColor: 'green',
    height: 60,
    marginTop: 10,
    flexDirection: 'row',
  },
  icon__one: {
    // backgroundColor: 'blue',
    width: '17%',
    marginLeft: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  post__icon: {
    width: 35,
    height: 15,
    marginTop: 5,
  },
  rating__icon: {width: 37, height: 20},
  social__head: {fontSize: 18, fontWeight: 'bold', color: '#1E263C'},
  story__paragraph: {
    color: COLORS.dark,
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 15,
    textAlign: 'justify',
  },
  paragraph__container: {
    marginTop: 20,
    borderBottomColor: COLORS.border_color,
    borderBottomWidth: 1,
    height: '45%',
    paddingBottom: 10,
  },

  // M
  Headsection__second__right: {
    // position: 'absolute',
    // right: 20,
    height: 50,
    width: 50,
    backgroundColor: COLORS.icon_bg_color,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 30,
    // marginTop: 10,
  },
});
