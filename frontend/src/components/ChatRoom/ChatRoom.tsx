// @ts-ignore
import React, {startTransition, useEffect, useRef, useState} from 'react';
import styles from "./chat-room.module.css"
import {useChat} from "../../hooks/useChat";
import {ArrowLeftIcon, ChevronRightIcon, DotsHorizontalIcon, PencilIcon, XIcon} from "@heroicons/react/solid";
import {DocumentAddIcon} from "@heroicons/react/outline";
import {useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState} from "recoil";
import {userAtom} from "../../store/atoms/user";
import {BASE_URL} from "../../constants";
import io, {Socket} from 'socket.io-client';
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
//@ts-ignore
import ScrollToBottom from "react-scroll-to-bottom"
import {Message} from "../../types/message";
import {all_discussionsSelector} from "../../store/selectors/all_discussions";
import Modal from "../Modal/Modal";
import InfoDiscussion from "../InfoDiscussion/InfoDiscussion";
import {currentDiscussionAtom} from "../../store/atoms/currentDiscussion";
import {discussionsByUserSelector} from "../../store/selectors/discussionsByUser";
import {User} from "../../types/user";


const socket = io(BASE_URL, {autoConnect: false})

const ChatRoom = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const user = useRecoilValue(userAtom)
    const setCurrentDiscussion = useSetRecoilState(currentDiscussionAtom)

    const refreshDiscussionsByUser = useRecoilRefresher_UNSTABLE(discussionsByUserSelector);
    const refreshAllDiscussions = useRecoilRefresher_UNSTABLE(all_discussionsSelector);

    const all_discussions = useRecoilValue(all_discussionsSelector)
    const discussion = all_discussions.filter(item => item.id == Number(id))[0]

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const [currentEditMessage, setCurrentEditMessage] = useState<Message>()

    const [confirm, setConfirm] = useState<boolean>(!discussion.password.length)
    const [password, setPassword] = useState<string>('')
    const [attempt, setAttempt] = useState<number>(3)

    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)

    const changeMessageHandler = ({target}: any) => setMessage(target.value)
    const changePasswordHandler = ({target}: any) => setPassword(target.value)

    const verify = () => {
        if (password == discussion.password)
            setConfirm(true)
        else
            setAttempt((prev) => prev - 1)
    }

    const exitHandler = () => {
        socket.emit('exit_room')

        startTransition(() => {
            refreshDiscussionsByUser()
        })
        navigate('/messenger')
    }


    const deleteHandler = () => {
        socket.emit('delete_room')
    }

    const kickHandler = (user: User | undefined) => {
        socket.emit('kick_user', (user))
    }

    const sendMessage = () => {
        if (message.length > 0)
            socket.emit(`send_message`, {message})

        setMessage('')
    }

    const joinRoom = () => {
        socket.emit('join_room', {id, user})

        startTransition(() => {
            refreshDiscussionsByUser()
        })
    }

    const leaveRoom = () => {
        socket.emit('leave_room')
    }

    const editMessage = () => {
        socket.emit('edit_message', currentEditMessage)
    }

    const deleteMessage = () => {
        socket.emit('delete_message', currentEditMessage)
    }


    useEffect(() => {
        if (attempt <= 0)
            navigate(-1)
    }, [attempt])

    useEffect(() => {
        if (confirm)
            joinRoom()
    }, [confirm])

    useEffect(() => {
        setCurrentDiscussion(Number(id))

        socket.on('receive_message', (data: Message) => {
            setMessages((prev: any) => [...prev, data])
        })

        socket.on('welcome', (data: Message) => {
            setMessages((prev: any) => [...prev, data])
        })

        socket.on('exit_room', (data: Message) => {
            setMessages((prev: any) => [...prev, data])
        })

        socket.on('discussion_messages', (data: Message[]) => {
            setMessages(data)
        })

        socket.on('kick_user', (id: number) => {
            if (user?.id == id)
                navigate('/messenger')
        })

        socket.on('edit_message', (data: Message) => {
            setMessages((prev) => {
                const index = prev.findIndex((item) => item.id == data.id)
                if (index >= 0)
                    prev[index].message = data.message
                return prev
            })
            setOpenEditModal(false)
        })

        socket.on('delete_message', (id: number) => {
            setMessages((prev) => prev.filter(item => item.id != id))
            setOpenEditModal(false)
        })


        socket.on('delete_room', () => {
            startTransition(() => {
                refreshDiscussionsByUser()
                refreshAllDiscussions()
            })

            navigate('/messenger')
        })


        socket.connect()
        return () => {
            leaveRoom()
            socket.disconnect()
        }
    }, [])

    const parseDate = (date: string) => {
        return new Date(date).toLocaleString().split(', ')[1]
    }

    const editHandler = (message: Message) => {
        setCurrentEditMessage({...message})
        setOpenEditModal(true)
    }

    const userMessage = (item: Message, key: number) => {
        return <div
            className={item.username == user?.username ? "flex justify-end w-full" : "flex justify-start w-full"}
            key={key}>
            <div className="flex max-w-[650px] min-w-[300px] bg-white m-2 p-2 rounded-md shadow-md">
                {!discussion.anonymous && <img src={`${BASE_URL}/${item.avatar}`} alt="avatar"
                                               className="h-[100px] w-[100px] object-cover rounded-full"/>}
                <div className="w-full flex flex-col">
                    {!discussion.anonymous &&
                        <header className="flex justify-between items-center h-7 p-2 font-black text-peach-dark-500">
                            <span>{item.username}</span>
                            {item.user_id == user?.id &&
                                <PencilIcon className="h-5 cursor-pointer" onClick={() => editHandler(item)}/>}
                        </header>}
                    <span className="break-all p-2 ">{item.message}</span>
                    <footer
                        className="flex items-center justify-end h-7 text-zinc-400 p-5">{parseDate(item.date_send)}</footer>
                </div>
            </div>
        </div>
    }


    const serverMessage = (item: Message, key: number) => {
        return <div className="flex justify-center w-full" key={key}>
            <div className="flex max-w-[650px] min-w-[300px] bg-white m-2 p-2 rounded-md shadow-md">
                <div className="w-full flex items-center flex-col">
                    {
                        discussion.anonymous
                            ? <span className="break-all p-2 ">Пользователь {item.message}</span>
                            : <span className="break-all p-2 ">{item.username} {item.message}</span>
                    }
                </div>
            </div>
        </div>
    }


    const allMessages = messages.map((item: Message, key: number) => {
        if (item.server)
            return serverMessage(item, key)
        else
            return userMessage(item, key)
    })

    if (!confirm) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <ArrowLeftIcon className={styles.icon} onClick={() => navigate('/messenger')}/>
                    <span className={styles.title}>{discussion.title}</span>
                    <DotsHorizontalIcon className={styles.icon}/>
                </header>
                <div className="flex flex-col justify-center items-center h-[700px] w-full ">
                    <span className="text-2xl font-bold">Необходимо ввести пароль</span>
                    <span className="text-xl text-zinc-500">Осталось {attempt} попытки</span>
                    <input type="password"
                           className="outline-none p-5 border-2 h-[50px] w-[300px] rounded-md m-5 text-xl"
                           placeholder="Пароль" value={password} onChange={changePasswordHandler}/>
                    <button className="bg-yellow-400 p-5 w-[300px] text-xl rounded-md"
                            onClick={() => verify()}>Отправить
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Modal active={openInfoModal} setActive={setOpenInfoModal}>
                <InfoDiscussion discussion={discussion} setActive={setOpenInfoModal} exitHandler={exitHandler}
                                deleteHandler={deleteHandler} kickHandler={kickHandler}/>
            </Modal>
            <Modal active={openEditModal} setActive={setOpenEditModal}>
                <div
                    className="flex flex-col justify-evenly p-10 h-[250px] w-[500[x] bg-zinc-200 border-2 border-black">
                    <input
                        type="text"
                        defaultValue={currentEditMessage?.message}
                        placeholder='Напишите сообщение...'
                        className="p-3 outline-none"
                        onChange={(e) => setCurrentEditMessage((prev) => {
                            // @ts-ignore
                            prev.message = e.target.value
                            return prev
                        })}
                    />
                    <button className="w-full bg-yellow-400 p-2" onClick={editMessage}>
                        Изменить
                    </button>
                    <button className="w-full bg-yellow-400 p-2 text-red-500" onClick={deleteMessage}>
                        Удалить
                    </button>
                </div>
            </Modal>
            <header className={styles.header}>
                <ArrowLeftIcon className={styles.icon} onClick={() => navigate('/messenger')}/>
                <span className={styles.title}>{discussion.title}</span>
                <DotsHorizontalIcon className={styles.icon} onClick={() => setOpenInfoModal(true)}/>
            </header>
            <ScrollToBottom className={styles.all_messages}>
                {allMessages}
            </ScrollToBottom>
            <footer className={styles.controls}>
                <div>
                    <label>
                        <DocumentAddIcon className={styles.icon}/>
                        <input type="file" className="hidden"/>
                    </label>
                    <textarea rows={2} cols={60} placeholder="Напишите сообщение..." value={message}
                              onChange={changeMessageHandler}/>
                    <button onClick={sendMessage}><ChevronRightIcon className={styles.icon}/></button>
                </div>
            </footer>
        </div>
    );
}

export default ChatRoom;
