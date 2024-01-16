import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

function ChatItem(props) {
  const { fromSelf, message,senderUser } = props.item;
  const { onPresss } = props;
  const usernameBanThan =props.userNameBanThan
  // const usernameNguoiTa = props.userNameNguoiTa;
  
  let url;
  let urlTypeFile;
  // console.log("Message Test : ",senderUser);

  // console.log("Ảnh chuỗi",message);
  if (message) {
    // console.log(message.message.text);
    return fromSelf ? (
      <View style={styles.container}>
        {/*Nếu là Bản thân */}

        <TouchableOpacity style={styles.conservation_BanThan} >
        {message.message.files.length === 0 ? <View
            style={styles.backgroundChat}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.last_msg}></Text>
              <Text numberOfLines={1} style={styles.username_BanThan}>
              {/* {usernameBanThan} */}
                </Text>
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
                     url=file.url
                     var part=url.split(".");
                     var typeFile=part[part.length-1];
                     urlTypeFile=typeFile;
                  })}
                 
                  {urlTypeFile== "jpg" || urlTypeFile=="jpeg" || urlTypeFile =="png" ? (
               <Image
               resizeMode="cover"
               style={{width:200,height:200}}
               source={{
                 uri: url,
               }}
             />
              ) : (
                  urlTypeFile=="docx" ?( <Image
                    style={{width:90,height:90}}
                    source={{
                      uri: "https://thehanoichamomile.files.wordpress.com/2019/06/12-121390_new-microsoft-word-icon.jpg",
                    }}
                  />) :(
                    urlTypeFile=="pdf" ?(
                      <Image
                      style={{width:90,height:90}}
                      source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png",
                      }}/>
                    ) :(
                      <Image
                      style={{width:90,height:90}}
                      source={{
                        uri: "https://findicons.com/files/icons/2795/office_2013_hd/2000/excel.png",
                      }}/>
                    )
                    
                  )
               
               
              )}
                </View>
              )}

              <Text style={styles.last_msg}></Text>
            </View>
          </View> : <View
            style={styles.backgroundChatImage}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.last_msg}></Text>
              <Text numberOfLines={1} style={styles.username_BanThan}>
              {/* {usernameBanThan} */}
                </Text>
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
                     url=file.url
                     var part=url.split(".");
                     var typeFile=part[part.length-1];
                     urlTypeFile=typeFile;
                  })}
                 
                  {urlTypeFile== "jpg" || urlTypeFile=="jpeg" || urlTypeFile =="png" ? (
               <Image
               resizeMode="cover"
               style={{width:200,height:200}}
               source={{
                 uri: url,
               }}
             />
              ) : (
                  urlTypeFile=="docx" ?( <Image
                    style={{width:90,height:90}}
                    source={{
                      uri: "https://thehanoichamomile.files.wordpress.com/2019/06/12-121390_new-microsoft-word-icon.jpg",
                    }}
                  />) :(
                    urlTypeFile=="pdf" ?(
                      <Image
                      style={{width:90,height:90}}
                      source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png",
                      }}/>
                    ) :(
                      <Image
                      style={{width:90,height:90}}
                      source={{
                        uri: "https://findicons.com/files/icons/2795/office_2013_hd/2000/excel.png",
                      }}/>
                    )
                    
                  )
               
               
              )}
                </View>
              )}

              <Text style={styles.last_msg}></Text>
            </View>
          </View>}
          
           <TouchableOpacity style={styles.iconEvicMessage} onPress={()=>{onPresss(message)}}>
           <Ionicons name="md-repeat-outline" size={40} color="black" />
            </TouchableOpacity> 
        </TouchableOpacity>
      </View>
    ) : (
      // nếu là người ta
      <View style={styles.container}>
        <TouchableOpacity style={styles.conservation} >
          <TouchableOpacity style={styles.imageContainer}>
            {senderUser.avatarImage===''? <Image style={styles.image} source={{ uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000" }} /> : (
               <Image style={styles.image} source={{ uri: senderUser.avatarImage }} />
            )}
             
            </TouchableOpacity>
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
              <Text numberOfLines={1} style={styles.username}>
                      {senderUser.username}
                </Text>
              {/* <Text style={styles.time}>{timestamps}</Text> */}
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {message.message.files.length === 0 ? (
                 <>
                 
               <Text style={styles.last_msg}>{message.message.text}  </Text>
                 </> 
              ) : (
                <>
                <View style={styles.last_msg}>
                  {/* {console.log("Ảnh:",message.message.files)} */}
                  
                  {message.message.files.map((file, index) => {
                     url=file.url
                     var part=url.split(".");
                     var typeFile=part[part.length-1];
                     urlTypeFile=typeFile;
                    //  console.log("typeFile:",typeFile);
                    //  console.log("file nhận được :",url);
                    
                     
                  })}
                  {/* {  console.log("urlTypeFile:",urlTypeFile)} */}
                  {urlTypeFile== "jpg" || urlTypeFile=="jpeg" || urlTypeFile =="png" ? (
               <Image
               resizeMode="stretch"
               style={{width:300,height:300}}
               source={{
                 uri: url,
               }}
             />
              ) : (
                  urlTypeFile=="docx" ?( <Image
                    style={{width:90,height:90}}
                    source={{
                      uri: "https://thehanoichamomile.files.wordpress.com/2019/06/12-121390_new-microsoft-word-icon.jpg",
                    }}
                  />) :(
                    urlTypeFile=="pdf" ?(
                      <Image
                      style={{width:90,height:90}}
                      source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png",
                      }}/>
                    ) :(
                      <Image
                      style={{width:90,height:90}}
                      source={{
                        uri: "https://findicons.com/files/icons/2795/office_2013_hd/2000/excel.png",
                      }}/>
                    )
                    
                  )
               
               
              )}
              
                </View>
                </>
                     
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
    // backgroundColor:'red'
  },
  iconEvicMessage: {
    marginRight: 40,
    borderRadius: 20,
    height: 50,
    width: 30,
    // overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // backgroundColor:'red'
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
  backgroundChat:{
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#33CCFF",
    borderRadius: 30,
    marginEnd: 30,
    marginLeft: 40,
  },
  backgroundChatImage:{
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginEnd: 50,
    marginLeft: 10,
  }
});
export default ChatItem;
