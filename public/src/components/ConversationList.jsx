import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.svg"
import Logout from './Logout';

function ConversationList({conversations, currentUser, changeChat, socket}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    
    
    useEffect(() => {
        if(currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(contact._id);
        changeChat(contact);
    }
    return <>
        {
            currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt='logo'/>
                        <h3>snappy</h3>
                    </div>
                    <div className="contacts">
                        {
                            (conversations.map((conversation, index) => {
                                return  (
                                    <div 
                                    className={`contact ${conversation.user_info._id === currentSelected ? "selected" : ""}`} 
                                    key={index}
                                    onClick={() => changeCurrentChat(index, conversation.user_info)}
                                    >
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${conversation.user_info.avatarImage}`} alt="avatar"/>
                                        </div>
                                        <div className='message'>
                                            <div className="username">
                                                <h3>{conversation.user_info.username}</h3>
                                            </div>
                                            <div className="latestMessage">
                                                <p>{conversation.message.message.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                        
                        <Logout/>
                    </div>
                </Container>
            )
        }
    </>;
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;


    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap:1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 3rem;
                }   
            }
            .message {
                height: 7vh;
                display: grid;
                grid-template-rows: 55% 45%;
                .username {
                    h3 {
                        color: white;
                    }
                }
                .latestMessage {
                    width: 100%;
                    overflow: hidden;
                    p {
                        color: #ccc;
                    }
                }
            }
            
        }
        .selected {
            background-color: #9186f3;
        }
    }
    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: white;
                overflow: hidden;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px){
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default ConversationList;