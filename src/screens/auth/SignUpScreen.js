import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {size} from '../../styles/size';
import CustomInput from '../../components/CustomInput';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import GlobalStyles from '../../styles/GlobalStyles';
import CheckBox from 'react-native-check-box';

const SignUpScreen = props => {
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isCheck, setisCheck] = useState(false);

  const [emailError, setemailError] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setconfirmPassword('');
      setemail('');
      setpassword('');
      setusername('');
      setemailError('');
      setusernameError('');
      setconfirmPasswordError('');
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
                {/* <KeyboardAwareScrollView
            
              keyboardShouldPersistTaps={'always'}
              style={styles.mainContainer}
              enableOnAndroid={true}> */}
                <Text style={fonts.h1}>New Account</Text>
                <View style={{height: 20}} />
                <CustomInput
                  onChange={val => {
                    setemail(val);
                  }}
                  value={email}
                  title={'Email'}
                  placeholder={'Enter Email'}
                  keyboardType={'email-address'}
                  iconName={'envelope-o'}
                />
                <Text style={styles.errorText}>{emailError}</Text>
                <CustomInput
                  onChange={val => {
                    setusername(val);
                  }}
                  value={username}
                  title={'Username'}
                  placeholder={'Enter Username'}
                  iconName={'user-circle-o'}
                />
                <Text style={styles.errorText}>{usernameError}</Text>
                <CustomInput
                  passwordField={true}
                  onChange={val => {
                    setpassword(val);
                  }}
                  value={password}
                  title={'Password'}
                  placeholder={'Enter Password'}
                  iconName={'key'}
                />
                <Text style={styles.errorText}>{passwordError}</Text>
                <CustomInput
                  passwordField={true}
                  onChange={val => {
                    setconfirmPassword(val);
                  }}
                  value={confirmPassword}
                  title={'Confirm Password'}
                  placeholder={'Enter Confirm Password'}
                  iconName={'key'}
                />
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
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
                </View>
                <View style={{height: 10}} />
                <View style={{marginHorizontal: 10}}>
                  <CustomButton
                    title={'Sign up'}
                    onPress={() => {
                      if (
                        email == '' &&
                        username == '' &&
                        password == '' &&
                        confirmPassword == ''
                      ) {
                        // Alert.alert('Sign in',"All flieds are empty")
                        setemailError('* Please enter Email');
                        setusernameError('* Please enter Username');
                        setpasswordError('* Please enter Password');
                        setconfirmPasswordError(
                          '* Please enter Confirm Password',
                        );
                      }
                    }}
                  />
                </View>
                <View style={{height: 10}} />
                <Text style={{...fonts.h3, alignSelf: 'center'}}>
                  Already have an Account ?{' '}
                  <Text
                    onPress={() => {
                      props.navigation.navigate(ScreenNames.SignInScreen);
                    }}
                    style={styles.linkText}>
                    Sign In here
                  </Text>
                </Text>
                <View style={{height: 10}} />
                {/* </KeyboardAwareScrollView> */}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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

export default SignUpScreen;
