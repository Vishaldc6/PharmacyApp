import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenNames from './screenNames/ScreenNames';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import WellcomeScreen from '../screens/auth/WellcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.OnboardingScreen}
        component={OnboardingScreen}
      />
      <Stack.Screen
        name={ScreenNames.WellcomeScreen}
        component={WellcomeScreen}
      />
      <Stack.Screen name={ScreenNames.SignInScreen} component={SignInScreen} />
      <Stack.Screen name={ScreenNames.SignUpScreen} component={SignUpScreen} />
      <Stack.Screen
        name={ScreenNames.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
