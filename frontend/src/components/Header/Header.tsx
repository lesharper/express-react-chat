import React, {FC, useState} from 'react';
import styles from "./header.module.css"
import Navbar from "./Navbar";
import {MenuIcon, UserIcon} from "@heroicons/react/solid";
import Logo from "./Logo";

interface HeaderProps  {
    toggle: () => void
}

const Header: FC<HeaderProps> = ({toggle}) => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className={styles.header}>
            <Logo/>
            <MenuIcon className={styles.menu_icon} onClick={toggle}/>
            <Navbar/>
        </div>
    );
}

export default Header;