import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaPlus, FaPaw, FaHandsHelping, FaDonate } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="lg:h-[130rem] lg:w-80 bg-green-600 text-white flex flex-col justify-between shadow-lg max-w-screen-2xl">
      {/* Logo Section */}
      <div className="p-4 mt-28 flex items-center justify-center gap-2 mb-10">
        <img src="/kitten.png" className="w-7 mb-1" />
        <h1 className="text-xl font-bold text-center">
          PawPal User Dashboard
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-4 px-4">
          <li>
            <Link
              to="/user-dashboard/overview"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaTachometerAlt />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/add-pets"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaPlus />
              <span>Add a Pet</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/my-pets"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaPaw />
              <span>My Added Pets</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/adoption-requests"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaHandsHelping />
              <span>Adoption Request</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/create-donation"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaDonate />
              <span>Create Donation Campaign</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/my-donations"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaHandsHelping />
              <span>My Donation Campaigns</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/donations"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaDonate />
              <span>My Donations</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
