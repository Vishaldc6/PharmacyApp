import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import fonts from '../../styles/fonts';
import {Images} from '../../assets/images';
import {size} from '../../styles/size';
import {patients} from '../../assets/data/patients';
import colors from '../../styles/colors';
import ScreenNames from '../../navigation/screenNames/ScreenNames';

const PatientCard = ({name, age, gender, date, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.lightgrey,
        padding: 10,
        margin: 5,
        backgroundColor: colors.white,
        elevation: 5,
      }}>
      {/* <View style={{width: 20}} /> */}
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...fonts.h7}}>{name}</Text>
          {/* <Text style={{...fonts.h5}}>{date}</Text> */}
        </View>
        <Text style={{...fonts.h4}}>
          {age}, {gender}
        </Text>
        {/* <Text style={{...fonts.h5}}>Mr. Abc</Text> */}
      </View>
      <View>
        <Image
          source={Images.noImage}
          style={{
            height: size.height / 13,
            width: size.height / 13,
            borderRadius: 50,
          }}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const DoctorHomeScreen = props => {
  return (
    <View style={{flex: 1}}>
      {/* Doctor Header */}
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate(ScreenNames.ProfileScreen, {
            isAdmin: true,
          });
        }}>
        <View style={styels.header}>
          <Image
            source={Images.noImage}
            style={{
              height: size.height / 8,
              width: size.height / 8,
              borderRadius: 50,
            }}
          />
          <View style={{marginHorizontal: 10}}>
            <Text style={fonts.h1}>Hello, Doctor</Text>
            <Text style={fonts.h3}>MBBS</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{...GlobalStyles.mainContainer, marginVertical: 10}}>
        {/* Patients List */}
        {/* <View
          style={{
            elevation: 2,
            backgroundColor: colors.white,
            padding: 10,
            // marginVertical: 5,
          }}> */}
        <FlatList
          // ItemSeparatorComponent={() => (
          //   <View
          //     style={{
          //       borderWidth: 0.5,
          //       borderColor: colors.darkgray,
          //       margin: 10,
          //     }}
          //   />
          // )}
          data={patients}
          renderItem={({item}) => (
            <PatientCard
              name={item.name}
              age={item.age}
              gender={item.gender}
              date={item.date}
              onPress={() =>
                props.navigation.navigate(ScreenNames.PatientDetailScreen, {
                  patient: item,
                })
              }
            />
          )}
        />
        {/* </View> */}
      </View>
    </View>
  );
};

const styels = StyleSheet.create({
  header: {
    // padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    // borderTopWidth: 0,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginVertical: 5,
    marginLeft: 10,
    borderColor: colors.lightgrey,
    backgroundColor: colors.white,
  },
});

export default DoctorHomeScreen;
