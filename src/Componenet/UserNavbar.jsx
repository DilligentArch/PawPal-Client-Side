import React, { useState, useContext, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useLocation, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUsers from "../Hooks/useUsers";

const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const { users } = useUsers();
  const navi = useNavigate();

  // Update document title based on current route
  useEffect(() => {
    const titles = {
      "/user-dashboard/add-pets": "PawPal - Add Pet",
      "/user-dashboard/my-pets": "PawPal - My Pets",
      "/user-dashboard/adoption-requests": "PawPal - Adoption Requests",
      "/user-dashboard/create-donation": "PawPal - Create Donation Campaign",
      "/user-dashboard/my-donations": "PawPal - My Donation Campaigns",
      "/user-dashboard/donations": "PawPal - My Donations",
      "/admin-dashboard/users": "PawPal - Admin Dashboard - Users",
      "/admin-dashboard/all-pets": "PawPal - Admin Dashboard - All Pets",
      "/admin-dashboard/all-donations": "PawPal - Admin Dashboard - All Donations",
    };

    const defaultTitle = "PawPal - Pet Donation & Adoption Platform";
    document.title = titles[location.pathname] || defaultTitle;
  }, [location.pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pets", label: "Pet Listing" },
    { href: "/donations", label: "Donation Campaigns" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logOut().then(() => {
      toast.success("Successfully logged out!");
      navi('/');
      setIsMobileMenuOpen(false); // Close mobile menu if open
    });
  };

  return (
    <nav className="bg-green-600 w-full fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/kitten.png" alt="PawPal Logo" className="h-8 w-auto" />
              <span className="ml-3 text-black text-3xl font-bold">PawPal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`${
                  location.pathname === href
                    ? "bg-soft-sky-blue text-white"
                    : "text-black"
                } hover:bg-green-700 px-3 py-2 rounded-md text-base font-semibold transition duration-150`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-green-700 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-800`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
