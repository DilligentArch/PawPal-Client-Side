import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Componenet/Navbar";
import Footer from "../Componenet/Footer";
import { Toaster } from "react-hot-toast";
import Loader from "../Componenet/Loader"; // Import the Loader

const MainLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulates a loading delay

    return () => clearTimeout(timer);
  }, [location.pathname]); // Runs when the route changes

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Toaster />
      <Navbar />
      {loading ? <Loader /> : <Outlet />}
      <Footer />
    </div>
  );
};

export default MainLayout;
