import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-green-600 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8">
          About Us
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6 lg:p-12">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Welcome to <strong>PawPal</strong>, a platform dedicated to helping pets in need find loving homes and the care they deserve. Our mission is to connect pet lovers with animals that require attention, support, and compassion. Whether you’re looking to adopt a pet or contribute to campaigns aimed at improving the lives of these animals, we’re here to make the process seamless and impactful.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            <strong>How it works:</strong> Our website allows users to browse through pets available for adoption and campaigns seeking donations. You can choose to adopt a pet or support a cause by making a donation. Each donation directly contributes to the welfare of the animals and helps cover medical expenses, food, and shelter.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            <strong>Why we created this website:</strong> We believe that every pet deserves a second chance at life. Many animals are abandoned, neglected, or in dire need of assistance. This platform was built to bridge the gap between these animals and compassionate individuals who are willing to make a difference. Together, we can create a community where every pet finds a home and receives the care they deserve.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Thank you for joining us on this journey to bring hope, love, and care to pets in need. Explore, adopt, or donate today and be a part of the change!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
