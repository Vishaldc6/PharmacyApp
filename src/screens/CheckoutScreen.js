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
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/CustomInput';
import fonts, {FONT_SIZE14} from '../styles/fonts';
import colors from '../styles/colors';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from '../components/CustomButton';
import {AppStrings} from '../utils/AppStrings';
import {getToken, getUserData} from '../config/apiServices/ApiServices';
import RazorpayCheckout from 'react-native-razorpay';
import {Images} from '../assets/images';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useGlobaStyles} from '../styles/GlobalStyles';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const checkoutValidation = Yup.object().shape({
  ship_name: Yup.string()
    .required('* please enter shipping name')
    .min(3, '* please enter proper name'),
  ship_mob: Yup.string()
    .required('* please enter shipping mobile number')
    .length(10, '* please enter proper number '),
  ship_street: Yup.string().required('* please enter shipping street'),
  ship_city: Yup.string().required('* please enter shipping ciy'),
  ship_state: Yup.string().required('* please enter shipping state'),
  ship_zip: Yup.string()
    .required('* please enter shipping zip')
    // .matches(/^\d{5}$/, '* zip code must be 5 digits'),
    .min(5, '* zip code must be 5 digits'),
  bill_name: Yup.string()
    .required('* please enter billing name')
    .min(3, '* please enter proper name'),
  bill_mob: Yup.string()
    .required('* please enter billing mobile number')
    .length(10, '* please enter proper number '),
  bill_street: Yup.string().required('* please enter billing street'),
  bill_city: Yup.string().required('* please enter billing city'),
  bill_state: Yup.string().required('* please enter billing state'),
  bill_zip: Yup.string()
    .required('* please enter billing zip')
    // .matches(/^\d{5}$/, '* zip code must be 5 digits'),
    .min(5, '* zip code must be 5 digits'),
  doctor_name: Yup.string().required('* please enter doctor name'),
  report: Yup.object().required('* please select report pdf'),
});

