import React from 'react';
import {FC} from "react";
import styles from "./footer.module.css"

const Footer: FC = () => {
    return (
        <div className={styles.footer}>
            <span className={styles.title} >NCHAT</span>
            <sub className={styles.year}>2022</sub>
        </div>
    );
}

export default Footer;