import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const CarePlanCard = ({item}) => {
  const perMonth = (parseInt(item.price) / 12).toFixed(0);
  const [selected, setselected] = useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setselected(!selected);
      }}>
      <View
        style={{
          borderWidth: 2,
          borderColor: selected ? colors.primary_color : colors.grey,
          padding: 10,
          margin: 5,
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <View>
          <Text style={fonts.h2}>{item.duration}</Text>
          <Text style={fonts.h1}>${item.price}</Text>
          <Text>{perMonth} / month</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CarePlanCard;
