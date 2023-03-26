import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import colors from '../styles/colors';
import CustomHeading from '../components/CustomHeading';
import {schedule} from '../assets/data/schedule';
import fonts from '../styles/fonts';
import CustomButton from '../components/CustomButton';
import {Images} from '../assets/images';
import RazorpayCheckout from 'react-native-razorpay';
import {AppStrings} from '../utils/AppStrings';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserData} from '../config/apiServices/ApiServices';
import DatePicker from 'react-native-date-picker';

const TimeCard = ({item, onPress, index, selectedIndex}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          // flex: 1,
          borderWidth: 1,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          borderColor:
            index == selectedIndex ? colors.primary_color : colors.black,
        }}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ScheduleScreen = props => {
  let test = props.route.params.test;
  let lab = props.route.params.lab;

  const [time, settime] = useState(null);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const usr = await getUserData();
    setuser(usr);
    console.log(usr.mobile);
    setloading(false);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader {...props} back title={'Schedule'} />
      {/* <View style={styles.container}> */}

      <View style={{...GlobalStyles.infoCard}}>
        {test && <Text style={fonts.h7}>Selected Test is : {test.name}</Text>}
        {lab && (
          <Text style={fonts.h7}>Selected Laboratory is : {lab.name}</Text>
        )}
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{...GlobalStyles.infoCard}}>
          <CustomHeading header1={'Select your schedule'} />
          {/* <DatePicker

          /> */}
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {schedule.map((item, index) => (
              <TimeCard
                item={item}
                index={index}
                selectedIndex={selectedIndex}
                onPress={() => {
                  setselectedIndex(index);
                  settime(item);
                }}
              />
            ))}
          </View>
        </View>
      )}
      {time && (
        <View
          style={{
            ...GlobalStyles.rowContainer,
            paddingVertical: 10,
            backgroundColor: colors.white,
            position: 'absolute',
            bottom: 10,
            right: 5,
            left: 5,
          }}>
          <View
            style={{
              justifyContent: 'center',
              // alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <Text style={fonts.h4}>{lab.name} Lab</Text>
            <Text style={fonts.h4}>{test.name} test selected</Text>
            <Text style={fonts.h4}>RS. {test.price}</Text>
            <Text style={fonts.h4}>Time. {time}</Text>
          </View>
          <CustomButton
            title={'Book & Payment'}
            onPress={() => {
              var options = {
                description: 'Credits towards consultation',
                image: Images.appLogo,
                currency: 'INR',
                // order_id: '',
                key: 'rzp_test_A2KSQPyJSFzQl6', // Your api key
                amount: `${test.price}00`,
                name: 'MedCare',
                prefill: {
                  contact: user.mobile,
                  name: user.name,
                },
                theme: {color: colors.primary_color},
              };
              RazorpayCheckout.open(options).then(async data => {
                // handle success
                console.log(data);
                Alert.alert(
                  AppStrings.appName,
                  `Payment Success ! Your payment ID is ${data.razorpay_payment_id}`,
                );
                let res = {
                  ...props.route.params,
                  time: time,
                  payment_id: data.razorpay_payment_id,
                };
                console.log(res);

                AsyncStorage.setItem('LAB_TESTS', JSON.stringify(res)).then(
                  () => {
                    props.navigation.replace(ScreenNames.Home);
                  },
                );
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

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
  },
});
