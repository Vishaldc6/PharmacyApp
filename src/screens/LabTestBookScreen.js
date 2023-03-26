import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestBookCard = ({test}) => {
  console.log(test);
  return (
    <View
      style={{
        ...GlobalStyles.infoCard,
        borderWidth: 0.5,
        borderColor: colors.primary_color,
        //   backgroundColor: colors.white,
      }}>
      <Text style={fonts.h2}>Test Name : {test.test.name}</Text>
      <Text style={fonts.h2}>Lab Name : {test.lab.name}</Text>
      <Text style={fonts.h2}>Time : {test.time}</Text>
    </View>
  );
};

const LabTestBookScreen = props => {
  const [testList, settestList] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getList();
    });
    getList();
  }, []);

  const getList = () => {
    AsyncStorage.getItem('LAB_TESTS').then(res => {
      let data = JSON.parse(res);
      console.log('lab test : ', data);
      settestList(data);
      setloading(false);
    });
  };
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader back title={'My Tests'} {...props} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={GlobalStyles.infoCard}>
          <TestBookCard test={testList} />
          {/* <TestBookCard />
          <TestBookCard /> */}
        </View>
      )}
    </View>
  );
};

export default LabTestBookScreen;

const styles = StyleSheet.create({});
