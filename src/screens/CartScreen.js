import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import {ApiCall, getToken} from '../config/apiServices/ApiServices';
import {AppStrings} from '../utils/AppStrings';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import {size} from '../styles/size';
import CustomButton from '../components/CustomButton';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import CustomHeading from '../components/CustomHeading';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGlobaStyles} from '../styles/GlobalStyles';

const CartScreen = props => {
  const GlobalStyles = useGlobaStyles();
  const [cartList, setcartList] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);
  const [is_doctor_required, setis_doctor_required] = useState(false);
  const [is_report_required, setis_report_required] = useState(false);
  const [amt, setamt] = useState(0);

  // let amt = 0;

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = async () => {
    const token = await getToken();

    const res = await fetch(AppStrings.BASE_URL + '/cartList', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'GET',
    });
    // const jsonRes = await res.json();
    let responseText = await res.text();
    let jsonRes = JSON.parse(responseText);
    console.log('Screen res :', jsonRes);
    console.log(res);
    // if (res.ok) {
    if (jsonRes.flag) {
      // Alert.alert(AppStrings.appName, jsonRes.message);
      console.log('jsonRes.data.cart_items : ', jsonRes.data.cart_items);
      setcartList(jsonRes.data.cart_items);
      jsonRes.data.cart_items.forEach(item => {
        console.log(item.product_detail.is_required_doctor);
        if (item.product_detail.is_required_doctor) {
          setis_doctor_required(true);
        }
        if (item.product_detail.is_required_report) {
          setis_report_required(true);
        }
      });

      let amount = 0;
      jsonRes.data.cart_items.map(item => {
        console.log(item.product_detail.price * item.qty);
        amount += item.product_detail.price * item.qty;
        console.log(amount);
        setamt(amount);
      });
      setloading(false);
      setisRefresh(false);
    } else if (jsonRes.flag == false) {
      if (jsonRes.data?.errors != null) {
        Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
      } else {
        Alert.alert(AppStrings.appName, jsonRes.message);
      }
    } else {
      Alert.alert(AppStrings.appName, jsonRes.message);
    }
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Cart List'} back {...props} />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : cartList.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No items found</Text>
        </View>
      ) : (
        <>
          <CustomHeading header1="Amount : " header2={amt.toFixed(2)} />
          {/* <Text style={fonts.h1}>Amount : {amt}</Text> */}
          <View style={GlobalStyles.infoCard}>
            <FlatList
              // style={{flex: 1, backgroundColor: 'red'}}
              refreshControl={
                <RefreshControl
                  refreshing={isRefresh}
                  onRefresh={() => {
                    getCartList();
                  }}
                />
              }
              data={cartList}
              renderItem={({item}) => {
                return (
                  <View style={styles.productCard}>
                    <Image
                      source={{
                        uri:
                          // 'http://192.168.29.125:8000/products/thumbnail/' +
                          'http://192.168.43.125:8000/products/thumbnail/' +
                          // 'http://192.168.43.119:8000/products/thumbnail/' +
                          item.product_detail.thumbnail,
                      }}
                      style={{height: 120, width: 120}}
                    />
                    <View style={{width: 20}} />
                    <View style={{flex: 1}}>
                      <Text style={fonts.h4}>{item.product_detail.name}</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{...fonts.h3, color: colors.darkgray}}>
                          {item.product_detail.rate} rate
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                        }}>
                        <Text style={fonts.h6}>
                          Rs.{item.product_detail.price}{' '}
                        </Text>
                      </View>
                      <Text style={{...fonts.h6, color: colors.darkgray}}>
                        {item.qty} items
                      </Text>
                      <TouchableOpacity
                        style={{flex: 1}}
                        onPress={async () => {
                          console.log(item.id);
                          const res = await ApiCall(
                            `/removeCartItem/${item.id}`,
                            'GET',
                          );
                          console.log('deleted item : ', res);
                          if (res) {
                            Alert.alert(AppStrings.appName, res);
                            getCartList();
                          }
                        }}>
                        <View style={styles.btn}>
                          <Icon
                            name="trash-o"
                            color={colors.primary_color}
                            size={25}
                            style={{margin: 8}}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </>
      )}
      {cartList.length == 0 ? null : (
        <View
          style={{
            padding: 10,
            // flex: 1,
            bottom: 5,
            left: 5,
            right: 5,
            // backgroundColor: 'blue',
            position: 'absolute',
          }}>
          <CustomButton
            title={'Checkout'}
            onPress={() => {
              props.navigation.navigate(ScreenNames.CheckoutScreen, {
                amount: amt,
                is_doctor_required: is_doctor_required,
                is_report_required: is_report_required,
              });
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    width: size.width / 1.1,
    // backgroundColor: colors.black,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.darkgray,
  },
  btn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary_color_admin,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});

export default CartScreen;
