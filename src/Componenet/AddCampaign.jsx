import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddCampaign = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const imgbbAPIKey = import.meta.env.VITE_ImageApiKey; // Replace with your actual ImgBB API key

  const onSubmit = async (data) => {
    try {
      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", data.petImage[0]);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );

      const petImageUrl = imgbbResponse.data.data.url;

      // Create donation campaign object
      const donationCampaign = {
        petName: data.petName,
        petImage: petImageUrl,
        maxDonationAmount: data.maxDonationAmount,
        // totalDonationNeeded: data.totalDonationNeeded,
        lastDateOfDonation: data.lastDateOfDonation,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        donatedAmount:0,
        createdAt: new Date().toISOString(),
      };

      // Save to database
      const response = await axiosSecure.post("/campaign", donationCampaign);
      if (response.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `You have successfully created a campaign`,
          showConfirmButton: false,
          timer: 1500,
        });

        reset(); // Reset the form
      }
    } catch (error) {
      console.error("Error creating donation campaign:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create the donation campaign. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center w-full lg:w-3/5 mx-auto lg:mx-0 items-center min-h-screen bg-green-50 lg:mt-56">
      <div className="w-full max-w-4xl bg-green-600 text-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Donation Campaign
        </h2>

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
              {...register("petImage", { required: true })}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
            />
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

          {/* Total Donation Needed
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
          </div> */}

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
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
