import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import fonts from '../../styles/fonts';

const CategoryCard = ({item}) => {
  return (
    <View style={styles.categoryCard}>
      <Image
        source={item.image}
        style={{height: 100, width: 100, alignSelf: 'center'}}
        resizeMode={'stretch'}
      />
      <Text style={{...fonts.h4, alignSelf: 'center'}}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    // backgroundColor: 'blue',
    margin: 5,
    // justifyContent: 'center',
    // alignContent: 'center',
    alignSelf: 'center',
  },
});

export default CategoryCard;
