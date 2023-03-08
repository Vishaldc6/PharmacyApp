import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import CustomHeading from '../../components/CustomHeading';
import {size} from '../../styles/size';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Images} from '../../assets/images';
import {ApiCall} from '../../config/apiServices/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

const ListTile = ({icon, title, onPress}) => (
  <View
    style={{
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    }}>
    <View style={{flexDirection: 'row'}}>
      <Icon name={icon} size={size.height / 35} color={colors.primary_color} />
      <View style={{width: 20}} />
      <Text style={fonts.h4}>{title}</Text>
    </View>
    <Icon
      name={'chevron-right'}
      size={size.height / 35}
      color={colors.primary_color}
    />
  </View>
);

HeaderMaxHeight = size.height / 2;
HeaderMinHeight = size.height / 10;
ImageMaxHeight = size.height / 5;
ImageMinHeight = size.height / 12;
ImageTop = size.height / 8;
ImageLeft = size.width / 3.5;
ImageMinTop = 5;
ImageMinLeft = 5;

const ProfileScreen = props => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const heightHandller = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [HeaderMaxHeight, HeaderMinHeight],
    extrapolate: 'clamp',
  });

  const imageheightHandller = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [ImageMaxHeight, ImageMinHeight],
    extrapolate: 'clamp',
  });
  const imagetransformationTopHandller = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [ImageTop, ImageMinTop],
    extrapolate: 'clamp',
  });
  const imagetransformationLeftHandller = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [ImageLeft, ImageMinLeft],
    extrapolate: 'clamp',
  });
  const scaleImageHandler = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [1.5, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={GlobalStyles.mainContainer}>
      {/* <CustomHeader cart={true} /> */}

      <ReactNativeParallaxHeader
        // extraScrollHeight={300}
        scrollViewProps={{
          onScroll: () =>
            Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  },
                },
              ],
              {
                useNativeDriver: false,
              },
            ),
        }}
        headerMaxHeight={HeaderMaxHeight}
        headerMinHeight={HeaderMinHeight}
        title={
          <Image
            source={Images.noImage}
            // style={{borderRadius: 100}}
            style={{
              // top: imagetransformationTopHandller,
              // left: imagetransformationLeftHandller,
              borderRadius: 100,
              height: imageheightHandller,
              width: imageheightHandller,
              // margin: 10,
              // transform: [
              //   {
              //     scale: scaleImageHandler,
              //   },
              // ],
            }}
          />
        }
        renderContent={() => (
          <View>
            <ListTile icon={'shopping-cart'} title={'My Cart'} />
            <ListTile icon={'shopping-cart'} title={'My Doctors'} />
            <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
            <ListTile icon={'shopping-cart'} title={'My Cart'} />
            <ListTile icon={'shopping-cart'} title={'My Doctors'} />
            <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
            <ListTile icon={'shopping-cart'} title={'My Cart'} />
            <ListTile icon={'shopping-cart'} title={'My Doctors'} />
            <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
            <ListTile icon={'shopping-cart'} title={'My Cart'} />
            <ListTile icon={'shopping-cart'} title={'My Doctors'} />
            <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
            <ListTile icon={'shopping-cart'} title={'My Cart'} />
            <ListTile icon={'shopping-cart'} title={'My Doctors'} />
            <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
          </View>
        )}
      />

      {/* <Animated.View
        style={{
          // backgroundColor: 'red',
          height: heightHandller,
          // justifyContent: 'center',
        }}>
        <Text style={fonts.h1}>Back</Text>
        <Animated.Image
          source={Images.noImage}
          style={{
            top: imagetransformationTopHandller,
            left: imagetransformationLeftHandller,
            borderRadius: 100,
            height: imageheightHandller,
            width: imageheightHandller,
            // margin: 10,
            transform: [
              {
                scale: scaleImageHandler,
              },
            ],
          }}
        />

      </Animated.View> */}

      {/* <Animated.ScrollView
        style={{
          // flex: 1,
          width: '100%',
          // position: 'absolute',
          // bottom: 0,
          alignSelf: 'center',
          padding: 10,
          borderRadius: 20,
          backgroundColor: colors.white,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}>
        

        <Text
          style={{...fonts.h1, alignSelf: 'center', padding: 10}}
          onPress={async () => {
            // const res = await ApiCall('/logout', 'POST');
            // console.log('logout user ', res);
            // if (res.success) {
            await AsyncStorage.setItem('TOKEN', JSON.stringify('logout'));
            props.navigation.replace(ScreenNames.AuthStack);
            // }
          }}>
          Log Out
        </Text>
        <ListTile icon={'shopping-cart'} title={'My Cart'} />
        <ListTile icon={'shopping-cart'} title={'My Doctors'} />
        <ListTile icon={'shopping-cart'} title={'My Lab Tests'} />
        <ListTile icon={'shopping-cart'} title={'My Orders'} />
        <View style={{height: HeaderMaxHeight, backgroundColor: 'white'}} />
      </Animated.ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 5,
    width: 30,
    backgroundColor: colors.grey,
    borderRadius: 20,
    alignSelf: 'center',
    margin: 5,
  },
});

export default ProfileScreen;
