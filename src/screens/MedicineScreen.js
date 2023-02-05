import {View, Text} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import CustomSearchBar from '../components/CustomSearchBar';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import {useNavigation} from '@react-navigation/native';

const MedicineScreen = props => {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Medicines" back {...props} />
      <CustomSearchBar
        placeholder="Search Medicine.."
        onPress={() => {
          navigation.navigate('SearchScreen');
        }}
      />
      <Text>MedicineScreen</Text>
    </View>
  );
};

export default MedicineScreen;
