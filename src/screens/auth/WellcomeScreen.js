import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {size} from '../../styles/size';
import {Images} from '../../assets/images';

const WellcomeScreen = props => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={Images.backgroundImage} style={styles.bgImage}>
        <View style={{position: 'absolute', bottom: 50, width: size.width}}>
          <CustomButton
            title={'Sign in'}
            onPress={() => {
              props.navigation.navigate(ScreenNames.SignInScreen);
            }}
          />
          <View style={{height: 20}} />
          <CustomButton
            secondary
            title={'Sign up'}
            onPress={() => {
              props.navigation.navigate(ScreenNames.SignUpScreen);
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
    // opacity: 0.5,
  },
});

export default WellcomeScreen;
