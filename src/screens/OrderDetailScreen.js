import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';

const OrderDetailScreen = props => {
  console.log('props.route.params.data : ', props.route.params.data);
  const order = props.route.params.data;

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader back {...props} title={'Order Detail'} />
      <Text>{order.order_number}</Text>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({});
