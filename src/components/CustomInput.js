import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/colors';
import fonts from '../styles/fonts';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import colors from '../styles/colors';

const CustomInput = props => {
  const [isFocus, setisFocus] = useState(false);
  const [isVisible, setisVisible] = useState(false);

  return (
    <View {...props}>
      <Text style={{...fonts.h3}}>{props.title}</Text>
      <View style={styles.inputContainer}>
        {props.iconName && (
          <View style={styles.iconBox}>
            <Icon
              name={props.iconName}
              size={widthPercentageToDP(5)}
              color={
                isFocus
                  ? props.isAdmin
                    ? Colors.primary_color_admin
                    : Colors.primary_color
                  : Colors.darkgray
              }
              style={{alignSelf: 'center'}}
            />
          </View>
        )}
        <TextInput
          cursorColor={colors.primary_color}
          editable={props.editable}
          onFocus={() => {
            setisFocus(true);
          }}
          onBlur={() => {
            setisFocus(false);
          }}
          style={
            isFocus
              ? props.isAdmin
                ? {
                    ...styles.input,
                    borderBottomColor: Colors.primary_color_admin,
                  }
                : styles.input
              : {...styles.input, borderBottomColor: Colors.darkgray}
          }
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          secureTextEntry={
            props.passwordField ? (isVisible ? false : true) : false
          }
        />
        {props.passwordField && (
          <View style={styles.iconBox}>
            <Icon
              onPress={() => {
                setisVisible(!isVisible);
              }}
              name={isVisible ? 'eye' : 'eye-slash'}
              // size={22}
              size={widthPercentageToDP(5)}
              color={
                isVisible
                  ? props.isAdmin
                    ? Colors.primary_color_admin
                    : Colors.primary_color
                  : Colors.darkgray
              }
              style={{alignSelf: 'center'}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    // marginVertical:10,
    // backgroundColor: 'red',
  },
  input: {
    flex: 1,
    borderBottomColor: Colors.primary_color,
    borderBottomWidth: 1,
    height: widthPercentageToDP(10),
    marginHorizontal: widthPercentageToDP(2),
    ...fonts.h3,
  },
  iconBox: {
    alignSelf: 'center',
    height: widthPercentageToDP(5),
    width: widthPercentageToDP(5),
    marginHorizontal: 10,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
});

export default CustomInput;
