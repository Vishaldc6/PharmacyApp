import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import Swiper from 'react-native-swiper';
import {getProducts} from '../config/apiServices/ApiServices';
import {size} from '../styles/size';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import {AppStrings} from '../utils/AppStrings';
import SmallInfoCard from '../components/SmallInfoCard';
import SimpleBanner from '../components/banner/SimpleBanner';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeading from '../components/CustomHeading';
import PrimaryProductCard from '../components/product/PrimaryProductCard';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import CustomButton from '../components/CustomButton';

const PriceCard = ({price}) => {
  const [selected, setselected] = useState(false);
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          setselected(!selected);
        }}>
        <View
          style={{
            ...styles.pricecard,
            borderColor: selected ? colors.primary_color : colors.grey,
          }}>
          <Text style={fonts.h2}>Rs. {price} </Text>
          <Text
            style={{
              ...fonts.h7,
              color: colors.grey,
              textDecorationLine: 'line-through',
            }}>
            MRP {price + 50}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {selected && (
        <CustomButton
          title={'Add to Cart'}
          onPress={() => {
            Alert.alert(AppStrings.appName, 'Comming');
          }}
        />
      )}
    </View>
  );
};

const ProductDetailScreen = props => {
  console.log(props.route.params.id);
  let products = props.route.params.products;
  console.log('products : ', products);

  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (props.route.params.id) {
      getDetail(props.route.params.id);
    }
  }, []);

  const getDetail = id => {
    getProducts(id).then(res => {
      setproduct(res);
      //   console.log('product detail :', product.images);
      //   product.images.map(it => console.log(it.image));
      setloading(false);
    });
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader back {...props} />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        // <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* images */}
          <View
            style={{
              height: size.height / 3,
            }}>
            <Swiper autoplay>
              {product.images.map(itm => (
                <Image
                  source={{uri: itm.image}}
                  style={{
                    flex: 1,
                    width: '100%',
                    resizeMode: 'contain',
                    // backgroundColor: 'red',
                  }}
                />
              ))}
            </Swiper>
          </View>
          {/* Title */}
          <View style={styles.container}>
            <Text style={fonts.h1}>{product.name}</Text>
            <Text>by {product.brand}</Text>
            <Icon
              name="star"
              size={25}
              style={{marginVertical: 5}}
              color={colors.primary_color}
            />
            <Text>
              {product.rate} rate & {product.reviews.length} reviews
            </Text>
          </View>
          {/* Price Add to cart */}
          <View style={styles.container}>
            <PriceCard price={product.price} />
            {/* <AddToCart/> */}
          </View>
          {/* Delivery */}
          <View style={styles.container}>
            <Text style={fonts.h1}>{AppStrings.earlyDelivery}</Text>
            <Text style={fonts.h2}>{AppStrings.deliverTo}</Text>
            <Text style={fonts.h3}>{AppStrings.return}</Text>
            <Text style={fonts.h3}>{AppStrings.cod}</Text>
          </View>
          {/* Simple banner */}
          <SimpleBanner />

          {/* Information */}
          <View style={styles.container}>
            <Text style={fonts.h1}>{AppStrings.productInfo}</Text>
            <Text>{product.information}</Text>
            <Text style={{...fonts.h6, marginTop: 10}}>
              {AppStrings.ingredients}
            </Text>
            <Text>{product.ingredients}</Text>
            <Text style={{...fonts.h6, marginTop: 10}}>
              {AppStrings.benefits}
            </Text>
            <Text>{product.benefits}</Text>
          </View>
          {/* Expire */}
          <View style={styles.container}>
            <Text>
              {AppStrings.expire}
              <Text style={fonts.h6}>{product.expiry_date}</Text>
            </Text>
          </View>

          {/* Extra Information */}
          <View style={{...styles.container, flexDirection: 'row'}}>
            <SmallInfoCard title={'100% genuine product'} />
            <SmallInfoCard title={'Safe & secure payments'} />
            <SmallInfoCard title={'Contactless delivery'} />
            <SmallInfoCard title={'Fully sanitized facilities'} />
          </View>

          {/* review */}

          {/* simple banner */}
          <SimpleBanner />

          {/* Horizontal products */}
          <View style={{elevation: 2, backgroundColor: colors.white}}>
            <CustomHeading header1={'Popular Products'} />
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
                      props.navigation.navigate(
                        ScreenNames.ProductDetailScreen,
                        {
                          id: item.id,
                          // product: products,
                        },
                      );
                    }}
                  />
                )
              }
            />
          </View>
        </ScrollView>
        // </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: colors.white,
    padding: 5,
  },
  pricecard: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.grey,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
