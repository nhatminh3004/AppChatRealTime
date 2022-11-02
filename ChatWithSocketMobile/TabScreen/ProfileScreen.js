import React, { useState } from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
function ProfileScreen({navigation}) {
  const [username,setUsername]= useState('');
  const [phone,setPhone]= useState('');
  const [email,setEmail]= useState('');
  const getItemFromStorage = async () => {
    try {
         await AsyncStorage.getItem('User', (error, result) => {
           if (result) {
            setUsername(JSON.parse(result).username)
            setEmail(JSON.parse(result).email)
            setPhone(JSON.parse(result).phone)
           }else{
             console.log(JSON.stringfy(error));
           }
         });
       } catch (error) {
         console.log(error);
       }
  }
  getItemFromStorage();
 
  return (
    <View style={styles.container}>
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