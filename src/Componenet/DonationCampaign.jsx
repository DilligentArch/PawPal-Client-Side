import React from "react";
import useCampaign from "../Hooks/useCampaign";
import CampaignCard from "./CampaignCard";

const DonationCampaign = () => {
  const { camp } = useCampaign(); // Destructure `camp` from useCampaign

  return (
    <div className="bg-green-600 min-h-screen p-8 ">
      <h2 className="text-3xl font-bold text-green-50 text-center mb-6 mt-14">
        Donation Campaigns
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camp.map((singleCamp) => (
          <CampaignCard key={singleCamp._id} singleCamp={singleCamp} />
        ))}
      </div>
    </div>
  );
};

export default DonationCampaign;
