import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import fonts, {FONT_SIZE14} from '../../styles/fonts';
import {useAppSelector} from '../../redux/store/Store';

const PrimaryProductCard = ({item, onPress}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  const styles = useStyles();
  // const discountedPrice =
  //   item.price - parseFloat(item.price) / parseFloat(item.discount);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{...styles.productCard, opacity: item.quantity > 0 ? 1 : 0.4}}>
        <Image
          source={{uri: item.thumbnail}}
          style={{height: 120, width: 120}}
        />
        <Text
          style={{
            fontSize: FONT_SIZE14,
            fontWeight: '500',
            color: colors.black,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            ...fonts.h3,
            color: item.quantity > 0 ? colors.darkgray : colors.red,
          }}>
          {item.quantity > 0 ? `${item.quantity} items` : 'Out of Stock'}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...fonts.h3, color: colors.darkgray}}>
            {item.rate}{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Text style={fonts.h5}>Rs.{item.price} </Text>
        </View>

        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.primary_color,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...fonts.h5, margin: 10, color: colors.primary_color}}>
            Add to Cart
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    productCard: {
      flex: 1,
      // backgroundColor: 'blue',
      margin: 10,
    },
  });
};

export default PrimaryProductCard;
