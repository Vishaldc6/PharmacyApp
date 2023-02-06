import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import fonts from '../../styles/fonts';
import {Images} from '../../assets/images';
import {size} from '../../styles/size';
import {patients} from '../../assets/data/patients';

const PatientCard = ({name, age, gender, date}) => (
  <View
    style={{
      // flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-evenly',
    }}>
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
    <View style={{width: 20}} />
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{...fonts.h7}}>{name}</Text>
        <Text style={{...fonts.h5}}>{date}</Text>
      </View>
      <Text style={{...fonts.h4}}>
        {age}, {gender}
      </Text>
      {/* <Text style={{...fonts.h5}}>Mr. Abc</Text> */}
    </View>
  </View>
);

const DoctorHomeScreen = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Hello Doctor !'} search />

      {/* Patients List */}
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderWidth: 0.5,
              borderColor: colors.darkgray,
              margin: 10,
            }}
          />
        )}
        data={patients}
        renderItem={({item}) => (
          <PatientCard
            name={item.name}
            age={item.age}
            gender={item.gender}
            date={item.date}
          />
        )}
      />

      <Text>DoctorHomeScreen</Text>
    </View>
  );
};

export default DoctorHomeScreen;
