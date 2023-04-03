import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {useGlobaStyles} from '../../styles/GlobalStyles';

const AdminButtons = ({item, editPress, deletePress}) => {
  const GlobalStyles = useGlobaStyles();

  return (
    <View style={GlobalStyles.rowContainer}>
      <TouchableOpacity style={{flex: 1}} onPress={editPress}>
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

      <TouchableOpacity style={{flex: 1}} onPress={deletePress}>
        <View style={styles.btn}>
          <Icon
            name="trash-o"
            color={colors.primary_color_admin}
            size={25}
            style={{margin: 8}}
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
