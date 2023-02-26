import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import {Images} from '../../assets/images';
import {size} from '../../styles/size';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import CustomButton from '../../components/CustomButton';

const PatientDetailScreen = props => {
  let patient = props.route.params.patient;
  console.log(patient);
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader back {...props} />
      <View style={styles.patientHeader}>
        <Image
          source={Images.noImage}
          style={{
            height: size.height / 10,
            width: size.height / 10,
            borderRadius: 50,
          }}
        />
        <View style={{margin: 20}}>
          <Text style={fonts.h1}>{patient.name}</Text>
          <Text style={{...fonts.h4}}>
            {patient.age}, {patient.gender}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.darkgray,
          marginVertical: 10,
        }}
      />
      <Text>PatientDetailScreen</Text>
      <Text>PatientDetailScreen</Text>
      <Text>PatientDetailScreen</Text>
      <Text>PatientDetailScreen</Text>
      <View style={styles.confirmCard}>
        <CustomButton secondary title={'Reject'} />
        <CustomButton title={'Accept'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  patientHeader: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    // borderWidth: 1,
  },
  confirmCard: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: colors.grey,
    position: 'absolute',
    bottom: 0,
  },
});

export default PatientDetailScreen;
