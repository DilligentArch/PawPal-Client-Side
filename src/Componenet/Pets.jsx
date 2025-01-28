import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import usePets from "../Hooks/usePets";
import PetCard from "./PetCard";
import Select from "react-select";
import { Loader2 } from "lucide-react"; // Import the spinner icon

const Pets = () => {
  const [pets] = usePets();
  const [displayedPets, setDisplayedPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 3;

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "bird", label: "Bird" },
  ];

  const filteredPets = React.useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch = pet.petName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || pet.petCategory.toLowerCase() === selectedCategory.value;
      return matchesSearch && matchesCategory;
    });
  }, [pets, searchTerm, selectedCategory]);

  const loadMorePets = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    // Simulate network delay to show loading state
    setTimeout(() => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newPets = filteredPets.slice(0, endIndex);
      
      setDisplayedPets(newPets);
      setIsLoading(false);
    }, 800); // Add a small delay to make the loading state visible
  }, [page, filteredPets, isLoading]);

  useEffect(() => {
    setPage(1);
    setDisplayedPets(filteredPets.slice(0, itemsPerPage));
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (inView && !isLoading && displayedPets.length < filteredPets.length) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isLoading, displayedPets.length, filteredPets.length]);

  useEffect(() => {
    loadMorePets();
  }, [page, loadMorePets]);

  return (
    <div className="bg-green-600 min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center mt-16 mb-12">
          Find Your Perfect Pet Companion
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search pets by name..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="w-full md:w-1/3">
            <Select
              options={petCategories}
              isClearable
              placeholder="Filter by category"
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPets.length > 0 ? (
            displayedPets.map((singlePet) => (
              <PetCard key={singlePet._id} singlePet={singlePet} />
            ))
          ) : (
            <p className="text-center text-white text-lg col-span-full">
              No pets found matching your criteria.
            </p>
          )}
        </div>

        {displayedPets.length < filteredPets.length && (
          <div 
            ref={ref} 
            className="text-center mt-8 p-4 flex flex-col items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
                <p className="text-white">Loading more pets...</p>
              </div>
            ) : (
              <p className="text-white">Scroll to load more</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;