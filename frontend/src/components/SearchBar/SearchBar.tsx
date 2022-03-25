import React from 'react';
import styles from "./search_bar.module.css"
import {SearchIcon, XIcon} from "@heroicons/react/solid";

const SearchBar = () => {
    return (
        <div className={styles.container}>
            <SearchIcon className={styles.icon}/>
            <input type="text" className={styles.search_bar} placeholder="Поиск"/>
            <XIcon className={styles.icon}/>
        </div>
    );
}

export default SearchBar;
