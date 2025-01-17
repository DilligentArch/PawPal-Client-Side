import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Componenet/Navbar';
import Sidebar from '../Componenet/Sidebar';


const DashboardLayout = () => {
    return (
        <div >
            <Navbar />
            <main className='h-screen lg:flex gap-36'>
                <Sidebar className=''  />
                 <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;