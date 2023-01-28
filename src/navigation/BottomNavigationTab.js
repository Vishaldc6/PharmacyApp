import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ScreenNames from './screenNames/ScreenNames';
import HomeScreen from '../screens/tabs/HomeScreen';
import OrderScreen from '../screens/tabs/OrderScreen';
import DoctorScreen from '../screens/tabs/DoctorScreen';
import LabScreen from '../screens/tabs/LabScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {size} from '../styles/size';
import SearchScreen from '../screens/SearchScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigationTab = () => {
  return (
    <Tab.Navigator
      barStyle={{
        height: size.height / 10,
        borderWidth: 0.2,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
      sceneAnimationType={'shifting'}
      shifting={true}
      // screenOptions={{tabBarColor: colors.grey}}
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
        component={OrderScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="shopping-bag" size={size.height / 35} color={color} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name={ScreenNames.DoctorScreen}
        component={DoctorScreen}
        options={{
          tabBarLabel: 'Doctors',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="doctor" size={size.height / 35} color={color} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name={ScreenNames.CartScreen}
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="opencart" size={size.height / 35} color={color} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name={ScreenNames.LabScreen}
        component={LabScreen}
        options={{
          tabBarLabel: 'Labs',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="laboratory" size={size.height / 35} color={color} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name={ScreenNames.SearchScreen}
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="search" size={size.height / 35} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={ScreenNames.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({focused, color}) => (
            <Fontisto name="person" size={size.height / 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigationTab;
