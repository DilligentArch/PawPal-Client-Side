import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Componenet/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '../Componenet/Footer';


const MainLayout = () => {
    return (
        <div>
            <Toaster />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;