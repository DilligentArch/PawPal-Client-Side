
import React from 'react';
import AdminSidebar from '../Componenet/AdminSidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../Componenet/Navbar';

const AdminDashboard = () => {
    return (
        <div >
            <Navbar/>
            <main className='h-screen lg:flex gap-36'>
                <AdminSidebar   />
                
                 <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;