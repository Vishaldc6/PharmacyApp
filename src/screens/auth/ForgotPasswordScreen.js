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
import fonts from '../../styles/fonts';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {Images} from '../../assets/images';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AppStrings} from '../../utils/AppStrings';

const ForgotPasswordScreen = props => {
  const signInValidation = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email(AppStrings.emailError)
      .required(AppStrings.emailRequired),
    password: Yup.string()
      .min(8, AppStrings.passwordLengthError)
      .required(AppStrings.passwordRequired),
  });

  const {values, errors, handleChange, handleSubmit, touched} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInValidation,
    onSubmit: async value => {
      console.log(values);
    },
  });

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [usernameError, setusernameError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      // setusername('');
      // setpassword('');
      // setconfirmPassword('');
      // setusernameError('');
      // setpasswordError('');
      // setconfirmPasswordError('');
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={Images.backgroundImage} style={styles.bgImage}>
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
                  bottom: -size.height - size.height / 12,
                }}>
                <Text style={fonts.h1}>Forgot Password</Text>
                <View style={{height: 20}} />
                <CustomInput
                  value={username}
                  onChangeText={val => {
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
                  onChangeText={val => {
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
                  onChangeText={val => {
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
                  <View style={{height: size.height / 10}} />
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
