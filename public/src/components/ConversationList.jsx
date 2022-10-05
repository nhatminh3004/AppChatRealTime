import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import Logo from "../assets/logo.svg"
import { searchUsers } from '../utils/APIRoutes';
import ContactItems from './ContactItems';
import Logout from './Logout';
import SearchResults from './SearchResults';
import AvatarDefault from "../assets/avatar_default.png"

function ConversationList({ conversations, currentUser, changeChat, socket}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [searchKey, setSearchKey] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
    const onHandleSearch = async (e) => {
        e.preventDefault();
        const data = await axios.get(`${searchUsers}/${searchKey}`);
        setSearchResults(data.data);
    }
    const onHandleClearSearchResults = () => {
        setSearchResults([]);
    }
    return <>
        {
            currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt='logo'/>
                        <h3>snappy</h3>
                    </div>
                    <form onSubmit={(e) => onHandleSearch(e)} className="search">
                        <input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='Tìm theo tên và số điện thoại'/> 
                        <button className='submit'>
                            <AiOutlineSearch/>
                        </button>
                    </form>
                    {
                        searchResults.length != 0 ? 
                        <SearchResults searchResults={searchResults} changeCurrentChat={changeCurrentChat} currentSelected={currentSelected} onHandleClearSearchResults={onHandleClearSearchResults}/>
                        : <ContactItems conversations={conversations} changeCurrentChat={changeCurrentChat} currentSelected={currentSelected}/>
                    
                    }
                    <div className="current-user">
                        <div className="avatar">
                            {currentUserImage && currentUserImage != "" ? 
                                <img src={`data:image/png;base64,${currentUserImage}`} alt="avatar"/>
                                : <img src={AvatarDefault} alt="avatar"/>
                            }
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
    grid-template-rows: 10% 10% 65% 15%;
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
    .search {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 0.5rem;
        gap: 0.5rem;
        input {
            height: 70%;
            width: 70%;
            padding-inline: 0.5rem;
            border-radius: 1rem;
        }
        .submit {
            padding: 0.4rem;
            font-size: 1rem;
            border-radius: 1rem;
            cursor: pointer;
            background-color: #9186f3;
            color: white;
            font-weight: 500;
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
                height: 3rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: white;
                max-width: 150px;
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