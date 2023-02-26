import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import CustomHeading from '../../components/CustomHeading';
import {size} from '../../styles/size';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Images} from '../../assets/images';

const ListTile = ({icon, title, onPress}) => (
  <View
    style={{
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    }}>
    <View style={{flexDirection: 'row'}}>
      <Icon name={icon} size={size.height / 35} color={colors.primary_color} />
      <View style={{width: 20}} />
      <Text style={fonts.h4}>{title}</Text>
    </View>
    <Icon
      name={'chevron-right'}
      size={size.height / 35}
      color={colors.primary_color}
    />
  </View>
);

const ProfileScreen = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader cart={true} />
      <View
        style={{
          alignItems: 'center',
          // backgroundColor: 'red'
        }}>
        <Image
          source={Images.noImage}
          style={{
            borderRadius: 100,
            height: size.width / 3,
            width: size.width / 3,
            margin: 10,
          }}
        />
        <Text style={fonts.h1}>Hello User</Text>
        <Text style={fonts.h2}>20, Male</Text>
      </View>

      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          padding: 10,
          borderRadius: 20,
          backgroundColor: colors.white,
        }}>
        <ScrollView>
          <View style={styles.indicator} />

          <Text style={{...fonts.h1, alignSelf: 'center', padding: 10}}>
            My Information
          </Text>
          <ListTile icon={'shopping-cart'} title={'My Cart'} />
          <ListTile icon={'shopping-cart'} title={'My Doctors'} />
          <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
          <ListTile icon={'shopping-cart'} title={'My Orders'} />
        </ScrollView>
      </View>
      {/* <Text>ProfileScreen</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 5,
    width: 30,
    backgroundColor: colors.grey,
    borderRadius: 20,
    alignSelf: 'center',
    margin: 5,
  },
});

export default ProfileScreen;
