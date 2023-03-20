import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import fonts from '../../styles/fonts';
import {Images} from '../../assets/images';
import {size} from '../../styles/size';
import {patients} from '../../assets/data/patients';
import colors from '../../styles/colors';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {AppStrings} from '../../utils/AppStrings';
import {getToken} from '../../config/apiServices/ApiServices';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const PatientCard = ({name, age, gender, date, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.lightgrey,
        padding: 10,
        margin: 5,
        backgroundColor: colors.white,
        elevation: 5,
      }}>
      {/* <View style={{width: 20}} /> */}
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...fonts.h7}}>{name}</Text>
          {/* <Text style={{...fonts.h5}}>{date}</Text> */}
        </View>
        <Text style={{...fonts.h4}}>
          {age}, {gender}
        </Text>
        {/* <Text style={{...fonts.h5}}>Mr. Abc</Text> */}
      </View>
      <View>
        <Image
          source={Images.noImage}
          style={{
            height: size.height / 13,
            width: size.height / 13,
            borderRadius: 50,
          }}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const ConsultationCard = ({item, accept, reject, addNote}) => {
  return (
    <View style={styles.card}>
      <Text style={{...fonts.h1, color: colors.white}}>
        Order ID {item.order_number}
      </Text>
      {/* <Text>{item.billing_address}</Text> */}
      {/* <Text>{item.doctor_name}</Text> */}
      <Text style={{...fonts.h2, color: colors.white}}>
        {item.shipping_name}
      </Text>
      <Text style={{...fonts.h2, color: colors.white}}>
        Mob. {item.shipping_mobile}
      </Text>
      {/* <Text>{item.shipping_address}</Text> */}
      <View style={{flexDirection: 'row', marginVertical: 5}}>
        <CustomButton title={'Reject'} secondary={true} onPress={reject} />
        <CustomButton title={'Accept'} onPress={accept} />
      </View>
      <Text
        style={{
          ...fonts.h7,
          color: colors.white,
          marginVertical: 10,
          textAlign: 'right',
        }}
        onPress={addNote}>
        + Add Consultation Notes
      </Text>
    </View>
  );
};

const DoctorHomeScreen = props => {
  const [consultationList, setConsultationList] = useState([]);
  const [isModal, setisModal] = useState(false);
  const [ID, setID] = useState('');
  const [note, setnote] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await getToken();

    const res = await fetch(AppStrings.BASE_URL + '/patientConsultationList', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'GET',
      // body: body,
    });
    const data = await res.json();
    console.log(data);
    if (data.flag) {
      setConsultationList(data.data.orders);
    } else {
      Alert.alert(AppStrings.appName, 'Something went wrong.');
    }
  };

  const acceptRejectConsultation = async (order_id, status) => {
    // console.log(`order id : ${order_id}   status : ${status}`);
    const token = await getToken();

    const body = new FormData();
    body.append('order_id', order_id);
    body.append('status', status);
    const res = await fetch(AppStrings.BASE_URL + '/acceptRejectConsultation', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'POST',
      body: body,
    });
    const data = await res.json();
    console.log(data);
    if (data.flag) {
      Alert.alert(AppStrings.appName, data.message);
    } else {
      Alert.alert(AppStrings.appName, 'Something went wrong.');
    }
  };

  const addConsultationNote = async (order_id, note) => {
    const token = await getToken();

    const body = new FormData();
    body.append('order_id', order_id);
    body.append('consultation', note);
    const res = await fetch(AppStrings.BASE_URL + '/addConsultationNotes', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'POST',
      body: body,
    });
    const data = await res.json();
    console.log(data);
    if (data.flag) {
      Alert.alert(AppStrings.appName, data.message);
    } else {
      Alert.alert(AppStrings.appName, 'Something went wrong.');
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Doctor Header */}
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate(ScreenNames.ProfileScreen, {
            isAdmin: true,
          });
        }}>
        <View style={styles.header}>
          <Image
            source={Images.noImage}
            style={{
              height: size.height / 8,
              width: size.height / 8,
              borderRadius: 50,
            }}
          />
          <View style={{marginHorizontal: 10}}>
            <Text style={{...fonts.h1, color: colors.white}}>
              Hello, Doctor
            </Text>
            {/* <Text style={fonts.h3}>MBBS</Text> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{...GlobalStyles.mainContainer, marginVertical: 10}}>
        {/* Patients List */}
        {/* <View
          style={{
            elevation: 2,
            backgroundColor: colors.white,
            padding: 10,
            // marginVertical: 5,
          }}> */}
        {/* <FlatList
          // ItemSeparatorComponent={() => (
          //   <View
          //     style={{
          //       borderWidth: 0.5,
          //       borderColor: colors.darkgray,
          //       margin: 10,
          //     }}
          //   />
          // )}
          data={patients}
          renderItem={({item}) => (
            <PatientCard
              name={item.name}
              age={item.age}
              gender={item.gender}
              date={item.date}
              onPress={() =>
                props.navigation.navigate(ScreenNames.PatientDetailScreen, {
                  patient: item,
                })
              }
            />
          )}
        /> */}
        {/* </View> */}

        <ScrollView>
          <Text style={{...fonts.h1, margin: 5}}>Consultation List</Text>
          {consultationList.map(
            item => (
              <ConsultationCard
                item={item}
                accept={() => acceptRejectConsultation(item.id, '1')}
                reject={() => acceptRejectConsultation(item.id, '0')}
                addNote={
                  () => {
                    setisModal(true);
                    setID(item.id);
                  }
                  // addConsultationNote(
                  //   item.id,
                  //   'Ea non pariatur sunt quis in elit nostrud occaecat.',
                  // )
                }
              />
            ),
            // console.log(item.id),
          )}
        </ScrollView>
        <Modal visible={isModal} animationType={'slide'} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '75%',
                backgroundColor: 'white',
                padding: 15,
                elevation: 5,
                borderRadius: 20,
              }}>
              <Text style={{...fonts.h1, marginVertical: 10}}>
                Add Consultation Note
              </Text>

              <CustomInput
                onChangeText={val => {
                  setnote(val);
                }}
                value={note}
                title={'Consulatation Note'}
                placeholder={'Enter Note'}
                keyboardType={'email-address'}
                // iconName={'mobile-phone'}
              />
              <TouchableOpacity
                // style={{flex: 1}}
                onPress={async () => {
                  addConsultationNote(ID, note).then(() => setisModal(false));
                }}>
                {/* <View style={styles.btn}> */}
                <Text
                  style={{
                    ...fonts.h6,
                    margin: 10,
                    alignSelf: 'center',
                    color: colors.primary_color_doc,
                  }}>
                  Add note
                </Text>
                {/* </View> */}
              </TouchableOpacity>
              <Text
                onPress={() => setisModal(false)}
                style={{...fonts.h5, alignSelf: 'center', margin: 10}}>
                Cancel
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    // borderTopWidth: 0,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginVertical: 5,
    marginLeft: 10,
    borderColor: colors.lightgrey,
    backgroundColor: colors.primary_color_doc,
  },
  card: {
    margin: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.darkgray,
    borderRadius: 15,
    backgroundColor: colors.primary_color_doc,
  },
});

export default DoctorHomeScreen;
