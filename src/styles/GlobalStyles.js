import colors from './colors';
import {size} from './size';

export default GlobalStyles = {
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
};
