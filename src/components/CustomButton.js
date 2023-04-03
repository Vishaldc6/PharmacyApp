import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {size} from '../styles/size';
import fonts, {FONT_SIZE12} from '../styles/fonts';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useAppSelector} from '../redux/store/Store';
const CustomButton = props => {
  const {colors} = useAppSelector(state => state.CommonSlice);

  return (
    <TouchableWithoutFeedback {...props}>
      <View
        style={{
          flex: 1,
          backgroundColor: props.secondary
            ? colors.white
            : props.isAdmin
            ? colors.primary_color_admin
            : props.isDoctor
            ? colors.primary_color_doc
            : colors.primary_color,
          // height: size.height / 13,
          // width: size.width / 1.06,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: wp(4),
          marginHorizontal: wp(2),
          borderWidth: props.secondary ? 1 : 0,
          borderColor:
            props.secondary && props.isAdmin
              ? colors.primary_color_admin
              : props.isDoctor
              ? colors.primary_color_doc
              : colors.primary_color,
        }}>
        <Text
          style={{
            fontSize: FONT_SIZE12,
            fontWeight: '500',
            margin: wp(5),
            color: props.secondary
              ? props.isDoctor
                ? colors.primary_color_doc
                : colors.primary_color
              : colors.white,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;
