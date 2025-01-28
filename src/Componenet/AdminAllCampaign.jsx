import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import { AuthContext } from "../AuthProvider/AuthProvider";
import useCampaign from "../Hooks/useCampaign";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AdminAllCampaign = () => {
  const { user } = useContext(AuthContext);
  const { camp, refetch } = useCampaign();
  const axiosSecure = useAxiosSecure();

  const handlePauseToggle = async (id, currentStatus) => {
    const updatedStatus = { pause: !currentStatus };
    axiosSecure
      .put(`/pause/${id}`, updatedStatus)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `You have successfully ${!currentStatus ? "Paused" : "Unpaused"} the campaign`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((error) => {
        console.error("Failed to update campaign:", error);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to update campaign",
          text: "Please try again",
          showConfirmButton: true,
        });
      });
  };

  const handleDeleteCampaign = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the campaign!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/campaign/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "The campaign has been deleted.", "success");
              refetch();
            }
          })
          .catch((error) => {
            console.error("Failed to delete campaign:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to delete the campaign. Please try again.",
            });
          });
      }
    });
  };

  return (
    <div className="container p-4 sm:p-6 lg:w-[50rem] lg:mt-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">All Active Donation Campaigns</h2>

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
            {camp.map((campaign) => {
              const { _id, petName, totalDonationNeeded, donatedAmount, pause } = campaign;
              const progressPercentage = Math.min((donatedAmount / totalDonationNeeded) * 100, 100);

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
                      className={`px-3 py-1 rounded ${pause ? "bg-green-500" : "bg-red-500"} text-white`}
                    >
                      {pause ? "Unpause" : "Pause"}
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(_id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/admin-dashboard/update-donations/${_id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllCampaign;
