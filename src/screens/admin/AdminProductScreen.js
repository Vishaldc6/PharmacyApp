import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';
import GlobalStyles from '../../styles/GlobalStyles';

import SecondaryProductCard from '../../components/product/SecondaryProductCard';
import colors from '../../styles/colors';
import {getProducts} from '../../config/apiServices/ApiServices';
import FloatingButton from '../../components/admin/FloatingButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';

const AdminProductScreen = props => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [isRefresh, setisRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getProducts().then(res => {
      const list = res.reverse();
      setproducts(list);
      setisRefresh(false);
      setloading(false);
    });
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Products" back {...props} />
      {/* <CustomSearchBar placeholder="Search Products.." /> */}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : products.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>No Products found</Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            marginVertical: 10,
            elevation: 2,
          }}>
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={colors.primary_color_admin}
                refreshing={isRefresh}
                onRefresh={() => {
                  getData();
                }}
              />
            }
            showsVerticalScrollIndicator={false}
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
      )}
      <FloatingButton
        icon={'plus'}
        onPress={() => {
          props.navigation.navigate(ScreenNames.AdminFormScreen, {
            title: 'Product',
            brand: true,
            category_id: true,
            dieses_types: true,
            expiry_date: true,
            information: true,
            ingredients: true,
            price: true,
            quantity: true,
            rate: true,
            side_effects: true,
            thumbnail: true,
            img: true,
            benefits: true,
          });
        }}
      />
    </View>
  );
};

export default AdminProductScreen;
