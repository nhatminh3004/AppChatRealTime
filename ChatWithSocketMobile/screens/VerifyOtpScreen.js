
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions,Image,FlatList,Alert} from 'react-native'


import React, { useRef, useState } from 'react'
import Separator from '../ultis/Separator'
import {CountryCode} from '../ultis';
import { StaticImageService } from '../service'
import ApiCountryCode from '../ultis/ApiCountryCode/'
import  Ionicons  from '@expo/vector-icons/Ionicons'; 
import  MaterialIcons  from '@expo/vector-icons/MaterialIcons'; 
import { StatusBar } from 'expo-status-bar';
import {NativeModules} from 'react-native';
import FlagItem from '../components/FlagItem';
const {StatusBarManager} = NativeModules;
//mới
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import {firebaseConfig} from '../config';
import firebase from 'firebase/compat/app'
//

const heightCuaStatusBar = StatusBarManager.HEIGHT;
const {height,width} = Dimensions.get('window');

export default function VerifyOtpScreen({route: {params:{phoneNumber}},navigation}) {
  //mới
  
  const [verifycationID,setverifycationID] = useState(null);
 
  const recaptchaVerifiy = useRef(null);
  //
  const input_1= useRef();
  const input_2= useRef();
  const input_3= useRef();
  const input_4= useRef();
  const input_5= useRef();
  const input_6= useRef();
  const [OTP,setOTP]= useState({1:'',2:'',3:'',4:'',5:'',6:''});
 let code1;
 code1=OTP[1]+OTP[2]+OTP[3]+OTP[4]+OTP[5]+OTP[6];





//mới
const guiMaOtp = () =>{
  const phoneProvider =  new firebase.auth.PhoneAuthProvider();
  phoneProvider.verifyPhoneNumber(phoneNumber,recaptchaVerifiy.current).then(setverifycationID);
};
const xacThucOtp =() =>{
    
  const credital = firebase.auth.PhoneAuthProvider.credential(
    verifycationID,code1
  );
  firebase.auth().signInWithCredential(credital).then(() => {
    navigation.navigate("Signup",{phoneNumber});
  }).catch((error)=>{
    
    console.log(error.code);
    if(error.code ==='auth/invalid-verification-code' || error.code ==='auth/missing-verification-id'){
      alert('Sai Code');
      // navigation.goBack();
    }
    else{
      alert('vui lòng thử lại');
      // alert('Đăng nhập thành công');
      
 
    } 
    
  });
 
  // navigation.navigate("Signup");
}
 console.log(code1);



//
  return (
    
    <View style={styles.container} >
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifiy} firebaseConfig={firebaseConfig} />
      
      <StatusBar backgroundColor='#0091FF' style='light' translucent/>
      <Separator height={heightCuaStatusBar}/>
     
      <View style={styles.headerContainer}>
        <Ionicons name='chevron-back-outline' size={30} onPress={() => {navigation.goBack()}}/>
        <Text style={styles.headerTitle}>Xác thực đăng ký</Text>
      </View>
      <Separator height={50}/>
      <Text style={styles.title}>Xác thực số điện thoại của bạn <Text style={styles.phoneNumBerText}>{phoneNumber}</Text></Text>
      <Text style={styles.content}>Hãy nhấn vào nút gửi mã Otp ở phía dưới, chúng tôi đã gửi mã gồm 6 số đến số điện thoại của bạn  </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1} ref={input_1} onChangeText={text =>{setOTP({...OTP,1:text}); text && input_2.current.focus();}}/>
        </View>
        <View style={styles.otpBox}>
          <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}  ref={input_2}  onChangeText={text =>{setOTP({...OTP,2:text}); text ? input_3.current.focus(): input_1.current.focus()}}/>
        </View>
        <View style={styles.otpBox}>
          <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}  ref={input_3}  onChangeText={text =>{setOTP({...OTP,3:text}); text ? input_4.current.focus(): input_2.current.focus()}}/>
        </View>
        <View style={styles.otpBox}>
          <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}  ref={input_4}  onChangeText={text =>{setOTP({...OTP,4:text}); text ? input_5.current.focus(): input_3.current.focus()}}/>
        </View>
        <View style={styles.otpBox}>
          <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}  ref={input_5}  onChangeText={text =>{setOTP({...OTP,5:text}); text ? input_6.current.focus(): input_4.current.focus()}}/>
        </View>
        <View style={styles.otpBox}>
          <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}  ref={input_6}  onChangeText={text =>{setOTP({...OTP,6:text}); text ? input_6.current.focus(): input_5.current.focus()}}/>
        </View>
      </View>
      <Separator height={150}/>
      <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={xacThucOtp}>
         <Text style={styles.signInButtonText}>Xác thực Otp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={guiMaOtp}>
         <Text style={styles.signInButtonText}>Gửi mã OTP</Text>
      </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.banchuacoAccountText}>Bạn đã có tài khoản ?</Text>
          <Text style={styles.dangkyNgayText} onPress={()=>{navigation.replace("Signin")}}>Đăng nhập ngay</Text>
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
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:20,
    marginVertical:50,
   
   
   
  },
  
  fogotPasswordContainer:{
    
    height:(height/100)*5,
    marginHorizontal:20,
    // backgroundColor:'grey',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

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
  otpContainer:{
    marginHorizontal:20,
    marginBottom:20,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
  
    width:100,
    height:100,
  },
  otpBox:{
    borderRadius:10,
    borderColor:'red',
    borderWidth:3,
    marginLeft:10,

  },
  otpText:{
    fontSize:25,
    color:'black',
    padding:0,
    textAlign:"center",
    paddingHorizontal:18,
    paddingVertical:10,

  }
  
  
})
