import {StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import {HEIGHT, WIDTH} from '../../utils/globelVariables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    backgroundColor: COLORS.white,
    padding: 20,
    // alignItems: 'center',
    // marginTop:'5%',
    marginBottom: -15,
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    // backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
    marginBottom: 10,
  },

  richTextEditorStyle: {
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderWidth: 1,
    // borderColor: '#ccaf9b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
    borderRadius: 20,
    // padding: 10
    // margin: 10
  },

  richTextToolbarStyle: {
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderWidth: 1,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: '#404552',
    color: '#ffffff',
  },

  errorTextStyle: {
    color: '#FF0000',
    marginBottom: 10,
    // marginLeft: 7,
  },

  saveButtonStyle: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    // borderWidth: 1,
    // borderColor: "#c6c3b3",
    borderRadius: 10,
    padding: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: '2%',
  },

  textButtonStyle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalStyle: {
    alignItems: 'center',
    width: WIDTH - 40,
    height: HEIGHT / 3,
    borderRadius: 20,
  },
  card: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: '2%',
    borderBottomColor: COLORS.border_color,
    borderBottomWidth: 1,
    paddingBottom: '2%',
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
