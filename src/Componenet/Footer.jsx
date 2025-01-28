import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-10 max-w-screen-2xl mx-auto">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">About PawPal</h3>
            <p className="text-gray-200 leading-relaxed text-center">
              PawPal is dedicated to connecting loving families with pets in need. 
              We provide a platform for adoptions, donations, and fostering campaigns 
              to ensure every pet finds a safe and caring home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">Quick Links</h3>
            <ul className="space-y-2">
              <li className="text-center">
                <a href="/" className="text-gray-200 hover:text-white transition  text-center">
                  Home
                </a>
              </li>
              <li className="text-center">
                <a
                  href="/pets"
                  className="text-gray-200 hover:text-white transition  text-center"
                >
                  Pet Listing
                </a>
              </li>
              <li className="text-center">
                <a
                  href="/donations"
                  className="text-gray-200 hover:text-white transition  text-center"
                >
                  Donation Campaigns
                </a>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-center text-xl font-bold mb-4">Contact Us</h3>
            <p className=" text-center text-gray-200">123 PawPal Street</p>
            <p className=" text-center text-gray-200">Sylhet, Bangladesh</p>
            <p className=" text-center text-gray-200">Email: support@pawpal.com</p>
            <p className=" text-center text-gray-200">Phone: +123 456 7890</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-500 pt-4 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} PawPal. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
