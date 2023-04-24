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
  ActivityIndicator,
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
import {useFormik} from 'formik';
import * as Yup from 'yup';

const SignUpScreen = props => {
  const signUpValidation = Yup.object().shape({
    username: Yup.string()
      .trim()
      .matches(/^[A-Za-z]*$/, AppStrings.usernameNumError)
      .required(AppStrings.usernameRequired)
      .min(3, AppStrings.usernameError),
    email: Yup.string()
      .trim()
      .email(AppStrings.emailError)
      .required(AppStrings.emailRequired),
    mob: Yup.string()
      .trim()
      .length(10, AppStrings.mobError)
      .required(AppStrings.mobRequired),
    password: Yup.string()
      .min(8, AppStrings.passwordLengthError)
      .required(AppStrings.passwordRequired),
    confirmPassword: Yup.string()
      .required(AppStrings.passwordRequired)
      .oneOf([Yup.ref('password')], AppStrings.passwordMatchError),
    // education: Yup.string().trim().required(AppStrings.educationRequired),
    // experiance: Yup.string().trim().required(AppStrings.experianceRequired),
  });
  const DoctorSignUpValidation = Yup.object().shape({
    username: Yup.string()
      .trim()
      .matches(/^[A-Za-z]*$/, AppStrings.usernameNumError)
      .required(AppStrings.usernameRequired)
      .min(3, AppStrings.usernameError),
    email: Yup.string()
      .trim()
      .email(AppStrings.emailError)
      .required(AppStrings.emailRequired),
    mob: Yup.string()
      .trim()
      .length(10, AppStrings.mobError)
      .required(AppStrings.mobRequired),
    password: Yup.string()
      .min(8, AppStrings.passwordLengthError)
      .required(AppStrings.passwordRequired),
    confirmPassword: Yup.string()
      .required(AppStrings.passwordRequired)
      .oneOf([Yup.ref('password')], AppStrings.passwordMatchError),
    education: Yup.string()
      .trim()
      .required(AppStrings.educationRequired)
      .min(2, '*please enter proper education degree'),
    experiance: Yup.string()
      .trim()
      .required(AppStrings.experianceRequired)
      .min(5, '*please enter proper experiance year/month'),
  });

  const GlobalStyles = useGlobaStyles();

  const [specialist, setspecialist] = useState('');
  const [isCheck, setisCheck] = useState(false);
  const [loading, setloading] = useState(false);

  const {values, errors, handleChange, handleSubmit, touched, setFieldError} =
    useFormik({
      initialValues: {
        username: '',
        email: '',
        mob: '',
        password: '',
        confirmPassword: '',
        specialist: '',
        education: '',
        experiance: '',
      },
      validationSchema: isCheck ? DoctorSignUpValidation : signUpValidation,
      onSubmit: async values => {
        if (!specialist && isCheck) {
          setFieldError('specialist', '* please select specialist');
        } else {
          console.log(values);

          setloading(true);
          const body = new FormData();
          body.append('name', values.username);
          body.append('email', values.email);
          body.append('mobile', values.mob);
          body.append('password', values.password);
          body.append('password_confirmation', values.confirmPassword);
          if (isCheck) {
            body.append('specialist', specialist);
            body.append('education', values.education);
            body.append('experience', values.experiance);
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
          let responseText = await res.text();
          let jsonRes = JSON.parse(responseText);
          if (jsonRes.flag) {
            Alert.alert(AppStrings.appName, jsonRes.message);
            setloading(false);
            props.navigation.navigate(ScreenNames.SignInScreen);
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
          setloading(false);
        }
      },
    });

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
                  onChangeText={handleChange('username')}
                  value={values.username}
                  title={'Username'}
                  placeholder={'Enter Username'}
                  keyboardType={'email-address'}
                  iconName={'user-circle-o'}
                />
                {touched.username && errors.username ? (
                  <Text style={{...GlobalStyles.errorText}}>
                    {errors.username}
                  </Text>
                ) : (
                  ''
                )}
                <CustomInput
                  onChangeText={handleChange('email')}
                  value={values.email}
                  title={'Email'}
                  placeholder={'Enter Email'}
                  keyboardType={'email-address'}
                  iconName={'envelope-o'}
                />
                {touched.email && errors.email ? (
                  <Text style={GlobalStyles.errorText}>{errors.email}</Text>
                ) : (
                  ''
                )}
                <CustomInput
                  onChangeText={handleChange('mob')}
                  value={values.mob}
                  title={'Mobile'}
                  placeholder={'Enter Mobile'}
                  keyboardType={'phone-pad'}
                  iconName={'mobile-phone'}
                />
                {touched.mob && errors.mob ? (
                  <Text style={GlobalStyles.errorText}>{errors.mob}</Text>
                ) : (
                  ''
                )}
                <CustomInput
                  passwordField={true}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  title={'Password'}
                  placeholder={'Enter Password'}
                  iconName={'key'}
                />
                {touched.password && errors.password ? (
                  <Text style={GlobalStyles.errorText}>{errors.password}</Text>
                ) : (
                  ''
                )}
                <CustomInput
                  passwordField={true}
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  title={'Confirm Password'}
                  placeholder={'Enter Confirm Password'}
                  iconName={'key'}
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Text style={GlobalStyles.errorText}>
                    {errors.confirmPassword}
                  </Text>
                ) : (
                  ''
                )}
                {isCheck && (
                  <>
                    <CustomInput
                      onChangeText={handleChange('education')}
                      value={values.education}
                      title={'Education'}
                      placeholder={'Enter Education'}
                      keyboardType={'email-address'}
                      iconName={'info'}
                    />
                    {touched.education && errors.education ? (
                      <Text style={GlobalStyles.errorText}>
                        {errors.education}
                      </Text>
                    ) : (
                      ''
                    )}
                    <CustomInput
                      onChangeText={handleChange('experiance')}
                      value={values.experiance}
                      title={'Experiance'}
                      placeholder={'Enter Experiance'}
                      keyboardType={'email-address'}
                      iconName={'info'}
                    />
                    {touched.experiance && errors.experiance ? (
                      <Text style={GlobalStyles.errorText}>
                        {errors.experiance}
                      </Text>
                    ) : (
                      ''
                    )}

                    <Text style={{...fonts.h3, marginLeft: 10}}>
                      Doctor Type
                    </Text>
                    <Dropdown
                      style={{
                        margin: 10,
                        borderBottomWidth: 1.5,
                        borderBottomColor: colors.darkgray,
                      }}
                      renderLeftIcon={() => (
                        <Icon
                          name={'user'}
                          size={20}
                          color={colors.darkgray}
                          style={{marginHorizontal: 10}}
                        />
                      )}
                      data={doctorTypeList}
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
                    {touched.specialist && errors.specialist ? (
                      <Text style={GlobalStyles.errorText}>
                        {errors.specialist}
                      </Text>
                    ) : (
                      ''
                    )}
                    {/* <Text style={GlobalStyles.errorText}>
                      {specialistError}
                    </Text> */}
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
                    <Text style={fonts.h4}>As Doctor</Text>
                  </View>
                </View>
                <View style={{height: 10}} />
                <View style={{marginHorizontal: 10}}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <CustomButton title={'Sign up'} onPress={handleSubmit} />
                  )}
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
