import React, {FC} from 'react';
import styles from "./post.module.css"
import Post from "./Post";
import {motion} from "framer-motion"
import post_1 from "../../images/post_item1.svg"
import post_2 from "../../images/post_item2.svg"
import post_3 from "../../images/post_item3.svg"
import post_4 from "../../images/post_item4.svg"
import post_5 from "../../images/post_item5.svg"
import post_6 from "../../images/post_item6.svg"

const posts = [
    {image: post_1, description: 'Общайтесь с родными и близкими, на любом расстоянии'},
    {image: post_2, description: 'Находите людей с общими интересами'},
    {image: post_3, description: 'Обменивайтесь изображениями или документами'},
    {image: post_4, description: 'Система хеширования данных пользователя'},
    {image: post_5, description: 'Возможность создания беседы с паролем или полной анонимностью'},
    {image: post_6, description: 'Делитесь интересными событиями из жизни'},
]

const postVariants = {
    visible: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: {
            delay: i * 0.075
        }
    }),
    hidden: {x: -100, opacity: 0}
}

const ContainerPosts: FC = () => {
    return (
        <div className={styles.container}>
            {posts.map((post, index)  =>
                <motion.section
                    key={post.image}
                    variants={postVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{amount: 0.3, once: true}}
                    custom={index}
                >
                    <Post image={post.image} description={post.description}/>
                </motion.section>
            )}
        </div>
    );
}

export default ContainerPosts;
