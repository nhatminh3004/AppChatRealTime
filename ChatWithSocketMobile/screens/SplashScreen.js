
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView,Image } from 'react-native';
import Lottie from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useRoute } from '@react-navigation/native';

export default function SplashScreen({navigation}) {
  const route=useRoute();
  return (
    <View style={{
      flex:1,backgroundColor:'#ffffff'
    }} >
      <Lottie source={require('../assets/splasha.json')} autoPlay loop={false} speed={0.7} onAnimationFinish={() =>{
            navigation.replace('Onboard')
      }} />
    </View>
  )
}



const styles = StyleSheet.create({
  
})
