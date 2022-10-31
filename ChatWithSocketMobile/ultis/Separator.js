import React from 'react'
import { View } from 'react-native'

function Separator({height,width,...extraProps}) {
  return (
  <View style={{height,width,...extraProps}}>

  </View>
  )
   
};
Separator.defaultProps ={
    height:0,
    width:0
};


export default Separator
