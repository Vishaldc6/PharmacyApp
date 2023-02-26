import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import CustomHeader from '../components/CustomHeader';
import fonts from '../styles/fonts';
import {Images} from '../assets/images';
import CustomButton from '../components/CustomButton';
import {size} from '../styles/size';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppStrings} from '../utils/AppStrings';
import {openCamera, openGallery} from '../utils/functions';
import colors from '../styles/colors';

const ModelTile = ({icon, text, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.tile}>
        <Icon name={icon} size={20} />
        <Text style={styles.tileTxt}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const UploadPrescriptionScreen = props => {
  const [isModal, setisModal] = useState(false);
  const [img, setimg] = useState('');

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader back {...props} />
      <Text style={fonts.h1}>{AppStrings.uploadPrescription}</Text>
      <Text style={fonts.h2}>{AppStrings.andLetUs}</Text>

      {/* Upload Image & Button */}
      <View
        style={{
          backgroundColor: colors.white,
          // flex: 1,
          alignItems: 'center',
          padding: 20,
          marginVertical: 10,
          elevation: 5,
          borderRadius: 10,
        }}>
        {img ? (
          <Image
            source={{uri: img}}
            style={{height: 200, width: 200, resizeMode: 'contain'}}
          />
        ) : (
          <Image source={Images.noImage} />
        )}

        <View style={{height: 20}} />
        <View style={{flexDirection: 'row'}}>
          <CustomButton
            title={'Upload'}
            onPress={async () => {
              setisModal(true);
            }}
          />
        </View>
      </View>

      <View>
        <Text>{AppStrings.prescriptionInfo1}</Text>
        <Text>{AppStrings.prescriptionInfo2}</Text>
      </View>
      <Modal
        visible={isModal}
        onRequestClose={() => setisModal(false)}
        animationType={'slide'}
        transparent={true}>
        <TouchableWithoutFeedback onPress={() => setisModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.indicator} />
              <View style={{...styles.tile, justifyContent: 'space-between'}}>
                <Text style={{...fonts.h6, marginVertical: 10}}>
                  Select Option
                </Text>
                <Icon name="close" size={20} />
              </View>
              <View style={{height: 2, backgroundColor: colors.grey}} />
              <ModelTile
                icon={'camera'}
                text={'Open Camera'}
                onPress={async () => {
                  let res = await openCamera();
                  console.log('opne res', res);
                  setimg(res);
                  setisModal(false);
                }}
              />
              <ModelTile
                icon={'photo'}
                text={'Choose from Gallery'}
                onPress={async () => {
                  const res = await openGallery();
                  console.log(res);
                  setimg(res);
                  setisModal(false);
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modal: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    elevation: 20,
    position: 'absolute',
    bottom: 1,
  },
  indicator: {
    height: 5,
    width: 30,
    backgroundColor: colors.grey,
    borderRadius: 20,
    alignSelf: 'center',
    margin: 5,
  },
  tile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tileTxt: {...fonts.h5, margin: 10},
});

export default UploadPrescriptionScreen;
