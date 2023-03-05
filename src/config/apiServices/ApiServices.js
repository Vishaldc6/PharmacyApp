import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {AppStrings} from '../../utils/AppStrings';

//save User to local storage
export const saveUser = async token => {
  try {
    await AsyncStorage.setItem('TOKEN', JSON.stringify(token));
  } catch (e) {
    console.log(e);
  }
};

//GET TOKEN
export const getToken = async () => {
  const token = JSON.parse(await AsyncStorage.getItem('TOKEN'));
  console.log(token);
  if (token == null) {
    saveUser('logout');
    return 'logout';
  }
  return token;
};

//Api Call
export const ApiCall = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const token = JSON.parse(await AsyncStorage.getItem('TOKEN'));
  if (token) {
    // headers.Authorization = `Bearer ${token}`;
    headers.Authorization = `${token}`;
  }

  try {
    const res = await fetch(AppStrings.BASE_URL + endpoint, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });
    let response = await res.json();
    console.log('response:::', response);
    if (!res.ok) {
      console.log(response);
      if (response.success) {
        Alert.alert(AppStrings.appName, response.message);
        return response.data;
      } else {
        return Alert.alert(AppStrings.appName, response.message);
      }
      // if (response.errors == null) {
      //   return Alert.alert(AppStrings.appName, response.MESSAGE);
      // } else {
      //   return Alert.alert(
      //     AppStrings.appName,
      //     Object.values(response.DATA.errors)[0].toString(),
      //   );
      // }
    }

    return response;
  } catch (error) {
    Alert.alert(AppStrings.appName, error.toString());
  }
};

//USER REGISTER
export const userRegister = async (name, email, password, confirm_password) => {
  const res = await fetch(`${AppStrings.BASE_URL}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      password_confirmation: confirm_password,
    }),
  });
  console.log(res.status);
  let response = await res.json();
  console.log('JSON res : ', response);
  switch (res.status) {
    case 200:
      console.log('JSON data : ', response.DATA);
      break;
    case 422:
      console.log('JSON data errors : ', response.DATA.errors);
      //   Alert.alert(AppStrings.appName, response.MESSAGE);
      response = response.DATA;
      break;
    case 500:
      console.log(response.MESSAGE);
      break;
    default:
      break;
  }
  //   const temp = {
  //     email: ['The email must be a valid email address.'],
  //     password: ['The password must be at least 6 characters.'],
  //   };
  //   console.log(Object.values(temp)[0]);
  return response;
};

//USER LOGIN
export const userLogin = async (email, password) => {
  const res = await fetch(`${AppStrings.BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  console.log(res.status);
  let response = await res.json();
  console.log('JSON res : ', response);
  switch (res.status) {
    case 200:
      console.log('JSON data : ', response.DATA);
      //   response = response;
      break;
    case 422:
      console.log('JSON data errors : ', response.DATA.errors);
      //   Alert.alert(AppStrings.appName, response.MESSAGE);
      response = response.DATA;
      break;
    case 500:
      console.log(response.MESSAGE);
      break;
    default:
      break;
  }
  return response;
};
