import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {
  getCategories,
  getDoctors,
  getLabs,
  getProducts,
  getTests,
} from '../../config/apiServices/ApiServices';
import {ActivityIndicator} from 'react-native-paper';
import {useGlobaStyles} from '../../styles/GlobalStyles';

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
  const GlobalStyles = useGlobaStyles();
  const [loading, setloading] = useState(true);

  const [products, setproducts] = useState(0);
  const [categories, setcategories] = useState(0);
  const [labs, setlabs] = useState(0);
  const [tests, setTests] = useState(0);
  const [doctors, setdoctors] = useState(0);

  const [isRefresh, setisRefresh] = useState(false);

  // const getProducts = async () => {
  //   const res = await ApiCall('/product', 'GET');
  //   setproducts(res.length);
  //   setloading(false);
  //   setisRefresh(false);
  // };
  // const getCategories = async () => {
  //   const res = await ApiCall('/category', 'GET');
  //   setcategories(res.length);
  //   setloading(false);
  //   setisRefresh(false);
  // };
  // const getLabs = async () => {
  //   const res = await ApiCall('/lab', 'GET');
  //   setlabs(res.length);
  //   setloading(false);
  //   setisRefresh(false);
  // };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getProducts().then(res => {
      if (res) {
        setproducts(res.length);
      }
    });
    getCategories().then(res => {
      if (res) {
        setcategories(res.length);
      }
    });
    getLabs().then(res => {
      if (res) {
        setlabs(res.length);
      }
    });
    getTests().then(res => {
      if (res) {
        setTests(res.length);
      }
    });
    // getDoctors().then(res => {
    //   if (res) {
    //     setdoctors(res.length);
    //   }
    // });
    setisRefresh(true);
    setloading(false);
    setisRefresh(false);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Hello🖐 Admin !" {...props} />
      {loading ? (
        <ActivityIndicator style={{alignSelf: 'center'}} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                getData();
              }}
            />
          }>
          <Card
            title={'Products'}
            number={products}
            onPress={() => {
              props.navigation.navigate(ScreenNames.AdminProductScreen);
            }}
          />
          <Card
            title={'Categories'}
            number={categories}
            onPress={() => {
              props.navigation.navigate(ScreenNames.AdminCategoryScreen);
            }}
          />
          <Card
            title={'Laboratories'}
            number={labs}
            onPress={() => {
              props.navigation.navigate(ScreenNames.AdminLabScreen);
            }}
          />
          <Card
            title={'Tests'}
            number={tests}
            onPress={() => {
              props.navigation.navigate(ScreenNames.AdminTestScreen);
            }}
          />
          {/* <Card
            title={'Doctors'}
            number={doctors}
            onPress={() => {
              // props.navigation.navigate(ScreenNames.AdminTestScreen);
            }}
          /> */}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary_color_admin,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: 40,
    margin: 10,
  },
});

export default AdminHomeScreen;
