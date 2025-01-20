import React from "react";
import { FaCat, FaDog, FaPaw, FaDove } from "react-icons/fa";

const categories = [
    { name: "Dogs", icon: <FaDog size={50} />, description: "Adopt a loyal furry friend." },
    { name: "Cats", icon: <FaCat size={50} />, description: "Find your purr-fect companion." },
    { name: "Rabbits", icon: <FaPaw size={50} />, description: "Cuddle with an adorable bunny." },
    { name: "Birds", icon: <FaDove size={50} />, description: "Bring joy with a chirpy companion." },
];

const PetCategorySection = () => {
    return (
        <div className="bg-green-600 py-8">
            <h2 className="text-3xl font-bold text-green-50 text-center mb-6">
                Explore Pet Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-16">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="bg-white shadow-lg rounded-lg overflow-hidden p-4 text-center"
                    >
                        {/* Icon */}
                        <div className="flex justify-center items-center h-20 w-20 mx-auto bg-green-100 rounded-full mb-4">
                            <span className="text-green-600">{category.icon}</span>
                        </div>
                        {/* Category Name */}
                        <h3 className="text-xl font-bold text-green-600 mb-2">{category.name}</h3>
                        {/* Description */}
                        <p className="text-gray-600">{category.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetCategorySection;
