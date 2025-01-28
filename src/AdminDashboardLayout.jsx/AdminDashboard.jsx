
import React from 'react';
import AdminSidebar from '../Componenet/AdminSidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../Componenet/Navbar';
import Footer from '../Componenet/Footer';

const AdminDashboard = () => {
    return (
        <div className='max-w-screen-2xl mx-auto' >
            <Navbar/>
            <main className='h-screen lg:flex gap-36'>
                <AdminSidebar   />
                
                 <Outlet />
            </main>
          
            {/* <footer className='mt-[80rem] md:mt-[80rem] lg:mt-[23rem]'>  <Footer></Footer></footer> */}
        </div>
    );
};

export default AdminDashboard;