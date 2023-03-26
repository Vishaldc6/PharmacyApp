import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {Images} from '../../assets/images';
import {size} from '../../styles/size';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import {getToken, getUserData} from '../../config/apiServices/ApiServices';
import {AppStrings} from '../../utils/AppStrings';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListTile = ({icon, title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
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
        {icon == 'shopping-cart' ? (
          <Icon
            name={icon}
            size={size.height / 35}
            color={colors.primary_color}
          />
        ) : (
          <Fontisto
            name={icon}
            size={size.height / 35}
            color={colors.primary_color}
          />
        )}

        <View style={{width: 20}} />
        <Text style={fonts.h4}>{title}</Text>
      </View>
      <Icon
        name={'chevron-right'}
        size={size.height / 35}
        color={colors.primary_color}
      />
    </View>
  </TouchableOpacity>
);

const ProfileScreen = props => {
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);
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
    console.log(USER.data.image);
    setuser(USER);
    setloading(false);
    setisRefresh(false);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Profile'} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                getData();
              }}
            />
          }>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate(ScreenNames.EditProfileScreen, {
                // isAdmin: true,
              });
            }}>
            <View
              style={{
                ...GlobalStyles.infoCard,
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={
                  user.data.image ? {uri: user.data.image} : Images.noImage
                }
                style={{
                  // height: size.height / 8,
                  // width: size.height / 8,
                  height: widthPercentageToDP(20),
                  width: widthPercentageToDP(20),
                  borderRadius: widthPercentageToDP(50),
                }}
              />
              <View style={{marginHorizontal: 10}}>
                <Text style={{...fonts.h4}}>{user.data.name}</Text>
                <Text style={{...fonts.h4}}>{user.data.email}</Text>
                <Text style={{...fonts.h4}}>{user.data.mobile}</Text>
                {/* <Text style={fonts.h3}>MBBS</Text> */}
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={GlobalStyles.infoCard}>
            <ListTile
              icon={'shopping-bag'}
              onPress={() => {
                props.navigation.navigate(ScreenNames.OrderScreen);
              }}
              title={'My Orders'}
            />
            <ListTile
              icon={'shopping-cart'}
              onPress={() => {
                props.navigation.navigate(ScreenNames.CartScreen);
              }}
              title={'My Cart'}
            />
            <ListTile
              icon={'laboratory'}
              onPress={() => {
                props.navigation.navigate(ScreenNames.LabTestBookScreen);
              }}
              title={'My Tests'}
            />
            <ListTile
              icon={'doctor'}
              onPress={() => {}}
              title={'My Consultations'}
            />
            <ListTile
              icon={'pulse'}
              onPress={() => {}}
              title={'My Care Plans'}
            />
          </View>

          <View style={{margin: widthPercentageToDP(5)}}>
            <CustomButton
              title={'Log Out'}
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
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
