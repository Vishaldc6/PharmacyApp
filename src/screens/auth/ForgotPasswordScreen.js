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
import colors from '../../styles/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import fonts from '../../styles/fonts';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/GlobalStyles';

const ForgotPasswordScreen = props => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [usernameError, setusernameError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setusername('');
      setpassword('');
      setconfirmPassword('');
      setusernameError('');
      setpasswordError('');
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
                <Text style={fonts.h1}>Forgot Password</Text>
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
                  title={'New Password'}
                  placeholder={'Enter New Password'}
                  iconName={'key'}
                />
                <Text style={styles.errorText}>{passwordError}</Text>

                <CustomInput
                  passwordField={true}
                  value={confirmPassword}
                  onChange={val => {
                    setconfirmPassword(val);
                  }}
                  title={'Confirm New Password'}
                  placeholder={'Enter Confirm New Password'}
                  iconName={'key'}
                />
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
                <View style={{height: 20}} />
                <View style={{marginHorizontal: 10}}>
                  <CustomButton
                    title={'Change Password'}
                    onPress={() => {
                      if (
                        username == '' &&
                        password == '' &&
                        confirmPassword == ''
                      ) {
                        // Alert.alert('Sign in',"All flieds are empty")
                        setusernameError('* Please enter Username');
                        setpasswordError('* Please enter New Password');
                        setconfirmPasswordError(
                          '* Please enter Confirm New Password',
                        );
                      }
                    }}
                  />
                  <View style={{height: 10}} />
                </View>
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
});

export default ForgotPasswordScreen;
