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
import CustomHeader from '../../components/CustomHeader';
import Swiper from 'react-native-swiper';
import {Images} from '../../assets/images';
import {Banner} from './HomeScreen';
import {size} from '../../styles/size';
import {AppStrings} from '../../utils/AppStrings';
import fonts, {FONT_SIZE14, FONT_SIZE16} from '../../styles/fonts';
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
import {useGlobaStyles} from '../../styles/GlobalStyles';
import {useAppSelector} from '../../redux/store/Store';

export const SymptomTab = ({item, onPress}) => {
  const {colors} = useAppSelector(state => state.CommonSlice);
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
        <Text
          style={{
            fontSize: FONT_SIZE14,
            fontWeight: '400',
            color: colors.black,
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const DoctorScreen = props => {
  const styles = useStyles();
  const GlobalStyles = useGlobaStyles();
  const {colors} = useAppSelector(state => state.CommonSlice);

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
              dotStyle={{bottom: -40, backgroundColor: colors.grey}}
              activeDotStyle={{bottom: -40}}>
              <Banner image={Images.banners4} />
              <Banner image={Images.banners} />
              <Banner image={Images.banners5} />
            </Swiper>
          </View>
          {/* Consult Doctor */}
          <View style={{...GlobalStyles.infoCard, flex: 1}}>
            <Text
              style={{
                fontSize: FONT_SIZE16,
                fontWeight: '800',
                color: colors.black,
              }}>
              {AppStrings.onlineDoctor}
            </Text>
            <View
              style={{flexDirection: 'row'}}
              //  style={{
              //   ...GlobalStyles.rowContainer,
              //   // flex: 1,
              //   // backgroundColor: 'red',
              //   alignItems: 'baseline',
              //   marginVertical: 10,
              // }}
            >
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
          <Text
            style={{
              fontSize: FONT_SIZE16,
              fontWeight: '800',
              color: colors.black,
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            OR
          </Text>

          {/* Symptoms cards */}
          <View style={{...GlobalStyles.infoCard}}>
            <Text
              style={{
                fontSize: FONT_SIZE16,
                fontWeight: '800',
                color: colors.black,
              }}>
              {AppStrings.consultDoctor1Click}
            </Text>
            <Text
              style={{
                fontSize: FONT_SIZE14,
                fontWeight: '400',
                color: colors.black,
              }}>
              {AppStrings.selectSymptom}
            </Text>

            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {diseases.map(item => (
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
              {doctors && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {doctors.map(item => {
                    console.log(item);
                    return <DoctorCard item={item} />;
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    bannerContainer: {
      marginVertical: 5,
      height: size.height / 4.5,
      // backgroundColor: 'red',
      paddingVertical: 10,
    },
  });
};

export default DoctorScreen;
