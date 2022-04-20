import React from 'react';
import styles from "./chat-room.module.css"

const ChatRoom = () => {
    return (
        <div className={styles.container}>
            <header className="h-[10%] bg-peach rounded-t-md"></header>
            <div className="h-[70%] bg-zinc-300"></div>
            <footer className="h-[20%] bg-peach rounded-b-md"></footer>
        </div>
    );
}

export default ChatRoom;
