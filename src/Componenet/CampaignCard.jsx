import React from "react";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ singleCamp }) => {
  const navigate=useNavigate();
  const {
    _id,
    petName,
    petImage,
    maxDonationAmount,
    donatedAmount,
    lastDateOfDonation,
    shortDescription,
  } = singleCamp;
  const handleNavi = () => {
    navigate(`/campaign-details/${_id}`);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* Pet Image */}
      <img
        src={petImage}
        alt={petName}
        className="h-64 w-full  rounded-t-lg mb-4"
      />

      {/* Pet Name */}
      <h3 className="text-xl font-bold text-green-600 mb-2">{petName}</h3>

      {/* Short Description */}
      <p className="text-gray-600 mb-4">{shortDescription}</p>

      {/* Donation Information */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Maximum Donation a user can make:</span> {maxDonationAmount} BDT
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Total Donation as of Today:</span> {donatedAmount || 0} BDT
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Last Date:</span> {new Date(lastDateOfDonation).toLocaleDateString()}
        </p>
      </div>

      {/* View Details Button */}
      <button
        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        onClick={handleNavi}
      >
        View Details
      </button>
    </div>
  );
};

export default CampaignCard;
