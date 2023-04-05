import {View, Text, Image} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';
import fonts, {FONT_SIZE14} from '../styles/fonts';
import {useAppSelector} from '../redux/store/Store';

const SmallInfoCard = ({title}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  return (
    <View
      style={{
        flex: 1,
        margin: 5,
        alignItems: 'center',
        // backgroundColor: 'red',
      }}>
      <Image
        source={Images.noImage}
        style={{height: 50, width: 50, margin: 10}}
      />
      <Text
        style={{
          fontSize: FONT_SIZE14,
          fontWeight: '400',
          color: colors.black,
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default SmallInfoCard;
