
//của otp test cũ
import React,{useRef,useState} from 'react'


//

//mới
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions,Image,FlatList,Alert} from 'react-native'
import Separator from '../ultis/Separator'
import {CountryCode} from '../ultis';
import { StaticImageService } from '../service'
import ApiCountryCode from '../ultis/ApiCountryCode/'
import  Ionicons  from '@expo/vector-icons/Ionicons'; 
import  MaterialIcons  from '@expo/vector-icons/MaterialIcons'; 
import { StatusBar } from 'expo-status-bar';
import {NativeModules} from 'react-native';
import FlagItem from '../components/FlagItem';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import {checkPhoneTonTaiRoute} from '../ultis/ApiRoute';
const {StatusBarManager} = NativeModules;
const heightCuaStatusBar = StatusBarManager.HEIGHT;
const {height,width} = Dimensions.get('window');
//
function OtpTestDoiMatKhau({navigation}) { 
  const [phoneNumber,setPhoneNumber] = useState("");
  
  const getDropDownStyle =(y) => ({...styles.countryDropDownList,top: y+ 60})
  const [error,setError]=useState('');
  const updateError= (error,stateUpdate) =>{
    stateUpdate(error);
    setTimeout(() =>{
      stateUpdate('');
    },2500);
}

const [userPhone,setuserPhone] = useState({
  phone:'',
});
const handleOnChangeText= (value,fieldName) =>{
  console.log(value,fieldName);
  setuserPhone({...userPhone,[fieldName]: value})
}
const checkPhoneTonTai= async () =>{
  try {
    const res = await axios.post(`${checkPhoneTonTaiRoute}`,{...userPhone});
    // console.log("Request",{phoneNumber});
    console.log(res.data);
    if(res.data.status===true || phoneNumber.length<=11){
      return updateError('Số điện thoại Không tồn tại trong hệ thống ',setError);
    }
   navigation.navigate("VerifyOtpDoiMatKhauScreen",{phoneNumber})
  } catch (error) {
    console.log(error);
  }
}
 const [selectCountry,setSelectCountry]= useState(CountryCode.find(country => country.name === "Viet Nam"));
 const [inputContainerY,setinputContainerY]=useState(0);
 const [isDropDownOpen,setisDropDownOpen]=useState(false);
 const [isDropDownLayout,setisDropDownLayout] = useState({})
 
 const closeDropDown = (pageX,pageY) => {
  if(isDropDownOpen){
    if(pageX< isDropDownLayout?.x || pageX > isDropDownLayout?.x + isDropDownLayout?.width ||pageY<isDropDownLayout?.y || pageY>isDropDownLayout?.y + isDropDownLayout?.height){
      setisDropDownOpen(false);
    } 
  }
 }
    console.log(selectCountry);
    console.log(phoneNumber);
   
  return (
    
    <View style={styles.container} onStartShouldSetResponder={({nativeEvent: {pageX,pageY}}) => closeDropDown(pageX,pageY,)}>
       
      <StatusBar backgroundColor='#0091FF' style='light' translucent/>
      <Separator height={heightCuaStatusBar}/>
     
      <View style={styles.headerContainer}>
        <Ionicons name='chevron-back-outline' size={30} onPress={() =>{navigation.goBack()}}/>
        <Text style={styles.headerTitle}>Xác thực mã OTP đổi mật khẩu</Text>
      </View>
      <Separator height={50}/>
      <Text style={styles.title}>Chào mừng bạn</Text>
      <Text style={styles.content}>Nhập số điện thoại của bạn, sau đó chúng tôi sẽ gửi cho bạn mã xác thực gồm 6 số</Text>
      {/* Nếu error tồn tại thì xuất hiện lỗi ngược lại ko xuất hiện */}
      {error ? <View style={styles.thongbaoContainer}>
          <AntDesign name="notification" size={30} color="#A9A9A9" style={{marginRight:10}}/>
          <Text style={styles.thongBaoLoi}>{error}</Text>
        </View> : null}
      <View style={styles.inputContainer} onLayout={({nativeEvent: {layout:{y}}}) => setinputContainerY(y)}>
        <TouchableOpacity style={styles.listCountryContainer} onPress={() =>{setisDropDownOpen(!isDropDownOpen)}}>
            <Image source={{uri: StaticImageService.getFlagIcon("FLAT",64,selectCountry.code)}} style={styles.flagIcon}/>
            <Text>{selectCountry.dial_code}</Text>
            <MaterialIcons name='keyboard-arrow-down' size={18}/>
        </TouchableOpacity>
      <View style={styles.phoneInputContainer}>
        <TextInput placeholder="Nhập số điện thoại" placeholderTextColor="#E8E8E8" selectionColor="red" keyboardType='number-pad' style={styles.inputPhoneText} maxLength={10} onChangeText={(text) => {setPhoneNumber(selectCountry?.dial_code+text); handleOnChangeText(selectCountry?.dial_code+text,'phone')}} />
      </View>
      </View>
        {
            isDropDownOpen &&( <View style={getDropDownStyle(inputContainerY)} onLayout={({nativeEvent: {layout:{x,y,height,width},},}) => setisDropDownLayout({x,y,height,width})}>
              <FlatList
                data={CountryCode}
                keyExtractor={ item => item.code }
                renderItem={({item}) => (
                  <FlagItem
                  {...item}
                  onPress={country => {
                    setSelectCountry(country)
                    setisDropDownOpen(false)
                  }} 
                  />
                ) }
              />
            </View>)
        }
     
      
      <Separator height={100}/>
     
        
       
      <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={checkPhoneTonTai}>
         <Text style={styles.signInButtonText}>Xác thực mã Otp</Text>
      </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.banchuacoAccountText}>Bạn đã có tài khoản ?</Text>
          <Text style={styles.dangkyNgayText} onPress={()=>{navigation.replace("Signin")}}>Đăng nhập ngay</Text>
        </View>
    </View>
  )

}

export default OtpTestDoiMatKhau
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
  listCountryContainer:{
    backgroundColor:'#E8E8E8',
    width:(width/100)*22,
    marginRight:10,
    borderRadius:8,
    height:(height/100)*6,
    justifyContent:'space-evenly',
    alignItems:'center',
    borderWidth:2,
    borderColor:'#C1CDCD',
    flexDirection:'row'
  },
  phoneInputContainer:{
    backgroundColor:'#E8E8E8',
    paddingHorizontal:10,
    borderRadius:8,
    borderWidth:0.5,
    borderColor:'#C1CDCD',
    justifyContent:'center',
    flex:1,
    height:(height/100)*6,
  },
  flagIcon:{
    height:20,
    width:20,
  },
  inputPhoneText:{
    fontSize:18,
    textAlignVertical:'center',
    padding:0,
    height:(height/100)*6,
    color:'black'
  },
  countryDropDownList:{
    backgroundColor:'#E8E8E8',
    width:(width/100)*80,
    height:(height/100)*39,
    position:'absolute',
    marginLeft:20,
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'red',
    zIndex:3,
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


});