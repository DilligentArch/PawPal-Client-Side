import React from "react";
import { FaSearch, FaHandHoldingHeart, FaHome } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearch size={40} className="text-green-600" />,
      title: "Browse Pets",
      description:
        "Explore our list of pets in need of a home. Use filters to find your perfect companion.",
    },
    {
      id: 2,
      icon: <FaHandHoldingHeart size={40} className="text-green-600" />,
      title: "Support Campaigns",
      description:
        "Choose a campaign to support. Your donations help cover food, medical care, and shelter for pets.",
    },
    {
      id: 3,
      icon: <FaHome size={40} className="text-green-600" />,
      title: "Adopt a Pet",
      description:
        "Complete the adoption process and welcome your new furry friend into your home.",
    },
  ];

  return (
    <div className="bg-green-600 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ id, icon, title, description }) => (
            <div key={id} className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="mb-4 w-10 mx-auto">{icon}</div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
