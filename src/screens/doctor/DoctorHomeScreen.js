import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import fonts from '../../styles/fonts';
import {Images} from '../../assets/images';
import colors from '../../styles/colors';
import ScreenNames from '../../navigation/screenNames/ScreenNames';
import {AppStrings} from '../../utils/AppStrings';
import {getToken, getUserData} from '../../config/apiServices/ApiServices';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import {useGlobaStyles} from '../../styles/GlobalStyles';

// const PatientCard = ({name, age, gender, date, onPress}) => (
//   <TouchableOpacity onPress={onPress}>
//     <View
//       style={{
//         // flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         // justifyContent: 'space-evenly',
//         borderWidth: 1,
//         borderRadius: 10,
//         borderColor: colors.lightgrey,
//         padding: 10,
//         margin: 5,
//         backgroundColor: colors.white,
//         elevation: 5,
//       }}>
//       {/* <View style={{width: 20}} /> */}
//       <View style={{flex: 1}}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}>
//           <Text style={{...fonts.h7}}>{name}</Text>
//           {/* <Text style={{...fonts.h5}}>{date}</Text> */}
//         </View>
//         <Text style={{...fonts.h4}}>
//           {age}, {gender}
//         </Text>
//         {/* <Text style={{...fonts.h5}}>Mr. Abc</Text> */}
//       </View>
//       <View>
//         <Image
//           source={Images.noImage}
//           style={{
//             height: size.height / 13,
//             width: size.height / 13,
//             borderRadius: 50,
//           }}
//         />
//       </View>
//     </View>
//   </TouchableOpacity>
// );

const ConsultationCard = ({item, onPress}) => {
  const GlobalStyles = useGlobaStyles();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          ...GlobalStyles.infoCard,
          backgroundColor: colors.primary_color_doc,
        }}>
        <Text style={{...fonts.h2, color: colors.white, alignSelf: 'flex-end'}}>
          {moment(item.created_at).utc().format('hh:mm A')}
        </Text>
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
        <Text style={{...fonts.h2, color: colors.white, alignSelf: 'flex-end'}}>
          Status :{' '}
          {item.order_acceptance_for_self == null
            ? 'Pending'
            : item.order_acceptance_for_self.status == '1'
            ? 'Accepted'
            : 'Rejected'}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const DoctorHomeScreen = props => {
  const GlobalStyles = useGlobaStyles();
  const [consultationList, setConsultationList] = useState([]);
  // const [isModal, setisModal] = useState(false);
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({});
  // const [ID, setID] = useState('');
  // const [note, setnote] = useState('');

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getData();
    });
    getData();
  }, []);

  const getData = async () => {
    const usr = await getUserData();
    setuser(usr);

    const token = await getToken();

    const res = await fetch(AppStrings.BASE_URL + '/patientConsultationList', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'GET',
      // body: body,
    });
    // const data = await res.json();
    console.log(res);
    let responseText = await res.text();
    let data = JSON.parse(responseText);
    console.log(data);
    if (data.flag) {
      setConsultationList(data.data.orders);
      setisRefresh(false);
      setloading(false);
    } else {
      Alert.alert(AppStrings.appName, 'Something went wrong.');
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Doctor Header */}
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate(ScreenNames.EditProfileScreen, {
            isAdmin: true,
          });
        }}>
        <View style={styles.header}>
          <Image
            source={user.image ? {uri: user.image_url} : Images.noImage}
            style={{
              height: widthPercentageToDP(25),
              width: widthPercentageToDP(25),
              borderRadius: 50,
            }}
          />
          <View style={{marginHorizontal: 10}}>
            <Text style={{...fonts.h1, color: colors.white}}>
              Hello, Dr. {user.name}
            </Text>
            {/* <Text style={fonts.h3}>MBBS</Text> */}
          </View>
        </View>
      </TouchableWithoutFeedback>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{...GlobalStyles.mainContainer, marginVertical: 10}}>
          <View style={GlobalStyles.infoCard}>
            <Text style={{...fonts.h1, margin: 5}}>Consultation List</Text>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={isRefresh}
                  onRefresh={() => {
                    getData();
                  }}
                />
              }
              data={consultationList}
              renderItem={({item}) => (
                <ConsultationCard
                  item={item}
                  onPress={async () => {
                    // console.log(item.shipping_mobile);
                    // Linking.openURL(`tel:+91${item.shipping_mobile}`);
                    props.navigation.navigate(ScreenNames.OrderDetailScreen, {
                      data: item,
                      isDoctor: true,
                    });
                  }}
                  // accept={() => acceptRejectConsultation(item.id, '1')}
                  // reject={() => acceptRejectConsultation(item.id, '0')}
                  // addNote={
                  //   () => {
                  //     setisModal(true);
                  //     setID(item.id);
                  //   }
                  //   // addConsultationNote(
                  //   //   item.id,
                  //   //   'Ea non pariatur sunt quis in elit nostrud occaecat.',
                  //   // )
                  // }
                />
                // <PatientCard
                //   name={item.name}
                //   age={item.age}
                //   gender={item.gender}
                //   date={item.date}
                //   onPress={() =>
                //     props.navigation.navigate(ScreenNames.PatientDetailScreen, {
                //       patient: item,
                //     })
                //   }
                // />
              )}
            />
          </View>
          {/* </View> */}

          {/* <ScrollView>
         
          {consultationList.map(
            item => (
              <ConsultationCard
                item={item}
                onPress={async () => {
                  const token = await getToken();
                  const res = await fetch(
                    AppStrings.BASE_URL + '/orderDetail/' + item.id,
                    {
                      headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + token,
                      },
                      method: 'GET',
                    },
                  );

                  const jsonRes = await res.json();
                  console.log('Screen res :', jsonRes);
                  // console.log(res);

                  if (jsonRes.flag) {
                    props.navigation.navigate(ScreenNames.OrderDetailScreen, {
                      data: jsonRes.data,
                    });
                  } else if (jsonRes.flag == false) {
                    if (jsonRes.data?.errors != null) {
                      Alert.alert(AppStrings.appName, jsonRes.data.errors[0]);
                    } else {
                      Alert.alert(AppStrings.appName, jsonRes.message);
                    }
                  }
                }}
                // accept={() => acceptRejectConsultation(item.id, '1')}
                // reject={() => acceptRejectConsultation(item.id, '0')}
                // addNote={
                //   () => {
                //     setisModal(true);
                //     setID(item.id);
                //   }
                //   // addConsultationNote(
                //   //   item.id,
                //   //   'Ea non pariatur sunt quis in elit nostrud occaecat.',
                //   // )
                // }
              />
            ),
            // console.log(item.id),
          )}
        </ScrollView> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2,
    // borderTopWidth: 0,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginVertical: 5,
    marginLeft: 10,
    // borderColor: colors.lightgrey,
    backgroundColor: colors.primary_color_doc,
    elevation: 5,
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
