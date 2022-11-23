//phiên bản mới nhất
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions } from 'react-native'


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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {registerRoute} from '../ultis/ApiRoute';
const {StatusBarManager} = NativeModules;

const heightCuaStatusBar = StatusBarManager.HEIGHT;
const {height,width} = Dimensions.get('window');

export default function UpdateInfo({navigation}) {
 
  const [error,setError]=useState('');

  

  

  
  //Xử lý đăng ký backend
    const [userInfo,setUserInfo] = useState({
      username:'',
      phone:phoneNumber,
      email:'',
      password:'',
      confirmpasswordconfirm:'',
    });
    const {username,phone,email,password,confirmpasswordconfirm} = userInfo
  //
    const handleOnChangeText= (value,fieldName) =>{
      console.log(value,fieldName);
      setUserInfo({...userInfo,[fieldName]: value})
    }
    const isValidObject = (obj) =>{
      return Object.values(obj).every(value => value.trim())//convert to array
     }
     const isValidEmail = (value) =>{
      const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      return regx.test(value);
     }
     const updateError= (error,stateUpdate) =>{
          stateUpdate(error);
          setTimeout(() =>{
            stateUpdate('');
          },2500);
     }
   const isValidForm = () =>{
    //Kiểm tra tất cả các filed đã nhập hay chưa
      if(!isValidObject(userInfo)) return updateError('Tất cả nội dung phải điền đầy đủ ',setError);
      //Kiểm tra username từ 3 đến 20 ký tự
      if(!username.trim()|| username.length < 3|| username.length>20) return updateError('username phải từ 3 đến 20 ký tự ',setError);
      //kiểm tra email bằng regex
      if(!isValidEmail(email)) return updateError('Email không hợp lệ ',setError);
      //Kiểm tra password
      if(!password.trim() || password.length<3 || password.length>20) return updateError('Mật khẩu phải từ 3 đến 20 ký tự ',setError);
      //Kiểm tra ConfirmPassword
      if(password!=confirmpasswordconfirm) return updateError('Mật khẩu nhập lại không khớp',setError);
      return true;
   }
    
    const submitForm =  async () => {
      if(isValidForm()){
        console.log('Thong tin User : ',userInfo);
        const res = await axios.post(`${registerRoute}`, userInfo);
    console.log(res.data);
    const userJson = JSON.stringify(res.data.user);
    AsyncStorage.setItem("User",userJson);
    navigation.replace("BottomScreen")
      }
      
    }

    
  return (
    
    <View style={styles.container}>
      <StatusBar backgroundColor='#0091FF' style='light' translucent/>
      <Separator height={heightCuaStatusBar}/>
     
      <View style={styles.headerContainer}>
        <Ionicons name='chevron-back-outline' size={30} onPress={() =>{navigation.replace("Signin")}}/>
        <Text style={styles.headerTitle}>Đăng Ký</Text>
      </View>
      <Separator height={10}/>
      <Text style={styles.title}>Bằng việc đăng ký tài khoản cho số điện thoại<Text style={styles.phoneNumBerText}>{phoneNumber}</Text> của bạn</Text>
      <Text style={styles.content}>sẽ giúp bạn bảo mật an toàn hơn</Text>
      <Separator height={10}/>
      {/* Nếu error tồn tại thì xuất hiện lỗi ngược lại ko xuất hiện */}
      {error ? <View style={styles.thongbaoContainer}>
          <AntDesign name="notification" size={30} color="#A9A9A9" style={{marginRight:10}}/>
          <Text style={styles.thongBaoLoi}>{error}</Text>
        </View> : null}
      <Separator height={50}/>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather name='user' size={30} color='#A9A9A9' style={{marginRight:10}}/>
          <TextInput value={phoneNumber} autoCapitalize='none' placeholder='Số điện thoại' editable={false} placeholderTextColor='#A9A9A9' style={styles.inputText} />
        </View>
      </View>
      <Separator height={10}/>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather name='user' size={30} color='#A9A9A9' style={{marginRight:10}}/>
          <TextInput value={username} autoCapitalize='none' placeholder='Nhập tên đăng nhập' keyboardType='default' maxLength={30} placeholderTextColor='#A9A9A9' style={styles.inputText}  onChangeText={value => handleOnChangeText(value,'username')}/>
        </View>
      </View>
      
     
      <Separator height={15}/>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
        <MaterialCommunityIcons name="email" size={30} color="#A9A9A9" style={{marginRight:10}} />
          <TextInput value={email} autoCapitalize='none' placeholder='Nhập Email' keyboardType='email-address' maxLength={30} placeholderTextColor='#A9A9A9' style={styles.inputText}  onChangeText={value => handleOnChangeText(value,'email')}/>
        </View>
      </View>
      <Separator height={15}/>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
        <Feather  name='lock' size={30} color='#A9A9A9' style={{marginRight:10}}/>
          <TextInput value={password} placeholder='Nhập mật khẩu' placeholderTextColor='#A9A9A9' style={styles.inputText} secureTextEntry={isMatKhau}  onChangeText={value => handleOnChangeText(value,'password')}/>
         
          <Feather  name={trangThaiIconEye} size={30} color='#A9A9A9' style={{marginRight:10}} onPress={()=>{setMatKhau(!isMatKhau,setEye(!isEye))} 
        }/>
      
        </View>
      </View>
      <Separator height={15}/>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
        <Entypo name="ccw" size={30} color="#A9A9A9" style={{marginRight:10}} />
          <TextInput value={confirmpasswordconfirm} placeholder='Nhập lại mật khẩu' placeholderTextColor='#A9A9A9' style={styles.inputText} secureTextEntry={isMatKhau1}  onChangeText={value => handleOnChangeText(value,'confirmpasswordconfirm')}/>
         
          <Feather  name={trangThaiIconEye1} size={30} color='#A9A9A9' style={{marginRight:10}} onPress={()=>{setMatKhau1(!isMatKhau1,setEye1(!isEye1))} 
        }/>
      
        </View>
      </View>
     
     
      
        <Text></Text>
        <View style={styles.fogotPasswordContainer}>
        <View>
          {/* <Text>Nhớ đăng nhập</Text> */}
        </View> 
       
      </View>
    
      <TouchableOpacity style={styles.signInButton} onPress={() => submitForm()} >
         <Text style={styles.signInButtonText}>Đăng Ký</Text>
      </TouchableOpacity>
      
     
        <View style={styles.signUpContainer}>
          <Text style={styles.banchuacoAccountText}>Bạn đã có tài khoản ?</Text>
          <Text style={styles.dangkyNgayText} onPress={()=>{navigation.replace("Signin")}}>Trở về đăng nhập</Text>
        </View>
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

  }
  
})
