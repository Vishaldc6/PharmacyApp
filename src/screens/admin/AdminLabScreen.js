import {View, Text, FlatList, Image, StyleSheet, Button} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';
import {labs} from '../../assets/data/labs';
import colors from '../../styles/colors';
import {size} from '../../styles/size';
import fonts from '../../styles/fonts';

const LabCard = ({item}) => {
  const discountedPrice =
    item.price - parseFloat(item.price) / parseFloat(item.discount);

  return (
    <View style={styles.card}>
      <Image source={item.image} style={{height: 120, width: 120}} />
      <View style={{width: 20}} />
      <View style={{flex: 1}}>
        <Text style={fonts.h4}>{item.name}</Text>
        <Text>Includes {item.included_tests.length} Tests</Text>
        <Text style={fonts.h6}>Rs.{discountedPrice.toFixed(0)} </Text>
        <Text>{item.rate} rate</Text>
        <Text style={{...fonts.h3, color: colors.primary_color}}>
          {item.discount} % off
        </Text>
        <Text
          style={{
            ...fonts.h3,
            color: colors.darkgray,
            textDecorationLine: 'line-through',
          }}>
          Rs.{item.price}
        </Text>
        <View style={{height: 20}} />
        {/* <View style={GlobalStyles.rowContainer}>
          <Button
            title="Edit"
            onPress={() => {
              console.log(item.id);
            }}
          />
          <Button
            title="Delete"
            onPress={() => {
              console.log('Deleted Item id : ', item.id);
            }}
          />
        </View> */}
      </View>
      <Icon
        name="pencil"
        color={colors.primary_color}
        size={25}
        onPress={() => {
          console.log(item.id);
        }}
      />
      <View style={{width: 20}} />
      <Icon
        name="trash-o"
        color={colors.primary_color}
        size={25}
        onPress={() => {
          console.log('Deleted Item id : ', item.id);
        }}
      />
    </View>
  );
};

const AdminLabScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Laboratories'} back {...props} />
      <CustomSearchBar placeholder="Search Laboratory.." />
      <FlatList
        showsVerticalScrollIndicator={false}
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
        data={labs}
        renderItem={({item}) => <LabCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
});

export default AdminLabScreen;
