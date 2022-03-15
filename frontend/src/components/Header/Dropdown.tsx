import React, {FC} from 'react';
import {privateRoutings, publicRoutings} from "./routings"
import {Link} from "react-router-dom";
import styles from "./header.module.css";
import { v4 as uuidv4 } from "uuid";

interface DropdownProps {
    isOpen: boolean
    toggle: () => void
}

const PublicLinks = publicRoutings.map((link) => <Link to={link.path} className={styles.dropdown} key={uuidv4()}>{link.title}</Link>)

const PrivateLinks = privateRoutings.map((link) => <Link to={link.path} className={styles.dropdown} key={uuidv4()}>{link.title}</Link>)

const Dropdown: FC<DropdownProps> = ({isOpen, toggle}) => {
    const isAuth = false
    return (
        <div className={isOpen ? '' : "hidden"} onClick={toggle}>
            {isAuth ? PrivateLinks : PublicLinks}
        </div>
    );
}

export default Dropdown;