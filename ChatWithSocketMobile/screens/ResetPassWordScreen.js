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
import {doimatkhauRoute} from '../ultis/ApiRoute';
import AsyncStorage from '@react-native-async-storage/async-storage'
const {StatusBarManager} = NativeModules;

const heightCuaStatusBar = StatusBarManager.HEIGHT;
const {height,width} = Dimensions.get('window');

export default function ResetPassWordScreen({route: {params:{phoneNumber}},navigation}) {
  const [isMatKhau,setMatKhau]=useState(true);//true là mật khẩu ẩn
  const [isEye,setEye]=useState(true);//eye là mắt đóng và true là đóng
  console.log(phoneNumber);
 
  const [error,setError]=useState('');
  let trangThaiIconEye;
  
  const EyeFunction = (isEye) =>{
      if(isEye===true){
       
        trangThaiIconEye='eye-off'
      }
      else {
       
        trangThaiIconEye='eye'
      }
  }
  
  
  

  EyeFunction(isEye);

  //Xử lý đăng ký backend
    const [userInfo,setUserInfo] = useState({
      phone:phoneNumber,
      newpassword:'',
    });
    const {phone,newpassword} = userInfo
  //
    const handleOnChangeText= (value,fieldName) =>{
      console.log(value,fieldName);
      setUserInfo({...userInfo,[fieldName]: value})
    }
   
     const updateError= (error,stateUpdate) =>{
          stateUpdate(error);
          setTimeout(() =>{
            stateUpdate('');
          },2500);
     }
   const isValidForm = () =>{
    
      if(!newpassword.trim() || newpassword.length<3 || newpassword.length>20) return updateError('Mật khẩu mới phải từ 3 đến 20 ký tự ',setError);
     else {
      return true;
     }
      
   }
    
    const submitForm =   async () => {
      if(isValidForm()){
       
        const res = await axios.post(`${doimatkhauRoute}`, userInfo);
    console.log(res.data);
       
        navigation.replace("Signin");
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
      <Text style={styles.title}>Bằng việc cập nhật lại mật khẩu của bạn</Text>
      <Text style={styles.content}>sẽ giúp bạn tránh việc quên mật khẩu của mình</Text>
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
          <TextInput value={phone} autoCapitalize='none' placeholder='Số điện thoại' editable={false} placeholderTextColor='#A9A9A9' style={styles.inputText} />
        </View>
      </View>
      <Separator height={10}/>
     
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
        <Feather  name='lock' size={30} color='#A9A9A9' style={{marginRight:10}}/>
          <TextInput value={newpassword} placeholder='Nhập mật khẩu mới' placeholderTextColor='#A9A9A9' style={styles.inputText} secureTextEntry={isMatKhau}  onChangeText={value => handleOnChangeText(value,'newpassword')}/>
         
          <Feather  name={trangThaiIconEye} size={30} color='#A9A9A9' style={{marginRight:10}} onPress={()=>{setMatKhau(!isMatKhau,setEye(!isEye))} 
        }/>
        </View>
      </View>

    
      <TouchableOpacity style={styles.signInButton} onPress={() => submitForm()} >
         <Text style={styles.signInButtonText}>Đổi Mật Khẩu</Text>
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
