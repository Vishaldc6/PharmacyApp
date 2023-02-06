import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
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

const TestCard = ({item}) => (
  <View>
    <Text style={{...fonts.h2}}>{item.name}</Text>
    <Text style={{...fonts.h3}}>{item.details}</Text>
  </View>
);

const DiseasesCard = ({item}) => (
  <View style={styles.diseasesCard}>
    <Image
      source={Images.noImage}
      resizeMode={'cover'}
      style={{height: 50, width: 50}}
    />
    <Text>{item.name}</Text>
  </View>
);

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
            <View
              style={styles.btn}
              // style={{
              //   flex: 1,
              //   borderWidth: 1,
              //   borderRadius: 10,
              //   borderColor: colors.primary_color,
              //   justifyContent: 'center',
              //   alignItems: 'center',
              // }}
            >
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
            renderItem={({item}) => <TestCard item={item} />}
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
});

export default LabScreen;
