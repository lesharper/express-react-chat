import React, {FC, useState} from 'react';
import {XIcon} from "@heroicons/react/solid";
import {Discussion} from "../../types/discussion";
import styles from "./info_discussion.module.css"
import {BASE_URL} from "../../constants";
import {useRecoilValue} from "recoil";
import {usersByDiscussionSelector} from "../../store/selectors/usersByDiscussion";
import {userAtom} from "../../store/atoms/user";
import {useNavigate} from "react-router-dom";
import anonymousIcon from "../../images/anonymous.svg";
import {KeyIcon} from "@heroicons/react/outline";
import {User} from "../../types/user";
import Modal from "../Modal/Modal";
import UpdateDiscussion from "../Form/Discussion/UpdateDiscussion";
import CreateDiscussion from "../Form/Discussion/CreateDiscussion";

interface InfoDiscussionProps {
    discussion: Discussion
    setActive: (c: boolean) => void
    exitHandler: () => void
    deleteHandler: () => void
    kickHandler: (user: User | undefined) => void
}

const InfoDiscussion: FC<InfoDiscussionProps> = ({discussion, setActive, exitHandler, deleteHandler, kickHandler}) => {

    const userByDiscussion = useRecoilValue(usersByDiscussionSelector)

    const user = useRecoilValue(userAtom)

    const navigate = useNavigate()

    const kickUserHandler = (user: User) => {
        kickHandler(user)
    }

    const [openEditDiscussionModal, setOpenEditDiscussionModal] = useState(false)

    const allUser = userByDiscussion.map((local_user, key) =>
        <div className="flex items-center w-full bg-zinc-200 p-5 mb-2 shadow-md" key={key}>
            <img src={`${BASE_URL}/${local_user.avatar}`} alt="avatar"
                 className="h-[100px] w-[100px] object-cover rounded-full"/>
            <div className="flex p-5  w-[400px] flex-col justify-center text-xl">
                <span className="break-all">Никнейм: {local_user.username}</span>
                <span className="break-all">Почта: {local_user.email}</span>
                {discussion.creator_id == local_user.id && <span>Создатель беседы</span>}
            </div>
            {user?.id == discussion.creator_id && local_user.id != user.id &&
                <XIcon className="h-7 cursor-pointer" onClick={() => kickUserHandler(local_user)}/>
            }
        </div>
    )

    return (
        <div className={styles.container}>
            <Modal active={openEditDiscussionModal} setActive={setOpenEditDiscussionModal}>
                <div className="flex justify-center items-center w-max bg-gray-300 rounded-md shadow-md">
                <UpdateDiscussion clear={openEditDiscussionModal} discussion={discussion}/>
                </div>
            </Modal>

            <header className={styles.header}>
                <span className="font-bold">Информация</span>
                <XIcon className={styles.icon} onClick={() => setActive(false)}/>
            </header>
            <section className="flex justify-center items-center p-10 bg-yellow-400">
                <img src={`${BASE_URL}/${discussion.poster}`} alt="poster"
                     className="h-[130px] w-[130px] object-cover rounded-full"/>
                <div className="flex justify-center p-5 flex-col w-[250px]">
                    <span className="flex  break-all text-xl">Название: {discussion.title}</span>
                    <span className="flex break-all text-xl">Описание: {discussion.description}</span>
                    <div className="flex justify-center">
                        {discussion.anonymous && <img src={anonymousIcon} alt="anonymous" className={styles.icon}/>}
                        {discussion.password && <KeyIcon className={styles.icon}/>}
                    </div>

                </div>

            </section>
            {!discussion.anonymous &&
                <main className="flex flex-col">
                    <span className="flex h-16 justify-center items-center font-bold w-full text-xl bg-white">Все участники</span>
                    <div className="h-[300px] overflow-y-scroll">
                        {allUser}
                    </div>
                </main>
            }
            <footer className={styles.footer}>
                {!(discussion.creator_id == user?.id) &&<button onClick={exitHandler}>Выйти из беседы</button>}
                {discussion.creator_id == user?.id && <button onClick={() => setOpenEditDiscussionModal(true)}>Редактировать беседу</button>}
                {discussion.creator_id == user?.id && <button onClick={deleteHandler}>Удалить беседу</button>}
            </footer>
        </div>
    );
}

export default InfoDiscussion;
