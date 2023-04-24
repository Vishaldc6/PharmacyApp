import {View, Text, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import ChooseImage from '../../components/admin/ChooseImage';
import CustomButton from '../../components/CustomButton';
import {openGallery} from '../../utils/functions';
import {ApiCall} from '../../config/apiServices/ApiServices';
import {Dropdown} from 'react-native-element-dropdown';
import {doctorTypeList} from '../../assets/data/doctorTypeList';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import CheckBox from 'react-native-check-box';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useGlobaStyles} from '../../styles/GlobalStyles';

const AdminFormScreen = props => {
  const GlobalStyles = useGlobaStyles();
  const title = props.route.params.title;
  const ID = props.route.params.ID;
  // console.log('ID : ', ID);
  console.log('params : ', props.route.params);

  useEffect(() => {
    if (ID) {
      getDataFromID(ID);
    }
  }, []);

  const getDataFromID = async id => {
    let endPoint;
    if (title == 'Category') {
      endPoint = '/category';
    } else if (title == 'Laboratory') {
      endPoint = '/lab';
    } else if (title == 'Product') {
      endPoint = '/product';
    } else if (title == 'Test') {
      endPoint = '/report';
    }
    const res = await ApiCall(`${endPoint}/${id}`, 'GET');
    console.log('GET info : ', res);
    if (title == 'Category') {
      setname(res.name);
      setimg(res.image);
    } else if (title == 'Laboratory') {
      setname(res.name);
      setaddress(res.address);
      setincluded_test(res.included_test);
      setdesc(res.description);
      setimg(res.image);
    } else if (title == 'Product') {
      setname(res.name);
      setbenefits(res.benefits);
      setbrand(res.brand);
      setcategory_id(res.category_id.toString());
      setexpiry_date(res.expiry_date);
      setdieses_types(res.dieses_types);
      setinformation(res.information);
      setingredients(res.ingredients);
      setprice(res.price.toString());
      setquantity(res.quantity.toString());
      setrate(res.rate.toString());
      setside_effects(res.side_effects);
      settax_percentage(res.tax_percentage.toString());
      setthumb(res.thumbnail);
      setimg(res.images[0].image);
      setis_required_doctor(res.is_required_doctor == '1' ? true : false);
      setis_required_report(res.is_required_report == '1' ? true : false);
      setdoctor_type(res.doctor_type);
    } else if (title == 'Test') {
      setname(res.name);
      setprice(res.price.toString());
    }
  };

  const [focus, setFocus] = useState(false);

  const [name, setname] = useState('');
  const [address, setaddress] = useState('');
  const [desc, setdesc] = useState('');
  const [included_test, setincluded_test] = useState('');
  const [benefits, setbenefits] = useState('');
  const [brand, setbrand] = useState('');
  const [category_id, setcategory_id] = useState('');
  const [dieses_types, setdieses_types] = useState('');
  const [expiry_date, setexpiry_date] = useState('');
  const [information, setinformation] = useState('');
  const [ingredients, setingredients] = useState('');
  const [price, setprice] = useState('');
  const [quantity, setquantity] = useState('');
  const [rate, setrate] = useState('');
  const [side_effects, setside_effects] = useState('');
  const [img, setimg] = useState('');
  const [thumb, setthumb] = useState('');
  const [tax_percentage, settax_percentage] = useState('');
  const [doctor_type, setdoctor_type] = useState('');
  const [doctor, setdoctor] = useState('');
  const [is_required_report, setis_required_report] = useState(false);
  const [is_required_doctor, setis_required_doctor] = useState(false);

  const [nameError, setnameError] = useState('');
  const [addressError, setaddressError] = useState('');
  const [descError, setdescError] = useState('');
  const [included_testError, setincluded_testError] = useState('');
  const [benefitsError, setbenefitsError] = useState('');
  const [brandError, setbrandError] = useState('');
  const [category_idError, setcategory_idError] = useState('');
  const [dieses_typesError, setdieses_typesError] = useState('');
  const [expiry_dateError, setexpiry_dateError] = useState('');
  const [informationError, setinformationError] = useState('');
  const [ingredientsError, setingredientsError] = useState('');
  const [priceError, setpriceError] = useState('');
  const [quantityError, setquantityError] = useState('');
  const [rateError, setrateError] = useState('');
  const [side_effectsError, setside_effectsError] = useState('');
  const [imgError, setimgError] = useState('');
  const [thumbError, setthumbError] = useState('');
  const [tax_percentageError, settax_percentageError] = useState('');
  const [doctor_typeError, setdoctor_typeError] = useState('');

  //   const [imgName, setimgName] = useState('No image');
  //   const [imgPath, setimgPath] = useState('');

  const addTest = async () => {
    console.log('first');
    let body = new FormData();
    body.append('Content-type', 'multipart/form-data');
    body.append('name', name);
    body.append('price', price);

    const res = await ApiCall(
      ID ? `/reportUpdate/${ID}` : '/reportAdd',
      'POST',
      body,
    );
    console.log(res);
    if (res) {
      props.navigation.goBack();
    }
  };

  const addCategory = async () => {
    let body = new FormData();
    body.append('Content-type', 'multipart/form-data');
    body.append('image', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
    });
    body.append('name', name);

    const res = await ApiCall(
      ID ? `/categoryUpdate/${ID}` : '/categoryAdd',
      'POST',
      body,
    );
    console.log(res);
    if (res) {
      props.navigation.goBack();
    }
  };

  const addLaboratory = async () => {
    let body = new FormData();
    body.append('Content-type', 'multipart/form-data');
    body.append('image', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
    });
    body.append('name', name);
    body.append('address', address);
    body.append('included_test', included_test);
    body.append('description', desc);

    const res = await ApiCall(
      ID ? `/labUpdate/${ID}` : '/labAdd',
      'POST',
      body,
    );
    console.log(res);
    if (res) {
      props.navigation.goBack();
    }
  };

  const addProduct = async () => {
    // console.log('inculude 192 : ', !thumb.includes('192.168'));
    let body = new FormData();
    body.append('Content-type', 'multipart/form-data');

    body.append('images[]', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
    });

    body.append('thumbnail', {
      uri: thumb.uri,
      name: thumb.fileName,
      type: thumb.type,
    });

    body.append('name', name);
    body.append('benefits', benefits);
    body.append('brand', brand);
    body.append('category_id', category_id);
    body.append('dieses_types', dieses_types);
    body.append('expiry_date', expiry_date);
    body.append('information', information);
    body.append('price', price);
    body.append('quantity', quantity);
    body.append('rate', rate);
    body.append('side_effects', side_effects);
    body.append('ingredients', ingredients);
    body.append('tax_percentage', tax_percentage);
    body.append('is_required_report', is_required_report ? 1 : 0);
    body.append('is_required_doctor', is_required_doctor ? 1 : 0);
    body.append('doctor_type', doctor_type);

    const res = await ApiCall(
      ID ? `/productUpdate/${ID}` : '/productAdd',
      'POST',
      body,
    );
    console.log('Screen res : ', res);
    if (res) {
      props.navigation.goBack();
    }
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader title={title} back {...props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomInput
          isAdmin={true}
          onChangeText={val => {
            setname(val);
          }}
          value={name}
          title={`${title} Name`}
          placeholder={`Enter ${title} name`}
          keyboardType={'email-address'}
        />
        <Text style={GlobalStyles.errorText}>{nameError}</Text>
        {/* <View style={{height: 15}} /> */}
        {props.route.params.add && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setaddress(val);
              }}
              value={address}
              title={'Address'}
              placeholder={'Enter Address'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{addressError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.desc && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setdesc(val);
              }}
              value={desc}
              title={'Description'}
              placeholder={'Enter Description'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{descError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.included_test && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setincluded_test(val);
              }}
              value={included_test}
              title={'Included Test'}
              placeholder={'Enter Included Test'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{included_testError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.benefits && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setbenefits(val);
              }}
              value={benefits}
              title={'Benefits'}
              placeholder={'Enter Benefits'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{benefitsError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.brand && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setbrand(val);
              }}
              value={brand}
              title={'Brand'}
              placeholder={'Enter Brand'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{brandError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.category_id && (
          <>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red',
                // justifyContent: 'space-evenly',
              }}>
              <View style={{flex: 1}}>
                <CustomInput
                  isAdmin={true}
                  style={{flex: 1}}
                  onChangeText={val => {
                    setcategory_id(val);
                  }}
                  value={category_id}
                  title={'Category id'}
                  placeholder={'Enter category id'}
                  keyboardType={'numeric'}
                />
                <Text style={GlobalStyles.errorText}>{category_idError}</Text>
              </View>
              {/* <View style={{height: 15}} /> */}
              {props.route.params.expiry_date && (
                <View style={{flex: 1}}>
                  <CustomInput
                    isAdmin={true}
                    style={{flex: 1}}
                    onChangeText={val => {
                      setexpiry_date(val);
                    }}
                    value={expiry_date}
                    title={'Expiry date'}
                    placeholder={'Enter date (yyyy-mm-dd)'}
                    keyboardType={'numeric'}
                  />
                  <Text style={GlobalStyles.errorText}>{expiry_dateError}</Text>
                  {/* <View style={{height: 15}} /> */}
                </View>
              )}
            </View>
            {/* <View style={{height: 15}} /> */}
          </>
        )}

        {props.route.params.dieses_types && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setdieses_types(val);
              }}
              value={dieses_types}
              title={'Dieses types'}
              placeholder={'Enter dieses types'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{dieses_typesError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}

        {props.route.params.information && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setinformation(val);
              }}
              value={information}
              title={'Information'}
              placeholder={'Enter information'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{informationError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.ingredients && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setingredients(val);
              }}
              value={ingredients}
              title={'Ingredients'}
              placeholder={'Enter ingredients'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{ingredientsError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.price && (
          <>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <CustomInput
                  isAdmin={true}
                  style={{flex: 1}}
                  onChangeText={val => {
                    setprice(val);
                  }}
                  value={price}
                  title={'Price'}
                  placeholder={'Enter price'}
                  keyboardType={'numeric'}
                />
                <Text style={GlobalStyles.errorText}>{priceError}</Text>
              </View>
              {/* <View style={{height: 15}} /> */}
              {props.route.params.quantity && (
                <View style={{flex: 1}}>
                  <CustomInput
                    isAdmin={true}
                    style={{flex: 1}}
                    onChangeText={val => {
                      setquantity(val);
                    }}
                    value={quantity > 0 ? quantity : '0'}
                    title={'Quantity'}
                    placeholder={'Enter quantity'}
                    keyboardType={'numeric'}
                  />
                  <Text style={GlobalStyles.errorText}>{quantityError}</Text>
                  {/* <View style={{height: 15}} /> */}
                </View>
              )}
              {props.route.params.rate && (
                <View style={{flex: 1}}>
                  <CustomInput
                    isAdmin={true}
                    style={{flex: 1}}
                    onChangeText={val => {
                      setrate(val);
                    }}
                    value={rate}
                    title={'Rate'}
                    placeholder={'Enter rate'}
                    keyboardType={'numeric'}
                  />
                  <Text style={GlobalStyles.errorText}>{rateError}</Text>
                  {/* <View style={{height: 15}} /> */}
                </View>
              )}
            </View>
            {/* <View style={{height: 15}} /> */}
          </>
        )}

        {props.route.params.tax_percentage && (
          <>
            <CustomInput
              isAdmin={true}
              style={{flex: 1}}
              onChangeText={val => {
                settax_percentage(val);
              }}
              value={tax_percentage}
              title={'Tax percentage'}
              placeholder={'Enter tax_percentage'}
              keyboardType={'numeric'}
            />
            <Text style={GlobalStyles.errorText}>{tax_percentageError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.side_effects && (
          <>
            <CustomInput
              isAdmin={true}
              onChangeText={val => {
                setside_effects(val);
              }}
              value={side_effects}
              title={'Side effects'}
              placeholder={'Enter Side effects'}
              keyboardType={'email-address'}
            />
            <Text style={GlobalStyles.errorText}>{side_effectsError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-evenly',
            margin: 10,
          }}>
          {props.route.params.is_required_doctor && (
            <CheckBox
              style={{flex: 1}}
              rightText="Doctor Requires"
              rightTextStyle={fonts.h3}
              isChecked={is_required_doctor}
              onClick={() => {
                setis_required_doctor(!is_required_doctor);
              }}
              // checkBoxColor={colors.primary_color}
              checkedCheckBoxColor={colors.primary_color_admin}
              uncheckedCheckBoxColor={colors.darkgray}
            />
          )}
          {props.route.params.is_required_report && (
            <CheckBox
              style={{flex: 1}}
              rightText="Report Requires"
              rightTextStyle={fonts.h3}
              isChecked={is_required_report}
              onClick={() => {
                setis_required_report(!is_required_report);
              }}
              // checkBoxColor={colors.primary_color}
              checkedCheckBoxColor={colors.primary_color_admin}
              uncheckedCheckBoxColor={colors.darkgray}
            />
          )}
        </View>

        {is_required_doctor && props.route.params.doctor_type && (
          <>
            <Text style={{...fonts.h3, marginLeft: 10}}>Doctor Type</Text>
            <Dropdown
              style={{
                margin: 10,
                borderBottomWidth: 1.5,
                borderBottomColor: focus
                  ? colors.primary_color_admin
                  : colors.darkgray,
              }}
              onFocus={() => {
                console.log('focus');
                setFocus(true);
              }}
              onBlur={() => {
                console.log('blur');
                setFocus(false);
              }}
              data={doctorTypeList}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Doctor Type"
              value={doctor}
              selectedTextStyle={fonts.h3}
              onChange={item => {
                setdoctor(item.value);
                // console.log('doctor_type : ', doctor_type);
                console.log(item.label);
                setdoctor_type(item.label);
              }}
            />
            <Text style={GlobalStyles.errorText}>{doctor_typeError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.thumbnail && (
          <>
            <ChooseImage
              title={'Thumbnail'}
              imgName={thumb?.fileName ? thumb.uri : thumb}
              imgPath={thumb?.uri ? thumb.uri : thumb}
              onPress={async () => {
                const res = await openGallery();
                console.log(res);
                //   setimgName(res.fileName);
                //   setimgPath(res.uri);
                setthumb(res);
              }}
            />
            <Text style={GlobalStyles.errorText}>{thumbError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        {props.route.params.img && (
          <>
            <ChooseImage
              title={'Image'}
              imgName={img?.fileName ? img.fileName : img}
              imgPath={img?.uri ? img.uri : img}
              onPress={async () => {
                const res = await openGallery();
                console.log(res);
                //   setimgName(res.fileName);
                //   setimgPath(res.uri);
                setimg(res);
              }}
            />
            <Text style={GlobalStyles.errorText}>{imgError}</Text>
            {/* <View style={{height: 15}} /> */}
          </>
        )}
        <View style={{height: widthPercentageToDP(8)}} />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 5,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <CustomButton
          isAdmin={true}
          title={ID ? 'Update' : 'Add'}
          onPress={() => {
            if (title == 'Category') {
              if (name == '') {
                setnameError('* Please enter Name');
              } else if (img == '') {
                setimgError('* Please choose Image');
              } else {
                addCategory();
                setnameError('');
                setimgError('');
              }
            } else if (title == 'Laboratory') {
              if (name == '') {
                setnameError('* Please enter Name');
              } else if (address == '') {
                setaddressError('* Please enter Address');
              } else if (desc == '') {
                setdescError('* Please enter Description');
              } else if (included_test == '') {
                setincluded_testError('* Please enter Included Test');
              } else if (img == '') {
                setimgError('* Please choose Image');
              } else {
                addLaboratory();
              }
            } else if (title == 'Product') {
              if (name == '') {
                setnameError('* Please enter Name');
              } else if (benefits == '') {
                setbenefitsError('* Please enter Benefits');
              } else if (brand == '') {
                setbrandError('* Please enter Brand');
              } else if (category_id == '') {
                setcategory_idError('* Please enter Category ID');
              } else if (expiry_date == '') {
                setexpiry_dateError('* Please enter Expiry Date');
              } else if (dieses_types == '') {
                setdieses_typesError('* Please enter Dieses Type');
              } else if (information == '') {
                setinformationError('* Please enter Information');
              } else if (ingredients == '') {
                setingredientsError('* Please enter Ingredients');
              } else if (price == '') {
                setpriceError('* Please enter Price');
              } else if (quantity == '') {
                setquantityError('* Please enter Quantity');
              } else if (rate == '') {
                setrateError('* Please enter Rate');
              } else if (tax_percentage == '') {
                settax_percentageError('* Please enter Tax Percentage');
              } else if (side_effects == '') {
                setside_effectsError('* Please enter Side Effects');
              } else if (thumb == '') {
                setthumbError('* Please choose Thumbnail');
              } else if (img == '') {
                setimgError('* Please choose Image');
              } else if (is_required_doctor) {
                if (doctor == '' || doctor_type == '') {
                  setdoctor_typeError('* Please choose Doctor Type');
                } else {
                  addProduct();
                }
              } else {
                addProduct();
              }
              // console.log(doctor_type);
            } else if (title == 'Test') {
              if (name == '') {
                setnameError('* Please enter Name');
              } else if (price == '') {
                setpriceError('* Please enter Price');
              } else {
                addTest();
              }
            }
          }}
        />
      </View>
    </View>
  );
};

export default AdminFormScreen;
