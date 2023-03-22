import {View, Text} from 'react-native';
import React from 'react';
import fonts from '../styles/fonts';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import colors from '../styles/colors';

const CustomHeading = props => {
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
      }}>
      <Text style={fonts.h1}>{props.header1}</Text>
      <Text
        onPress={props.onPress}
        style={{
          ...fonts.h6,
          color: props.isDoctor
            ? colors.primary_color_doc
            : colors.primary_color,
        }}>
        {props.header2}
      </Text>
    </View>
  );
};

export default CustomHeading;
