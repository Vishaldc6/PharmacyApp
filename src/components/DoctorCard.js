import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {useAppSelector} from '../redux/store/Store';
import {FONT_SIZE12, FONT_SIZE14} from '../styles/fonts';

const DoctorCard = ({item}) => {
  console.log(item.image);
  const styles = useStyles();
  const {colors} = useAppSelector(state => state.CommonSlice);
  return (
    <View style={styles.mainContainer}>
      <Image
        source={{
          uri: item.image,
        }}
        resizeMode={'cover'}
        style={styles.img}
      />

      <Text
        style={{fontSize: FONT_SIZE14, fontWeight: '700', color: colors.black}}>
        {item.name}
      </Text>
      <Text
        style={{fontSize: FONT_SIZE12, fontWeight: '500', color: colors.black}}>
        {item.specialist}
      </Text>
    </View>
  );
};

const useStyles = () => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  return StyleSheet.create({
    mainContainer: {
      margin: 10,
      padding: 10,
      backgroundColor: colors.white,
    },
    img: {
      padding: 5,
      height: 200,
      width: 200,
    },
  });
};

export default DoctorCard;
