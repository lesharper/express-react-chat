import React from 'react';
import styles from "./promo.module.css"
import promo_img from "../../images/chat.svg"
import {motion} from "framer-motion"

const Promo = () => {
    const imgVariants = {
        hidden: {x: -1000, opacity: 0},
        visible: {x: 0, opacity: 1},
    }
    const spanVariants = {
        hidden: {x: 1000, opacity: 0},
        visible: {x: 0, opacity: 1},
    }
    return (
        <div className={styles.promo}>
            <motion.img src={promo_img} alt="promo" className={styles.image} variants={imgVariants} initial='hidden' animate='visible'/>
            <motion.span className={styles.text} initial='hidden' animate='visible' variants={spanVariants}>Используйте сервис Nchat для эффективного и удобного общения!</motion.span>
        </div>
    );
}

export default Promo;
