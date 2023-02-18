import {View, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../styles/GlobalStyles';

const CarePlanScreen = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Care Plan'} />

      <Text>CarePlanScreen</Text>
    </View>
  );
};

export default CarePlanScreen;
