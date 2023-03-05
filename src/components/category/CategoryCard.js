import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import fonts from '../../styles/fonts';
import AdminButtons from '../admin/AdminButtons';

const CategoryCard = ({item, isAdmin, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flex: 1,
          margin: 5,
          // alignSelf: 'center',
          // backgroundColor: 'green',
        }}>
        <View
          style={{
            ...styles.categoryCard,
            flexDirection: isAdmin ? 'row' : 'column',
          }}>
          <Image
            source={{uri: item.image}}
            style={{height: 100, width: 100, alignSelf: 'center'}}
            resizeMode={'stretch'}
          />
          {isAdmin && <View style={{width: 20}} />}
          <Text style={{...fonts.h4, alignSelf: 'center'}} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        {isAdmin && <AdminButtons item={item} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    // backgroundColor: 'blue',
    margin: 5,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
  },
});

export default CategoryCard;
