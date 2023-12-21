import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Headsection__one: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 20,
    width: '100%',
    height: 118,
    paddingTop: Platform.OS == 'ios' ? '14%' : '8%',
  },
});

export default styles;
