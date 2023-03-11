import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import CustomHeading from '../components/CustomHeading';
import {LabCard} from './LabScreen';
import {getLabs} from '../config/apiServices/ApiServices';
import colors from '../styles/colors';
import CustomButton from '../components/CustomButton';
import fonts from '../styles/fonts';
import ScreenNames from '../navigation/screenNames/ScreenNames';

const SelectLabCard = ({item, onPress, index, selectedIndex}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          ...styles.labCard,
          borderColor: index == selectedIndex ? colors.primary_color : null,
          borderWidth: selectedIndex == index ? 1 : null,
        }}>
        <Text style={fonts.h5}>{item.name}</Text>
        <Text>Includes {item.included_test} Tests</Text>
        <Image
          source={{uri: item.image}}
          resizeMode={'cover'}
          style={styles.img}
        />
        <Text style={fonts.h3}>{item.address}</Text>
        <Text style={fonts.h3}>{item.description}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          {/* <Text style={fonts.h6}>Rs.{discountedPrice.toFixed(0)} </Text> */}
          <Text style={{...fonts.h6, color: colors.primary_color}}>Book </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const LabListScreen = props => {
  let test = props.route.params.test;
  const [labs, setlabs] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [selectedLab, setselectedLab] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLabs().then(res => {
      const list = res.reverse();
      setlabs(list);
    });
    setloading(false);
    setisRefresh(false);
  };
  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={'Select Lab'} back {...props} />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          style={{marginVertical: 10}}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                getData();
              }}
            />
          }>
          <CustomHeading header1={'Labs'} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            // horizontal={true}
            data={labs}
            renderItem={({item, index}) => (
              <SelectLabCard
                item={item}
                index={index}
                selectedIndex={selectedIndex}
                onPress={() => {
                  setselectedIndex(index);
                  setselectedLab(item);
                }}
              />
            )}
          />
        </ScrollView>
      )}
      {test && (
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
            <Text style={fonts.h4}>{test.name} test selected</Text>
            <Text style={fonts.h4}>RS. {test.price}</Text>
          </View>
          {selectedLab && (
            <CustomButton
              title={'Schedule'}
              onPress={() => {
                props.navigation.navigate(ScreenNames.ScheduleScreen, {
                  test: test,
                  lab: selectedLab,
                });
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default LabListScreen;

const styles = StyleSheet.create({
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
  img: {margin: 10, height: 80, width: 80, alignSelf: 'center'},
});
