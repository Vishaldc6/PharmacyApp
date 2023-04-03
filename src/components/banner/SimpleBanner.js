import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import {size} from '../../styles/size';

const SimpleBanner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={Images.banners1}
        style={{flex: 1, resizeMode: 'cover', height: 200, width: 500}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    margin: 5,
    height: size.height / 4.5,
    // backgroundColor: 'red',
    padding: 10,
  },
  slide: {
    flex: 1,
    // height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SimpleBanner;
