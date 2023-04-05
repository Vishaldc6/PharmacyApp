import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import fonts, {FONT_SIZE14} from '../styles/fonts';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobaStyles} from '../styles/GlobalStyles';
import {useAppSelector} from '../redux/store/Store';

const TestBookCard = ({test}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  const GlobalStyles = useGlobaStyles();
  console.log(test);
  return (
    <View
      style={{
        ...GlobalStyles.infoCard,
        borderWidth: 0.5,
        borderColor: colors.primary_color,
        //   backgroundColor: colors.white,
      }}>
      <Text
        style={{fontSize: FONT_SIZE14, fontWeight: '400', color: colors.black}}>
        Test Name : {test.test.name}
      </Text>
      <Text
        style={{fontSize: FONT_SIZE14, fontWeight: '400', color: colors.black}}>
        Lab Name : {test.lab.name}
      </Text>
      <Text
        style={{fontSize: FONT_SIZE14, fontWeight: '400', color: colors.black}}>
        Time : {test.time}
      </Text>
    </View>
  );
};

const LabTestBookScreen = props => {
  const GlobalStyles = useGlobaStyles();
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
      ) : testList ? (
        <View style={GlobalStyles.infoCard}>
          <TestBookCard test={testList} />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>You haven't book any Lab for Test yet.</Text>
        </View>
      )}
    </View>
  );
};

export default LabTestBookScreen;

const styles = StyleSheet.create({});
