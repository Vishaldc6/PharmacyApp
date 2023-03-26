import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';

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
    bottom: widthPercentageToDP(2),
    right: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(20),
    backgroundColor: colors.primary_color_admin,
    padding: widthPercentageToDP(6),
    elevation: 5,
  },
});

export default FloatingButton;
