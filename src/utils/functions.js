import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AppStrings} from './AppStrings';

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
      console.log('response : ', response);
      if (!response.didCancel) {
        imgRes = response.assets[0];
      }
    });
  }
  return imgRes;
};

// OPEN GALLERY
export const openGallery = async () => {
  let imgRes = '';
  let isStoragePermitted = await requestExternalWritePermission();
  if (isStoragePermitted) {
    await launchImageLibrary(
      {
        selectionLimit: 2,
      },
      response => {
        console.log('response : ', response);
        // return res;
        if (!response.didCancel) {
          imgRes = response.assets[0];
        }
      },
    );
  }
  return imgRes;
};

// const requestCameraPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs camera permission',
//         },
//       );
//       // If CAMERA Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       return false;
//     }
//   } else return true;
// };

// const requestExternalWritePermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'External Storage Write Permission',
//           message: 'App needs write permission',
//         },
//       );
//       // If WRITE_EXTERNAL_STORAGE Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       alert('Write permission err', err);
//     }
//     return false;
//   } else return true;
// };

// const openCamera = async () => {
//   let isCameraPermitted = await requestCameraPermission();
//   let isStoragePermitted = await requestExternalWritePermission();
//   console.log(isCameraPermitted);
//   console.log(isStoragePermitted);
//   if (isCameraPermitted && isStoragePermitted) {
//     launchCamera({}, response => {
//       console.log('response : ', response);
//     });
//   }
// };

// const openGallery = async () => {
//   launchImageLibrary({}, res => {
//     console.log('response : ', res);
//   });
// };
