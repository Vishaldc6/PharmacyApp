import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';

const FloatingButton = ({icon, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.btn}>
        <Icon name={icon} size={25} color={colors.white} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    backgroundColor: colors.primary_color_admin,
    padding: 25,
  },
});

export default FloatingButton;
