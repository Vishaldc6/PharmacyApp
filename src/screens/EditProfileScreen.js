import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  Alert,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import CustomHeading from '../components/CustomHeading';
import {size} from '../styles/size';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Images} from '../assets/images';
import {
  ApiCall,
  getToken,
  getUserData,
} from '../config/apiServices/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {AppStrings} from '../utils/AppStrings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {openGallery} from '../utils/functions';
import {Dropdown} from 'react-native-element-dropdown';
import {doctorTypeList} from '../assets/data/doctorTypeList';
import CustomHeader from '../components/CustomHeader';
import {useGlobaStyles} from '../styles/GlobalStyles';

const ListTile = ({icon, title, onPress}) => (
  <View
    style={{
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    }}>
    <View style={{flexDirection: 'row'}}>
      <Icon name={icon} size={size.height / 35} color={colors.primary_color} />
      <View style={{width: 20}} />
      <Text style={fonts.h4}>{title}</Text>
    </View>
    <Icon
      name={'chevron-right'}
      size={size.height / 35}
      color={colors.primary_color}
    />
  </View>
);

HeaderMaxHeight = size.height / 2;
HeaderMinHeight = size.height / 14;
ImageMaxHeight = size.height / 5;
ImageMinHeight = size.height / 12;
ImageTop = size.height / 8;
ImageLeft = size.width / 3.5;
ImageMinTop = 5;
ImageMinLeft = 5;

