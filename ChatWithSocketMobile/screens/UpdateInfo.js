//phiên bản mới nhất
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Alert,Image } from 'react-native'


import React, { useState } from 'react'
import Separator from '../ultis/Separator'

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import  Ionicons  from '@expo/vector-icons/Ionicons'; 
import  Feather  from '@expo/vector-icons/Feather'; 
import { StatusBar } from 'expo-status-bar';
import {NativeModules} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

import AsyncStorage from '@react-native-async-storage/async-storage'
import {registerRoute} from '../ultis/ApiRoute';
import { CheckBox } from '@rneui/themed';
const {StatusBarManager} = NativeModules;
import {
  updateImageMobile,
  updateUserInfo
} from "../ultis/ApiRoute";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import axios from "axios";

const heightCuaStatusBar = StatusBarManager.HEIGHT;
const {height,width} = Dimensions.get('window');
let currentGenderr;
let uriFetch;
export default function UpdateInfo({navigation}) {
  const [usernamee,setUsername]= useState('');
  const [currentGender,setCurrentGender]=useState(currentGenderr);
  const [id,setID]=useState('');
  const [male,setMale]=useState(false);
  const [female,setFemale]=useState(false);
  const [resultGender,setresultGender]=useState(currentGender);
  const [text,setText]=useState('');
  const [avatarImage,setavatImage]= useState('');
 
  const getItemFromStorage = async () => {
    try {
         await AsyncStorage.getItem('User', (error, result) => {
           if (result) {
            setID(JSON.parse(result)._id)
            setUsername(JSON.parse(result).username)
           
            setCurrentGender(JSON.parse(result).gender)
            setavatImage(JSON.parse(result).avatarImage)
            currentGenderr=(JSON.parse(result).gender);
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
    if(!text.trim()|| text.length < 3|| text.length>20){
      Alert.alert("Username phải từ 3 đến 20 ký tự")
      
    }
    else {
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
    
      const res = await axios.post(updateUserInfo, {
        id: id,
        username:text,
        gender:resultGender,
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
    Alert.alert("Cập nhật thành công");
    uriFetch='';
    navigation.replace('BottomScreen');
    }
    }
      
    
    
    

  };
  
  
  

  

  
 
 console.log("userNamee:",usernamee);
 console.log("userInput:",text);
 console.log("Gia tri Male :",male);
 console.log("Giá trị Female:",female);
 console.log("Giá trị resultGeder:",resultGender);
//  console.log("state :",currentGenderr);
 
    
    const submitForm =  async () => {
      
    
      // Alert.alert('Thong tin: '+text);
      
    }
    const genderMale  =() =>{
      setMale(true);
      setFemale(false);
      setresultGender(true)
    }
    const genderFemale  =() =>{
      setMale(false);
      setFemale(true);
      setresultGender(false)
    }

    
  return (
    
    <View style={styles.container}>
      <StatusBar backgroundColor='#0091FF' style='light' translucent/>
      <Separator height={heightCuaStatusBar}/>
     
      <View style={styles.headerContainer}>
        <Ionicons name='chevron-back-outline' size={30} onPress={() =>{navigation.replace("BottomScreen")}}/>
        <Text style={styles.headerTitle}>Cập nhật thông tin</Text>
      </View>
     
     
      <Separator height={10}/>
      <View style={styles.mainbody}>
      {avatarImage == '' ?  <Image style={styles.imgprofile} source={{ uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000" }} /> :(
            <Image style={styles.imgprofile} source={{ uri: avatarImage }} />
        )}
        
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather name='user' size={30} color='#A9A9A9' style={{marginRight:10}}/>
          <TextInput defaultValue={usernamee}  autoCapitalize='none'  keyboardType='default'  placeholderTextColor='#A9A9A9' style={styles.inputText}  onChangeText={text => setText(text)}/>
        </View>
      </View>
      <Separator height={15}/>
      <View style={styles.inputContainer}>
     <Text>Giới tính: {!resultGender ? 'Nữ' : 'Nam'}</Text>
      </View>
      <View style={styles.inputContainer}>
      <CheckBox style={{width:100,height:100}} title='Male' center checked={male} checkedIcon="dot-circle-o" uncheckedIcon="circle-o" onPress={genderMale}/>
      <CheckBox style={{width:100,height:100}} title='Female' center checked={female} checkedIcon="dot-circle-o" uncheckedIcon="circle-o" onPress={genderFemale} />
      </View>
     
     
      
     
     
     
      
        <Text></Text>
        <View style={styles.fogotPasswordContainer}>
        <View>
          {/* <Text>Nhớ đăng nhập</Text> */}
        </View> 
       
      </View>
    
      <TouchableOpacity style={styles.signInButton} onPress={handleUpdateImage} >
         <Text style={styles.signInButtonText}>Đổi ảnh và cập nhật thông tin</Text>
      </TouchableOpacity>
      
     
       
    </View>
    
  )
      }

 






const styles = StyleSheet.create({
  container:{
    flex:1,
   
    backgroundColor:'#fff'
  },
  headerContainer:{
    flexDirection:'row',
    backgroundColor:'#0091FF',
    paddingVertical: 10,
    paddingHorizontal:20,
  },
  headerTitle:{
    fontSize:20,
    fontWeight:'bold',
    lineHeight:20*1.4,
    width:(width/100)*80,
    textAlign:'center'
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    lineHeight:20*1.4,
    marginTop:50,
    marginBottom:10,
    marginHorizontal:20,
  },
  content:{
    fontSize:20, 
    marginTop:10,
    marginBottom:20,
    marginHorizontal:20,
  },
  inputContainer:{
  
    backgroundColor:'#E8E8E8',
    paddingHorizontal:20,
    marginHorizontal:20,
    borderRadius:8,
    borderWidth:0.5,
    borderColor:'#A9A9A9',
    justifyContent:'center'
   
   
  },
  inputSubContainer:{
    flexDirection:'row',
    alignItems:'center',
    // backgroundColor:'red',
  },
  thongbaoContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
    // backgroundColor:'red',
  },
  inputText:{
    fontSize:18,
    textAlignVertical:'center',
    padding:0,
    height:(height/100)*6,
    color:'black',
    flex:1,
  },
  fogotPasswordContainer:{
    
    height:(height/100)*5,
    marginHorizontal:20,
    // backgroundColor:'grey',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
  fogotPassWordText:{
    fontSize:20,
    lineHeight:20*1.4,
    color:'#FF3300',
    fontWeight:'bold'
  },
  signInButton:{
    backgroundColor:'#0184e0',
    borderRadius:8,
    marginHorizontal:20,
    height:(height/100)*6,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,

  },
  signInButtonDoiAnh:{
    backgroundColor:'#0184e0',
    borderRadius:8,
    marginHorizontal:20,
    height:(height/100)*5,
    justifyContent:'center',
    alignItems:'center',
    marginTop:1,

  },
  signInButtonText:{
    fontSize:20,
    lineHeight:20*1.4,
    color:'#ffff',
    fontWeight:'bold'
  },
  signUpContainer:{
    marginHorizontal:20,
    justifyContent:'center',
    paddingVertical:20,
    flexDirection:'row',
    alignItems:'center'
  },
  banchuacoAccountText:{
    fontSize:13,
    lineHeight:13*1.4,
    color:'black',
    
  },
  dangkyNgayText:{
    fontSize:13,
    lineHeight:13*1.4,
    color:'red',
    fontWeight:'bold',
    marginLeft:9
  },
  phoneNumBerText:{
    fontSize:18,
    fontWeight:'bold',
    lineHeight:18*1.4,
    color:'red',
  },
  thongBaoLoi:{
    color:'red',
    fontSize:18,
    textAlign:'center',

  },
  mainbody:{
    marginTop:30,
    marginLeft:24,
    marginRight:24,
    marginBottom:70
  },
  imgprofile:{
      width:200,
      height:200,
      marginLeft:100,
      marginTop:50,
      
     borderRadius:120
  },
  
})
