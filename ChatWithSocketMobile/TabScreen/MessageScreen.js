import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
("socket.io-client");
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
  FlatList,
  LogBox,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { FontAwesome5 } from "@expo/vector-icons";
import ConservisionItem from "../components/ConservisionItem";
import {
  host,
  myConversationsRoute,
  searchUsers,
  createConversation,
  checkPhoneTonTaiRoute
} from "../ultis/ApiRoute";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { io } from "socket.io-client";

function MessageScreen(props) {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const [conversations, setConversations] = useState([]);
  const [haveNewMessage, setHaveNewMessage] = useState();
  const [searchText, setsearchText] = useState("");
  // const [color, setColor] = useState("");
  // const [valueSever,setVALUESEVER]=useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const socket = useRef();
  //khi nhân tin nhắn từ người lạ sẽ hiện ra list conservation
  useEffect(() => {
    getAllConversations();
    // console.log("chạy useEffect getAllconverSation khi có newMesss");
  }, [haveNewMessage]);
  useEffect(() => {
    getAllConversations();
    // console.log("chạy useEffect getAllconverSation lần 1");
  },[]);
  
  const getAllConversations = async () => {
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    const myConversations = await axios.get(
      `${myConversationsRoute}/${currentUser._id}`
    );
    setConversations(myConversations.data);
    // console.log("myConversations Data", myConversations.data);
  };
  //Khi nhân tin nhắn cập nhật lại last mess
  useEffect(() => {
    addUserToSocket();
    // console.log("useEffect add User to Socket lan 1");
  },[]);
  useEffect(() => {
    addUserToSocket();
    console.log("useEffect add User to Socket khi newMesss");
  },[haveNewMessage]);

  const addUserToSocket = async () => {
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    socket.current = io(host);
    await socket.current.emit("add-user", currentUser._id);

    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        // console.log("Data:",data);
        setHaveNewMessage(data);
        
      });
      // socket.current.on("sever-send-color",(data)=>{
      //   setVALUESEVER(data);
      // })
    }
  };
  const handleSearch = async () => {
    if(searchText==''){
      Alert.alert('Không được để trống');
    }
    else {
      try {
        const res = await axios.post(`${checkPhoneTonTaiRoute}`,{phone:searchText});
        // console.log("phone Request",{phoneNumber});
        // console.log(res.data);
        if(res.data.status===true){
         Alert.alert("người dùng không tồn tại !");
        }
        let currentUser = await AsyncStorage.getItem("User");
      currentUser = JSON.parse(currentUser);
      const search_result = await axios.post(searchUsers, {
        searchKey: searchText,
        id: currentUser._id,
      });
    
      const result_CreateConversation = await axios.post(createConversation, {
        searchResultId: search_result.data[0]._id,
        myId: currentUser._id,
      });
      // console.log("Kết quả search : ", search_result.data[0]._id);
      // console.log("Kết quả tạo Conversation : ", result_CreateConversation.data);
      // setConversations(...conversations,result_CreateConversation.data.conversation)
      // console.log("Sau khi search :", conversations[0]);
      // console.log(result_CreateConversation.data.lastMessage);
      let resultConversation = result_CreateConversation.data;
      let newLastMessage = {
        message: result_CreateConversation.data.lastMessage,
      };
      resultConversation.lastMessage = newLastMessage;
      setSearchResult([resultConversation]);
      setIsSearchResult(true);
      
      } catch (error) {
        console.log(error);
      }
    }
    
    
  };
  // console.log("search", searchText);
  // console.log("color", color);
  // const handleColor =()=>{
  //   socket.current=io(host);
  //   socket.current.emit("send-color",color);
  // }
  // console.log("converDataAAA:",conversations[0].conversation._id);
  return (
    <View style={styles.container}>
      {/* giao diện search người dùng */}
      <View style={styles.rowSeachInput}>
        <TextInput
          defaultValue={searchText}
          style={styles.inputSearhInput}
          placeholder="Nhập số điện thoại để tìm người dùng"
          maxLength={13}
          onChangeText={(newSearch) => setsearchText(newSearch)}
        />
        <TouchableOpacity style={styles.iconSearchInput} onPress={handleSearch}>
          <FontAwesome5 name="search" size={24} color="black" />
        </TouchableOpacity>
        {/* giao diện load lại Conservation  */}
        <TouchableOpacity
          style={styles.iconSearchInput}
          onPress={getAllConversations}
        >
          <Ionicons name="ios-reload" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.rowSeachInput}>
        <TextInput
          
          style={styles.inputSearhInput}
          placeholder="Nhập color"
          maxLength={13}
          onChangeText={(color) => setColor(color)}
        />
        <TouchableOpacity style={styles.iconSearchInput} onPress={handleColor}>
          <FontAwesome5 name="search" size={24} color="black" />
          <Text>Value Sever : {valueSever}</Text>
        </TouchableOpacity>
      
      </View> */}
      {/* giao diện List Tin nhắn người dùng*/}
      {/* {console.log("Search Result MessegeScreen :",searchResult.length)} */}
      {searchResult.length > 0 ? (
        <ScrollView>
          <FlatList
            data={searchResult}
            renderItem={({ item }) => (
              <ConservisionItem
                onPress={() => {
                  navigate("Chat", {
                    user: item,
                    setHaveNewMessage: setHaveNewMessage,
                  });
                }}
                user={item}
                isSearchResult={isSearchResult}
                setIsSearchResult={setIsSearchResult}
                setSearchResult={setSearchResult}
                key={item.conversation._id}
               
              />
            )}
          />
        </ScrollView>
      ) : (
        <ScrollView>
          <FlatList
            data={conversations}
            renderItem={({ item }) => (
              <ConservisionItem
                onPress={() => {
                  navigate("Chat",{ 
                    user:item,
                    setHaveNewMessage: setHaveNewMessage,
                });
                }}
                user={item}
                key={item.conversation._id}
              />
            )}
          />
        </ScrollView>
      )}
    </View>
  );
}

export default MessageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  inputSearhInput: {
    backgroundColor: "#EEE5DE",
    paddingHorizontal: 30,
    flex: 1,
    fontSize: 13,
    height: 45,
  },
  iconSearchInput: {
    marginLeft: 15,
  },
  rowSeachInput: {
    backgroundColor: "#EEE5DE",
    height: 45,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
