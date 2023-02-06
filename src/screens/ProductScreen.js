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
import {products} from '../assets/data/products';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import {size} from '../styles/size';
import {Images} from '../assets/images';
import CustomHeading from '../components/CustomHeading';
import PrimaryProductCard from '../components/product/PrimaryProductCard';
import SecondaryProductCard from '../components/product/SecondaryProductCard';
import SimpleBanner from '../components/banner/SimpleBanner';

const ProductCard = ({item}) => {
  return (
    <View style={styles.productCard}>
      <Image source={item.image} style={{height: 100, width: 100}} />
      <View style={{width: 20}} />
      <View>
        <Text style={fonts.h4}>{item.name}</Text>
        <Text style={{...fonts.h3, color: colors.darkgray}}>
          {item.quantity} items
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...fonts.h3, color: colors.darkgray}}>
            {item.rate}{' '}
          </Text>
          <Text style={{...fonts.h3, color: colors.darkgray}}>
            ({item.rating} ratings)
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Text style={fonts.h6}>Rs.{item.price}</Text>
          <Text style={fonts.h3}> {item.discount} % off</Text>
        </View>
        {/* <CustomButton title={'Add to Cart'} /> */}
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.primary_color,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...fonts.h6, margin: 10, color: colors.primary_color}}>
            Add to Cart
          </Text>
        </View>
      </View>
    </View>
  );
};

const ProductScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Products'} />
      <CustomSearchBar
        onPress={() => {
          //   props.navigation.navigate(ScreenNames.SearchScreen);
        }}
        placeholder="Search Product.."
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* simple banner */}
        <SimpleBanner />
        {/* horizontal products */}
        <View style={{elevation: 2, backgroundColor: colors.white, padding: 5}}>
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
        <Text>ProductScreen</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
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
    borderColor: colors.darkgray,
  },
  bannerContainer: {
    margin: 5,
    height: size.height / 4.5,
    // backgroundColor: 'red',
    padding: 10,
  },
  slide: {
    flex: 1,
    // height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
