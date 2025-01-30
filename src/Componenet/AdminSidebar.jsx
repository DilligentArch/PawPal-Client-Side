import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaPaw, FaHandsHelping, FaDonate } from "react-icons/fa"; // Added FaUsers for Users
import { AuthContext } from "../AuthProvider/AuthProvider";

const AdminSidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="lg:h-[100rem] lg:w-80 bg-green-600 text-white flex flex-col justify-between shadow-lg ">
      {/* Logo Section */}
      <div className="p-4 mt-28 flex items-center justify-center gap-2 mb-10">
        <img src="/kitten.png" className="w-7 mb-1" alt="Logo" />
        <h1 className="text-xl font-bold text-center">PawPal Admin Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-4 px-4">
          {/* Users */}
          <li>
            <Link
              to="/admin-dashboard/users"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaUsers size={20} />
              <span>Users</span>
            </Link>
          </li>

          {/* All Pets */}
          <li>
            <Link
              to="/admin-dashboard/all-pets"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaPaw size={20} />
              <span>All Pets</span>
            </Link>
          </li>

          {/* All Donations */}
          <li>
            <Link
              to="/admin-dashboard/all-donations"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaDonate size={20} />
              <span>All Donations</span>
            </Link>
          </li>

        
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
