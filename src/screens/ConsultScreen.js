import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import {diseases} from '../assets/data/diseases';
import {AppStrings} from '../utils/AppStrings';
import fonts from '../styles/fonts';
import {SymptomTab} from './tabs/DoctorScreen';
import CustomHeading from '../components/CustomHeading';
import CustomInput from '../components/CustomInput';
import {getUserData} from '../config/apiServices/ApiServices';
import colors from '../styles/colors';
import CustomButton from '../components/CustomButton';
import {Images} from '../assets/images';
import RazorpayCheckout from 'react-native-razorpay';

const ConsultScreen = props => {
  // let disease = props.route.params?.disease;
  const [disease, setdisease] = useState(props.route.params?.disease);
  const [user, setuser] = useState('');
  const [name, setname] = useState('');
  const [birthDate, setbirthDate] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const usr = await getUserData();
    console.log(usr);
    setuser(usr);
    setname(usr.name);
    setphoneNumber(usr.mobile);
    setbirthDate(usr.date_of_birth);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Consult Doctor'} back {...props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {disease ? (
          <View style={GlobalStyles.infoCard}>
            <Text style={fonts.h7}>Your Symptoms is : {disease}</Text>
          </View>
        ) : (
          <View style={{...GlobalStyles.infoCard}}>
            <Text style={fonts.h1}>{AppStrings.consultDoctor1Click}</Text>
            <Text style={fonts.h2}>{AppStrings.selectSymptom}</Text>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {diseases.map(item => (
                <SymptomTab
                  item={item}
                  onPress={() => {
                    setdisease(item.name);
                    console.log(item);
                  }}
                />
              ))}
            </View>
          </View>
        )}
        <View style={GlobalStyles.infoCard}>
          <Text style={fonts.h2}>
            One of our qualified General Physician will consult you after 9:00
            am
          </Text>
        </View>

        <View style={GlobalStyles.infoCard}>
          <CustomHeading header1={'Patient Details'} />
          <CustomInput
            onChangeText={val => {
              setname(val);
            }}
            value={name}
            title={'Patient Name'}
            placeholder={'Enter Patient Name'}
            keyboardType={'email-address'}
          />
          <CustomInput
            onChangeText={val => {
              setphoneNumber(val);
            }}
            value={phoneNumber}
            title={'Patient Phone Number'}
            placeholder={'Enter Patient Phone Number'}
            keyboardType={'numeric'}
          />
          <CustomInput
            onChangeText={val => {
              setbirthDate(val);
            }}
            value={birthDate}
            title={'Patient Birth Date'}
            placeholder={'Enter Patient Birth Date'}
            keyboardType={'numeric'}
          />
        </View>

        <View style={GlobalStyles.infoCard}>
          <CustomHeading header1={'Bill summary'} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={fonts.h3}>Consultation fee</Text>
            <Text style={fonts.h3}>120 Rs.</Text>
          </View>
          <View style={{borderWidth: 0.5, borderColor: colors.black}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={fonts.h4}>To be paid</Text>
            <Text style={fonts.h4}>120 Rs.</Text>
          </View>
        </View>
        <View style={{height: 80}} />
      </ScrollView>
      {disease && (
        <View
          style={{
            ...GlobalStyles.rowContainer,
            paddingVertical: 10,
            backgroundColor: colors.white,
            position: 'absolute',
            bottom: 0,
            right: 5,
            left: 5,
          }}>
          <View
            style={{
              justifyContent: 'center',
              // alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <Text style={fonts.h4}>Symptoms : {disease}</Text>
            <Text style={fonts.h4}>RS. 120</Text>
          </View>
          <CustomButton
            title={'Consult & Payment'}
            onPress={() => {
              var options = {
                description: 'Credits towards consultation',
                image: Images.appLogo,
                currency: 'INR',
                // order_id: '',
                key: 'rzp_test_A2KSQPyJSFzQl6', // Your api key
                amount: `${120}00`,
                name: 'MedCare',
                prefill: {
                  contact: phoneNumber,
                  name: name,
                },
                theme: {color: colors.primary_color},
              };
              RazorpayCheckout.open(options).then(async data => {
                // handle success
                // console.log(data);
                Alert.alert(
                  AppStrings.appName,
                  `Payment Success ! Your payment ID is ${data.razorpay_payment_id}`,
                );
                // let res = {
                //   ...props.route.params,
                //   time: time,
                //   payment_id: data.razorpay_payment_id,
                // };
                // console.log(res);

                // AsyncStorage.setItem('LAB_TESTS', JSON.stringify(res)).then(
                //   () => {
                //     props.navigation.replace(ScreenNames.Home);
                //   },
                // );
                // setpayment_id(data.razorpay_payment_id);
              });
              //   props.navigation.navigate(ScreenNames.LabListScreen, {
              //     test: selectedTests,
              //   });
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ConsultScreen;

const styles = StyleSheet.create({});
