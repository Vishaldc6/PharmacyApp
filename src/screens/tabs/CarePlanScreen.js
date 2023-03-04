import {View, Text, Image, StyleSheet, ScrollView, Alert} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import {Images} from '../../assets/images';
import {size} from '../../styles/size';
import {AppStrings} from '../../utils/AppStrings';
import fonts from '../../styles/fonts';
import InformationCard from '../../components/InformationCard';
import colors from '../../styles/colors';
import CustomButton from '../../components/CustomButton';
import CarePlanCard from '../../components/CarePlanCard';
import {plans} from '../../assets/data/plans';

const CarePlanScreen = () => {
  return (
    <View
      style={{...GlobalStyles.mainContainer, backgroundColor: colors.white}}>
      <CustomHeader title={'Care Plan'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* CarePlan Image */}
        <Image source={Images.noImage} style={styles.img} />
        <Text style={fonts.h1}>{AppStrings.reduceMedial}</Text>
        <Text style={fonts.h2}>{AppStrings.saveThings}</Text>

        {/* Benefits Information */}
        <View
          style={{
            marginVertical: 10,
          }}>
          <CustomButton
            title={AppStrings.explorePlan}
            onPress={() => {
              Alert.alert(AppStrings.appName, 'Comming Soon !');
            }}
          />
          <Text
            style={{
              ...fonts.h2,
              alignSelf: 'center',
              alignContent: 'center',
              margin: 6,
            }}>
            {AppStrings.limitedOffer}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            marginVertical: 10,
            paddingHorizontal: 10,
          }}>
          <Text style={fonts.h1}>{AppStrings.benefits}</Text>
          <InformationCard
            image={Images.noImage}
            title={AppStrings.getxtraDiscnt}
            subTitle={AppStrings.guaranteedSaving}
          />
          <InformationCard
            image={Images.noImage}
            title={AppStrings.freeLabtest}
            subTitle={AppStrings.getfree}
          />
          <InformationCard
            image={Images.noImage}
            title={AppStrings.freeConsultation}
            subTitle={AppStrings.getfree}
          />
          <InformationCard
            image={Images.noImage}
            title={AppStrings.noShipping}
            subTitle={AppStrings.lorem}
          />
          <InformationCard
            image={Images.noImage}
            title={AppStrings.radipDelivery}
            subTitle={AppStrings.guaranteedSaving}
          />
        </View>

        {/* Choose Plan */}
        <View>
          <Text style={fonts.h1}>{AppStrings.choosePlan}</Text>
          {plans.map(item => (
            <CarePlanCard item={item} />
          ))}
          <View style={{margin: 10}}>
            <CustomButton
              title={'Join now'}
              onPress={() => {
                Alert.alert(AppStrings.appName, 'Comming Soon !');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: size.height / 2,
    width: '100%',
    marginVertical: 10,
  },
});

export default CarePlanScreen;
