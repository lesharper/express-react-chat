import React, {FC, useEffect, Suspense} from 'react';
import {Routes, Route} from "react-router";

import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Registration from "./pages/Registration";
import Authorization from "./pages/Authorization";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import {check} from "./requests/user";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userAtom} from "./store/atoms/user";
import Chat from "./pages/Chat";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./pages/ProtectedRoute";
import {authSelector} from "./store/selectors/auth";

const App: FC = () => {

    const setUser = useSetRecoilState(userAtom)

    useEffect(() => {
        const fetch = async () => {
            const response = await check()
            setUser(response)
        }
        fetch()
    }, [])

    const isAuth = useRecoilValue(authSelector)
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute isAllowed={isAuth} redirectPath='/'>
                                <Profile/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/messenger"
                        element={
                            <ProtectedRoute isAllowed={isAuth} redirectPath='/'>
                                <Messenger/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat/:id"
                        element={
                            <ProtectedRoute isAllowed={isAuth} redirectPath='/'>
                                <Chat/>
                            </ProtectedRoute>
                        }/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
