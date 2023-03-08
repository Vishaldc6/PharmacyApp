import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import ChooseImage from '../../components/admin/ChooseImage';
import CustomButton from '../../components/CustomButton';
import {openGallery} from '../../utils/functions';
import {ApiCall} from '../../config/apiServices/ApiServices';

const AdminFormScreen = props => {
  const title = props.route.params.title;

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

  //   const [imgName, setimgName] = useState('No image');
  //   const [imgPath, setimgPath] = useState('');

  const addTest = async () => {
    let body = new FormData();
    body.append('Content-type', 'multipart/form-data');
    body.append('name', name);
    body.append('price', price);

    const res = await ApiCall('/reportAdd', 'POST', body);
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

    const res = await ApiCall('/categoryAdd', 'POST', body);
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

    const res = await ApiCall('/labAdd', 'POST', body);
    console.log(res);
    if (res) {
      props.navigation.goBack();
    }
  };

  const addProduct = async () => {
    let body = new FormData();
    body.append('Content-type', 'multipart/form-data');
    body.append('images[]', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
    });
    body.append('thumbnail', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
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

    const res = await ApiCall('/productAdd', 'POST', body);
    console.log(res);
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
        <View style={{height: 15}} />
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
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
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
              <CustomInput
                isAdmin={true}
                style={{flex: 1}}
                onChangeText={val => {
                  setcategory_id(val);
                }}
                value={category_id}
                title={'Category id'}
                placeholder={'Enter category id'}
                keyboardType={'email-address'}
              />
              {/* <View style={{height: 15}} /> */}
              {props.route.params.expiry_date && (
                <>
                  <CustomInput
                    isAdmin={true}
                    style={{flex: 1}}
                    onChangeText={val => {
                      setexpiry_date(val);
                    }}
                    value={expiry_date}
                    title={'Expiry date'}
                    placeholder={'Enter date (yyyy/mm/dd)'}
                    keyboardType={'email-address'}
                  />
                  <View style={{height: 15}} />
                </>
              )}
            </View>
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
          </>
        )}
        {props.route.params.price && (
          <>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CustomInput
                isAdmin={true}
                style={{flex: 1}}
                onChangeText={val => {
                  setprice(val);
                }}
                value={price}
                title={'Price'}
                placeholder={'Enter price'}
                keyboardType={'email-address'}
              />
              {/* <View style={{height: 15}} /> */}
              {props.route.params.quantity && (
                <>
                  <CustomInput
                    isAdmin={true}
                    style={{flex: 1}}
                    onChangeText={val => {
                      setquantity(val);
                    }}
                    value={quantity}
                    title={'Quantity'}
                    placeholder={'Enter quantity'}
                    keyboardType={'email-address'}
                  />
                  {/* <View style={{height: 15}} /> */}
                </>
              )}
              {props.route.params.rate && (
                <>
                  <CustomInput
                    isAdmin={true}
                    style={{flex: 1}}
                    onChangeText={val => {
                      setrate(val);
                    }}
                    value={rate}
                    title={'Rate'}
                    placeholder={'Enter rate'}
                    keyboardType={'email-address'}
                  />
                  <View style={{height: 15}} />
                </>
              )}
            </View>
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
          </>
        )}

        {props.route.params.thumbnail && (
          <>
            <ChooseImage
              title={'Thumbnail'}
              imgName={thumb.fileName}
              imgPath={thumb.uri}
              onPress={async () => {
                const res = await openGallery();
                console.log(res);
                //   setimgName(res.fileName);
                //   setimgPath(res.uri);
                setthumb(res);
              }}
            />
            <View style={{height: 15}} />
          </>
        )}
        {props.route.params.img && (
          <>
            <ChooseImage
              title={'Image'}
              imgName={img.fileName}
              imgPath={img.uri}
              onPress={async () => {
                const res = await openGallery();
                console.log(res);
                //   setimgName(res.fileName);
                //   setimgPath(res.uri);
                setimg(res);
              }}
            />
            <View style={{height: 15}} />
          </>
        )}
        <View style={{flexDirection: 'row'}}>
          <CustomButton
            isAdmin={true}
            title={'Add'}
            onPress={() => {
              if (title == 'Category') {
                addCategory();
              } else if (title == 'Laboratory') {
                addLaboratory();
              } else if (title == 'Product') {
                addProduct();
              } else if (title == 'Test') {
                addTest();
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminFormScreen;
