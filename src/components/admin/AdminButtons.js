import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const AdminButtons = ({item}) => {
  return (
    <View style={GlobalStyles.rowContainer}>
      {/* <Button title="Edit" onPress={editPress} />
    <Button title="Delete" onPress={deletePress} /> */}
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          console.log('Edited Item id : ', item.id);
        }}>
        <View style={styles.btn}>
          <Text
            style={{
              ...fonts.h6,
              margin: 10,
              color: colors.primary_color_admin,
            }}>
            Edit
          </Text>
        </View>
      </TouchableOpacity>
      {/* <Icon
      name="pencil"
      color={colors.primary_color}
      size={25}
      onPress={() => {
        console.log(item.id);
      }}
    /> */}
      {/* <View style={{width: 20}} /> */}
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          console.log('Edited Item id : ', item.id);
        }}>
        <View style={styles.btn}>
          <Icon
            name="trash-o"
            color={colors.primary_color_admin}
            size={25}
            style={{margin: 8}}
            onPress={() => {
              console.log('Deleted Item id : ', item.id);
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary_color_admin,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
export default AdminButtons;
