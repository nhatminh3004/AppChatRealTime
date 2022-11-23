import Onboarding from 'react-native-onboarding-swiper';
import React from 'react'
import { Text, StyleSheet, View,Image } from 'react-native'
import {Dimensions} from 'react-native';

export default function OnboardScreen({navigation}) {
    const {height,width} = Dimensions.get('window');
  return (
    <Onboarding 
    onSkip={() =>{navigation.navigate("Signin")}}
    onDone={() =>{navigation.navigate('Signin')}}
    nextLabel={"Tiếp theo"}
    skipLabel={"Bỏ qua"}
    bottomBarColor={'#0091FF'}
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image style={{height:(height/100) *50,width:(width/100) *100}}  source={require('../assets/welcomeChat.png')} resizeMode='contain'  />,
      title: 'Chào mừng bạn đến với Valiu',
      subtitle: 'Chat mọi lúc mọi nơi với 5 bước sau',
    },
    {
        backgroundColor: '#fff',
        image: <Image style={{height:(height/100) *50,width:(width/100) *100}} source={require('../assets/verifyPhone.png')} resizeMode='contain' />,
        title: 'Bước 1',
        subtitle: 'Xác thực số điện thoại mà bạn đăng ký ',
      },
      {
        backgroundColor: '#fff',
        image: <Image style={{height:(height/100) *50,width:(width/100) *100}} source={require('../assets/signUp.png')} resizeMode='contain' />,
        title: 'Bước 2',
        subtitle: 'Điền đủ thông tin tài khoản mà bạn đăng ký',
      },
     
      {
        backgroundColor: '#fff',
        image: <Image style={{height:(height/100) *50,width:(width/100) *100}} source={require('../assets/signIn.png')} resizeMode='contain' />,
        title: 'Bước 3',
        subtitle: 'Tiến hành đăng nhập',
      },
      {
        backgroundColor: '#fff',
        image: <Image style={{height:(height/100) *50,width:(width/100) *100}} source={require('../assets/uploadAvatar.png')} resizeMode='contain' />,
        title: 'Bước 4 ',
        subtitle: 'Cập nhật ảnh đại diện',
      },
      {
        backgroundColor: '#fff',
        image: <Image style={{height:(height/100) *50,width:(width/100) *100}} source={require('../assets/finalChat.png')} resizeMode='contain' />,
        title: 'Bước 5',
        subtitle: 'Từ giờ bạn đã có thể gặp gỡ và chat với mọi người một cách nhanh chóng',
      },
  ]}
/>
  );
}
