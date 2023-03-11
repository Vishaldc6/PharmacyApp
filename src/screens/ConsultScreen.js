import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import {diseases} from '../assets/data/diseases';
import {AppStrings} from '../utils/AppStrings';
import fonts from '../styles/fonts';
import {SymptomTab} from './tabs/DoctorScreen';

const ConsultScreen = props => {
  let disease = props.route.params?.disease;
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Consult Doctor'} back {...props} />
      {!disease && (
        <View>
          <Text style={fonts.h1}>{AppStrings.consultDoctor1Click}</Text>
          <Text style={fonts.h2}>{AppStrings.selectSymptom}</Text>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {diseases.map(item => (
              <SymptomTab
                item={item}
                // onPress={() => {
                //   props.navigation.navigate(ScreenNames.ConsultScreen, {
                //     disease: item.name,
                //   });
                // }}
              />
            ))}
          </View>
        </View>
      )}
      <Text>ConsultScreen</Text>
      <Text>{disease}</Text>
    </View>
  );
};

export default ConsultScreen;

const styles = StyleSheet.create({});
