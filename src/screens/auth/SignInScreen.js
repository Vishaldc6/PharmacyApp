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
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import GlobalStyles from '../../styles/GlobalStyles';
import CheckBox from 'react-native-check-box';
import {Images} from '../../assets/images';

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
    <View style={{flex: 1}}>
      <ImageBackground source={Images.backgroundImage} style={styles.bgImage}>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={GlobalStyles.formContainer}>
                <Text style={fonts.h1}>Wellcome</Text>
                <View style={{height: 20}} />
                <CustomInput
                  onChangeText={val => {
                    setusername(val);
                  }}
                  value={username}
                  title={'Username'}
                  placeholder={'Enter Username'}
                  keyboardType={'email-address'}
                  iconName={'user-circle-o'}
                />
                <Text style={styles.errorText}>{usernameError}</Text>
                <CustomInput
                  passwordField={true}
                  value={password}
                  onChangeText={val => {
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
                      console.log('username', username);
                      // if (username == '' && password == '') {
                      //   // Alert.alert('Sign in',"All flieds are empty")
                      //   setusernameError('* Please enter Username');
                      //   setpasswordError('* Please enter Password');
                      // }
                      if (username == 'admin' && password == 'admin123') {
                        props.navigation.navigate(ScreenNames.AdminHomeScreen);
                      } else {
                        if (isCheck) {
                          props.navigation.navigate(
                            ScreenNames.DoctorHomeScreen,
                          );
                        } else {
                          props.navigation.navigate(ScreenNames.Home);
                        }
                      }
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
                <View style={{height: size.height / 10}} />
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
