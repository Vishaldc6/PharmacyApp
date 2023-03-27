import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
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
import CustomSearchBar from '../../components/CustomSearchBar';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import colors from '../../styles/colors';

export const SymptomTab = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          // flex: 1,
          borderWidth: 0.5,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          borderColor: colors.black,
        }}>
        <Text style={fonts.h2}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DoctorScreen = props => {
  const [doctors, setdoctors] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);
  const [srcTxt, setsrcTxt] = useState('');
  const [searchdoctor, setsearchdoctor] = useState([]);

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
      <CustomHeader title={'Docters'} />
      <CustomSearchBar
        placeholder="Search Doctors.."
        // onPress={() => {
        //   props.navigation.navigate(ScreenNames.SearchScreen);
        // }}
        value={srcTxt}
        onChangeText={val => {
          if (val == '') {
            setsearchdoctor([]);
          }
          setsrcTxt(val);
        }}
        onSearch={() => {
          let list = doctors.filter(item => item.name == srcTxt);
          setsearchdoctor(list);
        }}
      />
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
          {searchdoctor.length !== 0 && srcTxt !== '' && (
            <View style={{elevation: 2, backgroundColor: colors.white}}>
              <CustomHeading header1={'Searched Doctors'} />
              <FlatList
                style={{marginVertical: 5}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled={false}
                data={searchdoctor}
                renderItem={({item, index}) =>
                  index < 5 && <DoctorCard item={item} />
                }
              />
            </View>
          )}
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
          <View style={GlobalStyles.infoCard}>
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
            <CustomButton
              title={AppStrings.consultNow}
              onPress={() => {
                props.navigation.navigate(ScreenNames.ConsultScreen);
              }}
            />
          </View>
          <Text style={{...fonts.h1, alignSelf: 'center', marginVertical: 10}}>
            OR
          </Text>

          {/* Symptoms cards */}
          <View style={{...GlobalStyles.infoCard}}>
            <Text style={fonts.h1}>{AppStrings.consultDoctor1Click}</Text>
            <Text style={fonts.h2}>{AppStrings.selectSymptom}</Text>
            {/* <FlatList
              style={{padding: 5}}
              keyExtractor={(item, index) => item.name}
              numColumns={3}
              data={diseases}
              renderItem={({item}) => (
                <SymptomTab
                  item={item}
                  onPress={() => {
                    props.navigation.navigate(ScreenNames.ConsultScreen, {
                      disease: item.name,
                    });
                  }}
                />
              )}
            /> */}
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {diseases.map(item => (
                // <TouchableOpacity>
                //   <View
                //     style={{
                //       // flex: 1,
                //       borderWidth: 0.5,
                //       borderRadius: 10,
                //       margin: 5,
                //       padding: 10,
                //     }}>
                //     <Text>{item.name}</Text>
                //   </View>
                // </TouchableOpacity>
                <SymptomTab
                  item={item}
                  onPress={() => {
                    props.navigation.navigate(ScreenNames.ConsultScreen, {
                      disease: item.name,
                    });
                  }}
                />
              ))}
            </View>
          </View>
          {/* Care Plan Banner */}
          <SimpleBanner />
          {/* Horizontal Doctor List */}
          <View style={GlobalStyles.infoCard}>
            <CustomHeading header1={AppStrings.meetDoctor} />
            <View
              style={{
                paddingBottom: 20,
                // backgroundColor: 'red',
                // marginBottom: 100,
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {doctors.map(item => {
                  console.log(item);
                  return <DoctorCard item={item} />;
                })}
              </ScrollView>
            </View>
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
