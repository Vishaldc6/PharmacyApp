import {View, Text} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';

const OrderScreen = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader cart={true} title={'My Orders'} />
      <Text>OrderScreen</Text>
    </View>
  );
};

export default OrderScreen;
