import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaPaw, FaHandsHelping, FaDonate } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="lg:h-[85rem] lg:w-80 bg-green-600 text-white flex flex-col justify-between shadow-lg">
      {/* Logo Section */}
      <div className="p-4 mt-28 flex items-center justify-center gap-2 mb-10">
        <img src="/kitten.png" className="w-7 mb-1"/>
        <h1 className="text-xl font-bold text-center ">
          PawPal User  Dashboard
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className=" space-y-4 px-4">
          <li >
            <Link
              to="/dashboard/add-pet"
              className=" flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaPlus />
              <span>Add a Pet</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-pets"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaPaw />
              <span>My Added Pets</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/adoption-requests"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaHandsHelping />
              <span>Adoption Request</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/create-donation"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaDonate />
              <span>Create Donation Campaign</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-donations"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaHandsHelping />
              <span>My Donation Campaigns</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/donations"
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
