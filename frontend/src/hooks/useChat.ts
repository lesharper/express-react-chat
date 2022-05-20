import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";



export const useChat = () => {
    const SERVER_URL = 'http://localhost:7000'
    const socket: any = useRef(null)

    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        socket.current = io(SERVER_URL)

        socket.current.on('message', (data: string) => {
            const message = data
            setMessages((prev) => [...prev, message])
        })


        return () => {
            socket.current.disconnect();
        };
    })

    const sendMessage = (msg: string) => {
        socket.current.emit('message', msg)
    }

    return {messages, sendMessage}

}
