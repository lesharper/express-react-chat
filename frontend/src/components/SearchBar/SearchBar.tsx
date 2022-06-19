import React, {useState} from 'react';
import styles from "./search_bar.module.css"
import {SearchIcon, XIcon} from "@heroicons/react/solid";
import {useRecoilValue} from "recoil";
import {all_discussionsSelector} from "../../store/selectors/all_discussions";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../constants";
import anonymousIcon from "../../images/anonymous.svg";
import {KeyIcon} from "@heroicons/react/outline";

const SearchBar = () => {

    const [search, setSearch] = useState('')
    const changeHandler = ({target}: any) => {
        setSearch(target.value)
    }
    const reset = () => {
        setSearch('')
    }

    const all_discussions = useRecoilValue(all_discussionsSelector)
    const filtered = all_discussions.filter(item => item.title.includes(search))

    console.log(all_discussions)
    return (
        <>
            <div className={styles.container}>
                <SearchIcon className={styles.icon_search}/>
                <input type="text" className={styles.search_bar} placeholder="Глобальный поиск" value={search}
                       onChange={changeHandler}/>
                <XIcon className={styles.icon_search} onClick={() => reset()}/>
            </div>

            {!!search.length && search.length > 0 &&
                <div className="absolute top-20 flex flex-col items-center bg-yellow-400 w-full">
                    {filtered.map((discussion, key) =>
                        <Link className={styles.container_item} to={`/chat/${discussion.id}`} key={key}>
                            <img className={styles.avatar} src={`${BASE_URL}/${discussion.poster}`}/>
                            <div className={styles.details}>
                                <span className={styles.title}>{discussion.title}</span>
                                <div className={styles.icon_wrap}>
                                    {discussion.anonymous &&
                                        <img src={anonymousIcon} alt="anonymous" className={styles.icon}/>}
                                    {discussion.password && <KeyIcon className={styles.icon}/>}
                                </div>
                            </div>
                        </Link>
                    )}
                </div>}
        </>

    );
}

export default SearchBar;
