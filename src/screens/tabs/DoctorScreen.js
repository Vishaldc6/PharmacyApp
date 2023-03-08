import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

import SimpleBanner from '../../components/banner/SimpleBanner';
import DoctorCard from '../../components/DoctorCard';
import CustomHeading from '../../components/CustomHeading';
import {getDoctors} from '../../config/apiServices/ApiServices';

const SymptomTab = ({item}) => {
  return (
    <TouchableHighlight>
      <View
        style={{
          // flex: 1,
          borderWidth: 0.5,
          borderRadius: 10,
          margin: 5,
          padding: 10,
        }}>
        <Text>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const DoctorScreen = () => {
  const [doctors, setdoctors] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    getDoctors().then(res => {
      setdoctors(res);
      setloading(false);
      setisRefresh(false);
    });

    console.log('doctors list ::', doctors);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader search={true} title={'Docters'} />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                getData();
              }}
            />
          }>
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
            {/* <View
            style={{
              flex: 1,
              backgroundColor: 'red',
              height: 100,
              padding: 5,
              flexWrap: 'wrap',
            }}>
            {diseases.map(itm => {
              <SymptomTab item={itm} />;
            })}
          </View> */}
          </View>
          {/* Care Plan Banner */}
          <SimpleBanner />
          {/* Horizontal Doctor List */}
          <CustomHeading header1={AppStrings.meetDoctor} />
          <View style={{paddingBottom: 20}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {doctors.map(item => {
                console.log(item);
                return <DoctorCard item={item} />;
              })}
            </ScrollView>
          </View>
        </ScrollView>
      )}
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
