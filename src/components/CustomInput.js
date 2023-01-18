import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/colors';
import fonts from '../styles/fonts';

const CustomInput = props => {
  const [isFocus, setisFocus] = useState(false);
  const [isVisible, setisVisible] = useState(false);

  return (
    <View>
      <Text style={{...fonts.h3, marginLeft: 10}}>{props.title}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconBox}>
          <Icon
            name={props.iconName}
            size={22}
            color={isFocus ? Colors.primary_color : Colors.darkgray}
            style={{alignSelf: 'center'}}
          />
        </View>
        <TextInput
          onFocus={() => {
            setisFocus(true);
          }}
          onBlur={() => {
            setisFocus(false);
          }}
          style={
            isFocus
              ? styles.input
              : {...styles.input, borderBottomColor: Colors.darkgray}
          }
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          keyboardType={props.keyboardType}
          secureTextEntry={isVisible ? false : true}
        />
        <View style={styles.iconBox}>
          {props.passwordField && (
            <Icon
              onPress={() => {
                setisVisible(!isVisible);
              }}
              name={isVisible ? 'eye' : 'eye-slash'}
              size={22}
              color={isVisible ? Colors.primary_color : Colors.darkgray}
              style={{alignSelf: 'center'}}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    // marginVertical:10,
    // backgroundColor:'red'
  },
  input: {
    flex: 1,
    borderBottomColor: Colors.primary_color,
    borderBottomWidth: 1.5,
    height: 40,
    marginHorizontal: 5,
  },
  iconBox: {
    alignSelf: 'center',
    height: 25,
    width: 25,
    marginHorizontal: 10,
  },
});

export default CustomInput;
