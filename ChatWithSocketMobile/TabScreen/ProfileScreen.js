import React from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button } from 'react-native'

function ProfileScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Text>Profile Screen</Text>
  <TouchableOpacity onPress={() => {navigation.replace("Signin")}}>
    
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