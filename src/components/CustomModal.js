import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Modal} from 'react-native-paper';
import fonts from '../styles/fonts';
import {openCamera, openGallery} from '../utils/functions';
import colors from '../styles/colors';
import {useAppSelector} from '../redux/store/Store';

const CustomModal = props => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  //   const [isModal, setisModal] = useState(false);
  return (
    <Modal
      visible={props.visibility}
      animationType={'slide'}
      transparent={true}>
      <View
        style={{
          //   flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '75%',
            backgroundColor: colors.white,
            padding: 10,
            elevation: 5,
          }}>
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '700',
              color: colors.black,
              marginVertical: 10,
            }}>
            Select Option
          </Text>
          <Text
            onPress={() => {
              openCamera();
              //   setisModal(false);
            }}
            style={{
              fontSize: FONT_SIZE12,
              fontWeight: '500',
              color: colors.black,
              margin: 5,
            }}>
            Open Camera
          </Text>
          <Text
            onPress={() => {
              openGallery();
              //   setisModal(false);
            }}
            style={{
              fontSize: FONT_SIZE12,
              fontWeight: '500',
              color: colors.black,
              margin: 5,
            }}>
            Choose from Gallery
          </Text>
          <Text
            // onPress={() => setisModal(false)}
            style={{
              fontSize: FONT_SIZE12,
              fontWeight: '500',
              color: colors.black,
              margin: 5,
            }}>
            Cancel
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
