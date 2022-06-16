import React, {FC} from 'react';
import {privateRoutings} from "../Header/routings";
import {Link, useNavigate} from "react-router-dom";
import styles from "./profile-menu.module.css";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../../store/atoms/user";
import {logout} from "../../requests/user";


interface ProfileMenuDropdownProps {
    isOpen: boolean
    setIsOpen: (c: boolean) => void
}

const PrivateLinks = privateRoutings.map((link) => <Link to={link.path} className={styles.menu}
                                                         key={link.path}>{link.title}</Link>)

const ProfileMenuDropdown: FC<ProfileMenuDropdownProps> = ({isOpen, setIsOpen}) => {

    const navigate = useNavigate()
    const setUser = useSetRecoilState(userAtom)
    const logoutHandler = async () => {
        await logout()
        setUser(undefined)
        navigate('/')
    }

    return (
        <div className={isOpen ? styles.dropdown : "hidden"} onClick={() => setIsOpen(false)}>
            {PrivateLinks}
            <button className={styles.menu} onClick={logoutHandler}>Выйти</button>
        </div>
    );
}

export default ProfileMenuDropdown;
