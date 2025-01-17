import React, { useState } from "react";
import usePets from "../Hooks/usePets";
import PetCard from "./PetCard";
import Select from "react-select";

const Pets = () => {
  const [pets] = usePets();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Categories for dropdown
  const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "bird", label: "Bird" },
  ];

  // Filtered pets based on search and category
  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.petName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || pet.petCategory.toLowerCase() === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-green-600 min-h-screen ">
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center mt-16 mb-12">
          Find Your Perfect Pet Companion
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Field */}
          <input
            type="text"
            placeholder="Search pets by name..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Dropdown */}
          <div className="w-full md:w-1/3">
            <Select
              options={petCategories}
              isClearable
              placeholder="Filter by category"
              onChange={(option) => setSelectedCategory(option)}
            />
          </div>
        </div>

        {/* Pet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((singlePet) => (
              <PetCard key={singlePet._id} singlePet={singlePet} />
            ))
          ) : (
            <p className="text-center text-white text-lg col-span-full">
              No pets found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pets;
