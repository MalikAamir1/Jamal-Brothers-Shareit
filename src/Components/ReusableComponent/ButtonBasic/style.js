import {StyleSheet} from 'react-native';
import COLORS from '../../../Assets/Style/Color';
import FONT from '../../../Assets/Style/Font';

export const styles = StyleSheet.create({
  containerLoginButton: {
    textAlign: 'center',
    alignItems: 'center',
    Color: COLORS.white,
  },
  LoginButton: {
    height: 56,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '90%',
  },
  textStyle: {
    fontWeight: 700,
  },
  LoginButtonColor: {
    color: COLORS.white,
    alignItems: 'center',
    fontFamily: FONT.pop,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
