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
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';
import {size} from '../../styles/size';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import CustomButton from '../../components/CustomButton';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import Swiper from 'react-native-swiper';
import {Images} from '../../assets/images';
import {categories} from '../../assets/data/categories';
import {useNavigation} from '@react-navigation/native';
import {products} from '../../assets/data/products';
import CustomHeading from '../../components/CustomHeading';
import PrimaryProductCard from '../../components/product/PrimaryProductCard';
import CategoryCard from '../../components/category/CategoryCard';
import {openCamera, openGallery} from '../../utils/functions';
import CustomModal from '../../components/CustomModal';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Card = ({title, icon, onPress}) => (
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
      <Text style={{...fonts.h3, textAlign: 'center'}}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const Banner = ({image}) => (
  <View style={styles.slide}>
    <Image source={image} style={{flex: 1, resizeMode: 'contain'}} />
  </View>
);

const HomeScreen = props => {
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const openCamera = async () => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    console.log(isCameraPermitted);
    console.log(isStoragePermitted);
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera({}, response => {
        console.log('response : ', response);
      });
    }
  };

  const openGallery = async () => {
    launchImageLibrary({}, res => {
      console.log('response : ', res);
    });
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      {/* Header */}
      <CustomHeader cart={true} tag={true} title={'Home'} />

      {/* SearchBar */}
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate(ScreenNames.SearchScreen);
        }}>
        <CustomSearchBar
          placeholder="Search Medicine.."
          // onPress={() => {
          //   props.navigation.navigate(ScreenNames.SearchScreen);
          // }}
        />
      </TouchableWithoutFeedback>
      {/* <Text
        onPress={() => {
          props.navigation.navigate(ScreenNames.SearchScreen);
        }}>
        search screen
      </Text> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Card View Container */}
        <View style={styles.cardContainer}>
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
              props.navigation.navigate(ScreenNames.MedicineScreen);
            }}
          />
          <Card
            title={'Health Product'}
            icon={'shopping-store'}
            onPress={() => {
              console.log('Health Product Page');
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
        <View style={styles.prescriptionContainer}>
          <View style={{flex: 1}}>
            <Text style={fonts.h6}>Order quickly with a prescription</Text>
            <Text style={fonts.h3}>
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
                  ...fonts.h5,
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
            dotStyle={{bottom: -40}}
            activeDotStyle={{bottom: -40}}>
            <Banner image={Images.banners5} />
            <Banner image={Images.banners} />
            <Banner image={Images.banners6} />
          </Swiper>
        </View>
        {/* Category */}
        <View
          style={{
            elevation: 2,
            backgroundColor: colors.white,
            marginVertical: 5,
            // borderRadius: 10,
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
            renderItem={({item}) => <CategoryCard item={item} />}
          />
        </View>

        {/* Horizontal Products */}
        <View
          style={{
            elevation: 2,
            backgroundColor: colors.white,
            marginVertical: 5,
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
              index < 5 && <PrimaryProductCard item={item} />
            }
          />
        </View>
      </ScrollView>
      {/* <CustomModal visibility={isModal} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default HomeScreen;
