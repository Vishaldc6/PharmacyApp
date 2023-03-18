import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import {ApiCall} from '../config/apiServices/ApiServices';
import {AppStrings} from '../utils/AppStrings';

const OrderScreen = () => {
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    // const res= await ApiCall(AppStrings.BASE_URL + '/')
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'My Orders'} />
      <Text>OrderScreen</Text>
    </View>
  );
};

export default OrderScreen;
