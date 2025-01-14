import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pets", label: "Pet Listing" },
    { href: "/donations", label: "Donation Campaigns" },
    { href: "/login", label: "Login/Register" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="bg-green-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img
                src="kitten.png"
                alt="PawPal Logo"
                className="h-8 w-auto"
              />
              <span className="ml-3 text-white text-xl font-bold">PawPal</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Profile and Mobile Menu */}
          <div className="flex items-center">
            {/* Profile Dropdown */}
            <div className="relative ml-3">
              <button
                onClick={toggleProfile}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="/api/placeholder/32/32"
                  alt="User Profile"
                />
                <ChevronDown className="ml-1 h-4 w-4 text-white" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={() => alert("Logged out")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
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
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-white hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
