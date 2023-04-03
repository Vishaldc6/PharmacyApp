import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../components/CustomHeader';
import CustomSearchBar from '../components/CustomSearchBar';
import SimpleBanner from '../components/banner/SimpleBanner';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import {Images} from '../assets/images';
import {size} from '../styles/size';
import CustomHeading from '../components/CustomHeading';
import {tests} from '../assets/data/tests';
import {diseases} from '../assets/data/diseases';
import {labs} from '../assets/data/labs';
import {AppStrings} from '../utils/AppStrings';
import ScreenNames from '../navigation/screenNames/ScreenNames';
import InformationCard from '../components/InformationCard';
import {getLabs, getTests} from '../config/apiServices/ApiServices';
import CustomButton from '../components/CustomButton';
import Swiper from 'react-native-swiper';
import {Banner} from './tabs/HomeScreen';
import {useGlobaStyles} from '../styles/GlobalStyles';

const TestCard = ({item, index, onPress, selectedIndex}) => {
  const [isChecked, setisChecked] = useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // setisChecked(!isChecked);
        onPress();
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{...fonts.h2}}>{item.name}</Text>
          <Text style={{...fonts.h3}}>{item.details}</Text>
        </View>
        {index == selectedIndex && (
          <Icon name={'check'} size={20} color={colors.primary_color} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const DiseasesCard = ({item}) => (
  <View style={styles.diseasesCard}>
    <Image
      source={Images.noImage}
      resizeMode={'cover'}
      style={{height: 50, width: 50}}
    />
    <Text style={fonts.h5}>{item.name}</Text>
  </View>
);

const LabCard = ({item}) => {
  // const discountedPrice =
  //   item.price - parseFloat(item.price) / parseFloat(item.discount);

  return (
    <View style={styles.labCard}>
      <Text style={fonts.h5}>{item.name}</Text>
      <Text>Includes {item.included_test} Tests</Text>
      <Image
        source={{uri: item.image}}
        resizeMode={'cover'}
        style={styles.img}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <Text style={{...fonts.h6, color: colors.primary_color}}>Book </Text>
      </View>
    </View>
  );
};

const LabScreen = props => {
  const GlobalStyles = useGlobaStyles();
  const [labs, setlabs] = useState([]);
  const [tests, setTests] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);

  const [selectedTests, setselectedTests] = useState();
  // const [total, settotal] = useState(0);
  const [selectedIndex, setselectedIndex] = useState(null);
  console.log('Test list : ', selectedTests);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLabs().then(res => {
      const list = res.reverse();
      setlabs(list);
    });
    getTests().then(res => setTests(res));
    setloading(false);
    setisRefresh(false);
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Laboratory'} back {...props} />

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
          {/* Simple Banner */}
          <SimpleBanner />
          {/* Book Lab with Prescription */}

          <View
            style={{
              ...GlobalStyles.infoCard,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Image
              source={Images.noImage}
              style={{
                height: size.height / 10,
                width: size.height / 10,
                margin: 10,
              }}
            />

            <View style={{flex: 1}}>
              <Text style={fonts.h6}>Order quickly with a prescription</Text>
              <Text style={fonts.h3}>
                Just upload the prescription and tell us what you need. We do
                the rest !
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(
                    ScreenNames.UploadPrescriptionScreen,
                  );
                }}>
                <View style={styles.btn}>
                  <Text
                    style={{
                      ...fonts.h3,
                      margin: 10,
                      color: colors.primary_color,
                    }}>
                    Upload
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Popular Tests */}
          <View style={{...GlobalStyles.infoCard}}>
            <CustomHeading header1={'Popular Tests'} />
            <FlatList
              style={{
                // backgroundColor: colors.white,
                padding: 10,
                // borderColor: colors.darkgray,
                // borderWidth: 0.5,
              }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    borderWidth: 0.3,
                    borderColor: colors.darkgray,
                    marginVertical: 10,
                  }}
                />
              )}
              data={tests}
              renderItem={({item, index}) => (
                <TestCard
                  item={item}
                  index={index}
                  selectedIndex={selectedIndex}
                  onPress={() => {
                    setselectedIndex(index);
                    setselectedTests(item);
                  }}
                />
              )}
            />
          </View>
          {/* Health Checkup Categories */}
          <View style={{...GlobalStyles.infoCard}}>
            <CustomHeading header1={'Health Checkup Categories'} />
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={diseases}
              renderItem={({item}) => <DiseasesCard item={item} />}
            />
          </View>
          {/* Scroll banner */}
          <View style={styles.bannerContainer}>
            <Swiper
              autoplay
              dotStyle={{bottom: -40}}
              activeDotStyle={{bottom: -40}}>
              <Banner image={Images.banners4} />
              <Banner image={Images.banners} />
              <Banner image={Images.banners5} />
            </Swiper>
          </View>
          {/* Horizontal Labs */}
          <View style={{...GlobalStyles.infoCard}}>
            <CustomHeading header1={'Popular Labs'} />
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={labs}
              renderItem={({item}) => <LabCard item={item} />}
            />
          </View>

          {/* Information */}

          <View style={{...GlobalStyles.infoCard}}>
            <Text style={fonts.h1}>{AppStrings.howDoesHome}</Text>
            <InformationCard
              image={Images.noImage}
              title={AppStrings.completeBooking}
              subTitle={AppStrings.includesSelection}
            />
            <InformationCard
              image={Images.noImage}
              title={AppStrings.safeHomeSample}
              subTitle={AppStrings.highlyTrained}
            />
            <InformationCard
              image={Images.noImage}
              title={AppStrings.smapleDelivery}
              subTitle={AppStrings.phlebotomistDeliver}
            />
            <InformationCard
              image={Images.noImage}
              title={AppStrings.onlineReport}
              subTitle={AppStrings.reportDelivery}
            />
          </View>
        </ScrollView>
      )}
      {selectedTests && (
        <View
          style={{
            ...GlobalStyles.rowContainer,
            paddingVertical: 10,
            backgroundColor: colors.white,
          }}>
          <View
            style={{
              justifyContent: 'center',
              // alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <Text style={fonts.h4}>{selectedTests.name} test selected</Text>
            <Text style={fonts.h4}>RS. {selectedTests.price}</Text>
          </View>
          <CustomButton
            title={'Select Lab'}
            onPress={() => {
              props.navigation.navigate(ScreenNames.LabListScreen, {
                test: selectedTests,
              });
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  prescriptionContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    elevation: 2,
    borderRadius: 10,
    padding: 6,
    marginVertical: 5,
  },
  btn: {
    borderColor: colors.primary_color,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
  },
  diseasesCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 10,
  },
  labCard: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 100,
    // width: 100,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  img: {
    margin: 10,
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  bannerContainer: {
    // flex: 1,
    marginVertical: 5,
    height: size.height / 4.5,
    // backgroundColor: 'red',
    padding: 10,
  },
});

export default LabScreen;
