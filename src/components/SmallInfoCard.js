import {View, Text, Image} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import fonts from '../styles/fonts';

const SmallInfoCard = ({title}) => {
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
      <Text style={{...fonts.h2, textAlign: 'center'}}>{title}</Text>
    </View>
  );
};

export default SmallInfoCard;
