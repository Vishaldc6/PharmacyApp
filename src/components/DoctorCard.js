import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {Images} from '../assets/images';
import fonts from '../styles/fonts';

const DoctorCard = ({item}) => {
  return (
    <View style={styles.mainContainer}>
      <Image source={Images.noImage} style={styles.img} />
      <Text style={fonts.h6}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // margin: 10,
    padding: 10,
    backgroundColor: colors.white,
  },
  img: {},
});

export default DoctorCard;
