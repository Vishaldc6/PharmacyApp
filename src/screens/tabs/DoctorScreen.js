import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import Swiper from 'react-native-swiper';
import {Images} from '../../assets/images';
import {Banner} from './HomeScreen';
import {size} from '../../styles/size';
import {AppStrings} from '../../utils/AppStrings';
import fonts from '../../styles/fonts';
import SmallInfoCard from '../../components/SmallInfoCard';
import CustomButton from '../../components/CustomButton';
import {diseases} from '../../assets/data/diseases';
import {patients} from '../../assets/data/patients';
import SimpleBanner from '../../components/banner/SimpleBanner';
import DoctorCard from '../../components/DoctorCard';
import CustomHeading from '../../components/CustomHeading';

const SymptomTab = ({item}) => {
  return (
    <TouchableHighlight>
      <View
        style={{borderWidth: 0.5, borderRadius: 10, margin: 5, padding: 10}}>
        <Text>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const DoctorScreen = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader search={true} title={'Docters'} />
      <ScrollView>
        {/* Banners */}
        <View style={styles.bannerContainer}>
          <Swiper
            autoplay
            dotStyle={{bottom: -40}}
            activeDotStyle={{bottom: -40}}>
            <Banner image={Images.banners5} />
            <Banner image={Images.banners} />
            <Banner image={Images.banners6} />
          </Swiper>
        </View>
        {/* Consult Doctor */}
        <Text style={fonts.h1}>{AppStrings.onlineDoctor}</Text>
        <View
          style={{
            ...GlobalStyles.rowContainer,
            // backgroundColor: 'black',
            alignItems: 'baseline',
            marginVertical: 10,
          }}>
          <SmallInfoCard title={AppStrings.talk} />
          <SmallInfoCard title={AppStrings.freeFollowUp} />
          <SmallInfoCard title={AppStrings.getPrescription} />
        </View>
        <CustomButton title={AppStrings.consultNow} />

        <Text style={{alignSelf: 'center', marginVertical: 10}}>OR</Text>

        {/* Symptoms cards */}
        <View>
          <Text style={fonts.h1}>{AppStrings.consultDoctor1Click}</Text>
          <Text style={fonts.h2}>{AppStrings.selectSymptom}</Text>
          <FlatList
            style={{padding: 5}}
            keyExtractor={(item, index) => item.name}
            numColumns={3}
            data={diseases}
            renderItem={({item}) => <SymptomTab item={item} />}
          />
        </View>
        {/* Care Plan Banner */}
        <SimpleBanner />
        {/* Horizontal Doctor List */}
        <CustomHeading header1={AppStrings.meetDoctor} />
        <ScrollView horizontal>
          {patients.map(item => (
            <DoctorCard item={item} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: 5,
    height: size.height / 4.5,
    // backgroundColor: 'red',
    paddingVertical: 10,
  },
});

export default DoctorScreen;
