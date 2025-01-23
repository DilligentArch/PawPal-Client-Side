import React, { useContext } from "react";
import useRequest from "../Hooks/useRequest";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AdoptionRequest = () => {
  const [requests, refetch] = useRequest(); // Hook to fetch adoption requests
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  

  // Filter requests for pets added by the current user
  const userRequests = requests.filter((req) => req.addedBy === user?.email);

  // Handle Accept Action
  const handleAccept = async (request) => {
    Swal.fire({
        title: "Confirm Adoption Approval",
        html: `Are you sure you want to approve the adoption request for <strong>${request.petName}</strong>?<br>This action will finalize the adoption process.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2ecc71",
        cancelButtonColor: "#e74c3c",
        confirmButtonText: "Yes, Approve Adoption",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/request-accepeted/${request.petId}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Adoption Approved!",
                            text: `The adoption request for ${request.petName} has been successfully approved. The new owner will be notified.`,
                            icon: "success",
                            confirmButtonColor: "#3085d6"
                        });
                    }
                })
        }
    });
  };

  // Handle Reject Action
  const handleReject = async (request) => {
    Swal.fire({
        title: "Confirm Adoption Rejection",
        html: `Are you sure you want to reject the adoption request for <strong>${request.petName}</strong>?<br>This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#95a5a6",
        confirmButtonText: "Yes, Reject Request",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/request-rejected/${request._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Adoption Request Rejected",
                            text: `The adoption request for ${request.petName} has been rejected. The requester will be notified.`,
                            icon: "error",
                            confirmButtonColor: "#3085d6"
                        });
                    }
                })
        }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mt-20 mb-4">
        Adoption Requests for Your Pets
      </h1>

      {userRequests.length === 0 ? (
        <p className="text-gray-600">No adoption requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Desktop/Tablet Table */}
          <table className="w-full border-collapse border border-gray-300 hidden md:table">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 p-2">Pet Name</th>
                <th className="border border-gray-300 p-2">Requester Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone Number</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userRequests.map((req) => (
                <tr key={req.id} className="hover:bg-green-50">
                  <td className="border border-gray-300 p-2">{req.petName}</td>
                  <td className="border border-gray-300 p-2">{req.userName}</td>
                  <td className="border border-gray-300 p-2">{req.userEmail}</td>
                  <td className="border border-gray-300 p-2">{req.phoneNumber}</td>
                  <td className="border border-gray-300 p-2">{req.address}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleAccept(req)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2 mb-1 sm:mb-0"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {userRequests.map((req) => (
              <div 
                key={req.id} 
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:bg-green-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-green-700">{req.petName}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Requester:</strong> {req.userName}</p>
                  <p><strong>Email:</strong> {req.userEmail}</p>
                  <p><strong>Phone:</strong> {req.phoneNumber}</p>
                  <p><strong>Address:</strong> {req.address}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleAccept(req)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-5/12"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-5/12"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionRequest;