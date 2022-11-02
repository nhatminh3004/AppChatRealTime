import React, { useEffect, useState } from 'react'
import  io  from 'socket.io-client'; 'socket.io-client'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Button , FlatList, LogBox} from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { FontAwesome5 } from '@expo/vector-icons'; 
import ConservisionItem from '../components/ConservisionItem';
function MessageScreen(props) {
  const {navigation,route}=props;
  const {navigate,goBack}=navigation;
  const [users,setUsers]= useState([
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Nhật Minh',
      last_msg:'Xin Chào',
      time :'4:00 PM',
    },
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Vương Lập',
      last_msg:'Chào Minh',
      time :'4:00 PM',
    },
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Ngọc Hải',
      last_msg:'Chào Lập',
      time :'4:00 PM',
    },
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Nhật Minh',
      last_msg:'Xin Chào',
      time :'4:00 PM',
    },
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Nhật Minh',
      last_msg:'Xin Chào',
      time :'4:00 PM',
    },
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Nhật Minh',
      last_msg:'Xin Chào',
      time :'4:00 PM',
    },
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Nhật Minh',
      last_msg:'Xin Chào',
      time :'4:00 PM',
    },
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Nhật Minh',
      last_msg:'Xin Chào',
      time :'4:00 PM',
    },
    {
      avatarImage:'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000',
      username:'Nhật Minh',
      last_msg:'Xin Chào',
      time :'4:00 PM',
    },
    
  ])
  
  return (
    <View style={styles.container}>
      {/* giao diện search người dùng */}
        <View style={styles.rowSeachInput}>
          <TextInput style={styles.inputSearhInput} placeholder="Nhập số điện thoại để tìm người dùng" maxLength={13}/>
          <TouchableOpacity  style={styles.iconSearchInput}>
          <FontAwesome5 name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* giao diện List Tin nhắn người dùng*/}
        <ScrollView>
          <FlatList
          data={users}
          renderItem={({item}) =><ConservisionItem onPress={()=>{navigate("Chat",{user:item})}}  user={item} key={item.avatarImage}/>}
          />
        </ScrollView>
       
     

 
    </View>
  )
}

export default MessageScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:30,
    paddingVertical:20,
    backgroundColor:'#fff'
  },
  inputSearhInput:{
    backgroundColor:'#EEE5DE',
    paddingHorizontal:30,
    flex:1,
    fontSize:15,
    height:45,

  },
  iconSearchInput:{
    marginLeft:15,
  },
  rowSeachInput:{
    backgroundColor:'#EEE5DE',
    height:45,
    borderRadius:5,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10,
    marginVertical:20,
    

    
  },
 

})