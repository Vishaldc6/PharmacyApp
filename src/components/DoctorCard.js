import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {Images} from '../assets/images';
import fonts from '../styles/fonts';

const DoctorCard = ({item}) => {
  console.log(item.image);
  return (
    <View style={styles.mainContainer}>
      <Image
        source={{
          uri: item.image,
        }}
        resizeMode={'cover'}
        style={styles.img}
      />
      {/* <Image
        source={{uri: 'http://192.168.29.125:8000/user/1678018624191.png'}}
        resizeMode={'cover'}
        style={styles.img}
      /> */}
      <Text style={fonts.h6}>{item.name}</Text>
      <Text style={fonts.h5}>{item.specialist}</Text>
      {/* <Text style={fonts.h5}>{item.experience}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.white,
  },
  img: {
    padding: 5,
    height: 200,
    width: 200,
  },
});

export default DoctorCard;
