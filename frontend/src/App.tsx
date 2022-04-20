import React, {FC, useEffect} from 'react';
import {Routes, Route} from "react-router";

import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Registration from "./pages/Registration";
import Authorization from "./pages/Authorization";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import {check} from "./requests/user";
import {useSetRecoilState} from "recoil";
import {userAtom} from "./store/atoms";
import Chat from "./pages/Chat";

const App: FC = () => {

    const setUser = useSetRecoilState(userAtom)

    useEffect(() => {
        const fetch = async () => {
            const response = await check()
            setUser(response)
        }
        fetch()
    }, [])
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/messenger" element={<Messenger/>}/>
                    <Route path="/chat/:id" element={<Chat/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