const CheckoutScreen = props => {
  const GlobalStyles = useGlobaStyles();
  const amt = props.route.params.amount;
  // const is_doctor_required = props.route.params.is_doctor_required;
  // const is_report_required = props.route.params.is_report_required;

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

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues: {
      ship_name: '',
      ship_mob: '',
      ship_street: '',
      ship_city: '',
      ship_state: '',
      ship_zip: '',
      bill_name: '',
      bill_mob: '',
      bill_street: '',
      bill_city: '',
      bill_state: '',
      bill_zip: '',
      doctor_name: '',
      report: {},
    },
    validationSchema: checkoutValidation,
    onSubmit: async value => {
      console.log(value);
      let ship_address =
        value.ship_street +
        ',' +
        value.ship_city +
        ',' +
        value.ship_state +
        ',' +
        value.ship_zip;
      console.log('ship_address : : ', ship_address);
      let bill_address =
        value.bill_street +
        ',' +
        value.bill_city +
        ',' +
        value.bill_state +
        ',' +
        value.bill_zip;
      console.log('bill_address : : ', bill_address);

      setisVisiable(true);
      // const body = new FormData();
      // body.append('shipping_name', value.ship_name);
      // body.append('shipping_mobile', value.ship_mob);
      // body.append('shipping_address', ship_address);
      // body.append('billing_name', value.bill_name);
      // body.append('billing_mobile', value.bill_mob);
      // body.append('billing_address', bill_address);
      // body.append('doctor_name', value.doctor_name);
      // body.append('payment_id', payment_id);
      // if (value.report.uri) {
      //   body.append('report_pdf', {
      //     uri: value.report.uri,
      //     name: value.report.name,
      //     type: value.report.type,
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
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getUserData();
    console.log('user res : ', res);
    setship_name(res.name);
    setship_mob(res.mobile);
    setship_add(res.address);

    setFieldValue('ship_name', res.name);
    setFieldValue('ship_mob', res.mobile);
    // console.log('res.address : ', res.address);
    let address = res.address.split(',');
    console.log('Adress [] : ', address);
    setFieldValue('ship_street', address[0]);
    setFieldValue('ship_city', address[1]);
    setFieldValue('ship_state', address[2]);
    setFieldValue('ship_zip', address[3]);
    //address remaining
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader back {...props} title={'Checkout'} />
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...fonts.h1, margin: 8}}>Shipping Details</Text>
          <CustomInput
            onChangeText={handleChange('ship_name')}
            value={values.ship_name}
            title={'Shipping Name'}
            placeholder={'Enter Shipping Name'}
            keyboardType={'email-address'}
          />
          {touched.ship_name && errors.ship_name ? (
            <Text style={GlobalStyles.errorText}>{errors.ship_name}</Text>
          ) : (
            ''
          )}
          <View style={{height: 15}} />
          <CustomInput
            onChangeText={handleChange('ship_mob')}
            value={values.ship_mob}
            title={'Shipping Mobile'}
            placeholder={'Enter Shipping Mobile'}
            keyboardType={'numeric'}
          />
          {touched.ship_mob && errors.ship_mob ? (
            <Text style={GlobalStyles.errorText}>{errors.ship_mob}</Text>
          ) : (
            ''
          )}
          <View style={{height: 15}} />
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            {'Shipping Address'}
          </Text>
          <View style={{paddingHorizontal: 10}}>
            <CustomInput
              onChangeText={handleChange('ship_street')}
              value={values.ship_street}
              title={'Street'}
              placeholder={'Enter Street'}
              keyboardType={'email-address'}
            />
            {touched.ship_street && errors.ship_street ? (
              <Text style={GlobalStyles.errorText}>{errors.ship_street}</Text>
            ) : (
              ''
            )}
            <View style={{height: 15}} />
            <CustomInput
              onChangeText={handleChange('ship_city')}
              value={values.ship_city}
              title={'City'}
              placeholder={'Enter City'}
              keyboardType={'email-address'}
            />
            {touched.ship_city && errors.ship_city ? (
              <Text style={GlobalStyles.errorText}>{errors.ship_city}</Text>
            ) : (
              ''
            )}
            <View style={{height: 15}} />
            <CustomInput
              onChangeText={handleChange('ship_state')}
              value={values.ship_state}
              title={'State'}
              placeholder={'Enter State'}
              keyboardType={'email-address'}
            />
            {touched.ship_state && errors.ship_state ? (
              <Text style={GlobalStyles.errorText}>{errors.ship_state}</Text>
            ) : (
              ''
            )}
            <View style={{height: 15}} />
            <CustomInput
              onChangeText={handleChange('ship_zip')}
              value={values.ship_zip}
              title={'Zip code'}
              placeholder={'Enter Zip code'}
              keyboardType={'numeric'}
            />
            {touched.ship_zip && errors.ship_zip ? (
              <Text style={GlobalStyles.errorText}>{errors.ship_zip}</Text>
            ) : (
              ''
            )}
            <View style={{height: 15}} />
          </View>
          <Text style={{...fonts.h1, margin: 8}}>Billing Details</Text>
          <CustomInput
            onChangeText={handleChange('bill_name')}
            value={values.bill_name}
            title={'Billing Name'}
            placeholder={'Enter Billing Name'}
            keyboardType={'email-address'}
          />
          {touched.bill_name && errors.bill_name ? (
            <Text style={GlobalStyles.errorText}>{errors.bill_name}</Text>
          ) : (
            ''
          )}
          <View style={{height: 15}} />
          <CustomInput
            onChangeText={handleChange('bill_mob')}
            value={values.bill_mob}
            title={'Billing Mobile'}
            placeholder={'Enter Billing Mobile'}
            keyboardType={'numeric'}
          />
          {touched.bill_mob && errors.bill_mob ? (
            <Text style={GlobalStyles.errorText}>{errors.bill_mob}</Text>
          ) : (
            ''
          )}
          <View style={{height: 15}} />
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            {'Billing Address'}
          </Text>
          <View style={{paddingHorizontal: 10}}>
            <CustomInput
              onChangeText={handleChange('bill_street')}
              value={values.bill_street}
              title={'Street'}
              placeholder={'Enter Street'}
              keyboardType={'email-address'}
            />
            {touched.bill_street && errors.bill_street ? (
              <Text style={GlobalStyles.errorText}>{errors.bill_street}</Text>
            ) : (
              ''
            )}
            <View style={{height: 15}} />
            <CustomInput
              onChangeText={handleChange('bill_city')}
              value={values.bill_city}
              title={'City'}
              placeholder={'Enter City'}
              keyboardType={'email-address'}
            />
            {touched.bill_city && errors.bill_city ? (
              <Text style={GlobalStyles.errorText}>{errors.bill_city}</Text>
            ) : (
              ''
            )}
            <View style={{height: 15}} />
            <CustomInput
              onChangeText={handleChange('bill_state')}
              value={values.bill_state}
              title={'State'}
              placeholder={'Enter State'}
              keyboardType={'email-address'}
            />
            {touched.bill_state && errors.bill_state ? (
              <Text style={GlobalStyles.errorText}>{errors.bill_state}</Text>
            ) : (
              ''
            )}
            <View style={{height: 15}} />
            <CustomInput
              onChangeText={handleChange('bill_zip')}
              value={values.bill_zip}
              title={'Zip code'}
              placeholder={'Enter Zip code'}
              keyboardType={'numeric'}
            />
            {touched.bill_zip && errors.bill_zip ? (
              <Text style={GlobalStyles.errorText}>{errors.bill_zip}</Text>
            ) : (
              ''
            )}
            <View style={{height: 15}} />
          </View>
          {/* {is_doctor_required && ( */}
          <CustomInput
            onChangeText={handleChange('doctor_name')}
            value={values.doctor_name}
            title={'Doctor Name'}
            placeholder={'Enter Doctor Name'}
            keyboardType={'email-address'}
          />
          {touched.doctor_name && errors.doctor_name ? (
            <Text style={GlobalStyles.errorText}>{errors.doctor_name}</Text>
          ) : (
            ''
          )}
          {/* )} */}
          <View style={{height: 10}} />
          {/* {is_report_required && ( */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...fonts.h3, marginLeft: 10}}>Report Pdf</Text>
            {/* <Text style={fonts.h3}>{pdf.name}</Text> */}
            <Text style={fonts.h3}>{values.report.name}</Text>
            <TouchableOpacity
              // style={{flex: 1}}
              onPress={async () => {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.pdf],
                  allowMultiSelection: false,
                });
                console.log(res[0]);
                setpdf(res[0]);
                setFieldValue('report', res[0]);
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
          {touched.report && errors.report ? (
            <Text style={GlobalStyles.errorText}>{errors.report}</Text>
          ) : (
            ''
          )}
          {/* )} */}
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
          onPress={
            handleSubmit
            // async () => {
            // setisVisiable(true);
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
            // }
          }
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
                    contact: values.bill_mob,
                    name: values.bill_name,
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
                    body.append('shipping_name', values.ship_name);
                    body.append('shipping_mobile', values.ship_mob);
                    body.append('shipping_address', values.ship_add);
                    body.append('billing_name', values.bill_name);
                    body.append('billing_mobile', values.bill_mob);
                    body.append('billing_address', values.bill_add);
                    body.append('doctor_name', values.doctor_name);
                    body.append('payment_id', data.razorpay_payment_id);
                    if (values.report.uri) {
                      body.append('report_pdf', {
                        uri: values.report.uri,
                        name: values.report.name,
                        type: values.report.type,
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
