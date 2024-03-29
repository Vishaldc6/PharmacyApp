import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

import colors from '../../styles/colors';
import {Images} from '../../assets/images';
import fonts from '../../styles/fonts';
import {useGlobaStyles} from '../../styles/GlobalStyles';

const TestPaymentScreen = () => {
  const GlobalStyles = useGlobaStyles();
  return (
    <View
      style={{
        ...GlobalStyles.mainContainer,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableHighlight
        onPress={async () => {
          var options = {
            description: 'Credits towards consultation',
            image: Images.appLogo,
            currency: 'INR',
            // order_id: '',
            key: 'rzp_test_A2KSQPyJSFzQl6', // Your api key
            amount: '100',
            name: 'MedCare',
            prefill: {
              email: 'void@razorpay.com',
              contact: '9191919191',
              name: 'Razorpay Software',
            },
            theme: {color: colors.primary_color},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success
              console.log(data);
              alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch(error => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
          //   const res = await RazorpayCheckout.open(options);
          //   console.log(res);
        }}>
        <Text style={fonts.h1}>payment</Text>
      </TouchableHighlight>
    </View>
  );
};

export default TestPaymentScreen;

const styles = StyleSheet.create({});
