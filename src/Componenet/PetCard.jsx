import React from "react";
import { useNavigate } from "react-router-dom";


const PetCard = ({ singlePet }) => {
  const {_id, petImage, petName, petAge, petLocation } = singlePet;
  const navigate=useNavigate();
  const handleNavi=()=>{
    navigate(`/pet-details/${_id}`);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Pet Image */}
      <img
        src={petImage}
        alt={petName}
        className="h-64 w-full "
      />

      {/* Pet Details */}
      <div className="p-4">
        {/* Pet Name */}
        <h3 className="text-xl font-bold text-green-600">{petName}</h3>

        {/* Pet Age */}
        <p className="text-sm text-gray-500 mt-2">Age: {petAge} years</p>

        {/* Pet Location */}
        <p className="text-sm text-gray-500">Location: {petLocation}</p>

        {/* View Details Button */}
        <button onClick={handleNavi}
          className="mt-4 w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PetCard;
