import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import CustomSearchBar from '../../components/CustomSearchBar';
import SimpleBanner from '../../components/banner/SimpleBanner';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import {Images} from '../../assets/images';
import {size} from '../../styles/size';
import CustomHeading from '../../components/CustomHeading';
import {tests} from '../../assets/data/tests';
import {diseases} from '../../assets/data/diseases';
import {labs} from '../../assets/data/labs';

const TestCard = ({item, index}) => {
  const [isChecked, setisChecked] = useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setisChecked(!isChecked);
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
        {isChecked && (
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
  const discountedPrice =
    item.price - parseFloat(item.price) / parseFloat(item.discount);

  return (
    <View style={styles.labCard}>
      <Text style={fonts.h5}>{item.name}</Text>
      <Text>Includes {item.included_tests.length} Tests</Text>
      <Image
        source={Images.noImage}
        resizeMode={'cover'}
        style={{margin: 10, height: 80, width: 80, alignSelf: 'center'}}
      />
      <Text>{item.rate} rate</Text>
      <Text style={{...fonts.h3, color: colors.primary_color}}>
        {item.discount} % off
      </Text>
      <Text
        style={{
          ...fonts.h3,
          color: colors.darkgray,
          textDecorationLine: 'line-through',
        }}>
        Rs.{item.price}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <Text style={fonts.h6}>Rs.{discountedPrice.toFixed(0)} </Text>
        <Text style={{...fonts.h6, color: colors.primary_color}}>Book </Text>
      </View>
    </View>
  );
};

const LabScreen = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader search={true} title={'Laboratory'} />
      <CustomSearchBar placeholder={'Search Labs or Tests (CBC, WD3, ect.)'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Simple Banner */}
        <SimpleBanner />
        {/* Book Lab with Prescription */}
        <View style={styles.prescriptionContainer}>
          <View>
            <Image
              source={Images.noImage}
              style={{
                height: size.height / 10,
                width: size.height / 10,
                margin: 10,
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={fonts.h6}>Order quickly with a prescription</Text>
            <Text style={fonts.h3}>
              Just upload the prescription and tell us what you need. We do the
              rest !
            </Text>
            <View style={styles.btn}>
              <Text
                style={{...fonts.h6, margin: 10, color: colors.primary_color}}>
                Upload
              </Text>
            </View>
            {/* <TouchableWithoutFeedback>
              <View style={styles.btn}>
                <Text
                  style={{
                    ...fonts.h5,
                    color: colors.white,
                  }}>
                  Upload
                </Text>
              </View>
            </TouchableWithoutFeedback> */}
          </View>
        </View>
        {/* Popular Tests */}
        <View style={{marginVertical: 10}}>
          <CustomHeading header1={'Popular Tests'} />
          <FlatList
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderColor: colors.darkgray,
              borderWidth: 0.5,
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
              <TestCard item={item} index={index} />
            )}
          />
        </View>
        {/* Health Checkup Categories */}
        <View style={{marginVertical: 10}}>
          <CustomHeading header1={'Health Checkup Categories'} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={diseases}
            renderItem={({item}) => <DiseasesCard item={item} />}
          />
        </View>
        {/* Horizontal Labs */}
        <View style={{marginVertical: 10}}>
          <CustomHeading header1={'Popular Labs'} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={labs}
            renderItem={({item}) => <LabCard item={item} />}
          />
        </View>
        <Text>LabScreen</Text>
      </ScrollView>
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
    backgroundColor: colors.white,
    // height: 100,
    // width: 100,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});

export default LabScreen;
