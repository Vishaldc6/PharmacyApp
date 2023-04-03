import {View, Text} from 'react-native';
import React from 'react';
import fonts, {FONT_SIZE14, FONT_SIZE16} from '../styles/fonts';
import {useAppSelector} from '../redux/store/Store';

const CustomHeading = props => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
      }}>
      <Text
        style={{fontSize: FONT_SIZE16, fontWeight: '800', color: colors.black}}>
        {props.header1}
      </Text>
      <Text
        onPress={props.onPress}
        style={{
          fontSize: FONT_SIZE14,
          fontWeight: '700',
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
