import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import CustomSearchBar from '../components/CustomSearchBar';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import {categories} from '../assets/data/categories';
import fonts from '../styles/fonts';
import Swiper from 'react-native-swiper';
import {Images} from '../assets/images';
import {size} from '../styles/size';
import CustomHeading from '../components/CustomHeading';
import {products} from '../assets/data/products';
import PrimaryProductCard from '../components/product/PrimaryProductCard';
import SecondaryProductCard from '../components/product/SecondaryProductCard';
import CategoryCard from '../components/category/CategoryCard';

const Banner = ({image}) => (
  <View style={styles.slide}>
    <Image source={image} style={{flex: 1, resizeMode: 'contain'}} />
  </View>
);

const CategoryScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Categories'} />
      <CustomSearchBar
        onPress={() => {
          //   props.navigation.navigate(ScreenNames.SearchScreen);
        }}
        placeholder="Search Category.."
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{elevation: 2, backgroundColor: colors.white, padding: 5}}>
          <CustomHeading header1={'Popular Categories'} />
          <FlatList
            // style={{backgroundColor: 'red'}}
            data={categories}
            numColumns={3}
            renderItem={({item}) => <CategoryCard item={item} />}
          />
        </View>
        {/* Scroll banner */}
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
        {/* horizontal product */}
        <View
          style={{
            elevation: 2,
            backgroundColor: colors.white,
            padding: 5,
            marginVertical: 10,
          }}>
          <CustomHeading header1={'Popular Products'} />
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
        {/* simple banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.slide}>
            <Image
              source={Images.banners3}
              style={{flex: 1, resizeMode: 'cover', height: 200, width: 500}}
            />
          </View>
        </View>
        {/* vertical products */}
        <FlatList
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
          renderItem={({item}) => <SecondaryProductCard item={item} />}
        />
        <Text>CategoryScreen</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    // backgroundColor: 'blue',
    margin: 5,
    // justifyContent: 'center',
    // alignContent: 'center',
    alignSelf: 'center',
  },
  bannerContainer: {
    // flex: 1,
    marginVertical: 5,
    height: size.height / 4.5,
    // backgroundColor: 'red',
    padding: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryScreen;
