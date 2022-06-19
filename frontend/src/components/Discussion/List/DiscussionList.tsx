import React, {FC, useState} from 'react';
import DiscussionItem from "../Item/DiscussionItem";
import styles from "./discussion_list.module.css"
import {motion} from "framer-motion"
import {PlusCircleIcon} from "@heroicons/react/outline";
import Modal from "../../Modal/Modal";
import CreateDiscussion from "../../Form/Discussion/CreateDiscussion";
import {useRecoilValue} from "recoil";
import {discussionsByUserSelector} from "../../../store/selectors/discussionsByUser";


const DiscussionList = () => {
    const [active, setActive] = useState<boolean>(false)
    const discussionsByUser = useRecoilValue(discussionsByUserSelector)

    return (
        <div className={styles.container}>
            <main className={styles.list}>
                <header
                    className={styles.header}
                    onClick={() => setActive(true)}>
                    <PlusCircleIcon className="m-3 h-7"/>
                    <span>СОЗДАТЬ</span>
                </header>
                {discussionsByUser?.map((discussion, key) => <DiscussionItem key={key} discussion={discussion}/>)}
            </main>
            <Modal active={active} setActive={setActive}>
                <div className="flex justify-center items-center w-max bg-gray-300 rounded-md shadow-md">
                    <CreateDiscussion clear={active}/>
                </div>
            </Modal>
        </div>
    );
}

export default DiscussionList;
