import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import fonts from '../../styles/fonts';
import {products} from '../../assets/data/products';
import {tests} from '../../assets/data/tests';
import {labs} from '../../assets/data/labs';
import colors from '../../styles/colors';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {categories} from '../../assets/data/categories';

const Card = ({title, number, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Text style={fonts.h7}>{title}</Text>
        <Text style={{...fonts.h8}}>{number}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AdminHomeScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Hello🖐 Admin !" {...props} />
      <Text>AdminHomeScreen</Text>
      <Card
        title={'Products'}
        number={products.length}
        onPress={() => {
          props.navigation.navigate(ScreenNames.AdminProductScreen);
        }}
      />
      <Card
        title={'Categories'}
        number={categories.length}
        onPress={() => {
          props.navigation.navigate(ScreenNames.AdminCategoryScreen);
        }}
      />
      <Card
        title={'Laboratories'}
        number={labs.length}
        onPress={() => {
          props.navigation.navigate(ScreenNames.AdminLabScreen);
        }}
      />
      <Card
        title={'Tests'}
        number={tests.length}
        onPress={() => {
          props.navigation.navigate(ScreenNames.AdminTestScreen);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary_color,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: 40,
    margin: 10,
  },
});

export default AdminHomeScreen;
