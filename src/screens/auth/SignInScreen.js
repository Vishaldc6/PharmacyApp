import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {size} from '../../styles/size';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import GlobalStyles from '../../styles/GlobalStyles';
import CheckBox from 'react-native-check-box';

const SignInScreen = props => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [isCheck, setisCheck] = useState(false);
  const [usernameError, setusernameError] = useState('');
  const [passwordError, setpasswordError] = useState('');

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setusername('');
      setpassword('');
      setusernameError('');
      setpasswordError('');
    });
  }, []);

  return (
    <View style={{...GlobalStyles.mainContainer, marginHorizontal: 0}}>
      <ImageBackground
        source={require('../../assets/images/BackGroundImage.jpg')}
        style={styles.bgImage}>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  flex: 1,
                  width: size.width,
                  backgroundColor: colors.white,
                  borderWidth: 1,
                  borderRadius: 30,
                  padding: 20,
                  position: 'absolute',
                  bottom: -size.height,
                }}>
                <Text style={fonts.h1}>Wellcome</Text>
                <View style={{height: 20}} />
                <CustomInput
                  value={username}
                  onChange={val => {
                    setusername(val);
                  }}
                  title={'Username'}
                  placeholder={'Enter Username'}
                  iconName={'user-circle-o'}
                />
                <Text style={styles.errorText}>{usernameError}</Text>

                <CustomInput
                  passwordField={true}
                  value={password}
                  onChange={val => {
                    setpassword(val);
                  }}
                  title={'Password'}
                  placeholder={'Enter Password'}
                  iconName={'key'}
                />
                <Text style={styles.errorText}>{passwordError}</Text>
                <View
                  style={{...GlobalStyles.rowContainer, marginHorizontal: 10}}>
                  <View style={GlobalStyles.rowContainer}>
                    <CheckBox
                      isChecked={isCheck}
                      onClick={() => {
                        setisCheck(!isCheck);
                      }}
                      checkBoxColor={colors.primary_color}
                    />
                    <View style={{width: 10}} />
                    <Text style={fonts.h3}>As Doctor</Text>
                  </View>
                  <Text
                    onPress={() => {
                      props.navigation.navigate(
                        ScreenNames.ForgotPasswordScreen,
                      );
                    }}
                    style={styles.linkText}>
                    Forgot Password ?
                  </Text>
                </View>
                <View style={{height: 10}} />
                <View style={{marginHorizontal: 10}}>
                  <CustomButton
                    title={'Sign in'}
                    onPress={() => {
                      // if (username == '' && password == '') {
                      //   // Alert.alert('Sign in',"All flieds are empty")
                      //   setusernameError('* Please enter Username');
                      //   setpasswordError('* Please enter Password');
                      // }
                      props.navigation.navigate(ScreenNames.Home);
                    }}
                  />
                </View>
                <View style={{height: 10}} />
                <Text style={{...fonts.h3, alignSelf: 'center'}}>
                  New User ?{' '}
                  <Text
                    style={styles.linkText}
                    onPress={() => {
                      props.navigation.navigate(ScreenNames.SignUpScreen);
                    }}>
                    Sign Up here
                  </Text>
                </Text>
                <View style={{height: 10}} />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  errorText: {
    color: colors.red,
    marginLeft: 55,
  },
  linkText: {
    ...fonts.h3,
    color: colors.primary_color,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
});

export default SignInScreen;
