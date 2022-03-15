import React, {FC} from 'react';
import {Routes, Route} from "react-router";

import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Registration from "./pages/Registration";
import Authorization from "./pages/Authorization";

const App: FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
