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
import Colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { size } from '../../styles/size';
import GlobalStyles from '../../styles/GlobalStyles';

const Dots = ({selected}) => {
  return (
    <View
      style={{
        bottom: 70,
        width: selected ? 20 : 12,
        height: 6,
        borderRadius: 15,
        marginHorizontal: 3,
        backgroundColor: selected ? Colors.primary_color : Colors.grey,
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
        backgroundColor: Colors.primary_color,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        bottom: 10,
      }}>
      <Icon
        name="chevron-right"
        color={Colors.white}
        size={25}
        style={{alignSelf: 'center'}}
      />
    </View>
  </TouchableWithoutFeedback>
);

const Skip = ({skipLabel, ...props}) => (
  <Text style={{color: Colors.black, marginLeft: 20, bottom: 10}} {...props}>
    {skipLabel}
  </Text>
);

const Done = ({...props}) => (
  <View style={{bottom: 10,width:size.width,flex:1}}>
    <CustomButton title={'GET STARTED'} {...props} />
  </View>
);
const OnboardingScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <Onboarding
        bottomBarColor={Colors.white}
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
            backgroundColor: Colors.white,
            image: (
              <Image
                style={styles.image}
                source={require('../../assets/images/Onboarding1.gif')}
              />
            ),
            title:
              'Your Go-to Health Application',
            subtitle: 'Your complete healthcare companion, in your pocket.',
          },
          {
            backgroundColor: Colors.white,
            image: (
              <Image
                style={styles.image}
                source={require('../../assets/images/Onboarding2.png')}
              />
            ),
            title: 'Online Pharmacy',
            subtitle:
              "Order any medinice or health product and we'll deliver it for free.Enjoy discounts on everything.",
          },
          {
            backgroundColor: Colors.white,
            image: (
              <Image
                style={styles.image}
                source={require('../../assets/images/Onboarding3.png')}
              />
            ),
            title: 'Consult The Doctors',
            subtitle:
              'Find & book appointments with Doctors, Clinics, Hospitals & Diagnostic Tests. Ask free health questions to doctors.',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
    ...fonts.h1,
    bottom: 50,
    textAlign: 'center',
  },
  subTxt: {
    //   fontFamily: 'Nexa-Trial-Regular',
    ...fonts.h2,
    bottom: 50,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
