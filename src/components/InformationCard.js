import {View, Text, Image} from 'react-native';
import React from 'react';
import fonts from '../styles/fonts';

const InformationCard = ({image, title, subTitle}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    }}>
    <View>
      <Image source={image} style={{marginRight: 10, height: 40, width: 40}} />
    </View>
    <View style={{flex: 1}}>
      <Text style={fonts.h2}>{title}</Text>
      <Text style={fonts.h3}>{subTitle}</Text>
    </View>
  </View>
);

export default InformationCard;
