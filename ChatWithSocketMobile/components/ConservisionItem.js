import React from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, ScrollView,Image } from 'react-native'
function ConservisionItem(props) {
    let {
        avatarImage,
        username,
        last_msg,
        time,
    }=props.user
    const {onPress}=props;
    
  return (
   <View style={styles.container}>
    <TouchableOpacity style={styles.conservation} onPress={onPress}>
        <TouchableOpacity style={styles.imageContainer}>
            <Image style={styles.image} source={{uri:avatarImage}} />
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text numberOfLines={1} style={styles.username}>{username}</Text>
                <Text  style={styles.time}>{time}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                <Text style={styles.last_msg}>{last_msg}</Text>
            </View>
        </View>
    </TouchableOpacity>
   </View>
  )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
      
      borderRadius:20,
    },
    username:{
         fontSize:20,
         color:'#000',
         width:210,
         fontWeight:'bold'

    },
    last_msg:{
        fontSize:13,
        width:240,
        color:'#000',
    },
    conservation:{
        flexDirection:'row',
        paddingBottom:25,
        paddingRight:20,
        paddingLeft:10,
    },
    image:{
        height:'100%',
        width:'100%',
    },
    imageContainer:{
        marginRight:15,
        borderRadius:25,
        height:50,
        width:55,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',

    },
    time:{
        
        fontSize:15,
       fontWeight:'300',

    },
   
  
  })

export default ConservisionItem
