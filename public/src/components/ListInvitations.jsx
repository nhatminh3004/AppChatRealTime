import styled from "styled-components";
import React from "react";

import InvitationAvatar from "../assets/invitations.png"

function ListInvitations() {
    return <Container>
        <div className="header">
            <img src={InvitationAvatar}/>
            <p>List invitations</p>
        </div>
    </Container>;
}

const Container = styled.div`
    display: flex;
    /* position: relative; */
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 100%;
    /* gap: 0.1rem; */
    overflow: hidden;
    background-color: #f4f5f7;
    .header {
        min-height: 5rem;
        width: 100%;
        cursor: pointer;
        padding: 0.4rem 0.5rem;
        gap:1rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        img {
            height: 3rem;
        }
        p {
            font-size: 1.5rem;
            font-weight: bold;
        }
    }
`; 

export default ListInvitations;