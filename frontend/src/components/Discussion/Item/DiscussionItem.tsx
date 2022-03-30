import React, {FC} from 'react';
import {Discussion} from "../../../types/discussion";
import {KeyIcon} from "@heroicons/react/outline";
import anonymousIcon from "../../../images/anonymous.svg"
import styles from "./discussion_item.module.css"
import {BASE_URL} from "../../../constants";

interface DiscussionItemProps {
    discussion: Discussion
}

const DiscussionItem: FC<DiscussionItemProps> = ({discussion}) => {
    return (
        <div className={styles.container}>
            <img className={styles.avatar} src={`${BASE_URL}/${discussion.poster}`}/>
            <div className={styles.details}>
                <span className={styles.title}>{discussion.title}</span>
                <div className={styles.icon_wrap}>
                    {discussion.anonymous ? <img src={anonymousIcon} alt="anonymous" className={styles.icon}/> : ""}
                    {discussion.password ? <KeyIcon className={styles.icon}/> : ''}
                </div>
            </div>
        </div>
    );
}

export default DiscussionItem;
