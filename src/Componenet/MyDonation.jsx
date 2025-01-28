import React, { useContext } from "react";
import useDonation from "../Hooks/useDonation";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyDonation = () => {
  const { donation, refetch } = useDonation();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Filter donations made by the logged-in user
  const userDonations = donation.filter((d) => d.email === user?.email);

  // Handle refund request
  const handleRefund = async (donationId, donationAmount, 
    petName) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to request a refund for this donation.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, refund it!",
      });

      if (confirmation.isConfirmed) {
        // Step 1: Update the campaign's donated amount
        await axiosSecure.put(`/updated-campaign/${petName}`, {
          donatedAmount: -donationAmount, // Subtract the donation amount
        });

        // Step 2: Delete the donation record
        await axiosSecure.delete(`/donations/${donationId}`);

        Swal.fire({
          icon: "success",
          title: "Refund Successful",
          text: "Your donation has been refunded successfully.",
        });

        // Refresh data after successful refund
        refetch();
      }
    } catch (error) {
      console.error("Refund failed:", error);
      Swal.fire({
        icon: "error",
        title: "Refund Failed",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 w-[50rem] mt-24">
      <h2 className="text-2xl font-bold text-center mb-6">My Donations</h2>

      {userDonations.length === 0 ? (
        <div className="text-center text-gray-500">
          You have not made any donations yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Pet Image</th>
                <th className="px-4 py-2">Pet Name</th>
                <th className="px-4 py-2">Donated Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userDonations.map((donation) => {
                const { _id, petName, petImage, amount } = donation;

                return (
                  <tr key={_id} className="border-b">
                    {/* Pet Image */}
                    <td className="px-4 py-2 text-center">
                      <img
                        src={petImage}
                        alt={petName}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>

                    {/* Pet Name */}
                    <td className="px-4 py-2 text-center">{petName}</td>

                    {/* Donated Amount */}
                    <td className="px-4 py-2 text-center">{amount} BDT</td>

                    {/* Actions */}
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleRefund(_id, amount,
                            petName )}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Ask for Refund
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonation;
