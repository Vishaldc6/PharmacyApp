import React, {useEffect, useState} from 'react';
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
import {ActivityIndicator, StatusBar, View} from 'react-native';
import UploadPrescriptionScreen from './src/screens/UploadPrescriptionScreen';
import {getToken} from './src/config/apiServices/ApiServices';
import AuthStack from './src/navigation/AuthStack';
import colors from './src/styles/colors';
import SplashScreen from 'react-native-splash-screen';
import ProfileScreen from './src/screens/tabs/ProfileScreen';
import AdminFormScreen from './src/screens/admin/AdminFormScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ConsultScreen from './src/screens/ConsultScreen';
import LabListScreen from './src/screens/LabListScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import CartScreen from './src/screens/CartScreen';
import TestPaymentScreen from './src/screens/payment/TestPaymentScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import LabTestBookScreen from './src/screens/LabTestBookScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, settoken] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
    checkUser();
  }, []);

  const checkUser = async () => {
    const TOKEN = await getToken();
    console.log('TOKEN : = ', TOKEN);
    settoken(TOKEN);
    // if(token!==null){

    // }
  };

  if (token == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color={colors.primary_color} />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={'grey'} />
      {/* <TestPaymentScreen /> */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={
            token == 'logout' ? ScreenNames.AuthStack : ScreenNames.Home
            // ScreenNames.Home
            // ScreenNames.AdminHomeScreen
            // ScreenNames.DoctorHomeScreen
          }>
          <Stack.Screen name={ScreenNames.AuthStack} component={AuthStack} />

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
          <Stack.Screen name={ScreenNames.CartScreen} component={CartScreen} />
          <Stack.Screen
            name={ScreenNames.ProductDetailScreen}
            component={ProductDetailScreen}
          />
          <Stack.Screen
            name={ScreenNames.SearchScreen}
            component={SearchScreen}
          />
          <Stack.Screen
            name={ScreenNames.ForgotPasswordScreen}
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name={ScreenNames.ProfileScreen}
            component={ProfileScreen}
          />
          <Stack.Screen
            name={ScreenNames.EditProfileScreen}
            component={EditProfileScreen}
          />
          <Stack.Screen
            name={ScreenNames.UploadPrescriptionScreen}
            component={UploadPrescriptionScreen}
          />
          <Stack.Screen
            name={ScreenNames.ConsultScreen}
            component={ConsultScreen}
          />
          <Stack.Screen
            name={ScreenNames.LabListScreen}
            component={LabListScreen}
          />
          <Stack.Screen
            name={ScreenNames.OrderDetailScreen}
            component={OrderDetailScreen}
          />
          <Stack.Screen
            name={ScreenNames.CheckoutScreen}
            component={CheckoutScreen}
          />
          <Stack.Screen
            name={ScreenNames.ScheduleScreen}
            component={ScheduleScreen}
          />
          <Stack.Screen name={ScreenNames.LabScreen} component={LabScreen} />
          <Stack.Screen
            name={ScreenNames.LabTestBookScreen}
            component={LabTestBookScreen}
          />
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
            name={ScreenNames.AdminFormScreen}
            component={AdminFormScreen}
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
