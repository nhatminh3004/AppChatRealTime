import React from 'react'

import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button } from 'react-native'
function ChatScreen({route: {params:{tinnhan}},navigation}) {
 

  console.log(tinnhan);

  return (
    <View style={styles.container}>
        <Text>Chat Screen</Text>

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