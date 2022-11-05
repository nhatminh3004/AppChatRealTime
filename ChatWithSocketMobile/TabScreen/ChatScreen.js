import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  LogBox,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";
import Separator from "../ultis/Separator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { NativeModules } from "react-native";
import ChatItem from "../components/ChatItem";
import { FlatList } from "react-native-gesture-handler";
import {
  getAllMessagesRoute,
  host,
  myConversationsRoute,
  sendMessageRoute,
} from "../ultis/ApiRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import io from "socket.io-client";




const { StatusBarManager } = NativeModules;

const heightCuaStatusBar = StatusBarManager.HEIGHT;
const { height, width } = Dimensions.get("window");

function ChatScreen(props) {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const { users_info, conversation, lastMessage } = props.route.params.user; // nhận từ bên MessageScreen
  const setHaveNewMessage = props.route.params.setHaveNewMessage; // nhận từ bên MessageScreen
  const [messages, setMessages] = useState([]);
  const [arraivalMessage, setArrivalMessage] = useState({});
  const [text, setText] = useState("");
  const socket = useRef();

  useEffect(() => {
    addUserToSocket();
  }, []);

  const addUserToSocket = async () => {
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    socket.current = io(host);
    await socket.current.emit("add-user", currentUser._id);

    if (socket.current) {
      socket.current.on("msg-receive", (dataSent) => {
        if (conversation._id === dataSent.from.conversationId) {
          setArrivalMessage({ fromSelf: false, message: dataSent.message });
        }
      });
    }
  };
  useEffect(() => {
    getAllMyMessages();
  }, []);
  useEffect(() => {
    // console.log(arraivalMessage);
    // console.log(messages[0]);
    // console.log(arraivalMessage);
    // console.log([...messages].push(arraivalMessage));
    // const msgs = [...messages];
    //     msgs.push({fromSelf: true, message: arraivalMessage });
    //     setMessages(msgs);
    // console.log({ fromSelf: false, message: arraivalMessage });

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
        userId: currentUser._id,
        conversationId: conversation._id,
      },
      to: conversation.members,
      message: newMessage.data,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: newMessage.data });
    setMessages(msgs);
    setHaveNewMessage(new Date());
    setText("");
  };
  
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
        <Text style={styles.headerTitle}>{users_info[0].username}</Text>
      </View>
      {/* {console.log(messages[0])} */}
      {messages && (
        <FlatList
          style={{ flex: 1 }}
          data={messages}
          renderItem={({ item }) => (
            <ChatItem item={item} key={`${item._id}`} />
          )}
        />
      )}
      <View
        style={{
          height: "7%",
          flexDirection: "row",
          paddingHorizontal: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          defaultValue={text}
          style={{
            backgroundColor: "silver",
            width: "90%",
            height: "80%",
            color: "black",
            paddingHorizontal: 30,
            borderRadius: 20,
          }}
          onChangeText={(newText) => setText(newText)}
        />
        <TouchableOpacity onPress={handleSendChat}>
          <Ionicons name="send" size={24} color="#0091FF" />
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
