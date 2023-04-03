import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import fonts, {FONT_SIZE12, FONT_SIZE14, FONT_SIZE16} from '../styles/fonts';
import {useAppSelector} from '../redux/store/Store';

const CarePlanCard = ({item}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);
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
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            {item.duration}
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE16,
              fontWeight: '800',
              color: colors.black,
            }}>
            ${item.price}
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE12,
              fontWeight: '400',
              color: colors.lightgrey,
            }}>
            {perMonth} / month
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CarePlanCard;
