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
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import Swiper from 'react-native-swiper';
import {
  ApiCall,
  getProducts,
  getToken,
} from '../config/apiServices/ApiServices';
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
import CustomInput from '../components/CustomInput';
import {Images} from '../assets/images';
import {useGlobaStyles} from '../styles/GlobalStyles';

const PriceCard = ({price, addToCart}) => {
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
          <Text style={fonts.h6}>Rs. {price} </Text>
          <Text
            style={{
              ...fonts.h2,
              color: colors.grey,
              textDecorationLine: 'line-through',
            }}>
            MRP {price + 50}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {selected && (
        <View style={{margin: 10}}>
          <CustomButton title={'Add to Cart'} onPress={addToCart} />
        </View>
      )}
    </View>
  );
};

const ProductDetailScreen = props => {
  const GlobalStyles = useGlobaStyles();
  console.log(props.route.params.id);
  let products = props.route.params.products;
  console.log('products : ', products);

  const [rating, setrating] = useState('');
  const [review, setreview] = useState('');
  const [qty, setqty] = useState(1);
  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(true);
  const [token, settoken] = useState('');

  var currentDate = new Date();
  var date = currentDate.getDate();
  var dateafter5Day = date + 5;
  // currentDate = currentDate.getDate();
  // to add 4 days to current date
  // currentDate.addDays(4);

  useEffect(() => {
    if (props.route.params.id) {
      getDetail(props.route.params.id);
    }
  }, []);

  const getDetail = async id => {
    getProducts(id).then(res => {
      setproduct(res);
      //   console.log('product detail :', product.images);
      //   product.images.map(it => console.log(it.image));
      setloading(false);
    });

    const tkn = await getToken();
    settoken(tkn);
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
          {/* <View
            style={{
              ...styles.container,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}> */}
          <View
            style={{
              // ...styles.container,
              ...GlobalStyles.infoCard,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={fonts.h1}>{product.name}</Text>
              <Text>by {product.brand}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="star"
                  size={25}
                  style={{margin: 5}}
                  color={colors.primary_color}
                />
                <Text style={fonts.h5}>
                  {product.rate} rate & {product.reviews.length} reviews
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setqty(c => c + 1)}
                style={{
                  margin: 5,
                  padding: 5,
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                <Icon name={'plus'} color={colors.primary_color} />
              </TouchableOpacity>
              <Text style={{padding: 5, ...fonts.h2}}>{qty}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (qty > 1) {
                    setqty(c => c - 1);
                  }
                }}
                style={{
                  margin: 5,
                  padding: 5,
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                <Icon name={'minus'} color={colors.primary_color} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Price Add to cart */}
          {/* <View style={styles.container}> */}
          <View style={{...GlobalStyles.infoCard}}>
            <PriceCard
              price={product.price}
              addToCart={async () => {
                // Alert.alert(AppStrings.appName, 'Comming');
                const body = new FormData();
                body.append('product_id', product.id);
                body.append('qty', qty);
                const res = await fetch(AppStrings.BASE_URL + '/addToCart', {
                  headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                  },
                  method: 'POST',
                  body: body,
                });
                // const jsonRes = await res.json();
                let responseText = await res.text();
                let jsonRes = JSON.parse(responseText);
                console.log('Screen res :', jsonRes);
                console.log(res);
                // if (res.ok) {
                if (jsonRes.flag) {
                  Alert.alert(AppStrings.appName, jsonRes.message);
                } else if (jsonRes.flag == false) {
                  if (jsonRes.data?.errors != null) {
                    Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
                  } else {
                    Alert.alert(AppStrings.appName, jsonRes.message);
                  }
                } else {
                  Alert.alert(AppStrings.appName, jsonRes.message);
                }
              }}
            />
          </View>
          {/* Delivery */}
          {/* <View style={styles.container}> */}
          <View style={GlobalStyles.infoCard}>
            <Text style={fonts.h1}>
              {AppStrings.earlyDelivery}
              {currentDate.toDateString().replace(date, dateafter5Day)}
            </Text>
            <Text style={fonts.h2}>{AppStrings.deliverTo}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Images.noImage}
                style={{height: 20, width: 20, margin: 5}}
              />
              <Text style={fonts.h3}>{AppStrings.return}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Images.noImage}
                style={{height: 20, width: 20, margin: 5}}
              />
              <Text style={fonts.h3}>{AppStrings.cod}</Text>
            </View>
          </View>
          {/* Simple banner */}
          <SimpleBanner />

          {/* Information */}
          {/* <View style={styles.container}> */}
          <View style={GlobalStyles.infoCard}>
            <Text style={fonts.h1}>{AppStrings.productInfo}</Text>
            <Text>{product.information}</Text>
            <Text style={{...fonts.h6, marginTop: 10}}>
              {AppStrings.ingredients}
            </Text>
            <Text>• {product.ingredients}</Text>
            <Text style={{...fonts.h6, marginTop: 10}}>
              {AppStrings.benefits}
            </Text>
            <Text>• {product.benefits}</Text>
          </View>
          {/* Expire */}
          {/* <View style={styles.container}> */}
          <View style={GlobalStyles.infoCard}>
            <Text>
              {AppStrings.expire}
              <Text style={fonts.h6}>{product.expiry_date}</Text>
            </Text>
          </View>

          {/* Extra Information */}
          {/* <View style={{...styles.container, flexDirection: 'row'}}> */}
          <View style={{...GlobalStyles.infoCard, flexDirection: 'row'}}>
            <SmallInfoCard title={'100% genuine product'} />
            <SmallInfoCard title={'Safe & secure payments'} />
            <SmallInfoCard title={'Contactless delivery'} />
            <SmallInfoCard title={'Fully sanitized facilities'} />
          </View>

          {/* review */}
          {/* <View style={styles.container}> */}
          <View style={GlobalStyles.infoCard}>
            <CustomHeading header1={'Product Reviews'} />
            {product.reviews.map(item => (
              <View
                style={{
                  borderWidth: 1,
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                }}>
                <Text style={fonts.h6}>{item.user_name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={fonts.h6}>{item.rating}</Text>
                  <Icon
                    name="star"
                    size={25}
                    style={{margin: 5}}
                    color={colors.primary_color}
                  />
                </View>
                <Text style={fonts.h4}>{item.review}</Text>
              </View>
            ))}
            <View style={{padding: 10}}>
              <CustomHeading header1={'Add your Reviews'} />
              <CustomInput
                value={review}
                onChangeText={val => setreview(val)}
                title={'Review'}
                iconName={'info-circle'}
                placeholder={'Enter your review'}
                keyboardType={'email-address'}
              />
              <CustomInput
                value={rating}
                onChangeText={val => setrating(val)}
                title={'Rating'}
                iconName={'star'}
                placeholder={'Enter your rating'}
                keyboardType={'phone-pad'}
              />
              <View style={{padding: 15}}>
                {rating && review && (
                  <CustomButton
                    title={'Add Review'}
                    onPress={async () => {
                      setrating('');
                      setreview('');

                      const body = new FormData();
                      body.append('product_id', product.id);
                      body.append('review', review);
                      body.append('rating', rating);
                      const res = await fetch(
                        AppStrings.BASE_URL + '/productReview',
                        {
                          headers: {
                            Accept: 'application/json',
                            Authorization: 'Bearer ' + token,
                          },
                          method: 'POST',
                          body: body,
                        },
                      );
                      // const jsonRes = await res.json();
                      let responseText = await res.text();
                      let jsonRes = JSON.parse(responseText);
                      console.log('Screen res :', jsonRes);
                      console.log(res);
                      // if (res.ok) {
                      if (jsonRes.success) {
                        Alert.alert(AppStrings.appName, jsonRes.message);
                        getDetail(props.route.params.id);
                      } else if (jsonRes.success == false) {
                        Alert.alert(AppStrings.appName, jsonRes.data);
                      }
                    }}
                  />
                )}
              </View>
            </View>
          </View>

          {/* simple banner */}
          <SimpleBanner />

          {/* Horizontal products */}
          {/* <View style={styles.container}> */}
          <View style={GlobalStyles.infoCard}>
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
                      if (item.quantity > 0) {
                        props.navigation.navigate(
                          ScreenNames.ProductDetailScreen,
                          {
                            id: item.id,
                            // product: products,
                          },
                        );
                      }
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
    padding: 10,
    elevation: 3,
    borderRadius: 10,
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
    alignItems: 'baseline',
  },
});

export default ProductDetailScreen;
