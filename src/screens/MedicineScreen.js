import {View, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import CustomSearchBar from '../components/CustomSearchBar';
import {useNavigation} from '@react-navigation/native';
import {useGlobaStyles} from '../styles/GlobalStyles';

const MedicineScreen = props => {
  const GlobalStyles = useGlobaStyles();
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
