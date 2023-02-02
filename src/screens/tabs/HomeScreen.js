import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
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

const Card = ({title, icon, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Fontisto
        name={icon}
        size={size.height / 25}
        color={colors.black}
        style={{marginVertical: 10}}
      />
      <Text style={{...fonts.h3, textAlign: 'center'}}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const Banner = ({image}) => (
  <View style={styles.slide}>
    <Image source={image} style={{flex: 1, resizeMode: 'contain'}} />
  </View>
);

const CategoryCard = ({item}) => {
  return (
    <View style={styles.categoryCard}>
      <Image
        source={item.image}
        style={{height: 100, width: 100, alignSelf: 'center'}}
        resizeMode={'stretch'}
      />
      <Text style={{...fonts.h4, alignSelf: 'center'}}>{item.name}</Text>
    </View>
  );
};

const ProductCard = ({item}) => {
  return (
    <View style={styles.categoryCard}>
      <Image source={item.image} style={{height: 120, width: 120}} />
      <Text style={fonts.h4}>{item.name}</Text>
      <Text style={{...fonts.h3, color: colors.darkgray}}>
        {item.quantity} items
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...fonts.h3, color: colors.darkgray}}>{item.rate} </Text>
        <Text style={{...fonts.h3, color: colors.darkgray}}>
          ({item.rating} ratings)
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
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
  );
};

const HomeScreen = props => {
  const navigation = useNavigation();
  return (
    <View style={GlobalStyles.mainContainer}>
      {/* Header */}
      <CustomHeader cart={true} tag={true} title={'Home'} />

      {/* SearchBar */}
      <CustomSearchBar
        placeholder="Search Medicine.."
        onPress={() => {
          navigation.navigate(ScreenNames.SearchScreen);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Card View Container */}
        <View style={styles.cardContainer}>
          <Card
            title={'Lab Test'}
            icon={'laboratory'}
            onPress={() => {
              console.log('Lab Test Page');
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
            onPress={() => props.navigation.navigate(ScreenNames.SearchScreen)}>
            <View style={styles.btn}>
              <Text
                style={{
                  ...fonts.h5,
                  color: colors.white,
                }}>
                Upload
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {/* <CustomButton title={'Upload'} /> */}
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
            index < 5 && <ProductCard item={item} />
          }
        />
        <Text>HomeScreen</Text>
      </ScrollView>
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
    alignItems: 'center',
    paddingVertical: 10,
    elevation: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  prescriptionContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    elevation: 5,
    borderRadius: 10,
    padding: 6,
    marginVertical: 5,
  },
  btn: {
    backgroundColor: colors.primary_color,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
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
    padding: 10,
  },
  categoryCard: {
    flex: 1,
    // backgroundColor: 'blue',
    margin: 10,
    // justifyContent: 'center',
    // alignContent: 'center',
    alignSelf: 'center',
  },
});

export default HomeScreen;
