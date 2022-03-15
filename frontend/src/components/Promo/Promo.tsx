import React from 'react';
import styles from "./promo.module.css"
import promo_img from "../../images/chat.svg"


const Promo = () => {
    return (
        <div className={styles.promo}>
            <img src={promo_img} alt="promo" className={styles.image}/>
            <span className={styles.text}>Используйте сервис Nchat для эффективного и удобного общения!</span>
        </div>
    );
}

export default Promo;