const EditProfileScreen = props => {
  const GlobalStyles = useGlobaStyles();

  const [user, setuser] = useState({});

  const [ID, setID] = useState('');
  const [email, setemail] = useState('');
  const [mob, setmob] = useState('');
  const [username, setusername] = useState('');
  const [dob, setdob] = useState('');
  const [add, setadd] = useState('');
  const [img, setimg] = useState('');
  const [education, seteducation] = useState(null);
  const [experiance, setexperiance] = useState(null);
  const [specialist, setspecialist] = useState(null);

  const [token, settoken] = useState('');

  const [emailError, setemailError] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [mobError, setmobError] = useState('');
  const [dobError, setdobError] = useState('');
  const [addError, setaddError] = useState('');
  const [educationError, seteducationError] = useState('');
  const [specialistError, setspecialistError] = useState('');
  const [experianceError, setexperianceError] = useState('');
  const [isRefresh, setisRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await getUserData();
    console.log(data.id);
    const tkn = await getToken();
    const res = await fetch(AppStrings.BASE_URL + '/users/' + data.id, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + tkn,
      },
      method: 'GET',
      // body: body,
    });
    // const USER = await res.json();
    let responseText = await res.text();
    let USER = JSON.parse(responseText);
    console.log('Screen res :', USER);
    console.log(USER);
    console.log(USER.data.name);
    settoken(tkn);
    setuser(USER.data);
    setID(USER.data.id);
    setemail(USER.data.email);
    setusername(USER.data.name);
    setmob(USER.data.mobile);
    setadd(USER.data.address);
    setdob(USER.data.date_of_birth);
    seteducation(USER.data.education);
    setspecialist(USER.data.specialist);
    setexperiance(USER.data.experience);
    setimg(USER.data.image);
    setisRefresh(false);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Edit Profile'} back {...props} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={() => getData()} />
        }>
        <View
          style={{
            ...GlobalStyles.infoCard,
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <Image
              source={
                img?.uri
                  ? {uri: img?.uri}
                  : user.image
                  ? {uri: user.image}
                  : Images.noImage
              }
              style={{
                borderRadius: 100,
                height: size.width / 4,
                width: size.width / 4,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={'pencil'}
                size={20}
                color={colors.primary_color}
                style={{
                  marginHorizontal: 5,
                  position: 'absolute',
                  bottom: 20,
                  right: 15,
                  borderWidth: 1,
                  borderRadius: 20,
                  backgroundColor: colors.white,
                  padding: 5,
                  paddingLeft: 8,
                }}
                onPress={async () => {
                  const res = await openGallery();
                  console.log(res);
                  //   setimgName(res.fileName);
                  //   setimgPath(res.uri);
                  setimg(res);
                }}
              />
              <Text
                style={fonts.h3}
                // onPress={async () => {
                //   const res = await openGallery();
                //   console.log(res);
                //   //   setimgName(res.fileName);
                //   //   setimgPath(res.uri);
                //   setimg(res);
                // }}
              >
                Update Profile Picture
              </Text>
            </View>
          </View>
          <View>
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
            <Text style={GlobalStyles.errorText}>{usernameError}</Text>
            <CustomInput
              editable={false}
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
                setadd(val);
              }}
              value={add}
              title={'Address'}
              placeholder={'Enter Address'}
              keyboardType={'email-address'}
              iconName={'home'}
            />
            <Text style={GlobalStyles.errorText}>{addError}</Text>
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
              onChangeText={val => {
                setdob(val);
              }}
              value={dob}
              title={'Date of Birth'}
              placeholder={'Enter Date of Birth'}
              iconName={'calendar'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{dobError}</Text>
            {user.education && (
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
              </>
            )}
            {user.experience && (
              <>
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
                <Text style={GlobalStyles.errorText}>{experianceError}</Text>
              </>
            )}

            {user.specialist && (
              <>
                <>
                  <Text style={{...fonts.h3, marginLeft: 10}}>Specialist</Text>
                  <Dropdown
                    style={{
                      margin: 10,
                      borderBottomWidth: 1.5,
                      borderBottomColor: colors.darkgray,
                    }}
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
                  <View style={{height: 15}} />
                </>

                <Text style={GlobalStyles.errorText}>{specialistError}</Text>
              </>
            )}
          </View>
        </View>
        <View style={{marginVertical: 20}}>
          <CustomButton
            title={'Update'}
            onPress={async () => {
              if (user.role_id == 2) {
                if (experiance == '' || experiance == null) {
                  setexperianceError('*Please enter experiance');
                }
                if (specialist == '' || specialist == null) {
                  setspecialistError('*Please enter specialist');
                }
                if (education == '' || education == null) {
                  seteducationError('*Please enter education');
                }
              } else if (email == '' || email == null) {
                setemailError('* Please enter Email');
              } else if (username == '' || username == null) {
                setusernameError('* Please enter Username');
              } else if (add == '' || add == null) {
                setaddError('* Please enter Address');
              } else if (dob == '' || dob == null) {
                setdobError('* Please enter Date of birth');
              } else if (mob == '' || mob == null) {
                // Alert.alert('Sign in',"All flieds are empty")
                setmobError('* Please enter Mobile');
              } else {
                const body = new FormData();
                body.append('name', username);
                body.append('mobile', mob);
                body.append('date_of_birth', dob);
                body.append('address', add);
                if (user.role_id == 2) {
                  body.append('specialist', specialist);
                  body.append('education', education);
                  body.append('experience', experiance);
                }
                if (img.uri) {
                  body.append('image', {
                    uri: img.uri,
                    name: img.fileName,
                    type: img.type,
                  });
                }
                const res = await fetch(
                  AppStrings.BASE_URL + '/userUpdate/' + ID,
                  {
                    headers: {
                      Accept: 'application/json',
                      Authorization: 'Bearer ' + token,
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
                  setaddError('');
                  setdobError('');
                  setmobError('');
                  setemailError('');
                  setusernameError('');
                  seteducationError('');
                  setexperianceError('');
                  setspecialistError('');
                } else if (jsonRes.flag == false) {
                  if (jsonRes.data?.errors != null) {
                    Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
                  } else {
                    Alert.alert(AppStrings.appName, jsonRes.message);
                  }
                } else {
                  Alert.alert(AppStrings.appName, jsonRes.message);
                }
              }
            }}
          />
          <View style={{height: 20}} />
          <CustomButton
            title={'Log Out'}
            secondary
            onPress={async () => {
              // const res = await ApiCall('/logout', 'POST');
              // console.log('logout user ', res);
              // if (res.success) {
              await AsyncStorage.setItem('TOKEN', JSON.stringify('logout'));
              props.navigation.replace(ScreenNames.AuthStack);
              // }
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 5,
    width: 30,
    backgroundColor: colors.grey,
    borderRadius: 20,
    alignSelf: 'center',
    margin: 5,
  },
  errorText: {
    color: colors.red,
    marginLeft: 55,
  },
});

export default EditProfileScreen;
