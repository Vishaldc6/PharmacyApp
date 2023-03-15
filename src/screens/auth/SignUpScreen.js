import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {size} from '../../styles/size';
import CustomInput from '../../components/CustomInput';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import GlobalStyles from '../../styles/GlobalStyles';
import CheckBox from 'react-native-check-box';
import {Images} from '../../assets/images';
import {ApiCall, userRegister} from '../../config/apiServices/ApiServices';
import {AppStrings} from '../../utils/AppStrings';

const SignUpScreen = props => {
  const [email, setemail] = useState('');
  const [mob, setmob] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [education, seteducation] = useState('');
  const [experiance, setexperiance] = useState('');
  const [specialist, setspecialist] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isCheck, setisCheck] = useState(false);

  const [emailError, setemailError] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [mobError, setmobError] = useState('');
  const [educationError, seteducationError] = useState('');
  const [specialistError, setspecialistError] = useState('');
  const [experianceError, setexperianceError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setconfirmPassword('');
      setemail('');
      setpassword('');
      setusername('');
      setmob('');
      seteducation('');
      setexperiance('');
      setspecialist('');
      setemailError('');
      setusernameError('');
      setconfirmPasswordError('');
      setmobError('');
      seteducationError('');
      setexperianceError('');
      setspecialistError('');
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={Images.backgroundImage} style={styles.bgImage}>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={GlobalStyles.formContainer}>
                <Text style={fonts.h1}>New Account</Text>
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
                  onChangeText={val => {
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
                  onChangeText={val => {
                    setmob(val);
                  }}
                  value={mob}
                  title={'Mobile'}
                  placeholder={'Enter Mobile'}
                  keyboardType={'phone-pad'}
                  iconName={'mobile-phone'}
                />
                <Text style={styles.errorText}>{mobError}</Text>
                <CustomInput
                  passwordField={true}
                  onChangeText={val => {
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
                  onChangeText={val => {
                    setconfirmPassword(val);
                  }}
                  value={confirmPassword}
                  title={'Confirm Password'}
                  placeholder={'Enter Confirm Password'}
                  iconName={'key'}
                />
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
                {isCheck && (
                  <>
                    <CustomInput
                      onChangeText={val => {
                        seteducation(val);
                      }}
                      value={education}
                      title={'Education'}
                      placeholder={'Enter Education'}
                      keyboardType={'email-address'}
                      iconName={'info'}
                    />
                    <Text style={styles.errorText}>{educationError}</Text>
                    <CustomInput
                      onChangeText={val => {
                        setexperiance(val);
                      }}
                      value={experiance}
                      title={'Experiance'}
                      placeholder={'Enter Experiance'}
                      keyboardType={'email-address'}
                      iconName={'info'}
                    />
                    <Text style={styles.errorText}>{experianceError}</Text>
                    <CustomInput
                      onChangeText={val => {
                        setspecialist(val);
                      }}
                      value={specialist}
                      title={'Specialist'}
                      placeholder={'Enter Specialist'}
                      keyboardType={'email-address'}
                      iconName={'info'}
                    />
                    <Text style={styles.errorText}>{specialistError}</Text>
                  </>
                )}
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
                    onPress={async () => {
                      if (
                        email == '' &&
                        username == '' &&
                        password == '' &&
                        confirmPassword == '' &&
                        mob == ''
                      ) {
                        // Alert.alert('Sign in',"All flieds are empty")
                        setemailError('* Please enter Email');
                        setusernameError('* Please enter Username');
                        setpasswordError('* Please enter Password');
                        setconfirmPasswordError(
                          '* Please enter Confirm Password',
                        );
                        setmobError('* Please enter Mobile');
                        if (isCheck) {
                          if (
                            education == '' &&
                            specialist == '' &&
                            experiance == ''
                          ) {
                            setexperianceError('* Please enter Experiance');
                            setspecialistError('* Please enter Specialist');
                            seteducationError('* Please enter Education');
                          }
                        }
                      } else {
                        const body = new FormData();
                        body.append('name', username);
                        body.append('email', email);
                        body.append('mobile', mob);
                        body.append('password', password);
                        body.append('password_confirmation', confirmPassword);
                        if (isCheck) {
                          body.append('specialist', specialist);
                          body.append('education', education);
                          body.append('experience', experiance);
                        }
                        const res = await fetch(
                          isCheck
                            ? AppStrings.BASE_URL + '/doctorRegister'
                            : AppStrings.BASE_URL + '/patientRegister',
                          {
                            headers: {
                              Accept: 'application/json',
                            },
                            method: 'POST',
                            body: body,
                          },
                        );
                        const jsonRes = await res.json();
                        console.log('Screen res :', jsonRes);
                        console.log(res);
                        // if (res.ok) {
                        if (jsonRes.flag) {
                          Alert.alert(AppStrings.appName, jsonRes.message);
                          props.navigation.navigate(ScreenNames.SignInScreen);
                        } else if (jsonRes.flag == false) {
                          if (jsonRes.data?.errors != null) {
                            Alert.alert(
                              AppStrings.appName,
                              jsonRes.data.errors[0],
                            );
                          } else {
                            Alert.alert(AppStrings.appName, jsonRes.message);
                          }
                        }
                        // }
                        else {
                          Alert.alert(
                            AppStrings.appName,
                            'Something went wrong !',
                          );
                        }
                        // if (res?.data.errors) {
                        //   Alert.alert(AppStrings.appName, res.data.errors[0]);
                        // } else {
                        //   Alert.alert(AppStrings.appName, res.toString());
                        //   props.navigation.navigate(ScreenNames.SignInScreen);
                        // }
                        // Alert.alert(AppStrings.appName, res);
                        // props.navigation.navigate(ScreenNames.SignInScreen);
                        // const res = await userRegister(
                        //   username,
                        //   email,
                        //   password,
                        //   confirmPassword,
                        // );
                        // console.log('ressss : ', res);
                        // if (res.errors == null) {
                        //   Alert.alert(AppStrings.appName, res.MESSAGE);
                        //   props.navigation.navigate(ScreenNames.SignInScreen);
                        // } else {
                        //   Alert.alert(
                        //     AppStrings.appName,
                        //     Object.values(res.errors)[0].toString(),
                        //   );
                        // }
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

export default SignUpScreen;
