import React, { useEffect, useState } from "react";
import styled from "styled-components"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {io} from 'socket.io-client'
import { allUsersRoute, host, myConversationsRoute } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { useRef } from "react";
import SidebarNav from "../components/SidebarNav";
import FriendsContainer from "../components/FriendsContainer";
import ConversationList from "../components/ConversationList";

function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [openMessageContainer, setOpenMessageContainer] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [haveNewMessage, setHaveNewMessage] = useState({});
    const [haveInvitation, setHaveInvitation] = useState(undefined);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        checkLogin();
    }, []);
    useEffect(() => {
        if (currentUser) {
            if (currentUser.sentInvitations.length > 0) {
                setHaveInvitation(currentUser.sentInvitations[currentUser.sentInvitations.length-1]);
            } 
        }
    });
    useEffect(() => {
        if (currentUser) {
            addUserToSocket();
        }
    })
    const addUserToSocket = async () => {
        socket.current = io(host);
        await socket.current.emit("add-user", currentUser._id);
    }
    const checkLogin = async () => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate('/login')
        } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getContactsFromDB();
    }, [currentUser]);

    const getContactsFromDB = async () => {
        if (currentUser) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data); 
        }
    }
    useEffect(() => {
        getConversationsFromDB();
    }, [currentUser]);

    useEffect(() => {
        getConversationsFromDB();
    }, [haveNewMessage]);
    const getConversationsFromDB = async () => {
        if (currentUser) {
            const data = await axios.get(`${myConversationsRoute}/${currentUser._id}`);
            console.log(data.data);
            setConversations(data.data); 
        }
    }

    
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (dataSent) => {
                if (currentChat.conversation._id === dataSent.from.conversationId) {
                    setArrivalMessage({fromSelf: false, message: dataSent.message})
                }
                setHaveNewMessage(new Date());
            })
            
            socket.current.on("invitation-receive", async (data) => {
                setHaveInvitation(data);
                currentUser.sentInvitations = [...currentUser.sentInvitations, data];
                localStorage.setItem("chat-app-user", JSON.stringify(currentUser));
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));

            })
            
        }
    });

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    const onHandleSelectNav = (isMessageContainer) => {
        setOpenMessageContainer(isMessageContainer);
    }

    const onHandleReloadLatestMsg = () => {
        setHaveNewMessage(new Date());
    }
    return <Container>
        <div className="container">
            <SidebarNav changeNav={onHandleSelectNav} haveInvitation={haveInvitation} />
            {
                openMessageContainer ? (
                    <>
                        <ConversationList conversations={conversations} currentUser={currentUser} changeChat={handleChatChange} socket={socket}/>
                        {
                            isLoaded && currentChat === undefined ? 
                                (<Welcome currentUser={currentUser} />) :
                                (<ChatContainer arrivalMessage={arrivalMessage} onHandleReloadLatestMsg={onHandleReloadLatestMsg} setArrivalMessage={setArrivalMessage} setCurrentChat={setCurrentChat} setCurrentUser={setCurrentUser} updateListConversation={setHaveNewMessage} currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
                                
                        }
                    </>
                ) : (
                    <>
                        <FriendsContainer contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                        {
                            isLoaded && currentChat === undefined ? 
                                (<Welcome currentUser={currentUser} />) :
                                (<ChatContainer arrivalMessage={arrivalMessage} onHandleReloadLatestMsg={onHandleReloadLatestMsg} setArrivalMessage={setArrivalMessage} setCurrentChat={setCurrentChat} setCurrentUser={setCurrentUser} updateListConversation={setHaveNewMessage} currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
                                
                        }
                    </>
                )
            }
            {/* {
                openMessageContainer ? (
                    <>
                        <Contacts contacts={conversations} currentUser={currentUser} changeChat={handleChatChange}/>
                        {
                            isLoaded && currentChat === undefined ? 
                                (<Welcome currentUser={currentUser} />) :
                                (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
                                
                        }
                    </>
                ) : (<FriendsContainer/>)
            } */}
        </div>
    </Container> ;
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    .container {
        height: 100%;
        width: 100%;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 4% 25% 71%;

        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 5% 35% 60%;
        }
    }
`;

export default Chat;