import React from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions,Image,FlatList} from 'react-native'
import { StaticImageService } from '../service'
const FlagItem=({code,name,dial_code,onPress}) =>  {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress({code,name,dial_code})}>
            <Image style={styles.flagImage} source={{uri: StaticImageService.getFlagIcon("FLAT",64,code)}}/>   
            <Text style={styles.flagText}>{dial_code}</Text>
            <Text style={styles.flagText}>{name}</Text>
    </TouchableOpacity>
    
  )
}

const styles =StyleSheet.create({
    container :{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
    },
    flagImage:{
        height:25,
        width:25,
        marginRight:10
    },
    flagText:{
        fontSize:14,
        lineHeight:14*1.4,
        color:'black',
        marginRight:10
    }
})
export default FlagItem
