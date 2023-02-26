import {View, Text, Image, StyleSheet, Button} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import {size} from '../../styles/size';
import GlobalStyles from '../../styles/GlobalStyles';
import AdminButtons from '../admin/AdminButtons';

const SecondaryProductCard = ({item, isAdmin, editPress, deletePress}) => {
  const discountedPrice =
    item.price - parseFloat(item.price) / parseFloat(item.discount);

  return (
    <View style={styles.productCard}>
      <Image source={item.image} style={{height: 120, width: 120}} />
      <View style={{width: 20}} />
      <View style={{flex: 1}}>
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
          <Text style={fonts.h6}>Rs.{discountedPrice.toFixed(0)} </Text>
          <Text
            style={{
              ...fonts.h3,
              color: colors.darkgray,
              textDecorationLine: 'line-through',
            }}>
            Rs.{item.price}{' '}
          </Text>
          <Text style={{...fonts.h3, color: colors.primary_color}}>
            {item.discount} % off
          </Text>
        </View>
        {/* <CustomButton title={'Add to Cart'} /> */}
        {isAdmin ? (
          // <View style={GlobalStyles.rowContainer}>
          //   {/* <Button title="Edit" onPress={editPress} />
          //   <Button title="Delete" onPress={deletePress} /> */}
          //   <View
          //     style={{
          //       // flex:1,
          //       ...styles.btn,
          //     }}>
          //     <Text
          //       style={{...fonts.h6, margin: 10, color: colors.primary_color}}>
          //       Edit
          //     </Text>
          //   </View>
          //   {/* <Icon
          //     name="pencil"
          //     color={colors.primary_color}
          //     size={25}
          //     onPress={() => {
          //       console.log(item.id);
          //     }}
          //   /> */}
          //   {/* <View style={{width: 20}} /> */}
          //   <View style={styles.btn}>
          //     <Icon
          //       name="trash-o"
          //       color={colors.primary_color}
          //       size={25}
          //       style={{margin: 8}}
          //       onPress={() => {
          //         console.log('Deleted Item id : ', item.id);
          //       }}
          //     />
          //   </View>
          // </View>
          <AdminButtons item={item} />
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
    // borderColor: colors.darkgray,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SecondaryProductCard;
