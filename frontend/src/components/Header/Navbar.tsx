import React, {FC} from 'react';
import {publicRoutings, privateRoutings} from "./routings";
import { Link } from "react-router-dom";
import styles from "./header.module.css"
import {v4 as uuidv4} from "uuid";

const PublicLinks = publicRoutings.map((link) => <Link to={link.path} className={styles.menu} key={uuidv4()}>{link.title}</Link>)

const PrivateLinks = privateRoutings.map((link) => <Link to={link.path} className={styles.menu} key={uuidv4()}>{link.title}</Link>)

const Navbar: FC = () => {
    const isAuth = false
    return (
        <>
            {isAuth ? PrivateLinks : PublicLinks}
        </>
    );
}

export default Navbar;