import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {BASE_URL} from "../constants";


export const useChat = (username:string | undefined) => {
    const socket: any = useRef(null)
    const token = localStorage.getItem('token')

    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        socket.current = io(BASE_URL, {query: {username, token}})

        socket.current.on('message', (data: string) => {
            const message = data
            setMessages((prev) => [...prev, message])
        })

        return () => {
            socket.current.disconnect();
        };
    }, [])




    const sendMessage = (msg: string) => {
        socket.current.emit('message', msg)
    }

    return {messages, sendMessage}

}
