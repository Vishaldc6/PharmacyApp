import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {size} from '../styles/size';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const CustomHeader = props => {
  return (
    <View style={styles.container}>
      {props.back && (
        <Icon name={'chevron-left'} size={25} style={styles.icon} />
      )}
      <Text numberOfLines={1} style={{...fonts.h1, flex: 1}}>
        {props.title}
      </Text>
      <View style={styles.postIconContainer}>
        {props.tag && <Icon name={'tag'} size={25} style={styles.icon} />}
        {props.search && <Icon name={'search'} size={25} style={styles.icon} />}
        {props.cart && (
          <Icon name={'shopping-cart'} size={25} style={styles.icon} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    height: size.height / 15,
    // width: size.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  postIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
    padding: 5,
    // backgroundColor: 'red',
  },
});

export default CustomHeader;
