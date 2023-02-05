import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

const PrimaryProductCard = ({item}) => {
  const discountedPrice =
    item.price - parseFloat(item.price) / parseFloat(item.discount);
  return (
    <View style={styles.productCard}>
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
        <Text style={fonts.h6}>Rs.{discountedPrice.toFixed(0)} </Text>
        <Text
          style={{
            ...fonts.h3,
            color: colors.darkgray,
            textDecorationLine: 'line-through',
          }}>
          Rs.{item.price}
        </Text>
        <Text style={{...fonts.h3, color: colors.primary_color}}>
          {' '}
          {item.discount} % off
        </Text>
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

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    // backgroundColor: 'blue',
    margin: 10,
  },
});

export default PrimaryProductCard;
