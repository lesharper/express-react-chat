import React, {FC} from 'react';
import styles from "./post.module.css"
import Post from "./Post";
import post_1 from "../../images/post_item1.svg"
import post_2 from "../../images/post_item2.svg"
import post_3 from "../../images/post_item3.svg"
import post_4 from "../../images/post_item4.svg"
import post_5 from "../../images/post_item5.svg"
import post_6 from "../../images/post_item6.svg"


const ContainerPosts: FC = () => {
    return (
        <div className={styles.container}>
            <Post image={post_1} description="Общайтесь с родными и близкими, на любом расстоянии"/>
            <Post image={post_2} description="Находите людей с общими интересами"/>
            <Post image={post_3} description="Обменивайтесь изображениями или документами"/>
            <Post image={post_4} description="Система хеширования данных пользователя"/>
            <Post image={post_5} description="Возможность создания беседы с паролем или полной анонимностью"/>
            <Post image={post_6} description="Делитесь интересными событиями из жизни"/>
        </div>
    );
}

export default ContainerPosts;