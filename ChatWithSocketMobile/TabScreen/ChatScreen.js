import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions } from 'react-native'


import React, { useState } from 'react'
import Separator from '../ultis/Separator'
import  Ionicons  from '@expo/vector-icons/Ionicons'; 
import { StatusBar } from 'expo-status-bar';
import {NativeModules} from 'react-native';
import ChatItem from '../components/ChatItem';
import { FlatList } from 'react-native-gesture-handler';

const {StatusBarManager} = NativeModules;

const heightCuaStatusBar = StatusBarManager.HEIGHT;
const {height,width} = Dimensions.get('window');
function ChatScreen(props) {
  const {navigation,route}=props;
  const {navigate,goBack}=navigation;
 const {username,avatarImage}=props.route.params.user;// nhận từ bên MessageScreen
 const [text, setText] = useState('');
 const [chatHistory,setChatHistory]=useState([
  {
    username:username,
    avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
    isSender:true,
    message:"Hello",
    timestamps:16416543238000,
  },
  {
    username:username,
    avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
    isSender:true,
    message:"How are you",
    timestamps:174165432380420,
  },
  {
    username:username,
    avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
    isSender:true,
    message:"How about your workkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkaaaaaaaaaaaaaaaaaaaaaaa",
    timestamps:1865432380420999,
  },
  {
    username:"Bản thân",
    avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
    isSender:false,
    message:"Yes , Im fineaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasfxxxxxxxxxxxxxxxxxxxxxxxx",
    timestamps:1865432390920999,
  },
  {
    username:username,
    avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
    isSender:true,
    message:"Bye, I must off",
    timestamps:2065432380420999,
  },

 ]);
 

  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#0091FF' style='light' translucent/>
      <Separator height={heightCuaStatusBar}/>
     
      <View style={styles.headerContainer}>
        <Ionicons name='chevron-back-outline' size={30} onPress={() =>{goBack()}}/>
        <Text style={styles.headerTitle}>{username}</Text>
      </View>
    
      <FlatList style={{flex:1}}
          data={chatHistory}
          renderItem={({item}) =><ChatItem   item={item} key={`{$item.timestamps}`}/>}
          />
          <View style={{height:'7%',flexDirection:'row',paddingHorizontal:20,justifyContent:'space-between',alignItems:'center'}}>
            <TextInput defaultValue={text} style={{backgroundColor:'silver',width:'90%',height:'80%',color:'black',paddingHorizontal:30,borderRadius:20}}  onChangeText={newText => setText(newText)} />
            <TouchableOpacity onPress={()=>{
              if(text.trim().length==0){
                alert("không được rỗng");
              }
              let newMessObject ={
                username:'Fake username',
                avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
                isSender:false,
                message:text,
                timestamps:(new Date()).getTime(),
              }
              setText("");
              console.log(newMessObject);
            }}>
            <Ionicons name="send" size={24} color="#0091FF" />
            </TouchableOpacity>
          </View>
    </View>
  )
}

export default ChatScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  headerContainer:{
    flexDirection:'row',
    backgroundColor:'#0091FF',
    paddingVertical: 10,
    paddingHorizontal:20,
  },
  headerTitle:{
    fontSize:20,
    fontWeight:'bold',
    lineHeight:20*1.4,
    width:(width/100)*80,
    textAlign:'center'
  },
})