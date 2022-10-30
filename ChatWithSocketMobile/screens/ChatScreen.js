import React from 'react'

import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button } from 'react-native'
function ChatScreen({navigation}) {
  

  return (
    <View style={styles.container}>
        <Text>Chat Screen</Text>
      <TouchableOpacity onPress={() => {navigation.goBack()}}>
        
          <Text>Đăng xuất</Text>
       
      </TouchableOpacity>
      
    </View>
  )
}

export default ChatScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
   justifyContent:'center',
   alignItems:'center',
    backgroundColor:'#fff'
  }
})