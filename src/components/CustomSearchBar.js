import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {size} from '../styles/size';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

const CustomSearchBar = props => {
  return (
    <View style={styles.container}>
      {props.navi && (
        <Icon name={'chevron-left'} size={25} style={styles.icon} />
      )}
      <TextInput
        // onPressIn={props.onPress}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={{...fonts.h3, flex: 1}}
      />
      <View style={{width: 15}} />
      <Icon
        name={'search'}
        size={25}
        style={styles.icon}
        onPress={props.onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgrey,
    height: size.height / 15,
    // width: size.width,
    // borderWidth: 1,
    borderColor: colors.darkgray,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default CustomSearchBar;
