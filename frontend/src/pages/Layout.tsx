import React,{FC} from "react";
import { Outlet } from 'react-router';
import Header from '../components/Header/Header';
import Footer from "../components/Footer/Footer";
import Dropdown from "../components/Header/Dropdown";
import {useMenu} from "../hooks/useMenu";

const Layout: FC = () => {
    const {isOpen, toggle} = useMenu()

    return (
        <>
            <Header toggle={toggle}/>
            <Dropdown isOpen={isOpen} toggle={toggle}/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Layout;
