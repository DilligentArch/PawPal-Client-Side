import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useCampaign from "../Hooks/useCampaign";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyCampaign = () => {
  const { user } = useContext(AuthContext);
  const { camp, refetch } = useCampaign();
  const axiosSecure = useAxiosSecure();
  

  // Filter campaigns created by the logged-in user
  const userCampaigns = camp.filter((c) => c.createdBy === user?.email);

  // Handle pause/unpause functionality
  const handlePauseToggle = async (id, currentStatus) => {
    const updatedStatus = {
      pause: !currentStatus,
    };
   
    axiosSecure.put(`/pause/${id}`, updatedStatus)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `You have successfully  ${!currentStatus ? "Pause" : "Unpause"} the campaign`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch(error => {
        // console.error("Failed to update pet:", error);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to update pet",
          text: "Please try again",
          showConfirmButton: true
        });
      });
  };

  return (
    <div className="container  p-4 sm:p-6 lg:w-[70rem]  lg:mt-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">My Donation Campaigns</h2>

      {/* Tablet & Desktop View (Responsive Table) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Pet Name</th>
              <th className="px-4 py-2"> Donation Needed</th>
              <th className="px-4 py-2">Donation Progress</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userCampaigns.map((campaign) => {
              const {
                _id,
                petName,
                maxDonationAmount,
                donatedAmount,
                pause,
                totalDonationNeeded,
              } = campaign;

              const progressPercentage = Math.min(
                (donatedAmount / totalDonationNeeded) * 100,
                100
              );

              return (
                <tr key={_id} className="border-b">
                  <td className="px-4 py-2 text-center">{petName}</td>
                  <td className="px-4 py-2 text-center">${totalDonationNeeded}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="w-full bg-gray-300 rounded-full">
                      <div
                        className="bg-green-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      >
                        {progressPercentage.toFixed(2)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handlePauseToggle(_id, pause)}
                      className={`px-3 py-1 rounded ${
                        pause ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                    >
                      {pause ? "Unpause" : "Pause"}
                    </button>
                    <Link
                      to={`/user-dashboard/edit-campaign/${_id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </Link>
                    {/* <Link
                      to={`/view-donators/${_id}`}
                      className="px-3 py-1 bg-yellow-500 text-black rounded"
                    >
                      View Donators
                    </Link> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Responsive Cards) */}
      <div className="block sm:hidden">
        {userCampaigns.map((campaign) => {
          const {
            _id,
            petName,
            maxDonationAmount,
            donatedAmount,
            pause,
            totalDonationNeeded,
          } = campaign;

          const progressPercentage = Math.min(
            (donatedAmount / totalDonationNeeded) * 100,
            100
          );

          return (
            <div key={_id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{petName}</h3>
                <span className="text-sm">${totalDonationNeeded}</span>
              </div>
              
              <div className="mb-3">
                <div className="w-full bg-gray-300 rounded-full">
                  <div
                    className="bg-green-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    {progressPercentage.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-between">
                <button
                  onClick={() => handlePauseToggle(_id, pause)}
                  className={`px-3 py-1 rounded ${
                    pause ? "bg-green-500" : "bg-red-500"
                  } text-white flex-grow`}
                >
                  {pause ? "Unpause" : "Pause"}
                </button>
                <Link
                  to={`/edit-campaign/${_id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded flex-grow text-center"
                >
                  Edit
                </Link>
                {/* <Link
                  to={`/view-donators/${_id}`}
                  className="px-3 py-1 bg-yellow-500 text-black rounded flex-grow text-center"
                >
                  View Donators
                </Link> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {userCampaigns.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          No campaigns found. Start a new campaign!
        </div>
      )}
    </div>
  );

};

export default MyCampaign;