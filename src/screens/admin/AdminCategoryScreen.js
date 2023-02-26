import {View, Text, FlatList} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomSearchBar from '../../components/CustomSearchBar';
import {categories} from '../../assets/data/categories';
import CategoryCard from '../../components/category/CategoryCard';

const AdminCategoryScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Categories" back {...props} />
      <CustomSearchBar placeholder="Search Cayegory.." />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: colors.white,
          marginVertical: 10,
          elevation: 2,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderWidth: 0.5,
              borderColor: colors.darkgray,
              margin: 10,
            }}
          />
        )}
        data={categories}
        renderItem={({item}) => (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <CategoryCard item={item} isAdmin />
          </View>
        )}
      />
    </View>
  );
};

export default AdminCategoryScreen;
