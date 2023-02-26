import {PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// CAMERA PERMISSION
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  } else return true;
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};

// OPEN CAMERA
export const openCamera = async () => {
  let imgRes = '';
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  console.log(isCameraPermitted);
  console.log(isStoragePermitted);
  if (isCameraPermitted && isStoragePermitted) {
    await launchCamera({}, response => {
      console.log('response : ', response.assets[0].uri);
      imgRes = response.assets[0].uri;
    });
  }
  return imgRes;
};

// OPEN GALLERY
export const openGallery = async () => {
  let imgRes = '';
  await launchImageLibrary({}, response => {
    console.log('response : ', response);
    // return res;
    imgRes = response.assets[0].uri;
  });
  return imgRes;
};
