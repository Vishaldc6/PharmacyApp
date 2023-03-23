import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import {ApiCall, getToken} from '../config/apiServices/ApiServices';
import {AppStrings} from '../utils/AppStrings';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import CustomButton from '../components/CustomButton';

const OrderScreen = props => {
  const [orderList, setorderList] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    console.log('getlist');
    const token = await getToken();
    const res = await fetch(AppStrings.BASE_URL + '/listOrder', {
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

    if (jsonRes.flag) {
      setorderList(jsonRes.data.orders);
      setisRefresh(false);
      setloading(false);
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
      <CustomHeader title={'My Orders'} />
      <Text
        onPress={() => {
          getList();
        }}>
        OrderScreen
      </Text>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => getList()}
            />
          }
          data={orderList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={async () => {
                const token = await getToken();
                const res = await fetch(
                  AppStrings.BASE_URL + '/orderDetail/' + item.id,
                  {
                    headers: {
                      Accept: 'application/json',
                      Authorization: 'Bearer ' + token,
                    },
                    method: 'GET',
                  },
                );

                // const jsonRes = await res.json();
                let responseText = await res.text();
                let jsonRes = JSON.parse(responseText);
                console.log('Screen res :', jsonRes);
                // console.log(res);

                if (jsonRes.flag) {
                  props.navigation.navigate(ScreenNames.OrderDetailScreen, {
                    data: jsonRes.data.order,
                  });
                } else if (jsonRes.flag == false) {
                  if (jsonRes.data?.errors != null) {
                    Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
                  } else {
                    Alert.alert(AppStrings.appName, jsonRes.message);
                  }
                } else {
                  Alert.alert(AppStrings.appName, jsonRes.message);
                }
              }}>
              <View style={styles.card}>
                <Text style={fonts.h1}>Order ID {item.order_number}</Text>
                <Text style={fonts.h2}>{item.shipping_name}</Text>
                <Text style={fonts.h2}>Payment ID : {item.payment_id}</Text>
              </View>
            </TouchableOpacity>

            // <TouchableOpacity
            //   style={{
            //     padding: 10,
            //     borderRadius: 10,
            //     borderWidth: 0.5,
            //     margin: 5,
            //     backgroundColor: colors.white,
            //     elevation: 5,
            //   }}
            //   onPress={async () => {
            //     const token = await getToken();
            //     const res = await fetch(
            //       AppStrings.BASE_URL + '/orderDetail/' + item.id,
            //       {
            //         headers: {
            //           Accept: 'application/json',
            //           Authorization: 'Bearer ' + token,
            //         },
            //         method: 'GET',
            //       },
            //     );

            //     const jsonRes = await res.json();
            //     console.log('Screen res :', jsonRes);
            //     // console.log(res);

            //     if (jsonRes.flag) {
            //       props.navigation.navigate(ScreenNames.OrderDetailScreen, {
            //         data: jsonRes.data,
            //       });
            //     } else if (jsonRes.flag == false) {
            //       if (jsonRes.data?.errors != null) {
            //         Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
            //       } else {
            //         Alert.alert(AppStrings.appName, jsonRes.message);
            //       }
            //     }
            //   }}>
            //   <Text style={fonts.h1}>Billing Name : {item.billing_name}</Text>
            //   <Text style={fonts.h2}>Order ID : {item.order_number}</Text>
            //   <Text style={fonts.h2}>Payment ID : {item.payment_id}</Text>
            // </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.primary_color,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
});

export default OrderScreen;
