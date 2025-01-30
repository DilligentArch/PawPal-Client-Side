import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import useCampaign from "../Hooks/useCampaign";
import CampaignCard from "./CampaignCard";

const DonationCampaign = () => {
  const { camp } = useCampaign();
  const [displayedCampaigns, setDisplayedCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 3; 

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Load more campaigns function
  const loadMoreCampaigns = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const startIndex = 0;
      const endIndex = page * itemsPerPage;
      const newCampaigns = camp.slice(startIndex, endIndex);
      
      setDisplayedCampaigns(newCampaigns);
      setIsLoading(false);
    }, 800); // Simulate loading delay - remove in production
  }, [page, camp, isLoading]);

  // Initial load
  useEffect(() => {
    setDisplayedCampaigns(camp.slice(0, itemsPerPage));
  }, [camp]);

  // Handle infinite scroll
  useEffect(() => {
    if (inView && !isLoading && displayedCampaigns.length < camp.length) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isLoading, displayedCampaigns.length, camp.length]);

  // Load more campaigns when page changes
  useEffect(() => {
    loadMoreCampaigns();
  }, [page, loadMoreCampaigns]);

  return (
    <div className="bg-green-600 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-green-50 text-center mb-6 mt-14">
        Donation Campaigns
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCampaigns.map((singleCamp) => (
          <CampaignCard key={singleCamp._id} singleCamp={singleCamp} />
        ))}
      </div>

      {displayedCampaigns.length < camp.length && (
        <div 
          ref={ref}
          className="text-center mt-8 p-4 flex flex-col items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
              <p className="text-white">Loading more campaigns...</p>
            </div>
          ) : (
            <p className="text-white">Scroll to load more</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationCampaign;