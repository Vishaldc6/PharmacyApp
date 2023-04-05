import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import fonts, {FONT_SIZE14, FONT_SIZE16} from '../../styles/fonts';
import {size} from '../../styles/size';
import {Images} from '../../assets/images';
import {useAppSelector} from '../../redux/store/Store';

const Dots = ({selected}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  return (
    <View
      style={{
        bottom: 70,
        width: selected ? 20 : 12,
        height: 6,
        borderRadius: 15,
        marginHorizontal: 3,
        backgroundColor: selected ? colors.primary_color : colors.darkgray,
      }}
    />
  );
};

const Next = ({...props}) => (
  <TouchableWithoutFeedback {...props}>
    <View
      style={{
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: colors.primary_color,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        bottom: 10,
      }}>
      <Icon
        name="chevron-right"
        color={colors.white}
        size={25}
        style={{alignSelf: 'center'}}
      />
    </View>
  </TouchableWithoutFeedback>
);

const Skip = ({skipLabel, ...props}) => (
  <Text style={{color: colors.black, marginLeft: 20, bottom: 10}} {...props}>
    {skipLabel}
  </Text>
);

const Done = ({...props}) => (
  <View style={{bottom: 10, width: size.width, flex: 1}}>
    <CustomButton title={'GET STARTED'} {...props} />
  </View>
);
const OnboardingScreen = props => {
  return (
    <View style={{flex: 1}}>
      <Onboarding
        bottomBarColor={colors.white}
        skipToPage={2}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onDone={() => {
          props.navigation.navigate(ScreenNames.WellcomeScreen);
        }}
        titleStyles={styles.txt}
        subTitleStyles={styles.subTxt}
        pages={[
          {
            backgroundColor: colors.white,
            image: <Image style={styles.image} source={Images.onboarding1} />,
            title: 'Your Go-to Health Application',
            subtitle: 'Your complete healthcare companion, in your pocket.',
          },
          {
            backgroundColor: colors.white,
            image: <Image style={styles.image} source={Images.onboarding2} />,
            title: 'Online Pharmacy',
            subtitle:
              "Order any medinice or health product and we'll deliver it for free.Enjoy discounts on everything.",
          },
          {
            backgroundColor: colors.white,
            image: <Image style={styles.image} source={Images.onboarding3} />,
            title: 'Consult The Doctors',
            subtitle:
              'Find & book appointments with Doctors, Clinics, Hospitals & Diagnostic Tests. Ask free health questions to doctors.',
          },
        ]}
      />
    </View>
  );
};

const useStyles = () => {
  const {colors} = useAppSelector(state => state.CommonSlice);

  return StyleSheet.create({
    image: {
      resizeMode: 'cover',
      height: wp('90'),
      width: wp('90'),
      // borderRadius: 200,
      bottom: 30,
      // backgroundColor: 'red',
    },
    txt: {
      //   fontFamily: 'Nexa-Trial-Regular',
      fontSize: FONT_SIZE16,
      fontWeight: '800',
      color: colors.black,
      bottom: 50,
      textAlign: 'center',
      // backgroundColor: 'red',
    },
    subTxt: {
      //   fontFamily: 'Nexa-Trial-Regular',
      fontSize: FONT_SIZE14,
      fontWeight: '400',
      color: colors.black,
      bottom: 50,
      textAlign: 'center',
      // backgroundColor: 'blue',
    },
  });
};

export default OnboardingScreen;
