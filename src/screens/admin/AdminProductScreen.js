import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';
import GlobalStyles from '../../styles/GlobalStyles';
import {products} from '../../assets/data/products';
import SecondaryProductCard from '../../components/product/SecondaryProductCard';
import colors from '../../styles/colors';

const AdminProductScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Products" back {...props} />
      <CustomSearchBar placeholder="Search Products.." />
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
        data={products}
        renderItem={({item}) => (
          <SecondaryProductCard
            item={item}
            isAdmin
            editPress={() => {
              console.log(item.id);
            }}
            deletePress={() => {
              console.log('Deleted Item id : ', item.id);
            }}
          />
        )}
      />
    </View>
  );
};

export default AdminProductScreen;
