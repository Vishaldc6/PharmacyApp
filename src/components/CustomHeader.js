import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {size} from '../styles/size';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const CustomHeader = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        {props.back && (
          <Icon
            onPress={() => {
              props.navigation.goBack();
            }}
            name={'chevron-left'}
            size={size.height / 35}
            style={{
              marginHorizontal: 0,
              padding: 0,
              paddingRight: 10,
            }}
            color={colors.black}
          />
        )}
        <Text numberOfLines={1} style={{...fonts.h1, flex: 1}}>
          {props.title}
        </Text>
      </View>
      <View style={styles.postIconContainer}>
        {props.tag && <Icon name={'tag'} size={25} style={styles.icon} />}
        {props.search && <Icon name={'search'} size={25} style={styles.icon} />}
        {props.call && (
          <Icon
            name={'phone'}
            size={25}
            style={styles.icon}
            onPress={props.onCall}
          />
        )}
        {props.cart && (
          <Icon
            name={'shopping-cart'}
            size={25}
            style={styles.icon}
            onPress={() => {
              props.navigation.navigate(ScreenNames.CartScreen);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // height: size.height / 15,
    // width: size.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: widthPercentageToDP(4),
    // borderBottomWidth: 0.5,
    marginHorizontal: -10,
    marginVertical: -10,
    marginBottom: 10,
    elevation: 5,
  },
  postIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 5,
    padding: 5,
    // backgroundColor: 'red',
  },
});

export default CustomHeader;
