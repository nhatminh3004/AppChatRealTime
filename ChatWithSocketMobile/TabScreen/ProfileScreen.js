import React, { useState } from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button,Image,Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  updateImageMobile
} from "../ultis/ApiRoute";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import axios from "axios";
import Separator from '../ultis/Separator'
import {NativeModules} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

const {StatusBarManager} = NativeModules;
const heightCuaStatusBar = StatusBarManager.HEIGHT;

const { height, width } = Dimensions.get("window");
function ProfileScreen({navigation}) {
  const [username,setUsername]= useState('');
  const [phone,setPhone]= useState('');
  const [email,setEmail]= useState('');
  const [id,setID]=useState('');
  const [avatarImage,setavatImage]= useState('');
  const [gender,setGender]= useState(undefined);
 
  const getItemFromStorage = async () => {
    try {
         await AsyncStorage.getItem('User', (error, result) => {
           if (result) {
            setID(JSON.parse(result)._id)
            setUsername(JSON.parse(result).username)
            setEmail(JSON.parse(result).email)
            setPhone(JSON.parse(result).phone)
            setavatImage(JSON.parse(result).avatarImage)
            setGender(JSON.parse(result).gender)
           }else{
             console.log(JSON.stringfy(error));
           }
         });
       } catch (error) {
         console.log(error);
       }
  };
  getItemFromStorage();
 
 
  return (
    
    <View style={styles.container}>
       <Separator height={heightCuaStatusBar}/>
      <View style={styles.mainbody}>
        {avatarImage == '' ? <View style={styles.imgprofileText}>
          <Text style={{textAlign:'center',fontSize:12}}>Upload  image</Text>
        </View> 
        
         :(
            <Image style={styles.imgprofile} source={{ uri: avatarImage }} />
        )}
       
        <Text style={styles.username}>
        {username}
        </Text>
        <View style={styles.itemProfile}>
        <MaterialIcons name="email" size={24} color="black" />
        <Text style={styles.lableItem}>Email</Text>
        <Text style={styles.sublableItem}>{email}</Text>
        </View>
        <View style={styles.itemProfile}>
        <FontAwesome name="phone" size={24} color="black" />
        <Text style={styles.lableItem}>Phone</Text>
        <Text style={styles.sublableItem}>{phone}</Text>

        </View>
        <View style={styles.itemProfile}>
        <FontAwesome name="transgender" size={24} color="black" />
        <Text style={styles.lableItem}>Giới tính</Text>
        <Text style={styles.sublableItem}>{!gender ? 'Nữ' : 'Nam'}</Text>

        </View>
        <Separator height={15}/>
      
      <TouchableOpacity style={styles.signInButtonImage} onPress={()=>{navigation.replace('UpdateInfo')}}>
      <Text style={styles.signInButtonText}>Cập nhật thông tin</Text>
      </TouchableOpacity>  
      <Separator height={10}/>
      <TouchableOpacity style={styles.signInButtonOut} onPress={() => {navigation.replace("Signin");  AsyncStorage.clear().then(() => console.log('Cleared'))}}>
      <Text style={styles.signInButtonText}>Đăng xuất</Text>
      </TouchableOpacity> 
        
        

      </View>

     
  
</View>
  ) 
}

export default ProfileScreen
const styles = StyleSheet.create({
    container:{
      flex:1,
    //  justifyContent:'center',
     alignItems:'center',
      backgroundColor:'#fff'
    },
    mainbody:{
      marginTop:30,
      marginLeft:24,
      marginRight:24,
      marginBottom:70,
      // backgroundColor:'red'
    },
    imgprofile:{
        maxWidth:110,
        height:110,
        marginLeft:100,
        marginTop:50,
        // backgroundColor:'red',
       borderRadius:110/2,
      
    },
    username:{
      color:'black',
      fontSize:21,
      marginLeft:80,
      marginTop:12,
      // backgroundColor:'red',
      maxWidth:'60%'
      
    },
    itemProfile:{
      marginTop:60
    },
    imgItem:{

    },
    lableItem:{
        marginTop:-45,
        marginLeft:60,
        fontSize:18,
        color:'black'
    },
    sublableItem:{
        marginTop:4,
        marginLeft:60,
        fontSize:16,
        color:'#50D9EA'
    },
    imgprofileText:{
      maxWidth:110,
      height:110,
      marginLeft:100,
      marginTop:50,
      backgroundColor:'#C0C0C0',
     borderRadius:110/2,
     borderStyle:'dashed',
     borderWidth:1,
     alignItems:'center',
     justifyContent:'center'
     
    },
    signInButtonOut:{
      backgroundColor:'#FF0000',
      borderRadius:8,
      marginHorizontal:20,
      height:(height/100)*6,
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
  
    },
    signInButtonImage:{
      backgroundColor:'#0184e0',
      borderRadius:8,
      marginHorizontal:20,
      height:(height/100)*6,
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
  
    },
   
    signInButtonText:{
      fontSize:20,
      lineHeight:20*1.4,
      color:'#ffff',
      fontWeight:'bold'
    },

  })