import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';
import colors from '../../styles/colors';
import {tests} from '../../assets/data/tests';
import fonts from '../../styles/fonts';

const AdminTestScreen = props => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title="Tests" back {...props} />
      <CustomSearchBar placeholder="Search Tests.." />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: colors.white,
          marginVertical: 10,
          elevation: 2,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderWidth: 0.5,
              borderColor: colors.darkgray,
              margin: 10,
            }}
          />
        )}
        data={tests}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <View>
              <Text style={fonts.h2}>{item.name}</Text>
              <Text style={fonts.h3}>{item.details}</Text>
            </View>
            <View style={GlobalStyles.rowContainer}>
              <Icon
                name="pencil"
                color={colors.primary_color}
                size={25}
                onPress={() => {
                  console.log(item.id);
                }}
              />
              <View style={{width: 20}} />
              <Icon
                name="trash-o"
                color={colors.primary_color}
                size={25}
                onPress={() => {
                  console.log('Deleted Item id : ', item.id);
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AdminTestScreen;
