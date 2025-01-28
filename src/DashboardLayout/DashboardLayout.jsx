import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Componenet/Navbar';
import Sidebar from '../Componenet/Sidebar';
import Footer from '../Componenet/Footer';


const DashboardLayout = () => {
    return (
        <div className='max-w-screen-2xl mx-auto' >
            <Navbar />
            <main className='h-screen lg:flex gap-36'>
                <Sidebar   />
                
                 <Outlet />
            </main>
            {/* <footer className='mt-[80rem] md:mt-[80rem] lg:mt-[23rem]'><Footer></Footer> </footer> */}
        </div>
    );
};

export default DashboardLayout;