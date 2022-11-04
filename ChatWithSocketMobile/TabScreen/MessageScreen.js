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
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { FontAwesome5 } from "@expo/vector-icons";
import ConservisionItem from "../components/ConservisionItem";
import { host, myConversationsRoute } from "../ultis/ApiRoute";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { io } from "socket.io-client";

function MessageScreen(props) {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const [conversations, setConversations] = useState([]);
  const [haveNewMessage, setHaveNewMessage] = useState();

  const socket = useRef();
  //khi nhân tin nhắn từ người lạ sẽ hiện ra list conservation
  useEffect(() => {
    getAllConversations();
  }, [haveNewMessage]);
  useEffect(() => {
    getAllConversations();
  }, []);
  const getAllConversations = async () => {
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    const myConversations = await axios.get(
      `${myConversationsRoute}/${currentUser._id}`
    );
    setConversations(myConversations.data);
    console.log("myConversations Data", myConversations.data);
  };
  //Khi nhân tin nhắn cập nhật lại last mess
  useEffect(() => {
    addUserToSocket();
  });

  const addUserToSocket = async () => {
    let currentUser = await AsyncStorage.getItem("User");
    currentUser = JSON.parse(currentUser);
    socket.current = io(host);
    await socket.current.emit("add-user", currentUser._id);

    if (socket.current) {
      socket.current.on("msg-receive", (dataSent) => {
        setHaveNewMessage(new Date());
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* giao diện search người dùng */}
      <View style={styles.rowSeachInput}>
        <TextInput
          style={styles.inputSearhInput}
          placeholder="Nhập số điện thoại để tìm người dùng"
          maxLength={13}
        />
        <TouchableOpacity style={styles.iconSearchInput}>
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
      {/* giao diện List Tin nhắn người dùng*/}
      <ScrollView>
        <FlatList
          data={conversations}
          renderItem={({ item }) => (
            <ConservisionItem
              onPress={() => {
                navigate("Chat", {
                  user: item,
                  setHaveNewMessage: setHaveNewMessage,
                });
              }}
              user={item}
              key={item.conversation._id}
            />
          )}
        />
      </ScrollView>
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
