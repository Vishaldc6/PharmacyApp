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
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {size} from '../../styles/size';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import CheckBox from 'react-native-check-box';
import {Images} from '../../assets/images';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {AppStrings} from '../../utils/AppStrings';
import {ApiCall, saveUser} from '../../config/apiServices/ApiServices';
import {useGlobaStyles} from '../../styles/GlobalStyles';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const GOOGLE_CLIENT_ID =
  '59510826670-7lilbhlo1mt18c6l2c685uae1sp3v9k6.apps.googleusercontent.com';

const SignInScreen = props => {
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
      setloading(true);
      console.log('Formik submit : ', value);
      if (values.email == 'admin@admin.com' && values.password == 'admin123') {
        setloading(false);
        props.navigation.navigate(ScreenNames.AdminHomeScreen);
      } else {
        const body = new FormData();
        body.append('email', values.email);
        body.append('password', values.password);
        console.log(body);

        const res = await fetch(AppStrings.BASE_URL + '/login', {
          headers: {
            Accept: 'application/json',
          },
          method: 'POST',
          body: body,
        }).catch(e => {
          Alert.alert(AppStrings.appName, 'Server Error !! ');
          setloading(false);
        });
        let responseText = await res.text();
        let jsonRes = JSON.parse(responseText);
        console.log('Screen res :', jsonRes);
        if (jsonRes.flag) {
          Alert.alert(AppStrings.appName, jsonRes.message);
          saveUser(jsonRes.data);
          if (isCheck) {
            props.navigation.replace(ScreenNames.DoctorHomeScreen);
          } else {
            props.navigation.replace(ScreenNames.Home);
          }
          setloading(false);
        } else if (jsonRes.flag == false) {
          if (jsonRes.data?.errors != null) {
            Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
          } else {
            Alert.alert(AppStrings.appName, jsonRes.message);
          }
          setloading(false);
        } else {
          Alert.alert(AppStrings.appName, 'Something went wrong !');
          setloading(false);
        }
      }
    },
  });

  const GlobalStyles = useGlobaStyles();

  const [email, setemail] = useState('');

  const [password, setpassword] = useState('');
  const [isCheck, setisCheck] = useState(false);
  const [loading, setloading] = useState(false);

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
      const body = new FormData();
      body.append('name', userInfo.user.name);
      body.append('email', userInfo.user.email);
      body.append('image', userInfo.user.photo);
      body.append('social_id', userInfo.idToken);
      const res = await ApiCall(
        isCheck ? '/doctorRegister' : '/patientRegister',
        'POST',
        body,
      );
      console.log(res);
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

  useEffect(() => {}, []);

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
                  onChangeText={handleChange('email')}
                  value={values.email}
                  title={'Email'}
                  placeholder={'Enter Email'}
                  keyboardType={'email-address'}
                  // keyboardType={'default'}
                  iconName={'user-circle-o'}
                />
                {touched.email && errors.email ? (
                  <Text style={GlobalStyles.errorText}>{errors.email}</Text>
                ) : (
                  ''
                )}
                <CustomInput
                  passwordField={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  title={'Password'}
                  placeholder={'Enter Password'}
                  iconName={'key'}
                />
                {touched.password && errors.password ? (
                  <Text style={GlobalStyles.errorText}>{errors.password}</Text>
                ) : (
                  ''
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
                  {/* <Text
                    onPress={() => {
                      props.navigation.navigate(
                        ScreenNames.ForgotPasswordScreen,
                      );
                    }}
                    style={styles.linkText}>
                    Forgot Password ?
                  </Text> */}
                </View>
                <View style={{height: 10}} />
                <View style={{marginHorizontal: 10}}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <CustomButton title={'Sign In'} onPress={handleSubmit} />
                  )}
                </View>
                <View style={{height: 10}} />
                {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>OR</Text>
                    
                  </View>
                  <Icon
                    name={'google'}
                    size={25}
                    onPress={signIn}
                    style={{alignSelf: 'center'}}
                  /> */}
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
    // position: 'absolute',
    // top: 0,
    // bottom: 300,
    // left: 0,
    // right: 0,
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
