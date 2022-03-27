import React, {FC, useState} from 'react';
import {Discussion} from "../../../types/discussion";
import DiscussionItem from "../Item/DiscussionItem";
import styles from "./discussion_list.module.css"
import {motion} from "framer-motion"
import {PlusCircleIcon} from "@heroicons/react/outline";
import Modal from "../../Modal/Modal";
import CreateDiscussion from "../../Form/Discussion/CreateDiscussion";

interface DiscussionListProps {
    discussions: Discussion[]
}

const discussionsVariants = {
    visible: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: {
            delay: i * 0.03
        }
    }),
    hidden: {x: -100, opacity: 0}
}

const DiscussionList: FC<DiscussionListProps> = ({discussions}) => {
    const [active, setActive] = useState<boolean>(false)
    return (
        <div className={styles.container}>
            <main className={styles.list}>
                <header
                    className={styles.header}
                    onClick={() => setActive(true)}>
                    <PlusCircleIcon className="m-3 h-7"/>
                    <span>СОЗДАТЬ</span>
                </header>
                {discussions.map((discussion, index) =>
                    <motion.div
                        key={discussion.id}
                        variants={discussionsVariants}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{amount: 0.3, once: true}}
                        custom={index}
                    >
                        <DiscussionItem discussion={discussion}/>
                    </motion.div>
                )}
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
