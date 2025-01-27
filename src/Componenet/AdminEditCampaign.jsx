import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import useCampaign from "../Hooks/useCampaign";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminEditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { camp } = useCampaign();
  const axiosSecure = useAxiosSecure();

  // Find the campaign to edit
  const campaign = camp.find((c) => c._id === id);

  const {
    petName,
    petImage,
    maxDonationAmount,
    totalDonationNeeded,
    lastDateOfDonation,
    shortDescription,
    longDescription,
  } = campaign || {};

  // Initialize React Hook Form with default values
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      petName,
      maxDonationAmount,
      totalDonationNeeded,
      lastDateOfDonation,
      shortDescription,
      longDescription,
    },
  });

  const onSubmit = async (data) => {
    try {
      // If a new image is uploaded, handle it
      let updatedPetImage = petImage;
      if (data.petImage[0]) {
        const formData = new FormData();
        formData.append("image", data.petImage[0]);

        const imgbbResponse = await axiosSecure.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImageApiKey}`,
          formData
        );
        updatedPetImage = imgbbResponse.data.data.url;
      }

      // Create the updated campaign object
      const updatedCampaign = {
        ...data,
        petImage: updatedPetImage,
      };

      // Update the campaign in the database
      const response = await axiosSecure.put(`/campaign/${id}`, updatedCampaign);

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Campaign updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin-dashboard/all-donations");
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update the campaign. Please try again.",
      });
    }
  };

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center w-full lg:w-3/5 mx-auto lg:mx-0 items-center min-h-screen bg-green-50 lg:mt-72" >
      <div className="w-full max-w-4xl bg-green-600 text-white shadow-lg rounded-lg p-8 " >
        <h2 className="text-3xl font-bold text-center  mb-6">Edit Donation Campaign</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Pet Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Pet Name</label>
            <input
              type="text"
              {...register("petName", { required: true })}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter the pet's name"
            />
          </div>

          {/* Pet Picture */}
          <div>
            <label className="block text-sm font-medium mb-2">Pet Picture</label>
            <input
              type="file"
              accept="image/*"
              {...register("petImage")}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
            />
            {petImage && (
              <img
                src={petImage}
                alt="Current Pet"
                className="mt-2 h-24 w-24 object-cover rounded"
              />
            )}
          </div>

          {/* Maximum Donation Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Maximum Donation Amount
            </label>
            <input
              type="number"
              {...register("maxDonationAmount", { required: true })}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter the maximum donation amount"
            />
          </div>

          {/* Total Donation Needed */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Total Donation Needed
            </label>
            <input
              type="number"
              {...register("totalDonationNeeded", { required: true })}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter the total donation needed"
            />
          </div>

          {/* Last Date of Donation */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Last Date of Donation
            </label>
            <input
              type="date"
              {...register("lastDateOfDonation", { required: true })}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Short Description
            </label>
            <textarea
              {...register("shortDescription", { required: true })}
              rows="3"
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Write a short note about the campaign"
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Long Description
            </label>
            <textarea
              {...register("longDescription", { required: true })}
              rows="5"
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Provide detailed information about the campaign"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
          >
            Update Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCampaign;
