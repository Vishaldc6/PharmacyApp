import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {FONT_SIZE14} from '../../styles/fonts';
import AdminButtons from '../admin/AdminButtons';
import {useAppSelector} from '../../redux/store/Store';

const CategoryCard = ({item, isAdmin, onPress, editPress, deletePress}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);

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
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '500',
              color: colors.black,
              alignSelf: 'center',
            }}
            numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        {isAdmin && (
          <AdminButtons
            item={item}
            deletePress={deletePress}
            editPress={editPress}
          />
        )}
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
