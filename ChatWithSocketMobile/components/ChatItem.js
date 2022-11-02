import React from "react";
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
function ChatItem(props) {
  const { fromSelf, message } = props.item;
  const { onPress } = props;
  if (message) {
    // console.log(message.message.text);
    return fromSelf ? (
      <View style={styles.container}>
        {/*Nếu là Bản thân */}

        <TouchableOpacity style={styles.conservation_BanThan} onPress={onPress}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "#33CCFF",
              borderRadius: 30,
              marginEnd: 30,
              marginLeft: 40,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.last_msg}></Text>
              {/* <Text numberOfLines={1} style={styles.username_BanThan}>
                  {username}
                </Text> */}
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {message.message.files.length === 0 ? (
                <Text style={styles.last_msg_BanThan}>
                  {message.message.text}
                </Text>
              ) : (
                <View style={styles.last_msg_BanThan}>
                  {message.message.files.map((file, index) => {
                    <Image
                      key={index}
                      style={styles.image}
                      source={{ uri: `${file}` }}
                    />;
                  })}
                </View>
              )}

              <Text style={styles.last_msg}></Text>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: avatarImage }} />
            </TouchableOpacity> */}
        </TouchableOpacity>
      </View>
    ) : (
      // nếu là người ta
      <View style={styles.container}>
        <TouchableOpacity style={styles.conservation} onPress={onPress}>
          {/* <TouchableOpacity style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: avatarImage }} />
            </TouchableOpacity> */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "#DDDDDD",
              borderRadius: 10,
              marginEnd: 20,
              marginRight: 40,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* <Text numberOfLines={1} style={styles.username}>
                  {username}
                </Text> */}
              {/* <Text style={styles.time}>{timestamps}</Text> */}
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {message.message.files.length === 0 ? (
                <Text style={styles.last_msg}>{message.message.text}</Text>
              ) : (
                <View style={styles.last_msg}>
                  {message.message.files.map((file, index) => {
                    <Image
                      key={index}
                      style={styles.image}
                      source={{ uri: file }}
                    />;
                  })}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  //   return "";
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: "#000",
    width: 200,
    fontWeight: "bold",
  },
  last_msg: {
    fontSize: 13,
    width: 245,
    color: "#000",
  },
  conservation: {
    flexDirection: "row",
    paddingBottom: 25,
    paddingRight: 10,
    paddingLeft: 1,
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
  time: {
    fontSize: 12,
    fontWeight: "300",
  },

  // Bản thân
  conservation_BanThan: {
    flexDirection: "row",
    paddingBottom: 20,
    paddingRight: 0,
    paddingLeft: 10,
    justifyContent: "flex-end",
  },
  last_msg_BanThan: {
    fontSize: 13,
    width: 240,
    color: "#000",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  username_BanThan: {
    fontSize: 14,
    color: "#000",
    width: 200,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
export default ChatItem;
