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
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {size} from '../../styles/size';
import CustomInput from '../../components/CustomInput';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import CheckBox from 'react-native-check-box';
import {Images} from '../../assets/images';
import {ApiCall, userRegister} from '../../config/apiServices/ApiServices';
import {AppStrings} from '../../utils/AppStrings';
import {Dropdown} from 'react-native-element-dropdown';
import {doctorTypeList} from '../../assets/data/doctorTypeList';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGlobaStyles} from '../../styles/GlobalStyles';

const SignUpScreen = props => {
  const GlobalStyles = useGlobaStyles();

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
                {/* <ScrollView
                  scrollEnabled={true}
                  style={{flex: 1, backgroundColor: 'red', height: 200}}> */}
                {/* <View style={{backgroundColor: 'red', height: 500}}> */}

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
                <Text style={{...GlobalStyles.errorText}}>{usernameError}</Text>
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
                <Text style={GlobalStyles.errorText}>{emailError}</Text>
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
                <Text style={GlobalStyles.errorText}>{mobError}</Text>
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
                <Text style={GlobalStyles.errorText}>{passwordError}</Text>
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
                <Text style={GlobalStyles.errorText}>
                  {confirmPasswordError}
                </Text>
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
                    <Text style={GlobalStyles.errorText}>{educationError}</Text>
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
                    <Text style={GlobalStyles.errorText}>
                      {experianceError}
                    </Text>
                    {/* <CustomInput
                      onChangeText={val => {
                        setspecialist(val);
                      }}
                      value={specialist}
                      title={'Specialist'}
                      placeholder={'Enter Specialist'}
                      keyboardType={'email-address'}
                      iconName={'info'}
                    /> */}
                    <Text style={{...fonts.h3, marginLeft: 10}}>
                      Doctor Type
                    </Text>
                    <Dropdown
                      style={{
                        margin: 10,
                        borderBottomWidth: 1.5,
                        borderBottomColor: colors.darkgray,
                      }}
                      // onFocus={() => {
                      //   console.log('focus');
                      //   setFocus(true);
                      // }}
                      // onBlur={() => {
                      //   console.log('blur');
                      //   setFocus(false);
                      // }}
                      renderLeftIcon={() => (
                        <Icon
                          name={'user'}
                          size={20}
                          color={colors.darkgray}
                          style={{marginHorizontal: 10}}
                        />
                      )}
                      data={doctorTypeList}
                      // search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Doctor Type"
                      // value={doctor_type}
                      selectedTextStyle={fonts.h3}
                      onChange={item => {
                        // setdoctor_type(item.value);
                        // console.log('doctor_type : ', doctor_type);
                        console.log(item.label);
                        setspecialist(item.label);
                      }}
                    />
                    <Text style={GlobalStyles.errorText}>
                      {specialistError}
                    </Text>
                  </>
                )}

                {/* </View> */}
                {/* </ScrollView> */}
                <View
                  style={{
                    ...GlobalStyles.rowContainer,
                    marginHorizontal: 10,
                  }}>
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
                      if (username == '') {
                        setusernameError('* Please enter Username');
                      } else if (email == '') {
                        setemailError('* Please enter Email');
                      } else if (password == '') {
                        setpasswordError('* Please enter Password');
                      } else if (confirmPassword == '') {
                        setconfirmPasswordError(
                          '* Please enter Confirm Password',
                        );
                      } else if (mob == '') {
                        setmobError('* Please enter Mobile');
                      }
                      // Alert.alert('Sign in',"All flieds are empty")
                      else {
                        const body = new FormData();
                        body.append('name', username);
                        body.append('email', email);
                        body.append('mobile', mob);
                        body.append('password', password);
                        body.append('password_confirmation', confirmPassword);
                        if (isCheck) {
                          if (education == '') {
                            seteducationError('* Please enter Education');
                          } else if (specialist == '') {
                            setspecialistError('* Please enter Specialist');
                          } else if (experiance == '') {
                            setexperianceError('* Please enter Experiance');
                          } else {
                            body.append('specialist', specialist);
                            body.append('education', education);
                            body.append('experience', experiance);
                          }
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
                        // const jsonRes = await res.json();
                        let responseText = await res.text();
                        let jsonRes = JSON.parse(responseText);
                        console.log('Screen res :', jsonRes);
                        console.log(res);
                        // if (res.ok) {
                        if (jsonRes.flag) {
                          Alert.alert(AppStrings.appName, jsonRes.message);
                          setemailError('');
                          setmobError('');
                          seteducationError('');
                          setpasswordError('');
                          setusernameError('');
                          setexperianceError('');
                          setspecialistError('');
                          setconfirmPasswordError('');
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
    ...fonts.h3,
    color: colors.red,
    marginLeft: 55,
    // fontSize: 10,
  },
  linkText: {
    ...fonts.h3,
    color: colors.primary_color,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
});

export default SignUpScreen;
