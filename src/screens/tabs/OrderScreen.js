import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import {ApiCall, getToken} from '../../config/apiServices/ApiServices';
import {AppStrings} from '../../utils/AppStrings';
import fonts, {FONT_SIZE12, FONT_SIZE14, FONT_SIZE16} from '../../styles/fonts';
import colors from '../../styles/colors';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useGlobaStyles} from '../../styles/GlobalStyles';
import {useAppSelector} from '../../redux/store/Store';

const OrderScreen = props => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  const GlobalStyles = useGlobaStyles();
  const styles = useStyles();

  const [orderList, setorderList] = useState([]);

  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getList();
    });
    getList();
  }, []);

  const getList = async () => {
    // AsyncStorage.getItem('LAB_TESTS').then(res => {
    //   let data = JSON.parse(res);
    //   console.log('lab test : ', data);
    //   settestList(data);
    // });

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

  const downloadFile = (link, filename) => {
    // const source = 'https://www.africau.edu/images/default/sample.pdf';
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/${filename}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: filename,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', link)
      .then(res => {
        // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
        // whereas in android, the download manager is handling the download for us.
        if (Platform.OS === 'ios') {
          const filePath = res.path();
          let options = {
            type: 'application/pdf',
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log('BLOB ERROR -> ', err));
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'My Orders'} />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : orderList.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: FONT_SIZE16,
              fontWeight: '800',
              color: colors.black,
            }}>
            No Order Founds
          </Text>
        </View>
      ) : (
        <>
          <View style={GlobalStyles.infoCard}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{marginBottom: 50}}
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
                    <Text
                      style={{
                        fontSize: FONT_SIZE14,
                        fontWeight: '400',
                        color: colors.black,
                        // color: colors.white,
                        alignSelf: 'flex-end',
                      }}>
                      {moment(item.created_at).utc().format('hh:mm A')}
                    </Text>
                    <Text
                      style={{
                        fontSize: FONT_SIZE16,
                        fontWeight: '800',
                        color: colors.black,
                      }}>
                      Order ID {item.order_number}
                    </Text>
                    <Text
                      style={{
                        fontSize: FONT_SIZE14,
                        fontWeight: '400',
                        color: colors.black,
                      }}>
                      {item.shipping_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: FONT_SIZE14,
                        fontWeight: '400',
                        color: colors.black,
                      }}>
                      Payment ID : {item.payment_id}
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        console.log(item.invoice_url);
                        // Linking.openURL(item.invoice_url);
                        downloadFile(
                          item.invoice_url,
                          `Order ID ${item.order_number}`,
                        );
                      }}>
                      <View style={styles.btn}>
                        <Text
                          style={{
                            fontSize: FONT_SIZE12,
                            fontWeight: '400',
                            color: colors.black,
                            color: colors.primary_color,
                          }}>
                          Download Invoice
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableOpacity>
              )}
            />
            {/* <View style={{height: 100}} /> */}
          </View>
        </>
      )}
    </View>
  );
};

const useStyles = () => {
  const {colors} = useAppSelector(state => state.CommonSlice);

  return StyleSheet.create({
    card: {
      margin: 5,
      padding: 15,
      borderWidth: 1.5,
      borderColor: colors.primary_color,
      borderRadius: 15,
      backgroundColor: colors.white,
    },
    btn: {
      borderColor: colors.primary_color,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      margin: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  });
};

export default OrderScreen;
