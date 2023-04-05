import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Modal,
  Button,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';
import {size} from '../../styles/size';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../../styles/colors';
import fonts, {FONT_SIZE12, FONT_SIZE14} from '../../styles/fonts';
import CustomButton from '../../components/CustomButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import Swiper from 'react-native-swiper';
import {Images} from '../../assets/images';
// import {categories} from '../../assets/data/categories';

import CustomHeading from '../../components/CustomHeading';
import PrimaryProductCard from '../../components/product/PrimaryProductCard';
import CategoryCard from '../../components/category/CategoryCard';
import {openCamera, openGallery} from '../../utils/functions';
import CustomModal from '../../components/CustomModal';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getCategories, getProducts} from '../../config/apiServices/ApiServices';
import SimpleBanner from '../../components/banner/SimpleBanner';
import {useGlobaStyles} from '../../styles/GlobalStyles';
import {useAppSelector} from '../../redux/store/Store';

const Card = ({title, icon, onPress}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          // backgroundColor: 'red',
          width: size.width / 5,
        }}>
        {/* <View style={{height: size.height / 14}}> */}
        <Fontisto
          name={icon}
          size={size.height / 23}
          color={colors.black}
          style={{marginVertical: 10}}
        />
        {/* </View> */}
        <Text
          style={{
            fontSize: FONT_SIZE12,
            fontWeight: '400',
            color: colors.black,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const Banner = ({image}) => {
  const styles = useStyles();
  return (
    <View style={styles.slide}>
      <Image source={image} style={{flex: 1, resizeMode: 'contain'}} />
    </View>
  );
};

const HomeScreen = props => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  const GlobalStyles = useGlobaStyles();
  const styles = useStyles();

  const [categories, setCategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [searchproducts, setsearchproducts] = useState([]);
  const [srcTxt, setsrcTxt] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getCategories().then(res => {
      const list = res.reverse();
      setCategories(list);
    });
    getProducts().then(res => {
      const list = res.reverse();
      setproducts(list);
    });
    setisRefresh(false);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      {/* Header */}
      <CustomHeader title={'Home'} cart {...props} />

      {/* SearchBar */}
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate(ScreenNames.SearchScreen);
        }}>
        <CustomSearchBar
          placeholder="Search Products.."
          // onPress={() => {
          //   props.navigation.navigate(ScreenNames.SearchScreen);
          // }}
          value={srcTxt}
          onChangeText={val => {
            if (val == '') {
              setsearchproducts([]);
            }
            setsrcTxt(val);
          }}
          onSearch={() => {
            let list = products.filter(item => item.name == srcTxt);
            setsearchproducts(list);
          }}
        />
      </TouchableWithoutFeedback>
      {/* <Text
        onPress={() => {
          props.navigation.navigate(ScreenNames.SearchScreen);
        }}>
        search screen
      </Text> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              getData();
            }}
            refreshing={isRefresh}
          />
        }>
        {searchproducts.length !== 0 && srcTxt !== '' && (
          // <View style={{elevation: 2, backgroundColor: colors.white}}>
          <View style={{...GlobalStyles.infoCard}}>
            <CustomHeading header1={'Searched Products'} />
            <FlatList
              style={{marginVertical: 5}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // scrollEnabled={false}
              data={searchproducts}
              renderItem={({item, index}) =>
                index < 5 && (
                  <PrimaryProductCard
                    item={item}
                    onPress={() => {
                      if (item.quantity > 0) {
                        props.navigation.navigate(
                          ScreenNames.ProductDetailScreen,
                          {
                            id: item.id,
                            products: products,
                          },
                        );
                      }
                    }}
                  />
                )
              }
            />
          </View>
        )}
        {/* Card View Container */}
        {/* <View style={styles.cardContainer}> */}
        <View
          style={{
            ...GlobalStyles.infoCard,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'baseline',
          }}>
          <Card
            title={'Lab Test'}
            icon={'laboratory'}
            onPress={() => {
              console.log('Lab Test Page');
              props.navigation.navigate(ScreenNames.LabScreen);
            }}
          />
          <Card
            title={'Medicines'}
            icon={'pills'}
            onPress={() => {
              console.log('Medicine Page');
              props.navigation.navigate(ScreenNames.ProductScreen);
            }}
          />
          <Card
            title={'Health Product'}
            icon={'shopping-store'}
            onPress={() => {
              console.log('Health Product Page');
              props.navigation.navigate(ScreenNames.ProductScreen);
            }}
          />
          <Card
            title={'Consult Doctor'}
            icon={'doctor'}
            onPress={() => {
              console.log('Consult Doctor Page');
              props.navigation.navigate(ScreenNames.DoctorScreen);
            }}
          />
        </View>

        {/* Prescription Upload */}
        {/* <View style={styles.prescriptionContainer}> */}
        <View
          style={{
            ...GlobalStyles.infoCard,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: FONT_SIZE14,
                fontWeight: '700',
                color: colors.black,
              }}>
              Order quickly with a prescription
            </Text>
            <Text
              style={{
                fontSize: FONT_SIZE12,
                fontWeight: '400',
                color: colors.black,
              }}>
              Just upload the prescription and tell us what you need. We do the
              rest !
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={async () => {
              props.navigation.navigate(ScreenNames.UploadPrescriptionScreen);
              // setisModal(true);
              // console.log('uploading ...');
            }}>
            <View style={styles.btn}>
              <Text
                style={{
                  fontSize: FONT_SIZE12,
                  fontWeight: '400',
                  color: colors.black,
                  color: colors.primary_color,
                }}>
                Upload
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {/* <CustomButton secondary title={'Upload'} /> */}
        </View>

        {/* Banners */}
        <View style={styles.bannerContainer}>
          <Swiper
            autoplay
            dotStyle={{bottom: -40, backgroundColor: colors.grey}}
            activeDotStyle={{bottom: -40}}>
            <Banner image={Images.banners2} />
            <Banner image={Images.banners} />
            <Banner image={Images.banners5} />
          </Swiper>
        </View>
        {/* Category */}
        {/* <View
          style={{
            elevation: 2,
            backgroundColor: colors.white,
            marginVertical: 5,
            // borderRadius: 10,
          }}> */}
        <View
          style={{
            ...GlobalStyles.infoCard,
          }}>
          <CustomHeading
            header1={'Popular Categories'}
            header2={'see more >'}
            onPress={() => {
              props.navigation.navigate(ScreenNames.CategoryScreen);
            }}
          />
          <FlatList
            style={{marginVertical: 5}}
            scrollEnabled={false}
            numColumns={3}
            data={categories}
            renderItem={({item, index}) =>
              index <= 5 && (
                <CategoryCard
                  item={item}
                  onPress={() => {
                    props.navigation.navigate(ScreenNames.ProductScreen, {
                      cat_id: item.id,
                    });
                  }}
                />
              )
            }
          />
        </View>

        {/* simple banner */}
        <SimpleBanner />

        {/* Horizontal Products */}
        {/* <View
          style={{
            elevation: 2,
            backgroundColor: colors.white,
            marginVertical: 5,
          }}> */}
        <View
          style={{
            ...GlobalStyles.infoCard,
          }}>
          <CustomHeading
            header1={'Popular Products'}
            header2={'see more >'}
            onPress={() => {
              props.navigation.navigate(ScreenNames.ProductScreen);
            }}
          />
          <FlatList
            style={{marginVertical: 5}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // scrollEnabled={false}
            data={products}
            renderItem={({item, index}) =>
              index < 5 && (
                <PrimaryProductCard
                  item={item}
                  onPress={() => {
                    props.navigation.navigate(ScreenNames.ProductDetailScreen, {
                      id: item.id,
                      products: products,
                    });
                  }}
                />
              )
            }
          />
        </View>
      </ScrollView>
      {/* <CustomModal visibility={isModal} /> */}
    </View>
  );
};

const useStyles = () => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  return StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.white,
      // width: size.width,
      // height: size.height / 7,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'baseline',
      paddingVertical: 10,
      elevation: 2,
      borderRadius: 10,
      marginVertical: 5,
    },
    prescriptionContainer: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      elevation: 2,
      borderRadius: 10,
      padding: 6,
      marginVertical: 5,
    },
    btn: {
      borderColor: colors.primary_color,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      margin: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerContainer: {
      marginVertical: 5,
      height: size.height / 4.5,
      // backgroundColor: 'red',
      paddingVertical: 10,
    },
  });
};

export default HomeScreen;
