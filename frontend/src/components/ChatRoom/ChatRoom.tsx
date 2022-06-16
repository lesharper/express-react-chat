import React, {useEffect, useRef, useState} from 'react';
import styles from "./chat-room.module.css"
import {useChat} from "../../hooks/useChat";
import {ArrowLeftIcon, ChevronRightIcon, DotsHorizontalIcon} from "@heroicons/react/solid";
import {DocumentAddIcon} from "@heroicons/react/outline";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../store/atoms/user";
import {BASE_URL} from "../../constants";
import io, {Socket} from 'socket.io-client';
import {useParams} from "react-router";
import {discussionsSelector} from "../../store/selectors/discussions";
import {useNavigate} from "react-router-dom";



const ChatRoom = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const user = useRecoilValue(userAtom)

    const [currentMessage, setCurrentMessage] = useState<string>('')
    const [messages, setMessages] = useState<string[]>([])

    const [isConnected, seIstConnected] = useState(false)
    const socket = useRef<Socket>()

    const discussions = useRecoilValue(discussionsSelector)
    const discussion = discussions.filter(item => item.id == Number(id))[0]

    const allMessages = messages.map((message, key) =>
        <div key={key} className={styles.my_message}>
            <div className={styles.message_text}>
                {message}
            </div>
        </div>
    )

    const connect = () => {
        if (!isConnected) {

            socket.current = io(BASE_URL, {transports: ['polling']})
            socket.current?.on('connect', () => {
                seIstConnected(true)
                console.log('Подключение установлено')
            })
        }

        socket.current?.on('message', (data) => setMessages((prev) => [...prev, data?.message]))
    }

    useEffect(() => {
        connect()

        return () => {
            console.log('Подключение отключено')
            socket.current?.disconnect()
        }
    }, [])

    const messageHandler = () => {
        if (currentMessage)
            sendMessage()
    }

    const sendMessage = () => {
        console.log('я еблан')
        socket.current?.emit("message", {message: currentMessage})
        setCurrentMessage('')
    }

    const changeHandler = ({target}: any) => setCurrentMessage(target.value)

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <ArrowLeftIcon className={styles.icon} onClick={() => navigate('/messenger')}/>
                <span className={styles.title}>{discussion.title}</span>
                <DotsHorizontalIcon className={styles.icon}/>
            </header>
            <div className={styles.all_messages}>
                {allMessages}
            </div>
            <footer className={styles.controls}>
                <div>
                    <button onClick={messageHandler}><DocumentAddIcon className={styles.icon}/></button>
                    <textarea rows={2} cols={60} placeholder="Напишите сообщение..." value={currentMessage}
                              onChange={changeHandler}/>
                    <button onClick={messageHandler}><ChevronRightIcon className={styles.icon}/></button>
                </div>
            </footer>
        </div>
    );
}

export default ChatRoom;
