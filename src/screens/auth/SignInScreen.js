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
import {size} from '../../styles/size';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import GlobalStyles from '../../styles/GlobalStyles';
import CheckBox from 'react-native-check-box';
import {Images} from '../../assets/images';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {AppStrings} from '../../utils/AppStrings';
import {
  ApiCall,
  saveUser,
  userLogin,
} from '../../config/apiServices/ApiServices';
import Icon from 'react-native-vector-icons/FontAwesome';

const GOOGLE_CLIENT_ID =
  '59510826670-7lilbhlo1mt18c6l2c685uae1sp3v9k6.apps.googleusercontent.com';

const SignInScreen = props => {
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [isCheck, setisCheck] = useState(false);
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');

  const [user, setUser] = useState(null);
  GoogleSignin.configure({
    webClientId:
      '108100832496-l73asi23f96crgh9ua0aclqggltqo5eq.apps.googleusercontent.com',
    // offlineAccess: true,
  });
  const signIn = async () => {
    try {
      console.log('first');
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // const { access_token } = response.data;
      // await AsyncStorage.setItem('ACCESS_TOKEN', access_token);
      // setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await AsyncStorage.removeItem('access_token');
      // setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const checkSignedIn = async () => {
    // const access_token = await AsyncStorage.getItem('access_token');
    // if (access_token) {
    // const response = await axios.get('http://YOUR_LARAVEL_BACKEND_URL/user', {
    //   headers: {
    //     Authorization: `Bearer ${access_token}`
    //   }
    // });
    // setUser(response.data);
    // }
  };

  // checkSignedIn();

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setemail('');
      setpassword('');
      setemailError('');
      setpasswordError('');
    });
  }, []);

  // const userLogin = async () => {
  //   console.log('first');
  //   const res = await fetch(`${AppStrings.BASE_URL}/login`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     }),
  //   });
  //   console.log(res);
  //   const json = await res.json();
  //   console.log('JSON data : ', json);
  //   Alert.alert(AppStrings.appName, json.MESSAGE);
  // };

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
                    setemail(val);
                  }}
                  value={email}
                  title={'Email'}
                  placeholder={'Enter Email'}
                  keyboardType={'email-address'}
                  iconName={'user-circle-o'}
                />
                <Text style={styles.errorText}>{emailError}</Text>
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
                    onPress={async () => {
                      // console.log('username', username);
                      if (email == '' && password == '') {
                        // Alert.alert('Sign in',"All flieds are empty")
                        setemailError('* Please enter Email');
                        setpasswordError('* Please enter Password');
                      } else if (email == 'admin' && password == 'admin123') {
                        props.navigation.navigate(ScreenNames.AdminHomeScreen);
                      } else {
                        if (isCheck) {
                          props.navigation.navigate(
                            ScreenNames.DoctorHomeScreen,
                          );
                        } else {
                          const res = await ApiCall('/login', 'POST', {
                            email: email,
                            password: password,
                          });
                          console.log('res        :::::: ', res);
                          if (res) {
                            saveUser(res.token);
                            props.navigation.replace(ScreenNames.Home);
                          } else {
                            Alert.alert(
                              AppStrings.appName,
                              'Something went wrong !',
                            );
                          }
                          // const res = await userLogin(email, password);
                          // console.log('resss : ', res);
                          // if (res.errors == null) {
                          //   Alert.alert(AppStrings.appName, res.MESSAGE);
                          //   if (res.FLAG) {
                          //     props.navigation.navigate(ScreenNames.Home);
                          //   }
                          //   console.log(res);
                          // } else {
                          //   Alert.alert(
                          //     AppStrings.appName,
                          //     Object.values(res.errors)[0].toString(),
                          //   );
                          // }
                        }
                      }
                    }}
                  />
                </View>
                <View style={{height: 10}} />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>OR</Text>
                  <GoogleSigninButton onPress={signIn} />
                </View>
                {/* <Icon name={'google'} size={25} onPress={signIn} /> */}
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
