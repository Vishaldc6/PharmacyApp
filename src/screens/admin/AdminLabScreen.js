import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import colors from '../../styles/colors';
import {size} from '../../styles/size';
import fonts from '../../styles/fonts';
import AdminButtons from '../../components/admin/AdminButtons';
import {ApiCall, getLabs} from '../../config/apiServices/ApiServices';
import FloatingButton from '../../components/admin/FloatingButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {AppStrings} from '../../utils/AppStrings';

const LabCard = ({item, editPress, deletePress}) => {
  // const discountedPrice =
  //   item.price - parseFloat(item.price) / parseFloat(item.discount);

  return (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={{height: 120, width: 120}} />
      <View style={{width: 20}} />
      <View style={{flex: 1}}>
        <Text style={fonts.h4}>{item.name}</Text>
        <Text>Includes {item.included_test} Tests</Text>
        <Text>{item.address}</Text>
        <Text numberOfLines={1}>{item.description}</Text>
        {/*<Text style={fonts.h6}>Rs.{discountedPrice.toFixed(0)} </Text>
        <Text>{item.rate} rate</Text>
        <Text style={{...fonts.h3, color: colors.primary_color}}>
          {item.discount} % off
        </Text>
        <Text
          style={{
            ...fonts.h3,
            color: colors.darkgray,
            textDecorationLine: 'line-through',
          }}>
          Rs.{item.price}
        </Text> */}
        {/* <View style={{height: 20}} /> */}

        <AdminButtons
          item={item}
          editPress={editPress}
          deletePress={deletePress}
        />
      </View>
    </View>
  );
};

const AdminLabScreen = props => {
  const [labs, setlabs] = useState([]);
  const [loading, setloading] = useState(true);
  const [isRefresh, setisRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLabs().then(res => {
      const list = res.reverse();
      setlabs(list);
      setisRefresh(false);
      setloading(false);
    });
  };

  const deleteLab = async id => {
    const res = await ApiCall(`/labDelete/${id}`, 'DELETE');
    console.log('deleted lab res : ', res);
    if (res) {
      Alert.alert(AppStrings.appName, res);
      getData();
    }
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Laboratories'} back {...props} />
      {/* <CustomSearchBar placeholder="Search Laboratory.." /> */}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : labs.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>No labs found</Text>
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
            data={labs}
            renderItem={({item}) => (
              <LabCard
                item={item}
                deletePress={() => {
                  deleteLab(item.id);
                }}
                editPress={() => {
                  props.navigation.navigate(ScreenNames.AdminFormScreen, {
                    title: 'Laboratory',
                    add: true,
                    included_test: true,
                    desc: true,
                    img: true,
                    name: true,
                    ID: item.id,
                  });
                }}
              />
              // <Text>{item.name}</Text>
            )}
          />
        </View>
      )}
      <FloatingButton
        icon={'plus'}
        onPress={() => {
          props.navigation.navigate(ScreenNames.AdminFormScreen, {
            title: 'Laboratory',
            add: true,
            included_test: true,
            desc: true,
            img: true,
            name: true,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: size.width / 1.1,
    // backgroundColor: colors.white,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    // borderColor: colors.darkgray,
  },
});

export default AdminLabScreen;
