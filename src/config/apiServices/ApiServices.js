import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {AppStrings} from '../../utils/AppStrings';

//save User to local storage
export const saveUser = async data => {
  try {
    await AsyncStorage.setItem('TOKEN', JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

//GET TOKEN
export const getToken = async () => {
  const data = JSON.parse(await AsyncStorage.getItem('TOKEN'));
  console.log(data?.token);
  if (data?.token == null) {
    saveUser('logout');
    return 'logout';
  }
  return data.token;
};

export const getUserData = async () => {
  const data = JSON.parse(await AsyncStorage.getItem('TOKEN'));
  console.log(data);

  return data.user;
};

//Api Call
export const ApiCall = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
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
      body: data ? data : null,
    });
    // console.log('json parse : ', JSON.parse(await res.text()));
    // let response = await res.json();
    let responseText = await res.text();
    let response = JSON.parse(responseText);
    console.log('response:::', response);
    if (response.success) {
      // Alert.alert(AppStrings.appName, response.message);
      // response = response.data;
      // console.log('response:::', response.data);
      return response.data ? response.data : response.message;

      // if (response.errors == null) {
      //   return Alert.alert(AppStrings.appName, response.MESSAGE);
      // } else {
      //   return Alert.alert(
      //     AppStrings.appName,
      //     Object.values(response.DATA.errors)[0].toString(),
      //   );
      // }
    } else {
      // Alert.alert(AppStrings.appName, response.message);

      const errors = Object.values(response.data);
      console.log(errors);
      Alert.alert(AppStrings.appName, errors[0][0]);
    }

    return response;
  } catch (error) {
    console.log(error);
    Alert.alert(AppStrings.appName, error.toString());
  }
};

export const getProducts = async id => {
  const res = await ApiCall(id ? `/product/${id}` : '/product', 'GET');
  return res;
  // setproducts(res.length);
  // setloading(false);
  // setisRefresh(false);
};
export const getCategories = async () => {
  const res = await ApiCall('/category', 'GET');
  return res;
  // setcategories(res.length);
  // setloading(false);
  // setisRefresh(false);
};
export const getLabs = async () => {
  const res = await ApiCall('/lab', 'GET');
  return res;
  // setlabs(res.length);
  // setloading(false);
  // setisRefresh(false);
};
export const getTests = async () => {
  const res = await ApiCall('/report', 'GET');
  return res;
  // setcategories(res.length);
  // setloading(false);
  // setisRefresh(false);
};
export const getDoctors = async () => {
  const res = await ApiCall('/doctors', 'GET');
  return res;
  // setcategories(res.length);
  // setloading(false);
  // setisRefresh(false);
};
// export const getTests = async () => {
//   const res = await ApiCall('/report', 'GET');
//   return res;
//   // setcategories(res.length);
//   // setloading(false);
//   // setisRefresh(false);
// };

//USER REGISTER
export const userRegister = async (name, email, password, confirm_password) => {
  const res = await fetch(`${AppStrings.BASE_URL}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
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
      // 'Content-Type': 'application/json',
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
