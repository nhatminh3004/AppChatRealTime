import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  LogBox,
  Alert
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import React, { useEffect, useRef, useState } from "react";
import Separator from "../ultis/Separator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { StatusBar } from "expo-status-bar";
import { NativeModules } from "react-native";
import ChatItem from "../components/ChatItem";
import { FlatList } from "react-native-gesture-handler";
import {
  getAllMessagesRoute,
  host,
  myConversationsRoute,
  sendMessageRoute,
  evictMessageRoute
} from "../ultis/ApiRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import io from "socket.io-client";
let uriFetch;



const { StatusBarManager } = NativeModules;

const heightCuaStatusBar = StatusBarManager.HEIGHT;
const { height, width } = Dimensions.get("window");

function ChatScreen(props) {
  const [uriImage, seturiImage] = useState('');
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const { users_info, conversation, lastMessage } = props.route.params.user; // nhận từ bên MessageScreen
  // console.log("Conservation Room : ",conversation);
  const setHaveNewMessage = props.route.params.setHaveNewMessage; 
  const [messages, setMessages] = useState([]);
  const [arraivalMessage, setArrivalMessage] = useState({});
  const [text, setText] = useState("");
  const [userNameBanThan,setuserNameBanThan] = useState("");
  const [messageEvict, setMessageEvict] = useState(undefined);
 
  // const [userNameNguoiTa,setuserNameNguoiTa] = useState('');
  const socket = useRef();
  
  useEffect(() => {
    addUserToSocket();
    // setuserNameNguoiTa(users_info[0].username)
  }, []);
  useEffect(() => { 
    if (messageEvict) {
        let msgs = [...messages];
        for(var i = 0; i < msgs.length; i++) {
            if (messageEvict === msgs[i].message._id) {
                msgs.splice(i, 1);
            }
        }
        setMessages(msgs);
    }
}, [messageEvict])
  

  const addUserToSocket = async () => {
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    setuserNameBanThan(currentUser.username);
    socket.current = io(host);
    await socket.current.emit("add-user", currentUser._id);

    if (socket.current) {
      socket.current.on("msg-receive", (dataSent) => {
        // console.log("Data nhận :", dataSent.from.user.username);
        // setuserNameNguoiTa(dataSent.from.user.username);
        
        if (conversation._id === dataSent.from.conversationId) {
          setArrivalMessage({ fromSelf: false, message: dataSent.message,senderUser:dataSent.from.user.username });
        }
      });
      socket.current.on("reply-evict-message", async (data) => {
        setHaveNewMessage(new Date());
        console.log("Reply Evict message :",data.messageId);
        setMessageEvict(data.messageId);
    })
    }
  };
  useEffect(() => {
    getAllMyMessages();
  },[arraivalMessage]);

  useEffect(() => {
    if (arraivalMessage) setMessages([...messages, arraivalMessage]);
  }, [arraivalMessage]);
  const getAllMyMessages = async () => {
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);

    const res = await axios.post(`${getAllMessagesRoute}`, {
      conversationId: conversation._id,
      userId: currentUser._id,
    });
    setMessages(res.data);
  };
  const handleSendChat = async () => {
    if (text.trim().length == 0) {
      alert("không được rỗng");
      return;
    }
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    const newMessage = await axios.post(sendMessageRoute, {
      from: currentUser._id,
      conversationId: conversation._id,
      message: text,
    });
    socket.current.emit("send-msg", {
      from: {
        user: currentUser,
        conversationId: conversation._id,
      },
      to: conversation.members,
      message: newMessage.data,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: newMessage.data,senderUser:currentUser});
    setMessages(msgs);
    setHaveNewMessage(new Date());
    setText("");
  };
  const handleSendImageByCamera = async () =>{
   let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
   if(permissionResult.granted ===false){
    alert('Bạn chưa cho quyền truy cập máy ảnh, thử lại sau....');
    return;
   } 
  
      let result = await ImagePicker.launchCameraAsync(
        {
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          aspect:[1,1],
          quality:0.5
        }
      )
      console.log("Result Pick Image Camera:",result.uri);
      uriFetch=result.uri;
      seturiImage(result.uri);
      if (result.cancelled)  {
        Alert.alert("Bạn đã huỷ chụp ảnh")
        seturiImage('');
        // setFileName('');
        uriFetch='';
    }
    else {
      seturiImage(result.uri);
      // setFileName(result.uri);
  console.log("Tên Image Fetch:", uriFetch);
    const response =await fetch(uriFetch);
    const blob =await response.blob();
    const nameFile=  uriFetch.substring(uriFetch.lastIndexOf('/')+1);
    console.log("name file :",nameFile);
    var ref =  firebase.storage().ref().child(nameFile).put(blob);
    const imageUrl = await (await ref).ref.getDownloadURL();
    console.log("Download URRL:",imageUrl);
  
    let currentUser = await AsyncStorage.getItem("User");
      currentUser = JSON.parse(currentUser);
      let url=nameFile
      let part=url.split(".");
      let typeFile=part[part.length-1];
     let urlTypeFile=typeFile;
      // console.log("urlType File : ",urlTypeFile);
      const objectFile ={
        fileName:nameFile,
        size:123,
        url:imageUrl+"."+urlTypeFile
      }
      const newMessageImage = await axios.post(sendMessageRoute, {
        from: currentUser._id,
        conversationId: conversation._id,
        files: objectFile,
      });
      // console.log("newMessageImage Data ",newMessageImage.data);
      socket.current.emit("send-msg", {
        from: {
          user: currentUser,
          conversationId: conversation._id,
        },
        to: conversation.members,
        message: newMessageImage.data,
      });
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: newMessageImage.data });
      setMessages(msgs);
      setHaveNewMessage(new Date());
      setText("");
    try {
      await ref
    } catch (e) {
      console.log(e);
    }
    Alert.alert("Tải ảnh từ camera thành công");
    
    seturiImage('');
    uriFetch='';
  }
   

  };
  const handleSendImageByLib = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   
    console.log("Result Pick Image Lib:",result.uri);
    uriFetch=result.uri;
    seturiImage(result.uri);
    if (result.cancelled)  {
      Alert.alert("Bạn chưa chọn ảnh")
      seturiImage('');
      // setFileName('');
      uriFetch='';
  }
  else {
    seturiImage(result.uri);
    // setFileName(result.uri);
console.log("Tên Image Fetch:", uriFetch);
  const response =await fetch(uriFetch);
  const blob =await response.blob();
  const nameFile=  uriFetch.substring(uriFetch.lastIndexOf('/')+1);
  console.log("name file :",nameFile);
  var ref =  firebase.storage().ref().child(nameFile).put(blob);
  const imageUrl = await (await ref).ref.getDownloadURL();
  console.log("Download URRL:",imageUrl);

  let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    let url=nameFile
    let part=url.split(".");
    let typeFile=part[part.length-1];
   let urlTypeFile=typeFile;
    // console.log("urlType File : ",urlTypeFile);
    const objectFile ={
      fileName:nameFile,
      size:123,
      url:imageUrl+"."+urlTypeFile
    }
    const newMessageImage = await axios.post(sendMessageRoute, {
      from: currentUser._id,
      conversationId: conversation._id,
      files: objectFile,
    });
    // console.log("newMessageImage Data ",newMessageImage.data);
    socket.current.emit("send-msg", {
      from: {
        user: currentUser,
        conversationId: conversation._id,
      },
      to: conversation.members,
      message: newMessageImage.data,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: newMessageImage.data });
    setMessages(msgs);
    setHaveNewMessage(new Date());
    setText("");
  try {
    await ref
  } catch (e) {
    console.log(e);
  }
  Alert.alert("Tải ảnh từ thư viện thành công");
  
  seturiImage('');
  uriFetch='';
}

    /////////////////////
  };
  const handleEvicMesssage= async (message) =>{
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    await axios.post(`${evictMessageRoute}`,{
      messageId:message._id,
      conversationId: conversation._id,
    });
    socket.current.emit("evict-message",{
      from:currentUser._id,
      to:conversation.members,
      messageId:message._id
    })
    if (message.message.files && message.message.files.length > 0) {
      let url = [];
      for(var i = 0; i < message.message.files.length; i++) {
          url = [...url, message.message.files[i].url];
      }
  }
  const msgs = [...messages];
  for(var i = 0; i < msgs.length; i++) {
    if (message._id === msgs[i].message._id) {
      msgs.splice(i, 1);
    }
}
  setMessages(msgs);
  setHaveNewMessage(new Date());
  console.log("Thu Hồi :",message._id);
  }
  // console.log("Mảng Tin nhắn: ",messages);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0091FF" style="light" translucent />
      <Separator height={heightCuaStatusBar} />

      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => {
            goBack();
          }}
        />
        <Text style={styles.headerTitle}>
          {conversation.members.length >2 ? conversation.name : users_info[0].username }
        </Text>
        
      </View>
      {/* {console.log(messages[0])} */}
      {messages && (
        <FlatList
          style={{ flex: 1 }}
          data={messages}
          renderItem={({ item }) => (
            <ChatItem item={item}  userNameBanThan={userNameBanThan}   key={`${item._id}`} onPresss={handleEvicMesssage} />
          )}
        />
      )}
      <View
        style={{
          width:'80%',
          height: "8%",
          flexDirection: "row",
          paddingHorizontal: 10,
          marginHorizontal:30,
         justifyContent:'center',
          alignItems: "center",
        }}
      >
        <TextInput
          defaultValue={text}
          style={{
            backgroundColor: "silver",
            width: "100%",
            height: "70%",
            color: "black",
            paddingHorizontal: 15,
            borderRadius: 20,
          }}
          onChangeText={(newText) => setText(newText)}
        />
        <TouchableOpacity onPress={handleSendChat}>
          <Ionicons name="send" size={24} color="#0091FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendImageByLib}>
        <MaterialIcons name="photo-library" size={24} color="#0091FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendImageByCamera}>
        <FontAwesome name="camera" size={24} color="#0091FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#0091FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 20 * 1.4,
    width: (width / 100) * 80,
    textAlign: "center",
  },
});
