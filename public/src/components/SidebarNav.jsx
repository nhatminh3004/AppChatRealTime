import React, { useState } from 'react'
import { useEffect } from 'react';
import {AiFillMessage, AiOutlineMessage} from 'react-icons/ai'
import {FaAddressBook, FaRegAddressBook} from 'react-icons/fa'
import styled from 'styled-components';

function SidebarNav({changeNav}) {
    const [isSelectMessage, setIsSelectMessage] = useState(true);
    const onHandleSelect = (isMessageNav) => {
        setIsSelectMessage(isMessageNav);
        changeNav(isMessageNav);
    }
    return (
    <Container>
        <div className={`button ${isSelectMessage ? "selected" : ""}`} onClick={() => onHandleSelect(true)}>{isSelectMessage? <AiFillMessage/>:<AiOutlineMessage/>}</div>
        <div className={`button ${!isSelectMessage ? "selected" : ""}`} onClick={() => onHandleSelect(false)}>{!isSelectMessage? <FaAddressBook/>:<FaRegAddressBook/>}</div>
    </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.8rem;
        background-color: #ffffff39;
        border: none;
        cursor: pointer;
        svg {
            font-size: 1.3rem;
            color: #ebe7ff;
        }
    }
    .selected {
        background-color: #9186f3;
    }
`;

export default SidebarNav;