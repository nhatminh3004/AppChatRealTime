import React from 'react'

import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button } from 'react-native'
function SettingScreen() {
  

  return (
    <View style={styles.container}>
        <Text>Cài đặt Screen</Text>

    </View>
  )
}

export default SettingScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
   justifyContent:'center',
   alignItems:'center',
    backgroundColor:'#fff'
  }
})