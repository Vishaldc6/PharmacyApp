import {View, Text} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';

const LabScreen = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader search={true} title={'Laboratory'} />
      <CustomSearchBar placeholder={'Search Labs or Tests (CBC, WD3, ect.)'} />
      <Text>LabScreen</Text>
    </View>
  );
};

export default LabScreen;
