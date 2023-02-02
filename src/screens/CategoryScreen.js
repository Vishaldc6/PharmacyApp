import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import CustomSearchBar from '../components/CustomSearchBar';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import {categories} from '../assets/data/categories';
import fonts from '../styles/fonts';

const CategoryCard = ({item}) => {
  return (
    <View style={styles.categoryCard}>
      <Image
        source={item.image}
        style={{height: 100, width: 100, alignSelf: 'center'}}
        resizeMode={'stretch'}
      />
      <Text style={{...fonts.h4, alignSelf: 'center'}}>{item.name}</Text>
    </View>
  );
};

const CategoryScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Categories'} />
      <CustomSearchBar
        onPress={() => {
          //   props.navigation.navigate(ScreenNames.SearchScreen);
        }}
        placeholder="Search Category.."
      />
      <FlatList
        data={categories}
        numColumns={3}
        renderItem={({item}) => <CategoryCard item={item} />}
      />
      {/* Scroll banner */}

      {/* horizontal product */}

      {/* simple banner */}

      {/* vertical products */}
      <Text>CategoryScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    // backgroundColor: 'blue',
    margin: 5,
    // justifyContent: 'center',
    // alignContent: 'center',
    alignSelf: 'center',
  },
});

export default CategoryScreen;
