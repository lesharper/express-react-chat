import React, {FC} from 'react';
import {publicRoutings, privateRoutings} from "./routings";
import {Link, useNavigate} from "react-router-dom";
import styles from "./header.module.css"
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authSelector} from "../../store/selectors/auth";
import {userAtom} from "../../store/atoms/user";

const PublicLinks = publicRoutings.map((link) => <Link to={link.path} className={styles.menu}
                                                       key={link.path}>{link.title}</Link>)

const PrivateLinks = privateRoutings.map((link) => <Link to={link.path} className={styles.menu}
                                                         key={link.path}>{link.title}</Link>)

const Navbar: FC = () => {
    const navigate = useNavigate()
    const isAuth = useRecoilValue(authSelector)
    const setUser = useSetRecoilState(userAtom)

    const logout = () => {
        setUser(undefined)
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            {isAuth ?
                PrivateLinks :
                PublicLinks
            }
            {isAuth && <button className={styles.menu} onClick={logout}>Выйти</button>}
        </>
    );
}

export default Navbar;
