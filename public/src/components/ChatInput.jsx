import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import { BsImage } from 'react-icons/bs';
import axios from 'axios';
import { sendImagesRoute } from '../utils/APIRoutes';
import { GrAttachment } from 'react-icons/gr';
import { ImAttachment } from 'react-icons/im';

function ChatInput({handleSendMsg, handleFileUpload}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const inputFile = useRef(null);

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    }
    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
    };
    
    return <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={(handleEmojiPickerHideShow)}/>
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
            <div className="addImage">
                <input type='file' id='file' ref={inputFile} accept="image/png, image/jpeg" multiple={true} onChange={handleFileUpload} style={{display: 'none'}}/>
                <button className='btn-addImage' onClick={onButtonClick}><BsImage /></button>
            </div>
            <div className="addImage">
                <input type='file' id='file' ref={inputFile} multiple={true} onChange={handleFileUpload} style={{display: 'none'}}/>
                <button className='btn-addImage' onClick={onButtonClick}><ImAttachment /></button>
            </div>
        </div>
        <form action="" className="input-container" onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder='type your message here' value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button className="submit">
                <IoMdSend />
            </button>
        </form>
    </Container>;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #080420;
    padding: 15px 2rem;
    padding-bottom: 0.3rem;
    gap: 0.5rem;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        padding: 0 1rem;
        gap: 1rem;

    }
    .button-container {
        display: flex;
        color: white;
        gap: 1rem;
        .emoji {
            cursor: pointer;
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ebe7ff;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb {
                        background-color: #9186f3;
                    }
                } 
                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }
                .emoji-search {
                    background-color: transparent;
                    border-color: #9186f3;
                }
                .emoji-group:before {
                    background-color: #080420;
                }
            }
        }
        .addImage {
            cursor: pointer;
            .btn-addImage {
                background-color: transparent;
                svg {
                    font-size: 1.5rem;
                    color: #ebe7ff;
                    cursor: pointer;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff43;
        input {
            width: 90%;
            background-color: transparent;
            color: white;
            border:none;
            padding-left: 1rem;
            padding-block: 0.5rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display:flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            cursor: pointer;
            svg {
                font-size: 1rem;
                color: white;
            }
        }

    }
`;

export default ChatInput;