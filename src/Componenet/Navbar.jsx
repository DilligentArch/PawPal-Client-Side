import React, { useState, useContext, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pets", label: "Pet Listing" },
    { href: "/donations", label: "Donation Campaigns" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  const handleLogout = () => {
    logOut().then(() => {
      toast.success("Successfully logged out!");
      setIsProfileOpen(false); // Close dropdown
    });
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-grey-600 fixed z-10  bg-opacity-15 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/kitten.png"
                alt="PawPal Logo"
                className="h-8 w-auto"
              />
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

          {/* Right Section: Profile or Login/Register */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.photoURL || "/api/placeholder/32/32"}
                    alt="User Profile"
                  />
                  <ChevronDown className="ml-1 h-4 w-4 text-white" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/user-dashboard/add-pets"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)} // Close dropdown
                    >
                     User Dashboard
                    </Link>
                    <Link
                      to="/admin-dashboard/users"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)} // Close dropdown
                    >
                     Admin Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${
                    location.pathname === "/login"
                      ? "bg-soft-sky-blue text-white"
                      : "text-black"
                  } hover:bg-green-700 px-3 py-2 rounded-md text-base font-semibold transition duration-150`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${
                    location.pathname === "/register"
                      ? "bg-soft-sky-blue text-white"
                      : "text-black"
                  } hover:bg-green-700 px-3 py-2 rounded-md text-base font-semibold transition duration-150`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-2"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`${
                  location.pathname === href
                    ? "bg-soft-sky-blue text-white"
                    : "text-black"
                } hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium`}
              >
                {label}
              </Link>
            ))}
            {!user && (
              <>
                <Link
                  to="/login"
                  className={`${
                    location.pathname === "/login"
                      ? "bg-soft-sky-blue text-white"
                      : "text-black"
                  } hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${
                    location.pathname === "/register"
                      ? "bg-soft-sky-blue text-white"
                      : "text-black"
                  } hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
