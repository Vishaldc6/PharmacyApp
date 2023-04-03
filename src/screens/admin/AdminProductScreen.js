import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import SecondaryProductCard from '../../components/product/SecondaryProductCard';
import colors from '../../styles/colors';
import {ApiCall, getProducts} from '../../config/apiServices/ApiServices';
import FloatingButton from '../../components/admin/FloatingButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {AppStrings} from '../../utils/AppStrings';
import {useGlobaStyles} from '../../styles/GlobalStyles';

const AdminProductScreen = props => {
  const GlobalStyles = useGlobaStyles();

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

  const deleteProduct = async id => {
    const res = await ApiCall(`/productDelete/${id}`, 'DELETE');
    console.log('deleted product res : ', res);
    if (res) {
      Alert.alert(AppStrings.appName, res);
      getData();
    }
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
            // backgroundColor: colors.white,
            // marginVertical: 10,
            // elevation: 2,
            ...GlobalStyles.infoCard,
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
                    tax_percentage: true,
                    is_required_doctor: true,
                    is_required_report: true,
                    doctor_type: true,
                    ID: item.id,
                  });
                }}
                deletePress={() => {
                  console.log('Deleted Item id : ', item.id);
                  deleteProduct(item.id);
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
            tax_percentage: true,
            is_required_doctor: true,
            is_required_report: true,
            doctor_type: true,
          });
        }}
      />
    </View>
  );
};

export default AdminProductScreen;
