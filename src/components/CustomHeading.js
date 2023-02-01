import {View, Text} from 'react-native';
import React from 'react';
import fonts from '../styles/fonts';
import ScreenNames from '../navigation/screenNames/ScreenNames';

const CustomHeading = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={fonts.h1}>{props.header1}</Text>
      <Text
        onPress={props.onPress}
        style={{...fonts.h6, color: colors.primary_color}}>
        {props.header2}
      </Text>
    </View>
  );
};

export default CustomHeading;
