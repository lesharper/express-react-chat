import React from 'react';
import {useParams} from "react-router";
import ChatRoom from "../components/ChatRoom/ChatRoom";

const Chat = () => {
    const {id} = useParams()
    return (
        <div className="h-screen flex justify-center">
            <ChatRoom/>
        </div>
    );
}

export default Chat;
