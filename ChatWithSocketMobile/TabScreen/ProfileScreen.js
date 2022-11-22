import React, { useState } from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button,Image,Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  updateImageMobile
} from "../ultis/ApiRoute";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import axios from "axios";
let uriFetch;
function ProfileScreen({navigation}) {
  const [username,setUsername]= useState('');
  const [phone,setPhone]= useState('');
  const [email,setEmail]= useState('');
  const [id,setID]=useState('');
  const [avatarImage,setavatImage]= useState('');
  const getItemFromStorage = async () => {
    try {
         await AsyncStorage.getItem('User', (error, result) => {
           if (result) {
            setID(JSON.parse(result)._id)
            setUsername(JSON.parse(result).username)
            setEmail(JSON.parse(result).email)
            setPhone(JSON.parse(result).phone)
            setavatImage(JSON.parse(result).avatarImage)
           }else{
             console.log(JSON.stringfy(error));
           }
         });
       } catch (error) {
         console.log(error);
       }
  };
  getItemFromStorage();
  const handleUpdateImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("Result Pick Image:",result.uri);
    uriFetch=result.uri;
    if (result.cancelled)  {
      Alert.alert("Bạn chưa chọn ảnh")
      uriFetch='';
  }
  else {
console.log("Tên Image Fetch:", uriFetch);
  const response =await fetch(uriFetch);
  const blob =await response.blob();
  const nameFile=  uriFetch.substring(uriFetch.lastIndexOf('/')+1);
  console.log("name file :",nameFile);
  var ref =  firebase.storage().ref().child(nameFile).put(blob);
  const imageUrl = await (await ref).ref.getDownloadURL();
  console.log("Download URRL:",imageUrl);
    let url=nameFile
    let part=url.split(".");
    let typeFile=part[part.length-1];
   let urlTypeFile=typeFile;
    // console.log("urlType File : ",urlTypeFile);
    // const objectFile ={
    //   fileName:nameFile,
    //   size:123,
    //   url:imageUrl+"."+urlTypeFile
    // }
    const res = await axios.post(updateImageMobile, {
      id: id,
      avatarImage: imageUrl+"."+urlTypeFile
     
    });
    await AsyncStorage.removeItem("User");
    const userJson =  JSON.stringify(res.data);
       await AsyncStorage.setItem("User",userJson);
       try {
        await AsyncStorage.getItem('User', (error, result) => {
          if (result) {
           setavatImage(JSON.parse(result).avatarImage)
          }else{
            console.log(JSON.stringfy(error));
          }
        });
      } catch (error) {
        console.log(error);
      }
   
  try {
    await ref
  } catch (e) {
    console.log(e);
  }
  Alert.alert("Upload Success");
  uriFetch='';
}
  };
 
  return (
    <View style={styles.container}>
      <Text>Ảnh</Text>
      {avatarImage && <Image source={{ uri: avatarImage }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity onPress={handleUpdateImage}>
        <Text style={{backgroundColor:'red',paddingHorizontal:30,borderRadius:20}}>Đổi ảnh đại diện</Text>
      </TouchableOpacity>
    <Text>Thông tin cá nhân</Text>
    <Text>Chào mừng {username}</Text>
    <Text>Email : {email}</Text>
    <Text>Số điện thoại : {phone}</Text>
  <TouchableOpacity onPress={() => {navigation.replace("Signin");  AsyncStorage.clear().then(() => console.log('Cleared'))}}>
      <Text>Đăng xuất</Text>
  </TouchableOpacity>
  
</View>
  ) 
}

export default ProfileScreen
const styles = StyleSheet.create({
    container:{
      flex:1,
     justifyContent:'center',
     alignItems:'center',
      backgroundColor:'#fff'
    }
  })