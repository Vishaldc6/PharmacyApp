import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import {getToken} from '../config/apiServices/ApiServices';
import {AppStrings} from '../utils/AppStrings';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import {size} from '../styles/size';
import CustomButton from '../components/CustomButton';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import CustomHeading from '../components/CustomHeading';

const CartScreen = props => {
  const [cartList, setcartList] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);
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
    const jsonRes = await res.json();
    console.log('Screen res :', jsonRes);
    console.log(res);
    // if (res.ok) {
    if (jsonRes.flag) {
      // Alert.alert(AppStrings.appName, jsonRes.message);
      console.log('jsonRes.data.cart_items : ', jsonRes.data.cart_items);
      setcartList(jsonRes.data.cart_items);

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
                        'http://192.168.29.125:8000/products/thumbnail/' +
                        item.product_detail.thumbnail,
                    }}
                    style={{height: 120, width: 120}}
                  />
                  <View style={{width: 20}} />
                  <View style={{flex: 1}}>
                    <Text style={fonts.h4}>{item.product_detail.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  </View>
                </View>
              );
            }}
          />
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
    // backgroundColor: colors.white,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.darkgray,
  },
});

export default CartScreen;
