import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ScreenNames from './screenNames/ScreenNames';
import HomeScreen from '../screens/tabs/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import DoctorScreen from '../screens/tabs/DoctorScreen';
import LabScreen from '../screens/LabScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {size} from '../styles/size';
import CarePlanScreen from '../screens/tabs/CarePlanScreen';
// import CarePlanScreen from '../screens/tabs/CarePlanScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigationTab = () => {
  return (
    <Tab.Navigator
      barStyle={styles.barStyle}
      sceneAnimationType={'shifting'}
      shifting={true}
      screenOptions={{tabBarColor: colors.white}}
      // labeled={false}
      activeColor={colors.primary_color}
      initialRouteName={ScreenNames.HomeScreen}>
      <Tab.Screen
        name={ScreenNames.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Icon name="home" size={size.height / 35} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={ScreenNames.OrderScreen}
        component={CarePlanScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({focused, color}) => (
            <Fontisto
              name="shopping-bag"
              size={size.height / 35}
              color={color}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name={ScreenNames.DoctorScreen}
        component={DoctorScreen}
        options={{
          tabBarLabel: 'Doctors',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="doctor" size={size.height / 35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.CarePlanScreen}
        component={CarePlanScreen}
        options={{
          tabBarLabel: 'Care Plan',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="pulse" size={size.height / 35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="person" size={size.height / 35} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    // height: size.height / 11,
    borderWidth: 1,
    backgroundColor: colors.white,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderRadius: 10,
    borderColor: colors.primary_color,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
});

export default BottomNavigationTab;
