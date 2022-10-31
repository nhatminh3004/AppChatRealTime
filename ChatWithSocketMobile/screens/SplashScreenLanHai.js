
import { StyleSheet, View,  } from 'react-native';
import Lottie from 'lottie-react-native';

import React from 'react'


export default function SplashScreenLanHai({navigation}) {
  
  return (
    <View style={{
      flex:1,backgroundColor:'#ffffff'
    }} >
      <Lottie source={require('../assets/splasha.json')} autoPlay loop={false} speed={0.7} onAnimationFinish={() =>{
            navigation.replace('Home')
      }} />
    </View>
  )
}



const styles = StyleSheet.create({
  
})
