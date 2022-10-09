import React from 'react';
import styled from "styled-components";
import AvatarDefault from "../assets/avatar_default.png"

function ContactItems({conversations, changeCurrentChat, currentSelected}) {
    return ( 
        <Container>
            {
                (conversations.map((conversation, index) => {
                    return  (
                        <div 
                        className={`contact ${conversation.user_info._id === currentSelected ? "selected" : ""}`} 
                        key={index}
                        onClick={() => changeCurrentChat(index, conversation.user_info)}
                                    >
                            <div className="avatar">
                                {conversation.user_info && conversation.user_info.avatarImage != "" ? 
                                    <img src={`data:image/svg+xml;base64,${conversation.user_info.avatarImage}`} alt="avatar"/>
                                    : <img src={AvatarDefault} alt="avatar"/>
                                }
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
        </Container>
     );
}

const Container = styled.div`
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
`;

export default ContactItems;