import {RFValue} from 'react-native-responsive-fontsize';
import colors from './colors';

const FONT_SIZE12 = RFValue(10);
const FONT_SIZE14 = RFValue(12);
const FONT_SIZE16 = RFValue(14);
const FONT_SIZE18 = RFValue(16);
const FONT_SIZE30 = RFValue(25);

export default Fonts = {
  h1: {
    fontSize: FONT_SIZE16,
    fontWeight: '800',
    color: colors.black,
  },
  h2: {
    fontSize: FONT_SIZE14,
    fontWeight: '400',
    color: colors.black,
  },
  h3: {
    fontSize: FONT_SIZE12,
    fontWeight: '400',
    color: colors.black,
  },
  h4: {
    fontSize: FONT_SIZE14,
    fontWeight: '500',
    color: colors.black,
  },
  h5: {
    fontSize: FONT_SIZE12,
    fontWeight: '500',
    color: colors.black,
  },
  h6: {
    fontSize: FONT_SIZE14,
    fontWeight: '700',
    color: colors.black,
  },
  h7: {
    fontSize: FONT_SIZE18,
    fontWeight: '600',
    color: colors.black,
  },
  h8: {
    fontSize: FONT_SIZE30,
    fontWeight: '800',
    color: colors.black,
  },
};
