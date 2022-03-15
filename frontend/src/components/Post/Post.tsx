import React, {FC} from 'react';
import styles from "./post.module.css"

interface PostProps {
    image: string,
    description: string
}

const Post: FC<PostProps> = ({image, description}) => {
    return (
        <>
            <div className={styles.post}>
                <img src={image} alt="post" className={styles.image}/>
                <span className={styles.desc}>{description}</span>
            </div>
        </>


    );
}

export default Post;