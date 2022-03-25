import React, {FC} from 'react';
import {Discussion} from "../../../types/discussion";
import DiscussionItem from "../Item/DiscussionItem";
import styles from "./discussion_list.module.css"

interface DiscussionListProps {
    discussions: Discussion[]
}

const DiscussionList: FC<DiscussionListProps> = ({discussions}) => {
    return (
        <div className={styles.container}>
            <main className={styles.list}>
                {discussions.map(discussion => <DiscussionItem discussion={discussion} key={discussion.id}/>)}
            </main>
        </div>
    );
}

export default DiscussionList;
