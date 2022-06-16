import React from 'react';
import Editor from "../components/Form/Profile/Editor";
import {useRecoilValue} from "recoil";
import {userAtom} from "../store/atoms/user";

const Profile = () => {
    const user = useRecoilValue(userAtom)
    return (
        <div>
            <Editor mock={user}/>
        </div>
    );
}

export default Profile;
