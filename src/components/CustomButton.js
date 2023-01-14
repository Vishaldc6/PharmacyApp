import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {size} from '../styles/size';
import Colors from '../styles/colors';
import fonts from '../styles/fonts';
const CustomButton = props => {
  return (
    <TouchableWithoutFeedback {...props}>
      <View
        style={{
          flex: 1,
          backgroundColor: props.secondary
            ? Colors.white
            : Colors.primary_color,
          height: size.height / 13,
          // width: size.width/1.06,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          marginHorizontal: 10,
        }}>
        <Text
          style={{
            ...fonts.h5,
            color: props.secondary ? Colors.primary_color : Colors.white,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;
