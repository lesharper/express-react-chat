import React from 'react';
import styles from "./loader.module.css"
import {motion} from "framer-motion"

const blockVariants: any = {
    hidden: {
        height: 0,
    },
    visible: (i: number) => ({
        height: 50,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.085
        }
    })
}

const blocks = Array(3).fill(0).map((block, key) =>
    <motion.div
        key={key}
        className={styles.block}
        variants={blockVariants}
        initial='hidden'
        animate='visible'
        custom={key}
    />)


const Loader = () => {
    return (
        <div className={styles.loader}>
            {blocks}
        </div>
    );
}

export default Loader;
