import React from 'react';
import {ChatAlt2Icon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";
import styles from "./header.module.css"
import logo from "../../images/sun.png"

const Logo = () => {
    return (
        <div className={styles.logo}>
            <Link to="/"><img src={logo} alt="logo" className={styles.logo_icon}/></Link>
            <span className={styles.logo_text}>NCHAT</span>
        </div>
    )
}

export default Logo;