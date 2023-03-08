import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
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

const ProductDetailScreen = props => {
  console.log(props.route.params.id);

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
            <Text>
              {product.rate} rate & {product.reviews.length} reviews
            </Text>
          </View>
          {/* Information */}
          <View style={styles.container}>
            <Text style={fonts.h1}>{AppStrings.productInfo}</Text>
            <Text>{product.information}</Text>
            <Text style={fonts.h6}>{AppStrings.ingredients}</Text>
            <Text>{product.ingredients}</Text>
            <Text style={fonts.h6}>{AppStrings.benefits}</Text>
            <Text>{product.benefits}</Text>
          </View>
          {/* Expire */}
          <View style={styles.container}>
            <Text>
              {AppStrings.expire}{' '}
              <Text style={fonts.h6}>{product.expiry_date}</Text>
            </Text>
          </View>
          {/* Delivery */}
          <View style={styles.container}>
            <Text style={fonts.h1}>{AppStrings.earlyDelivery}</Text>
            <Text style={fonts.h2}>{AppStrings.deliverTo}</Text>
            <Text style={fonts.h3}>{AppStrings.return}</Text>
            <Text style={fonts.h3}>{AppStrings.cod}</Text>
          </View>
          {/* Extra Information */}
          <View style={{...styles.container, flexDirection: 'row'}}>
            <SmallInfoCard title={'100% genuine product'} />
            <SmallInfoCard title={'Safe & secure payments'} />
            <SmallInfoCard title={'Contactless delivery'} />
            <SmallInfoCard title={'Fully sanitized facilities'} />
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
});

export default ProductDetailScreen;
