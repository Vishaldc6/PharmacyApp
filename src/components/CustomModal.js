import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Modal} from 'react-native-paper';
import fonts from '../styles/fonts';
import {openCamera, openGallery} from '../utils/functions';

const CustomModal = props => {
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
            backgroundColor: 'white',
            padding: 10,
            elevation: 5,
          }}>
          <Text style={{...fonts.h6, marginVertical: 10}}>Select Option</Text>
          <Text
            onPress={() => {
              openCamera();
              //   setisModal(false);
            }}
            style={{...fonts.h5, margin: 5}}>
            Open Camera
          </Text>
          <Text
            onPress={() => {
              openGallery();
              //   setisModal(false);
            }}
            style={{...fonts.h5, margin: 5}}>
            Choose from Gallery
          </Text>
          <Text
            // onPress={() => setisModal(false)}
            style={{...fonts.h5, margin: 5}}>
            Cancel
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
