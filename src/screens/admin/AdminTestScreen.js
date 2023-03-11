import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import AdminButtons from '../../components/admin/AdminButtons';
import {ApiCall, getTests} from '../../config/apiServices/ApiServices';
import {AppStrings} from '../../utils/AppStrings';
import FloatingButton from '../../components/admin/FloatingButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';

const AdminTestScreen = props => {
  const [tests, setTests] = useState([]);
  const [loading, setloading] = useState(true);
  const [isRefresh, setisRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getTests().then(res => {
      const list = res.reverse();
      setTests(list);
      setisRefresh(false);
      setloading(false);
    });
  };

  const deleteTest = async id => {
    const res = await ApiCall(`/reportDelete/${id}`, 'DELETE');
    console.log('deleted test res : ', res);
    if (res) {
      Alert.alert(AppStrings.appName, res);
      getData();
    }
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Tests" back {...props} />
      {/* <CustomSearchBar placeholder="Search Tests.." /> */}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : tests.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>No tests found</Text>
        </View>
      ) : (
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
          data={tests}
          renderItem={({item}) => (
            <View style={{margin: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: 5,
                }}>
                <View>
                  <Text style={fonts.h2}>{item.name}</Text>
                  <Text style={fonts.h3}>Rs. {item.price}</Text>
                </View>
                {/* <View style={GlobalStyles.rowContainer}>
              <Icon
              name="pencil"
              color={colors.primary_color}
                size={25}
                onPress={() => {
                  console.log(item.id);
                }}
              />
              <View style={{width: 20}} />
              <Icon
              name="trash-o"
              color={colors.primary_color}
              size={25}
              onPress={() => {
                console.log('Deleted Item id : ', item.id);
              }}
              />
            </View> */}
              </View>
              <AdminButtons
                item={item}
                deletePress={() => {
                  deleteTest(item.id);
                }}
                editPress={() => {
                  props.navigation.navigate(ScreenNames.AdminFormScreen, {
                    title: 'Test',
                    price: true,
                    ID: item.id,
                  });
                }}
              />
            </View>
          )}
        />
      )}
      <FloatingButton
        icon={'plus'}
        onPress={() => {
          props.navigation.navigate(ScreenNames.AdminFormScreen, {
            title: 'Test',
            price: true,
          });
        }}
      />
    </View>
  );
};

export default AdminTestScreen;
