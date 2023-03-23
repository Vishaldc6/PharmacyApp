import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/CustomInput';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from '../components/CustomButton';
import {AppStrings} from '../utils/AppStrings';
import {getToken, getUserData} from '../config/apiServices/ApiServices';
import RazorpayCheckout from 'react-native-razorpay';
import {Images} from '../assets/images';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CheckoutScreen = props => {
  const amt = props.route.params.amount;

  const [ship_name, setship_name] = useState('');
  const [ship_mob, setship_mob] = useState('');
  const [ship_add, setship_add] = useState('');
  const [bill_name, setbill_name] = useState('');
  const [bill_mob, setbill_mob] = useState('');
  const [bill_add, setbill_add] = useState('');
  const [doctor_name, setdoctor_name] = useState('');
  const [payment_id, setpayment_id] = useState('');
  const [pdf, setpdf] = useState('');
  const [isVisiable, setisVisiable] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getUserData();
    console.log('user res : ', res);
    setship_name(res.name);
    setship_mob(res.mobile);
    setship_add(res.address);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader back {...props} title={'Checkout'} />
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...fonts.h1, margin: 8}}>Shipping Details</Text>
          <CustomInput
            onChangeText={val => {
              setship_name(val);
            }}
            value={ship_name}
            title={'Shipping Name'}
            placeholder={'Enter Shipping Name'}
            keyboardType={'email-address'}
          />
          <View style={{height: 15}} />
          <CustomInput
            onChangeText={val => {
              setship_mob(val);
            }}
            value={ship_mob}
            title={'Shipping Mobile'}
            placeholder={'Enter Shipping Mobile'}
            keyboardType={'email-address'}
          />
          <View style={{height: 15}} />
          <CustomInput
            onChangeText={val => {
              setship_add(val);
            }}
            value={ship_add}
            title={'Shipping Address'}
            placeholder={'Enter Shipping Address'}
            keyboardType={'email-address'}
          />
          <View style={{height: 15}} />
          <Text style={{...fonts.h1, margin: 8}}>Billing Details</Text>
          <CustomInput
            onChangeText={val => {
              setbill_name(val);
            }}
            value={bill_name}
            title={'Billing Name'}
            placeholder={'Enter Billing Name'}
            keyboardType={'email-address'}
          />
          <View style={{height: 15}} />
          <CustomInput
            onChangeText={val => {
              setbill_mob(val);
            }}
            value={bill_mob}
            title={'Billing Mobile'}
            placeholder={'Enter Billing Mobile'}
            keyboardType={'email-address'}
          />
          <View style={{height: 15}} />
          <CustomInput
            onChangeText={val => {
              setbill_add(val);
            }}
            value={bill_add}
            title={'Billing Address'}
            placeholder={'Enter Billing Address'}
            keyboardType={'email-address'}
          />
          <View style={{height: 15}} />
          <CustomInput
            onChangeText={val => {
              setdoctor_name(val);
            }}
            value={doctor_name}
            title={'Doctor Name'}
            placeholder={'Enter Doctor Name'}
            keyboardType={'email-address'}
          />
          <View style={{height: 10}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...fonts.h3, marginLeft: 10}}>Report Pdf</Text>
            <Text style={fonts.h3}>{pdf.name}</Text>
            <TouchableOpacity
              // style={{flex: 1}}
              onPress={async () => {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.pdf],
                  allowMultiSelection: false,
                });
                console.log(res[0]);
                setpdf(res[0]);
              }}>
              <View style={styles.btn}>
                <Text
                  style={{
                    ...fonts.h6,
                    margin: 5,
                    color: colors.primary_color,
                  }}>
                  Choose Pdf
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 150}} />
        </ScrollView>
      </KeyboardAvoidingView>
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
          title={'Place Order'}
          onPress={async () => {
            setisVisiable(true);
            // const body = new FormData();
            // body.append('shipping_name', ship_name);
            // body.append('shipping_mobile', ship_mob);
            // body.append('shipping_address', ship_add);
            // body.append('billing_name', bill_name);
            // body.append('billing_mobile', bill_mob);
            // body.append('billing_address', bill_add);
            // body.append('doctor_name', doctor_name);
            // body.append('payment_id', payment_id);
            // if (pdf.uri) {
            //   body.append('report_pdf', {
            //     uri: pdf.uri,
            //     name: pdf.name,
            //     type: pdf.type,
            //   });
            // }
            // const token = await getToken();
            // const res = await fetch(AppStrings.BASE_URL + '/placeOrder', {
            //   headers: {
            //     Accept: 'application/json',
            //     Authorization: 'Bearer ' + token,
            //   },
            //   method: 'POST',
            //   body: body,
            // });
            // const jsonRes = await res.json();
            // console.log('Screen res :', jsonRes);
            // console.log(res);
            // // if (res.ok) {
            // if (jsonRes.flag) {
            //   Alert.alert(AppStrings.appName, jsonRes.message);
            // } else if (jsonRes.flag == false) {
            //   if (jsonRes.data?.errors != null) {
            //     Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
            //   } else {
            //     Alert.alert(AppStrings.appName, jsonRes.message);
            //   }
            // }
          }}
        />
      </View>
      <Modal visible={isVisiable} animationType={'slide'} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '75%',
              backgroundColor: 'white',
              padding: 15,
              elevation: 5,
              borderRadius: 20,
            }}>
            <Text style={{...fonts.h1, marginVertical: 10}}>Payment</Text>
            <Text style={{...fonts.h5, margin: 5}}>
              To Place Order Please complete your payment processor by tapping
              Make Payment.
            </Text>
            <TouchableOpacity
              // style={{flex: 1}}
              onPress={async () => {
                var options = {
                  description: 'Credits towards consultation',
                  image: Images.appLogo,
                  currency: 'INR',
                  // order_id: '',
                  key: 'rzp_test_A2KSQPyJSFzQl6', // Your api key
                  amount: `${amt}00`,
                  name: 'MedCare',
                  prefill: {
                    contact: bill_mob,
                    name: bill_name,
                  },
                  theme: {color: colors.primary_color},
                };
                RazorpayCheckout.open(options)
                  .then(async data => {
                    // handle success
                    console.log(data);
                    alert(`Success: ${data.razorpay_payment_id}`);
                    setpayment_id(data.razorpay_payment_id);

                    const body = new FormData();
                    body.append('shipping_name', ship_name);
                    body.append('shipping_mobile', ship_mob);
                    body.append('shipping_address', ship_add);
                    body.append('billing_name', bill_name);
                    body.append('billing_mobile', bill_mob);
                    body.append('billing_address', bill_add);
                    body.append('doctor_name', doctor_name);
                    body.append('payment_id', data.razorpay_payment_id);
                    if (pdf.uri) {
                      body.append('report_pdf', {
                        uri: pdf.uri,
                        name: pdf.name,
                        type: pdf.type,
                      });
                    }
                    const token = await getToken();
                    const res = await fetch(
                      AppStrings.BASE_URL + '/placeOrder',
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
                      props.navigation.replace(ScreenNames.Home);
                    } else if (jsonRes.flag == false) {
                      if (jsonRes.data?.errors != null) {
                        Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
                      } else {
                        Alert.alert(AppStrings.appName, jsonRes.message);
                      }
                    } else {
                      Alert.alert(AppStrings.appName, jsonRes.message);
                    }
                  })
                  .catch(error => {
                    // handle failure
                    alert(`Error: ${error.code} | ${error.description}`);
                  });
                //   const res = await RazorpayCheckout.open(options);
                //   console.log(res);
              }}>
              <View style={styles.btn}>
                <Text
                  style={{
                    ...fonts.h6,
                    margin: 5,
                    color: colors.primary_color,
                  }}>
                  Make Payment
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              onPress={() => setisVisiable(false)}
              style={{...fonts.h5, alignSelf: 'center'}}>
              Cancel
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  btn: {
    // flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 10,
  },
});
