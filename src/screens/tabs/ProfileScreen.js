import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import CustomHeading from '../../components/CustomHeading';
import {size} from '../../styles/size';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Images} from '../../assets/images';
import {
  ApiCall,
  getToken,
  getUserData,
} from '../../config/apiServices/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {AppStrings} from '../../utils/AppStrings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {openGallery} from '../../utils/functions';

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

const ProfileScreen = props => {
  // const scrollY = useRef(new Animated.Value(0.01)).current;

  // const heightHandller = scrollY.interpolate({
  //   inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
  //   outputRange: [HeaderMaxHeight, HeaderMinHeight],
  //   extrapolate: 'clamp',
  // });

  // const imageheightHandller = scrollY.interpolate({
  //   inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
  //   outputRange: [ImageMaxHeight, ImageMinHeight],
  //   extrapolate: 'clamp',
  // });
  // const imagetransformationTopHandller = scrollY.interpolate({
  //   inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
  //   outputRange: [ImageTop, ImageMinTop],
  //   extrapolate: 'clamp',
  // });
  // const imagetransformationLeftHandller = scrollY.interpolate({
  //   inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
  //   outputRange: [ImageLeft, ImageMinLeft],
  //   extrapolate: 'clamp',
  // });
  // const scaleImageHandler = scrollY.interpolate({
  //   inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
  //   outputRange: [1, 0.5],
  //   extrapolate: 'clamp',
  // });

  // return (
  //   <View style={GlobalStyles.mainContainer}>
  //     {/* <CustomHeader cart={true} /> */}
  //     <Text
  //       style={{...fonts.h1, alignSelf: 'center', padding: 10}}
  //       onPress={async () => {
  //         // const res = await ApiCall('/logout', 'POST');
  //         // console.log('logout user ', res);
  //         // if (res.success) {
  //         await AsyncStorage.setItem('TOKEN', JSON.stringify('logout'));
  //         props.navigation.replace(ScreenNames.AuthStack);
  //         // }
  //       }}>
  //       Log Out
  //     </Text>
  //     <ReactNativeParallaxHeader
  //       // extraScrollHeight={300}
  //       backgroundImage={Images.noImage}
  //       navbarColor={
  //         props.route.params.isAdmin ? colors.primary_color_admin : null
  //       }
  //       scrollViewProps={{
  //         onScroll:
  //           // e => console.log(e.nativeEvent),
  //           () => {
  //             console.log('first0');
  //             Animated.event(
  //               [
  //                 {
  //                   nativeEvent: {
  //                     contentOffset: {
  //                       y: scrollY,
  //                     },
  //                   },
  //                 },
  //               ],
  //               {
  //                 useNativeDriver: false,
  //               },
  //             );
  //           },
  //       }}
  //       // scrollViewProps={{
  //       //   onScrollBeginDrag: e => console.log('onScrollBeginDrag', e),
  //       //   onScrollEndDrag: e => console.log('onScrollEndDrag', e),
  //       // }}
  //       headerMaxHeight={HeaderMaxHeight}
  //       headerMinHeight={HeaderMinHeight}
  //       title={
  //         <Image
  //           source={Images.noImage}
  //           // style={{borderRadius: 100}}
  //           style={{
  //             // top: imagetransformationTopHandller,
  //             // left: imagetransformationLeftHandller,
  //             borderRadius: 100,
  //             height: imageheightHandller,
  //             width: imageheightHandller,
  //             // margin: 10,
  //             transform: [
  //               {
  //                 scale: 0.35,
  //               },
  //             ],
  //           }}
  //         />
  //       }
  //       renderContent={() => (
  //         <View>
  //           <ListTile icon={'shopping-cart'} title={'My Cart'} />
  //           <ListTile icon={'user-md'} title={'My Doctors'} />
  //           <ListTile icon={'flask'} title={'My Lab Tests'} />
  //           <ListTile icon={'heart'} title={'My Care Plans'} />
  //           {/* <ListTile icon={'shopping-cart'} title={'My Cart'} />
  //           <ListTile icon={'shopping-cart'} title={'My Doctors'} />
  //           <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
  //           <ListTile icon={'shopping-cart'} title={'My Cart'} />
  //           <ListTile icon={'shopping-cart'} title={'My Doctors'} />
  //           <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
  //           <ListTile icon={'shopping-cart'} title={'My Cart'} />
  //           <ListTile icon={'shopping-cart'} title={'My Doctors'} />
  //           <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
  //           <ListTile icon={'shopping-cart'} title={'My Cart'} />
  //           <ListTile icon={'shopping-cart'} title={'My Doctors'} />
  //           <ListTile icon={'shopping-cart'} title={'My Lab Tests'} /> */}
  //         </View>
  //       )}
  //     />

  //     {/* <Animated.View
  //       style={{
  //         // backgroundColor: 'red',
  //         height: heightHandller,
  //         // justifyContent: 'center',
  //       }}>
  //       <Text style={fonts.h1}>Back</Text>
  //       <Animated.Image
  //         source={Images.noImage}
  //         style={{
  //           top: imagetransformationTopHandller,
  //           left: imagetransformationLeftHandller,
  //           borderRadius: 100,
  //           height: imageheightHandller,
  //           width: imageheightHandller,
  //           // margin: 10,
  //           transform: [
  //             {
  //               scale: scaleImageHandler,
  //             },
  //           ],
  //         }}
  //       />

  //     </Animated.View> */}

  //     {/* <Animated.ScrollView
  //       style={{
  //         // flex: 1,
  //         width: '100%',
  //         // position: 'absolute',
  //         // bottom: 0,
  //         alignSelf: 'center',
  //         padding: 10,
  //         borderRadius: 20,
  //         backgroundColor: colors.white,
  //       }}
  //       showsVerticalScrollIndicator={false}
  //       scrollEventThrottle={16}
  //       onScroll={Animated.event(
  //         [
  //           {
  //             nativeEvent: {
  //               contentOffset: {
  //                 y: scrollY,
  //               },
  //             },
  //           },
  //         ],
  //         {
  //           useNativeDriver: false,
  //         },
  //       )}>

  //       <Text
  //         style={{...fonts.h1, alignSelf: 'center', padding: 10}}
  //         onPress={async () => {
  //           // const res = await ApiCall('/logout', 'POST');
  //           // console.log('logout user ', res);
  //           // if (res.success) {
  //           await AsyncStorage.setItem('TOKEN', JSON.stringify('logout'));
  //           props.navigation.replace(ScreenNames.AuthStack);
  //           // }
  //         }}>
  //         Log Out
  //       </Text>
  //       <ListTile icon={'shopping-cart'} title={'My Cart'} />
  //       <ListTile icon={'shopping-cart'} title={'My Doctors'} />
  //       <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
  //       <ListTile icon={'shopping-cart'} title={'My Orders'} />
  //       <View style={{height: HeaderMaxHeight, backgroundColor: 'white'}} />
  //     </Animated.ScrollView> */}
  //   </View>
  // );

  const [user, setuser] = useState({});

  const [ID, setID] = useState('');
  const [email, setemail] = useState('');
  const [mob, setmob] = useState('');
  const [username, setusername] = useState('');
  const [dob, setdob] = useState('');
  const [img, setimg] = useState('');
  const [education, seteducation] = useState(null);
  const [experiance, setexperiance] = useState(null);
  const [specialist, setspecialist] = useState(null);

  const [token, settoken] = useState('');

  const [emailError, setemailError] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [mobError, setmobError] = useState('');
  const [dobError, setdobError] = useState('');
  const [educationError, seteducationError] = useState('');
  const [specialistError, setspecialistError] = useState('');
  const [experianceError, setexperianceError] = useState('');

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
    const USER = await res.json();
    console.log('Screen res :', USER);
    console.log(USER);
    settoken(tkn);
    console.log(USER.data.name);
    setuser(USER.data);
    setID(USER.data.id);
    setemail(USER.data.email);
    setusername(USER.data.name);
    setmob(USER.data.mobile);
    setdob(USER.data.date_of_birth);
    seteducation(USER.data.education);
    setspecialist(USER.data.specialist);
    setexperiance(USER.data.experiance);
    setimg(USER.data.image);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Profile'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            // backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <Image
            source={user.image ? {uri: user.image_url} : Images.noImage}
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
            <Icon name={'pencil'} size={25} style={{marginHorizontal: 10}} />
            <Text
              onPress={async () => {
                const res = await openGallery();
                console.log(res);
                //   setimgName(res.fileName);
                //   setimgPath(res.uri);
                setimg(res);
              }}>
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
          <Text style={styles.errorText}>{usernameError}</Text>
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
            onChangeText={val => {
              setdob(val);
            }}
            value={dob}
            title={'Date of Birth'}
            placeholder={'Enter Date of Birth'}
            iconName={'calendar'}
            keyboardType={'email-address'}
          />
          <Text style={styles.errorText}>{dobError}</Text>
          {user.role_id == 2 && (
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
        </View>
        <View style={{flexDirection: 'row', marginVertical: 30}}>
          <CustomButton
            title={'Update'}
            onPress={async () => {
              if (user.role_id == 2) {
                if (experiance == '' || experiance == null) {
                  setexperiance('*Please enter experiance');
                }
                if (specialist == '' || specialist == null) {
                  setspecialist('*Please enter specialist');
                }
                if (education == '' || education == null) {
                  seteducation('*Please enter education');
                }
              }
              if (email == '') {
                setemailError('* Please enter Email');
              }
              if (username == '' || username == null) {
                setusernameError('* Please enter Username');
              }
              if (dob == '' || dob == null) {
                setdobError('* Please enter Date of birth');
              }
              if (mob == '' || mob == null) {
                // Alert.alert('Sign in',"All flieds are empty")
                setmobError('* Please enter Mobile');
              } else {
                const body = new FormData();
                body.append('name', username);
                body.append('mobile', mob);
                body.append('date_of_birth', dob);
                body.append('image', {
                  uri: img.uri,
                  name: img.fileName,
                  type: img.type,
                });
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
                const jsonRes = await res.json();
                console.log('Screen res :', jsonRes);
                console.log(res);
                // if (res.ok) {
                if (jsonRes.flag) {
                  Alert.alert(AppStrings.appName, jsonRes.message);
                } else if (jsonRes.flag == false) {
                  if (jsonRes.data?.errors != null) {
                    Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
                  } else {
                    Alert.alert(AppStrings.appName, jsonRes.message);
                  }
                }
              }
            }}
          />
        </View>
        <Text
          style={{...fonts.h1, alignSelf: 'center', padding: 10}}
          onPress={async () => {
            // const res = await ApiCall('/logout', 'POST');
            // console.log('logout user ', res);
            // if (res.success) {
            await AsyncStorage.setItem('TOKEN', JSON.stringify('logout'));
            props.navigation.replace(ScreenNames.AuthStack);
            // }
          }}>
          Log Out
        </Text>
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

export default ProfileScreen;
