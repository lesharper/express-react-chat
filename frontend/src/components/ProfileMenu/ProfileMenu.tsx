import React, {useState} from 'react';
import styles from "./profile-menu.module.css"
import {useRecoilValue} from "recoil";
import {userAtom} from "../../store/atoms/user";
import {BASE_URL} from "../../constants";
import {ChevronDownIcon} from "@heroicons/react/solid";
import ProfileMenuDropdown from "./ProfileMenuDropdown";

const ProfileMenu = () => {
    const user = useRecoilValue(userAtom)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className={styles.container}>
            <img src={`${BASE_URL}/${user?.avatar}`} alt="avatar" className={styles.avatar}/>
            <ChevronDownIcon className={styles.chevron} onClick={() => setIsOpen(!isOpen)}/>
            <ProfileMenuDropdown isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    );
}

export default ProfileMenu;
