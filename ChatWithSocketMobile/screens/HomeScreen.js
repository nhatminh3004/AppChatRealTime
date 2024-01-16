import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView,Image } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

import React from 'react'



export default function HomeScreen({navigation}) {
  
  return (
    <SafeAreaView style={styles.container}  >
    <View style={{marginTop:'10%'}}>
      <Text style={styles.text_title}>Chào mừng trở lại với Valiu</Text>
    </View>
    <Image style={styles.tinyLogo} source={require('../assets/chat.jpg')} />
    <TouchableOpacity style={styles.touch_ablopacity} onPress={() =>{navigation.navigate("Signin")
        }}>
      <Text style={{fontSize:18,color:'#fff'}}>Chat ngay thôi </Text>
      <AntDesign name="caretright" size={25} color="black" />
    </TouchableOpacity>
    
  </SafeAreaView>
)
}



//css
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text_title: {
        fontStyle:'normal',
        fontWeight:'bold',
        fontSize:30,
        color:'#20315f',
        marginTop:'5%'
        
    },
    touch_ablopacity:{
      backgroundColor:'#AD40AF',
      padding:20,
      width:'90%',
      borderRadius:5,
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:'0.5%'
      
    },
    tinyLogo: {
      flex:1,
      width: '70%',
      height: '20%',
      
      
    },
  });
