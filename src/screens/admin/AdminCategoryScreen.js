import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../styles/colors';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomSearchBar from '../../components/CustomSearchBar';

import CategoryCard from '../../components/category/CategoryCard';
import FloatingButton from '../../components/admin/FloatingButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {ApiCall, getCategories} from '../../config/apiServices/ApiServices';
import {AppStrings} from '../../utils/AppStrings';

const AdminCategoryScreen = props => {
  const [categories, setcategories] = useState([]);
  const [loading, setloading] = useState(true);
  const [isRefresh, setisRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getCategories().then(res => {
      const list = res.reverse();
      setcategories(list);
      setisRefresh(false);
      setloading(false);
    });
  };

  const deleteCategory = async id => {
    const res = await ApiCall(`/categoryDelete/${id}`, 'DELETE');
    console.log('deleted category res : ', res);
    if (res) {
      Alert.alert(AppStrings.appName, res);
      getData();
    }
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Categories" back {...props} />

      {/* <CustomSearchBar placeholder="Search Cayegory.." /> */}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : categories.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>No labs found</Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            marginVertical: 10,
            borderRadius: 20,
            elevation: 5,
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
            data={categories}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CategoryCard
                  item={item}
                  isAdmin
                  deletePress={() => {
                    deleteCategory(item.id);
                  }}
                />
              </View>
            )}
          />
        </View>
      )}
      <FloatingButton
        icon={'plus'}
        onPress={() => {
          props.navigation.navigate(ScreenNames.AdminFormScreen, {
            title: 'Category',
            img: true,
          });
        }}
      />
    </View>
  );
};

export default AdminCategoryScreen;
