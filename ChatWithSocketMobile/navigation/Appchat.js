import { createStackNavigator } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Siginin from '../screens/Siginin';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import OnboardScreen from '../screens/OnboardScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreenLanHai from '../screens/SplashScreenLanHai';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import OtpTest from '../screens/OtpTest';
import Signupp from '../screens/Signupp';
import  Ionicons  from '@expo/vector-icons/Ionicons'; 
import OtpTestDoiMatKhau from '../screens/OtpTestDoiMatKhau';
import VerifyOtpDoiMatKhauScreen from '../screens/VerifyOtpDoiMatKhauScreen';
import ResetPassWordScreen from '../screens/ResetPassWordScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../TabScreen/ChatScreen';
import ProfileScreen from '../TabScreen/ProfileScreen';
import MessageScreen from '../TabScreen/MessageScreen';
import DanhBaScreen from '../TabScreen/DanhBaScreen';
import SettingScreen from '../TabScreen/SettingScreen';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import UploadImage from '../screens/UploadImage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Tin nhắn" component={MessageScreen} options={{tabBarIcon:({focused})=>{
        return (
          <FontAwesome5 name="facebook-messenger" size={24} color="#0091FF" />
        )
      },tabBarActiveTintColor:'red',tabBarInactiveTintColor:'black'}} />
      <Tab.Screen name="Cá nhân" component={ProfileScreen} options={{tabBarIcon:({focused})=>{
        return (
          <FontAwesome name="user-circle-o" size={24} color="#0091FF" />

        )
      },tabBarActiveTintColor:'red',tabBarInactiveTintColor:'black'}} />
      <Tab.Screen name="Danh bạ" component={DanhBaScreen} options={{tabBarIcon:({focused})=>{
        return (
          <AntDesign name="contacts" size={24} color="#0091FF" />
        )
      },tabBarActiveTintColor:'red',tabBarInactiveTintColor:'black'}} />
      <Tab.Screen name="Cài đặt" component={SettingScreen} options={{tabBarIcon:({focused})=>{
        return (
          <SimpleLineIcons name="settings" size={24} color="#0091FF" />

        )
      },tabBarActiveTintColor:'red',tabBarInactiveTintColor:'black'}} />
    </Tab.Navigator>
  );
}
function StackNavigator() {
  
  const [isKhoiDongAppLanDau,setKhoiDongAppLanDau]=useState(null);
  useEffect(()=>{
    AsyncStorage.getItem('KhoiDongAppLanDau').then(value =>{
      if(value==null) {
        AsyncStorage.setItem('KhoiDongAppLanDau','true');
        setKhoiDongAppLanDau(true);
      } else {
        setKhoiDongAppLanDau(false);
      }
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
  },[]);
  if(isKhoiDongAppLanDau===null){
    return null;
  }else if(isKhoiDongAppLanDau ===true){
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen}  />
      <Stack.Screen name="Onboard" component={OnboardScreen} />
     <Stack.Screen name="Home" component={HomeScreen} />
     <Stack.Screen name="Signin" component={Siginin}  />
     <Stack.Screen name="BottomScreen" component={BottomTabs}  />
     <Stack.Screen name="OtpTest" component={OtpTest}  />
     <Stack.Screen name="OtpTestDoiMatKhau" component={OtpTestDoiMatKhau}/>
     <Stack.Screen name="VerifyOtpDoiMatKhauScreen" component={VerifyOtpDoiMatKhauScreen}/>
     <Stack.Screen name="ResetPassWord" component={ResetPassWordScreen}/>
     <Stack.Screen name="OtpVerify" component={VerifyOtpScreen}  />
     <Stack.Screen name="Signup" component={Signupp}  />
     <Stack.Screen name="Message" component={MessageScreen}  />
     <Stack.Screen name="Chat" component={ChatScreen}  />
     <Stack.Screen name="UploadTest" component={UploadImage}  />
    
     
     
    
   </Stack.Navigator>
    )
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SplashScreenLanHai" component={SplashScreenLanHai}  />
     <Stack.Screen name="Home" component={HomeScreen}  />
     <Stack.Screen name="Signin" component={Siginin}  />
     <Stack.Screen name="BottomScreen" component={BottomTabs}  />
     <Stack.Screen name="OtpTest" component={OtpTest}  />
    <Stack.Screen name="OtpTestDoiMatKhau" component={OtpTestDoiMatKhau}/>
    <Stack.Screen name="VerifyOtpDoiMatKhauScreen" component={VerifyOtpDoiMatKhauScreen}/>
    <Stack.Screen name="ResetPassWord" component={ResetPassWordScreen}/>
     <Stack.Screen name="OtpVerify" component={VerifyOtpScreen}  />
     <Stack.Screen name="Signup" component={Signupp}  />
     <Stack.Screen name="Message" component={MessageScreen}  />
     <Stack.Screen name="Chat" component={ChatScreen}  />
     <Stack.Screen name="UploadTest" component={UploadImage}  />
    
     
   </Stack.Navigator>
    )
  }
  } 
 

const Mainnavigator = () => {
  return(
            <NavigationContainer>
                <StackNavigator>

                 </StackNavigator>
            </NavigationContainer>
  )
}
export default Mainnavigator;

