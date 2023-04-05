import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import fonts, {FONT_SIZE14} from '../../styles/fonts';
import {size} from '../../styles/size';
import AdminButtons from '../admin/AdminButtons';
import {useAppSelector} from '../../redux/store/Store';

const SecondaryProductCard = ({
  item,
  isAdmin,
  editPress,
  deletePress,
  onPress,
}) => {
  const styles = useStyles();
  const {colors} = useAppSelector(state => state.CommonSlice);
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
        <View style={{width: 20}} />
        <View style={{flex: 1}}>
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
              {item.rate} Rating
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Text style={fonts.h6}>Rs.{item.price} </Text>
          </View>

          {isAdmin ? (
            <AdminButtons
              item={item}
              editPress={editPress}
              deletePress={deletePress}
            />
          ) : (
            <View
              style={{
                flex: 1,
                ...styles.btn,
              }}>
              <Text
                style={{...fonts.h6, margin: 10, color: colors.primary_color}}>
                Add to Cart
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const useStyles = () => {
  const {colors} = useAppSelector(state => state.CommonSlice);

  return StyleSheet.create({
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
      // borderColor: colors.darkgray,
    },
    btn: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.primary_color,
      // justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      // flex: 1,
    },
  });
};
export default SecondaryProductCard;
