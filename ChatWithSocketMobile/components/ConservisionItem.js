import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
function ConservisionItem(props) {
  const [isSingle, setIsSingle] = useState(true);

  let { users_info, conversation, lastMessage } = props.user;
  let isSearchResult = props.isSearchResult;
  let setIsSearchResult = props.setIsSearchResult;
  let setSearchResult = props.setSearchResult;
  const { onPress } = props;
// console.log("User info user :",users_info[0]);
  useEffect(() => {
    if (conversation.members.length > 2) {
      setIsSingle(false);
    }
  }, [props]);
  // console.log("lagmessage Info: ",lastMessage.message.message);
  return (
    <View style={styles.container}>
      {isSearchResult && (
        <TouchableOpacity
          style={styles.conservation}
          onPress={() => {
            setIsSearchResult(!isSearchResult);
            setSearchResult([]);
          }}
        >
          <Text>Out</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.conservation} onPress={onPress}>
        {isSingle ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={styles.imageContainer}>
              {users_info[0].avatarImage == "" ? (
                <Image
                  style={styles.image}
                  source={{ uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000" }}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={{
                    uri: users_info[0].avatarImage ,
                  }}
                />
              )}
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text numberOfLines={1} style={styles.username}>
                  {users_info[0].username}
                </Text>
                {/* <Text style={styles.time}>1234</Text> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {lastMessage &&
                lastMessage.message &&
                lastMessage.message.message &&
                lastMessage.message.message.files &&
                lastMessage.message.message.files.length > 0 ? (
                  <Text style={styles.last_msg}>[files]</Text>
                ) : (
                  lastMessage &&
                  lastMessage.message &&
                lastMessage.message.message && (
                    <Text style={styles.last_msg}>
                    {lastMessage.message.message.text}
                    </Text>
                  )
                  
                 
                )}
                
               
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={{
                  uri: "data:image/png;base64,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",
                }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text numberOfLines={1} style={styles.username}>
                {conversation.name}
                </Text>
                {/* <Text style={styles.time}>1234</Text> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {lastMessage &&
                lastMessage.message &&
                lastMessage.message.message &&
                lastMessage.message.message.files &&
                lastMessage.message.message.files.length > 0 ? (
                  <Text style={styles.last_msg}>[files]</Text>
                ) : (
                  lastMessage &&
                  lastMessage.message &&
                lastMessage.message.message &&(
                    <Text style={styles.last_msg}>
                      {lastMessage.message.message.text}
                    </Text>
                  )
                  
                 
                )}
                
               
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,

    borderRadius: 20,
  },
  username: {
    fontSize: 20,
    color: "#000",
    width: 210,
    fontWeight: "bold",
  },
  last_msg: {
    fontSize: 13,
    width: 240,
    color: "#000",
  },
  conservation: {
    flexDirection: "row",
    paddingBottom: 25,
    paddingRight: 20,
    paddingLeft: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  
  imageContainer: {
    marginRight: 15,
    borderRadius: 25,
    height: 50,
    width: 55,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  
});

export default ConservisionItem;
