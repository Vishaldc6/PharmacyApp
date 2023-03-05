import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets/images';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import {openGallery} from '../../utils/functions';

const ChooseImage = props => {
  return (
    <View>
      <Text style={{...fonts.h3, marginLeft: 10}}>{props.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 15,
          marginHorizontal: 10,
        }}>
        {props.imgPath ? (
          <Image source={{uri: props.imgPath}} style={styles.img} />
        ) : (
          <Image source={Images.noImage} style={styles.img} />
        )}
        <Text
          style={{...fonts.h2, marginHorizontal: 10, flex: 1}}
          numberOfLines={1}>
          {!props.imgName ? 'No image' : props.imgName}
        </Text>
        <TouchableOpacity
          // style={{flex: 1}}
          onPress={props.onPress}>
          <View style={styles.btn}>
            <Text
              style={{
                ...fonts.h6,
                margin: 5,
                color: colors.primary_color_admin,
              }}>
              Choose Iamge
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    // flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary_color_admin,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  img: {
    height: 100,
    width: 100,
  },
});

export default ChooseImage;
