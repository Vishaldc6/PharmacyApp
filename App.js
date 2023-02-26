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
import LabScreen from './src/screens/LabScreen';
import AdminHomeScreen from './src/screens/admin/AdminHomeScreen';
import AdminLabScreen from './src/screens/admin/AdminLabScreen';
import AdminTestScreen from './src/screens/admin/AdminTestScreen';
import AdminProductScreen from './src/screens/admin/AdminProductScreen';
import PatientDetailScreen from './src/screens/doctor/PatientDetailScreen';
import AdminCategoryScreen from './src/screens/admin/AdminCategoryScreen';
import {StatusBar} from 'react-native';
import UploadPrescriptionScreen from './src/screens/UploadPrescriptionScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'grey'} />
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
          <Stack.Screen
            name={ScreenNames.Home}
            component={BottomNavigationTab}
          />
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
          <Stack.Screen
            name={ScreenNames.UploadPrescriptionScreen}
            component={UploadPrescriptionScreen}
          />
          <Stack.Screen name={ScreenNames.LabScreen} component={LabScreen} />
          <Stack.Screen
            name={ScreenNames.AdminHomeScreen}
            component={AdminHomeScreen}
          />
          <Stack.Screen
            name={ScreenNames.AdminLabScreen}
            component={AdminLabScreen}
          />
          <Stack.Screen
            name={ScreenNames.AdminTestScreen}
            component={AdminTestScreen}
          />
          <Stack.Screen
            name={ScreenNames.AdminProductScreen}
            component={AdminProductScreen}
          />
          <Stack.Screen
            name={ScreenNames.AdminCategoryScreen}
            component={AdminCategoryScreen}
          />
          <Stack.Screen
            name={ScreenNames.PatientDetailScreen}
            component={PatientDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
