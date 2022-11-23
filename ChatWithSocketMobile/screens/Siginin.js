
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions } from 'react-native'


import React, { useState } from 'react'
import Separator from '../ultis/Separator'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import  Ionicons  from '@expo/vector-icons/Ionicons'; 
import  Feather  from '@expo/vector-icons/Feather'; 
import { StatusBar } from 'expo-status-bar';
import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginRoute} from '../ultis/ApiRoute';
const {StatusBarManager} = NativeModules;

const heightCuaStatusBar = StatusBarManager.HEIGHT;
const {height,width} = Dimensions.get('window');


export default function Siginin({navigation}) {
  const [isMatKhau,setMatKhau]=useState(true);//true là mật khẩu ẩn
  const [isEye,setEye]=useState(true);//eye là mắt đóng và true là đóng
  const [error,setError]=useState('');
  const [userInfo,setUserInfo] = useState({
    phone:'',
    password:'',
  });
  const updateError= (error,stateUpdate) =>{
    stateUpdate(error);
    setTimeout(() =>{
      stateUpdate('');
    },2500);
}
  const {phone,password} = userInfo
  let trangThaiIconEye;
  const EyeFunction = (isEye) =>{
      if(isEye===true){
       
        trangThaiIconEye='eye-off'
      }
      else {
       
        trangThaiIconEye='eye'
      }
  }
  const handleOnChangeText= (value,fieldName) =>{
    console.log(value,fieldName);
    setUserInfo({...userInfo,[fieldName]: value})
  }
  const submitFormSignIn= async () =>{
    try {
      const res = await axios.post(`${loginRoute}`,{...userInfo});
      console.log(res.data);
      if(res.data.status===false){
        return updateError('Sai tài khoản hoặc mật khẩu ',setError);
      }
       const userJson = JSON.stringify(res.data.user);
       AsyncStorage.setItem("User",userJson);
      console.log(typeof userJson);
      navigation.navigate("BottomScreen")
    } catch (error) {
      console.log(error);
    }
  }
  
  // console.log('is Eye',isEye);
  // console.log('is Mat Khau',isMatKhau);
  EyeFunction(isEye);
  // console.log('A:',trangThaiIconEye);
  return (
    
    <View style={styles.container}>
      <StatusBar backgroundColor='#0091FF' style='light' translucent/>
      <Separator height={heightCuaStatusBar}/>
     
      <View style={styles.headerContainer}>
        <Ionicons name='chevron-back-outline' size={30} onPress={() =>{navigation.goBack()}}/>
        <Text style={styles.headerTitle}>Đăng nhập</Text>
      </View>
      <Separator height={50}/>
      <Text style={styles.title}>Chào mừng bạn</Text>
      <Text style={styles.content}>Nhập số điện thoại và mật khẩu, sau đó bạn có thể chat mọi lúc mọi nơi</Text>
      <Separator height={20}/>
       {/* Nếu error tồn tại thì xuất hiện lỗi ngược lại ko xuất hiện */}
       {error ? <View style={styles.thongbaoContainer}>
          <AntDesign name="notification" size={30} color="#A9A9A9" style={{marginRight:10}}/>
          <Text style={styles.thongBaoLoi}>{error}</Text>
        </View> : null}
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather name='user' size={30} color='#A9A9A9' style={{marginRight:10}}/>
          <TextInput value={phone} placeholder='Nhập số điện thoại' keyboardType='phone-pad' maxLength={15} placeholderTextColor='#A9A9A9' style={styles.inputText}  onChangeText={value => handleOnChangeText(value,'phone')}/>
        </View>
      </View>
      <Separator height={15}/>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
        <Feather  name='lock' size={30} color='#A9A9A9' style={{marginRight:10}}/>
          <TextInput value={password} placeholder='Nhập mật khẩu' placeholderTextColor='#A9A9A9' style={styles.inputText} secureTextEntry={isMatKhau} onChangeText={value => handleOnChangeText(value,'password')}/>
         
          <Feather  name={trangThaiIconEye} size={30} color='#A9A9A9' style={{marginRight:10}} onPress={()=>{setMatKhau(!isMatKhau,setEye(!isEye))} 
        }/>
      
        </View>
      </View>
        <Text></Text>
        <View style={styles.fogotPasswordContainer}>
        <View>
          {/* <Text>Nhớ đăng nhập</Text> */}
        </View> 
       
        <Text style={styles.fogotPassWordText} onPress={()=>{navigation.navigate("OtpTestDoiMatKhau")}}>Quên mật khẩu</Text>
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={submitFormSignIn}>
         <Text style={styles.signInButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.banchuacoAccountText}>Bạn không có tài khoản ?</Text>
          <Text style={styles.dangkyNgayText} onPress={()=>{navigation.navigate("OtpTest")}}>Đăng ký ngay tại đây</Text>
          {/* <Text style={styles.dangkyNgayText} onPress={()=>{navigation.replace("UploadTest")}}>Upload Ảnh Test</Text> */}
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
  thongBaoLoi:{
    color:'red',
    fontSize:18,
    textAlign:'center',

  },
  thongbaoContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
    // backgroundColor:'red',
  },
  
})
