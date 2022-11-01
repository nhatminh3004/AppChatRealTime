import React, { useState } from 'react'
import  io  from 'socket.io-client'; 'socket.io-client'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button } from 'react-native'
function MessageScreen({navigation}) {
  // const socket=io("http://192.168.1.31:5000");
  // const [chatMessage,setchatMessage]=useState("");
  // const submitChat= () =>{
  //   socket.emit("chat minh",chatMessage);
    
  //   setchatMessage("");
  // }
  // console.log(chatMessage);
  return (
    <View style={styles.container}>
        <Text>Message Screen</Text>
       <TouchableOpacity onPress={() => {navigation.navigate("Chat",{tinnhan:"Minh"})}}>

          <Text>Click Chi tiết tin nhắn</Text>
  
          </TouchableOpacity>

  {/* <TextInput style={{height:40,borderWidth:2}} autoCorrect={false} value={chatMessage} onSubmitEditing={submitChat} onChangeText={text => {
  setchatMessage(text);
  
      }}/> */}
    </View>
  )
}

export default MessageScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'gray'
  }
})