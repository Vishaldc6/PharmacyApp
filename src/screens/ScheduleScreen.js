import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import colors from '../styles/colors';
import CustomHeading from '../components/CustomHeading';
import {schedule} from '../assets/data/schedule';
import fonts from '../styles/fonts';
import CustomButton from '../components/CustomButton';

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

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader {...props} back title={'Schedule'} />
      <View style={styles.container}>
        {test && <Text style={fonts.h7}>Selected Test is : {test.name}</Text>}
        {lab && (
          <Text style={fonts.h7}>Selected Laboratory is : {lab.name}</Text>
        )}
      </View>
      <View style={styles.container}>
        {/* <CustomHeading header1={'Select your schedule'} /> */}
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
            title={'Go to Cart'}
            onPress={() => {
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
