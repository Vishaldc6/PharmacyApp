import {
  ActivityIndicator,
  Alert,
  ScrollView,
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
import {widthPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';

const TimeCard = ({item, onPress, index, selectedIndex}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          borderColor: item.enable
            ? index == selectedIndex
              ? colors.primary_color
              : colors.black
            : colors.grey,
        }}>
        <Text
          style={{
            ...fonts.h4,
            color: item.enable ? colors.black : colors.grey,
          }}>
          {item.time}
        </Text>
        <Text
          style={{
            ...fonts.h4,
            color: item.enable ? colors.primary_color : colors.grey,
          }}>
          {'+ 50 Rs'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const before3Hour = moment(Date.now() - 90 * 120 * 1000).format('hh:mm A');
const before2Hour = moment(Date.now() - 60 * 120 * 1000).format('hh:mm A');
const before1Hour = moment(Date.now() - 30 * 120 * 1000).format('hh:mm A');
const nowHour = moment(Date.now()).format('hh:mm A');

const after1Hour = moment(Date.now() + 30 * 120 * 1000).format('hh:mm A');
const after2Hour = moment(Date.now() + 60 * 120 * 1000).format('hh:mm A');
const after3Hour = moment(Date.now() + 90 * 120 * 1000).format('hh:mm A');
const after4Hour = moment(Date.now() + 120 * 120 * 1000).format('hh:mm A');
const after5Hour = moment(Date.now() + 150 * 120 * 1000).format('hh:mm A');
console.log('before3Hour : ', before3Hour);

const scheduleTimeSlots = [
  {time: `${before3Hour} - ${before2Hour}`, enable: false},
  {time: `${before2Hour} - ${before1Hour}`, enable: false},
  {time: `${before1Hour} - ${nowHour}`, enable: false},
  {time: `${nowHour} - ${after1Hour}`, enable: true},
  {time: `${after1Hour} - ${after2Hour}`, enable: true},
  {time: `${after2Hour} - ${after3Hour}`, enable: true},
  {time: `${after3Hour} - ${after4Hour}`, enable: true},
  {time: `${after4Hour} - ${after5Hour}`, enable: true},
  // `${after5Hour} - ${nowHour}`,
  // `${after3Hour} - ${nowHour}`,
  // `${after4Hour} - ${nowHour}`,
  // `${after5Hour} - ${nowHour}`,
  // `${after3Hour} - ${nowHour}`,
  // `${after4Hour} - ${nowHour}`,
  // `${after5Hour} - ${nowHour}`,
];

const ScheduleScreen = props => {
  let test = props.route.params.test;
  let lab = props.route.params.lab;

  const [time, settime] = useState(null);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [user, setuser] = useState({});
  const [date, setdate] = useState('');
  const [loading, setloading] = useState(true);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const usr = await getUserData();
    setuser(usr);
    // console.log(usr.mobile);
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
        <View style={{...GlobalStyles.infoCard, flex: 1}}>
          {/* <ScrollView> */}
          <CustomHeading header1={'Select your schedule'} />
          <Text style={{...fonts.h2}}>
            Selected Date :{' '}
            {date && moment(date.toString()).utc().format('DD-MM-yyyy')}
          </Text>
          <View style={{flexDirection: 'row', padding: widthPercentageToDP(3)}}>
            <CustomButton
              title={'Choose Date'}
              secondary
              onPress={() => setisOpen(!isOpen)}
            />
            <DatePicker
              minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              mode="date"
              modal
              open={isOpen}
              date={new Date()}
              onConfirm={date => {
                // console.log(date);
                setdate(moment(date.toString()).utc().format('DD-MM-yyyy'));
              }}
              onCancel={() => {
                setisOpen(false);
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {scheduleTimeSlots.map((item, index) => (
                <TimeCard
                  item={item}
                  index={index}
                  selectedIndex={selectedIndex}
                  onPress={() => {
                    if (date == '') {
                      Alert.alert(AppStrings.appName, 'Please select Date !');
                    } else {
                      if (item.enable) {
                        settime(item.time);
                        setselectedIndex(index);
                      }
                    }
                  }}
                />
              ))}
              {selectedIndex && <View style={{height: 100}} />}
            </ScrollView>
          </View>
          {/* </ScrollView> */}
        </View>
      )}
      {time && (
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
            <Text style={fonts.h4}>Selected Test : {test.name}</Text>
            <Text style={fonts.h4}>Lab : {lab.name}</Text>
            <Text style={fonts.h4}>RS. {test.price} + 50</Text>
            <Text style={fonts.h4}>Date : {date}</Text>
            <Text style={fonts.h4}>Time: {time}</Text>
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
                amount: `${test.price + 50}00`,
                name: 'MedCare',
                prefill: {
                  contact: user.mobile,
                  name: user.name,
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
                let res = {
                  ...props.route.params,
                  time: time,
                  payment_id: data.razorpay_payment_id,
                };
                // console.log(res);

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
