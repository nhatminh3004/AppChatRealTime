import React, { useState } from 'react'
import {AiFillMessage, AiOutlineMessage} from 'react-icons/ai'
import {FaAddressBook, FaRegAddressBook} from 'react-icons/fa'
import styled from 'styled-components';

function SidebarNav({changeNav, haveInvitation}) {
    const [isSelectMessage, setIsSelectMessage] = useState(true);
    const onHandleSelect = (isMessageNav) => {
        setIsSelectMessage(isMessageNav);
        changeNav(isMessageNav);
    }
    return (
    <Container>
        <div className={`button ${isSelectMessage ? "selected" : ""}`} onClick={() => onHandleSelect(true)}>{isSelectMessage? <AiFillMessage/>:<AiOutlineMessage/>}</div>
        <div className={`button ${!isSelectMessage ? "selected" : ""}`} onClick={() => onHandleSelect(false)}>{!isSelectMessage? <FaAddressBook/>:<FaRegAddressBook/>}{haveInvitation ? <div className='notice'></div> : null}</div>
    </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    .button {
        display: flex;
        position: relative;
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
        .notice {
            position: absolute;
            height: 1rem;
            width: 1rem;
            top: 0;
            right: -5px;
            border-radius: 50%;
            background-color: red;
        }
    }
    .selected {
        background-color: #9186f3;
    }
`;

export default SidebarNav;