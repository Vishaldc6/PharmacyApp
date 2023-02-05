import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import WellcomeScreen from './src/screens/auth/WellcomeScreen';
import BottomNavigationTab from './src/navigation/BottomNavigationTab';
import ScreenNames from './src/navigation/screenNames/ScreenNames';
import OnboardingScreen from './src/screens/auth/OnboardingScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import DoctorScreen from './src/screens/tabs/DoctorScreen';
import DoctorHomeScreen from './src/screens/doctor/DoctorHomeScreen';
import MedicineScreen from './src/screens/MedicineScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ProductScreen from './src/screens/ProductScreen';
import SearchScreen from './src/screens/SearchScreen';
import LabScreen from './src/screens/tabs/LabScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={ScreenNames.OnboardingScreen}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name={ScreenNames.WellcomeScreen}
          component={WellcomeScreen}
        />
        <Stack.Screen
          name={ScreenNames.SignInScreen}
          component={SignInScreen}
        />
        <Stack.Screen
          name={ScreenNames.SignUpScreen}
          component={SignUpScreen}
        />
        <Stack.Screen
          name={ScreenNames.ForgotPasswordScreen}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name={ScreenNames.Home} component={BottomNavigationTab} />
        <Stack.Screen
          name={ScreenNames.DoctorScreen}
          component={DoctorScreen}
        />

        <Stack.Screen
          name={ScreenNames.DoctorHomeScreen}
          component={DoctorHomeScreen}
        />
        <Stack.Screen
          name={ScreenNames.MedicineScreen}
          component={MedicineScreen}
        />
        <Stack.Screen
          name={ScreenNames.CategoryScreen}
          component={CategoryScreen}
        />
        <Stack.Screen
          name={ScreenNames.ProductScreen}
          component={ProductScreen}
        />
        <Stack.Screen
          name={ScreenNames.SearchScreen}
          component={SearchScreen}
        />
        <Stack.Screen name={ScreenNames.LabScreen} component={LabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
