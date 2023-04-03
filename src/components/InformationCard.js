import {View, Text, Image} from 'react-native';
import React from 'react';
import fonts, {FONT_SIZE12, FONT_SIZE14} from '../styles/fonts';
import {useAppSelector} from '../redux/store/Store';

const InformationCard = ({image, title, subTitle}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <View>
        <Image
          source={image}
          style={{marginRight: 10, height: 40, width: 40}}
        />
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: FONT_SIZE14,
            fontWeight: '400',
            color: colors.black,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: FONT_SIZE12,
            fontWeight: '400',
            color: colors.black,
          }}>
          {subTitle}
        </Text>
      </View>
    </View>
  );
};

export default InformationCard;
