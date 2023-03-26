import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from './colors';
import fonts from './fonts';
import {size} from './size';

export default GlobalStyles = {
  mainContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    width: size.width,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 30,
    padding: 20,
    position: 'absolute',
    bottom: -size.height - size.height / 12,
  },
  infoCard: {
    borderRadius: wp(3),
    backgroundColor: colors.white,
    padding: wp(3),
    elevation: 5,
    margin: wp(1),
  },
  errorText: {
    ...fonts.h3,
    color: colors.red,
    marginLeft: wp(3),
  },
};
