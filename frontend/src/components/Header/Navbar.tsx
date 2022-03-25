import React, {FC} from 'react';
import {publicRoutings, privateRoutings} from "./routings";
import { Link } from "react-router-dom";
import styles from "./header.module.css"
import {useRecoilValue, useSetRecoilState} from "recoil";
import {isAuthState} from "../../store/atoms";

const PublicLinks = publicRoutings.map((link) => <Link to={link.path} className={styles.menu} key={link.title}>{link.title}</Link>)

const PrivateLinks = privateRoutings.map((link) => <Link to={link.path} className={styles.menu} key={link.title}>{link.title}</Link>)

const Navbar: FC = () => {
    const isAuth = useRecoilValue(isAuthState)
    const setIsAuth = useSetRecoilState(isAuthState)
    return (
        <>
            <input type="checkbox" checked={isAuth} onChange={() => setIsAuth(!isAuth)}/>
            {isAuth ? PrivateLinks : PublicLinks}
        </>
    );
}

export default Navbar;
