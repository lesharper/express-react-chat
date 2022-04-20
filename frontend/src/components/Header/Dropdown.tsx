import React, {FC} from 'react';
import {privateRoutings, publicRoutings} from "./routings"
import {Link, useNavigate} from "react-router-dom";
import styles from "./header.module.css";
import {useRecoilValue, useSetRecoilState} from "recoil"
import {isAuthSelector} from "../../store/selectors";
import {userAtom} from "../../store/atoms";

interface DropdownProps {
    isOpen: boolean
    toggle: () => void
}

const PublicLinks = publicRoutings.map((link) => <Link to={link.path} className={styles.dropdown}
                                                       key={link.path}>{link.title}</Link>)

const PrivateLinks = privateRoutings.map((link) => <Link to={link.path} className={styles.dropdown}
                                                         key={link.path}>{link.title}</Link>)

const Dropdown: FC<DropdownProps> = ({isOpen, toggle}) => {

    const navigate = useNavigate()
    const isAuth = useRecoilValue(isAuthSelector)
    const setUser = useSetRecoilState(userAtom)

    const logout = () => {
        setUser(undefined)
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className={isOpen ? '' : "hidden"} onClick={toggle}>
            {isAuth ? PrivateLinks : PublicLinks}
            {isAuth && <button className={styles.dropdown} onClick={logout}>Выйти</button>}
        </div>
    );
}

export default Dropdown;
