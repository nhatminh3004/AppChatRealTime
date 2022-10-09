import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FiUserPlus } from 'react-icons/fi';
import styled from "styled-components";
import { acceptAddFriend, addSentInvitation, getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import AvatarDefault from "../assets/avatar_default.png"
import { BsCheckLg } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

function ChatContainer({updateListConversation, currentChat, currentUser, socket}) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [sentInvitation, setSentInvitation] = useState(false);
    const [haveInvitation, setHaveInvitation] = useState(false);
    const scrollRef = useRef();
    useEffect(() => {
        getAllMessagesFromDB();
    }, [currentChat])

    const getAllMessagesFromDB = async () => {
        if (currentChat) {

            const response = await axios.post(`${getAllMessagesRoute}`, {
                from: currentUser._id,
                to: currentChat._id
            })
            setMessages(response.data);
        }
    }

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message:msg
        })
        socket.current.emit("send-msg", {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg });
        setMessages(msgs);
        updateListConversation(new Date())
    };
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (dataSent) => {
                if (dataSent.from === currentChat._id)
                    setArrivalMessage({fromSelf: false, message: dataSent.message})
            })
        }
    });
    useEffect(() => { 
        arrivalMessage && setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [messages])

    const checkFriends = () => {
        if (currentUser.listFriends.length === 0)
            return false;
        return currentUser.listFriends.map(friend => {
            if (friend === currentChat._id)
                return true;
            return false;
        })
    }
    const onHandleAddFriend = async () => {
        await axios.post(`${addSentInvitation}`, {
            from: currentChat._id,
            to: currentUser._id
        });
        socket.current.emit("send-invitation", {
            from: currentUser._id,
            to: currentChat._id
        });
        setSentInvitation(true);
        
    }

    useEffect(() => {
        if (currentUser && currentChat) {
            currentChat.sentInvitations.map((invitation) => {
                if (currentUser._id === invitation) {
                    setSentInvitation(true);
                }
            })
        }
    });
    useEffect(() => {
        if (currentUser && currentChat) {
            currentUser.sentInvitations.map((invitation) => {
                console.log(currentChat._id === invitation);
                if (currentChat._id === invitation) {
                    setHaveInvitation(true);
                }
            })
        }
    }, [currentUser]);
    const onHandAcceptFriend = async () => {
        currentUser.listFriends = [...currentUser.listFriends, currentChat._id];
        await axios.post(`${acceptAddFriend}`, {
            currentUser: currentUser,
            friendId: currentChat._id
        });
        socket.current.emit("acceptted", {
            from: currentUser._id,
            to: currentChat._id
        });
        setSentInvitation(true);
    }

    const onHandleDeny = () => {

    }
    return (
    <>
        {currentChat && currentUser && (<Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        {currentChat.avatarImage != "" ? 
                            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"/>
                            : <img src={AvatarDefault} alt="avatar"/>
                        }
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
            </div>
            { haveInvitation ? 
                (
                    <div className="haveInvitation">
                        <div className="title-invitation">You have an invitation</div>
                        <div className="btn-response-invitation">
                            <div className="accept" onClick={() => onHandAcceptFriend()}>
                                <BsCheckLg /> <p className="accept-text">Accept</p>
                            </div>
                            <div className="deny" onClick={() => onHandleDeny()}>
                                <GrClose /> <p className="deny-text">Deny</p>
                            </div>
                        </div>
                    </div>
                )
                : (!sentInvitation ? 
                (!checkFriends() && 
                    <div className="addFriend" onClick={() => onHandleAddFriend()}>
                        <FiUserPlus /> <p className="add-text">Add friend</p>
                    </div>) : 
                    (!checkFriends() && <div className="sentInvitation">
                        <AiOutlineCheck /> <p className="sent-text">Sent invitation</p>
                    </div>))
                    }
            <div className="chat-messages">
                {
                    messages.map((message, index) => {
                        return (<div ref={scrollRef} key={index}>
                            <div className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>);
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>)}
    </>
    );
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 10% 68% 12%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-auto-rows: 15% 70% 15%;
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }    
    }
    .addFriend {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #9186f3;
        cursor: pointer;
        .add-text {
            margin-left: 0.5rem;
        }
    }  
    .sentInvitation {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
        background-color: #ccc;
        .sent-text {
            margin-left: 0.5rem;
        }
    } 
    .haveInvitation {
        display: grid;
        grid-template-rows: 50% 50%;
        background-color: #16151584;
        overflow: hidden;
        .title-invitation {
            color: #fff;
            text-align: center;
            padding: 0.5rem 0;
        }
        .btn-response-invitation {
            width: 100%;
            display: grid;
            grid-template-columns: 50% 50%;
            .accept {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #5fb85f;
                padding: 0.3rem 0;
                cursor: pointer;
            }
            .deny {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #ccc;
                padding: 0.3rem 0;
                cursor: pointer;
            }
        }

    }
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .received {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;

export default ChatContainer;