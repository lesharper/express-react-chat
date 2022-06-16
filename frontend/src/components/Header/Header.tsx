import React, {FC, useState} from 'react';
import styles from "./header.module.css"
import Navbar from "./Navbar";
import {MenuIcon, UserIcon} from "@heroicons/react/solid";
import Logo from "./Logo";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import {useRecoilValue} from "recoil";
import {authSelector} from "../../store/selectors/auth";

interface HeaderProps  {
    toggle: () => void
}

const Header: FC<HeaderProps> = ({toggle}) => {
    const [open, setOpen] = useState<boolean>(false)
    const isAuth = useRecoilValue(authSelector)
    return (
        <div className={styles.header}>
            <Logo/>
            {!isAuth && <MenuIcon className={styles.menu_icon} onClick={toggle}/>}

            {
                isAuth
                    ?  <ProfileMenu/>
                    :  <Navbar/>
            }

        </div>
    );
}

export default Header;
