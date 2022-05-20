import React, {useState} from 'react';
import styles from "./chat-room.module.css"
import {useChat} from "../../hooks/useChat";


const ChatRoom = () => {

    const [currentMessage, setCurrentMessage] = useState<string>('')
    const {messages, sendMessage} = useChat()

    const allMessages = messages.map((message, key)=> {
        return <div key={key} className="w-full bg-white h-16 mb-1 p-2">
            {message}
        </div>
    })

    const messageHandler = () => {
        sendMessage(currentMessage)
    }
    return (
        <div className={styles.container}>
            <header className="h-[10%] bg-peach rounded-t-md"></header>
            <div className="h-[70%] bg-zinc-300 overflow-y-scroll">
                {allMessages}
            </div>
            <footer className="flex flex-col justify-center items-center h-[20%] bg-peach rounded-b-md">
                <input type="text" className="w-[500px] h-20 outline-none p-5 rounded-md" value={currentMessage}
                       onChange={(e) => setCurrentMessage(e.target.value)}/>
                <button className="bg-yellow-400 w-[500px] h-10" onClick={messageHandler}>Отправить</button>
            </footer>
        </div>
    );
}

export default ChatRoom;
