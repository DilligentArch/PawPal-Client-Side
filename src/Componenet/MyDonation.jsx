import React, { useContext } from "react";
import useDonation from "../Hooks/useDonation";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyDonation = () => {
  const { donation, refetch } = useDonation();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const userDonations = donation.filter((d) => d.email === user?.email);

  const handleRefund = async (donationId, donationAmount, petName) => {
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
        await axiosSecure.put(`/updated-campaign/${petName}`, {
          donatedAmount: -donationAmount,
        });

        await axiosSecure.delete(`/donations/${donationId}`);

        Swal.fire({
          icon: "success",
          title: "Refund Successful",
          text: "Your donation has been refunded successfully.",
        });

        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Refund Failed",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 w-full lg:w-[50rem] mt-16 lg:mt-24">
      <h2 className="text-xl lg:text-2xl font-bold text-center mb-4 lg:mb-6">My Donations</h2>

      {userDonations.length === 0 ? (
        <div className="text-center text-gray-500">
          You have not made any donations yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Desktop and Tablet View */}
          <div className="hidden sm:block">
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
                {userDonations.map((donation) => (
                  <tr key={donation._id} className="border-b">
                    <td className="px-4 py-2 text-center">
                      <img
                        src={donation.petImage}
                        alt={donation.petName}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">{donation.petName}</td>
                    <td className="px-4 py-2 text-center">{donation.amount} BDT</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleRefund(donation._id, donation.amount, donation.petName)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Ask for Refund
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden space-y-4">
            {userDonations.map((donation) => (
              <div 
                key={donation._id} 
                className="bg-white p-4 rounded-lg shadow space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={donation.petImage}
                    alt={donation.petName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{donation.petName}</h3>
                    <p className="text-gray-600">{donation.amount} BDT</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRefund(donation._id, donation.amount, donation.petName)}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Ask for Refund
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonation;