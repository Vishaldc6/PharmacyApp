import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../styles/colors';
import fonts, {FONT_SIZE12, FONT_SIZE14, FONT_SIZE16} from '../styles/fonts';
import CustomButton from '../components/CustomButton';
import {getToken} from '../config/apiServices/ApiServices';
import {AppStrings} from '../utils/AppStrings';
import CustomHeading from '../components/CustomHeading';
import CustomInput from '../components/CustomInput';
import moment from 'moment';
import {useGlobaStyles} from '../styles/GlobalStyles';
import {useAppSelector} from '../redux/store/Store';

const OrderDetailScreen = props => {
  const {colors} = useAppSelector(state => state.CommonSlice);
  const GlobalStyles = useGlobaStyles();
  console.log('props.route.params.data : ', props.route.params.data);
  const isDoctor = props.route.params.isDoctor;
  const order = props.route.params.data;
  console.log(isDoctor);

  const [note, setnote] = useState('');
  const [isModal, setisModal] = useState(false);

  // const notes = order.notes.reverse();

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
    // const data = await res.json();
    let responseText = await res.text();
    let data = JSON.parse(responseText);
    console.log(data);
    if (data.flag) {
      Alert.alert(AppStrings.appName, data.message);
      props.navigation.goBack();
    } else {
      Alert.alert(AppStrings.appName, 'Something went wrong.');
      props.navigation.goBack();
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
    // const data = await res.json();
    let responseText = await res.text();
    let data = JSON.parse(responseText);
    console.log(data);
    if (data.flag) {
      Alert.alert(AppStrings.appName, data.message);
      props.navigation.goBack();
    } else {
      Alert.alert(AppStrings.appName, 'Something went wrong.');
    }
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader
        back
        {...props}
        title={'Order ID ' + order.order_number}
        call={
          order.order_acceptance_for_self &&
          order.order_acceptance_for_self.status == '1' &&
          isDoctor
        }
        onCall={() => {
          console.log(order.shipping_mobile);
          Linking.openURL(`tel:+91${order.shipping_mobile}`);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: FONT_SIZE12,
            fontWeight: '400',
            color: colors.lightgrey,
          }}>
          Order place at :{' '}
          {moment(order.created_at).utc().format('hh:mm A DD/MM/yyyy')}
        </Text>

        <Text
          style={{
            fontSize: FONT_SIZE16,
            fontWeight: '800',
            color: colors.black,
          }}>
          Status :{' '}
          {isDoctor
            ? order.order_acceptance_for_self == null
              ? 'Pending'
              : order.order_acceptance_for_self.status == '1'
              ? 'Accepted'
              : 'Rejected'
            : order.order_acceptance_list.length == 0
            ? 'Pending'
            : order.order_acceptance_list[0].status == '1'
            ? 'Accepted'
            : 'Rejected'}
        </Text>

        <View style={GlobalStyles.infoCard}>
          <Text
            style={{
              fontSize: FONT_SIZE16,
              fontWeight: '800',
              color: colors.black,
            }}>
            Shipping Detail
          </Text>
          <View style={{height: 10}} />
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            Name : {order.shipping_name}
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            Mobile no. : {order.shipping_mobile}
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            Address : {order.shipping_address}
          </Text>
        </View>

        <View style={GlobalStyles.infoCard}>
          <Text
            style={{
              fontSize: FONT_SIZE16,
              fontWeight: '800',
              color: colors.black,
            }}>
            Billing Detail
          </Text>
          <View style={{height: 10}} />
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            Name : {order.billing_name}
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            Mobile no. : {order.billing_mobile}
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
            }}>
            Address : {order.billing_address}
          </Text>
        </View>

        <View style={GlobalStyles.infoCard}>
          <Text
            style={{
              fontSize: FONT_SIZE16,
              fontWeight: '800',
              color: colors.black,
            }}>
            Order Products
          </Text>
          <View style={{height: 10}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={order.order_products}
            renderItem={({item}) => (
              <View style={GlobalStyles.infoCard}>
                <View style={styles.productCard}>
                  <Image
                    source={{
                      uri:
                        'http://192.168.29.125:8000/products/thumbnail/' +
                        // 'http://192.168.43.119:8000/products/thumbnail/' +
                        item.thumbnail,
                    }}
                    style={{height: 120, width: 120}}
                  />
                  <Text
                    style={{
                      fontSize: FONT_SIZE14,
                      fontWeight: '500',
                      color: colors.black,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: FONT_SIZE12,
                      fontWeight: '400',
                      color: colors.black,
                      color: colors.darkgray,
                    }}>
                    {item.brand}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: FONT_SIZE14,
                        fontWeight: '700',
                        color: colors.black,
                      }}>
                      Rs.{item.price}{' '}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
          <Text
            style={{
              fontSize: FONT_SIZE14,
              fontWeight: '400',
              color: colors.black,
              alignSelf: 'flex-end',
            }}>
            Total Products : {order.order_products.length}
          </Text>
          <View>
            <CustomButton
              secondary
              title={'View Report'}
              onPress={async () => {
                Linking.canOpenURL(order.report_pdf_url).then(val => {
                  console.log(val);
                  if (val) {
                    Linking.openURL(order.report_pdf_url);
                  }
                });
              }}
            />
          </View>
        </View>

        <View style={GlobalStyles.infoCard}>
          <CustomHeading
            header1={'Consultation Notes'}
            header2={
              isDoctor &&
              order.order_acceptance_for_self &&
              order.order_acceptance_for_self.status == '1' &&
              '+ Add Note'
            }
            isDoctor={true}
            onPress={() => {
              setisModal(true);
            }}
          />
          <View style={{height: 10}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={order.notes.reverse()}
            renderItem={({item}) => (
              <View
                style={{
                  // ...styles.card,
                  ...GlobalStyles.infoCard,
                  width: wp(40),
                }}>
                <Text
                  numberOfLines={5}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: FONT_SIZE14,
                    fontWeight: '400',
                    color: colors.black,
                  }}>
                  {item.consultation}
                </Text>
              </View>
            )}
          />
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      <View
        style={{
          backgroundColor: colors.white,
          padding: wp(3),
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: 0.5,
          borderColor: colors.black,
        }}>
        {isDoctor ? (
          // order.order_acceptance_for_self == null ?
          <>
            <CustomButton
              title={
                order.order_acceptance_for_self &&
                order.order_acceptance_for_self.status == '0'
                  ? 'Rejected'
                  : 'Reject'
              }
              secondary={true}
              isDoctor={true}
              onPress={() => {
                acceptRejectConsultation(order.id, '0');
              }}
            />
            <CustomButton
              title={
                order.order_acceptance_for_self &&
                order.order_acceptance_for_self.status == '1'
                  ? 'Accepted'
                  : 'Accept'
              }
              isDoctor={true}
              onPress={() => {
                acceptRejectConsultation(order.id, '1');
              }}
            />
          </>
        ) : (
          <>
            <Text
              style={{
                fontSize: FONT_SIZE16,
                fontWeight: '800',
                color: colors.black,
                margin: 5,
              }}>
              Tax Amount : {order.tax_amount}
            </Text>
            <Text
              style={{
                fontSize: FONT_SIZE16,
                fontWeight: '800',
                color: colors.black,
                margin: 5,
              }}>
              Total : {order.grand_total}
            </Text>
          </>
        )}
      </View>

      {/* Modal */}
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
              backgroundColor: colors.white,
              padding: 15,
              elevation: 5,
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: FONT_SIZE16,
                fontWeight: '800',
                color: colors.black,
                marginVertical: 10,
              }}>
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
                addConsultationNote(order.id, note).then(() =>
                  setisModal(false),
                );
              }}>
              <Text
                style={{
                  fontSize: FONT_SIZE14,
                  fontWeight: '700',
                  color: colors.black,
                  margin: 10,
                  alignSelf: 'center',
                  color: colors.primary_color_doc,
                }}>
                Add note
              </Text>
            </TouchableOpacity>
            <Text
              onPress={() => setisModal(false)}
              style={{
                fontSize: FONT_SIZE12,
                fontWeight: '500',
                color: colors.black,
                alignSelf: 'center',
                margin: 10,
              }}>
              Cancel
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderDetailScreen;
