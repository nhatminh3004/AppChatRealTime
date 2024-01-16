import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Button,Image, Alert } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
// import configUploadImage from '../config';
// if(!firebase.app.length){
//   firebase.initializeApp(configUploadImage.FirebaseConfig);
// }
let uriFetch;
function UploadImage() {
    const [uriImage, seturiImage] = useState('');
//   const [fileName,setFileName]= useState('');
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   
    console.log("Result Pick Image:",result);
    uriFetch=result.uri;
    seturiImage(result.uri);
    // setFileName(result.uri);
   
    if (result.cancelled)  {
        Alert.alert("Bạn chưa chọn ảnh")
        seturiImage('');
        // setFileName('');
        uriFetch='';
    }
    
    else {
        seturiImage(result.uri);
        // setFileName(result.uri);
    console.log("Tên Image Fetch:", uriFetch);
      const response =await fetch(uriFetch);
      const blob =await response.blob();
      const nameFile=  uriFetch.substring(uriFetch.lastIndexOf('/')+1);
      console.log("name file :",nameFile);
      var ref =  firebase.storage().ref().child(nameFile).put(blob);
      const imageUrl = await (await ref).ref.getDownloadURL();
      console.log("Download URRL:",imageUrl);
      try {
        await ref
      } catch (e) {
        console.log(e);
      }
      Alert.alert("Upload Success");
      seturiImage('');
    //   setFileName('');
      uriFetch='';
    }
    
  };
//   const uploadImageToFireBase= async() =>{
    
//     const response =await fetch(uriImage);
//     const blob =await response.blob();
//     const nameFile= fileName.substring(fileName.lastIndexOf('/')+1);
//     var ref = firebase.storage().ref().child(nameFile).put(blob);
   
//     const imageUrl = await (await ref).ref.getDownloadURL();
//     console.log("Download URRL:",imageUrl);
//     try {
//       await ref
//     } catch (e) {
//       console.log(e);
//     }
//     Alert.alert("Upload Success");
//     seturiImage(null);
//   };
//   console.log("File Name:", fileName);

//   console.log("uriImage Sau khi Up:",uriImage);
//   console.log("uriFetch Sau Khi Up:",uriFetch);
//   console.log("fileName Sau Khi Up:",fileName);
 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {uriImage && <Image source={{ uri: uriImage }} style={{ width: 200, height: 200 }} />}
      
      {/* <Button title="Upload Image To Firebase" onPress={uploadImageToFireBase} /> */}
    </View>
  )
}

export default UploadImage
