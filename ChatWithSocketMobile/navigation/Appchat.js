import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Siginin from '../screens/Siginin';

import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import OnboardScreen from '../screens/OnboardScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreenLanHai from '../screens/SplashScreenLanHai';
import OtpXacThucScreen from '../screens/OtpXacThucScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import OtpTest from '../screens/OtpTest';
import Signupp from '../screens/Signupp';
import ChatScreen from '../screens/ChatScreen';
const Stack = createStackNavigator();

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
     <Stack.Screen name="OtpTest" component={OtpTest}  />
     <Stack.Screen name="OtpVerify" component={VerifyOtpScreen}  />
     <Stack.Screen name="Signup" component={Signupp}  />
     <Stack.Screen name="Chat" component={ChatScreen}  />
     
     
    
   </Stack.Navigator>
    )
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SplashScreenLanHai" component={SplashScreenLanHai}  />
     <Stack.Screen name="Home" component={HomeScreen}  />
     <Stack.Screen name="Signin" component={Siginin}  />
     <Stack.Screen name="OtpTest" component={OtpTest}  />
     <Stack.Screen name="Otp" component={OtpXacThucScreen}  />
     <Stack.Screen name="OtpVerify" component={VerifyOtpScreen}  />
     <Stack.Screen name="Signup" component={Signupp}  />
     <Stack.Screen name="Chat" component={ChatScreen}  />
     
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

