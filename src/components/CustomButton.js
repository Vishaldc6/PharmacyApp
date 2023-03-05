import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {size} from '../styles/size';
import Colors from '../styles/colors';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
const CustomButton = props => {
  return (
    <TouchableWithoutFeedback {...props}>
      <View
        style={{
          flex: 1,
          backgroundColor: props.secondary
            ? Colors.white
            : props.isAdmin
            ? colors.primary_color_admin
            : Colors.primary_color,
          // height: size.height / 13,
          // width: size.width / 1.06,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          marginHorizontal: 10,
          borderWidth: props.secondary ? 1 : 0,
          borderColor:
            props.secondary && props.isAdmin
              ? colors.primary_color_admin
              : colors.primary_color,
        }}>
        <Text
          style={{
            ...fonts.h5,
            margin: 20,
            color: props.secondary ? Colors.primary_color : Colors.white,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;
