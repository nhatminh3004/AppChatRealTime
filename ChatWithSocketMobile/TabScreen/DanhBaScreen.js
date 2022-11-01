import React from 'react'

import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button } from 'react-native'
function DanhBaScreen() {
  

  return (
    <View style={styles.container}>
        <Text>Danh Bạ Screen</Text>

    </View>
  )
}

export default DanhBaScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
   justifyContent:'center',
   alignItems:'center',
    backgroundColor:'#fff'
  }
})