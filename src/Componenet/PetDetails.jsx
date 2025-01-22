import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import usePetDetails from "../Hooks/usePetDetails";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";

const PetDetails = () => {
  const { id } = useParams();
  const [petDetails] = usePetDetails(id);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  if (!petDetails) return <div>Loading...</div>;

  const {
    _id,
    petName,
    petAge,
    petCategory,
    petLocation,
    shortDescription,
    longDescription,
    petImage,
  } = petDetails || {};

  const formattedDescription = longDescription?.replace(/<\/?p>/g, "");

  const handleAdoptClick = () => {
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    const adoptionRequest = {
      petId: _id,
      petName,
      petImage,
      userName: user?.displayName,
      userEmail: user?.email,
      ...data,
    };

    try {
      // Example POST request to save adoption data
      const response = await fetch("/api/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adoptionRequest),
      });

      if (response.ok) {
        console.log("Adoption Request Submitted:", adoptionRequest);
        setShowModal(false);
        reset();
      } else {
        console.error("Failed to submit adoption request.");
      }
    } catch (error) {
      console.error("Error submitting adoption request:", error);
    }
  };

  return (
    <div className="p-6 bg-green-600">
      <div className="bg-white shadow-md rounded-lg p-4 mt-14 mb-40">
        <img
          src={petImage}
          alt={petName}
          className="w-11/12 md:w-2/3 lg:w-1/3 h-64 object-cover rounded-md mx-auto"
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-700 mt-4">{petName}</h2>
          <p className="text-gray-600 mt-2">{shortDescription}</p>
        </div>

        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            About {petName}
          </h3>
          <p className="text-gray-700 leading-relaxed">{formattedDescription}</p>
        </div>

        <ul className="mt-4 text-gray-700">
          <li><strong>Age:</strong> {petAge}</li>
          <li><strong>Category:</strong> {petCategory}</li>
          <li><strong>Location:</strong> {petLocation}</li>
        </ul>

        <button
          onClick={handleAdoptClick}
          className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Adopt
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Adopt {petName}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">Your Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Your Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  {...register("phoneNumber", { required: "Phone number is required" })}
                  placeholder="Enter your phone number"
                  className="w-full p-2 border rounded"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <textarea
                  {...register("address", { required: "Address is required" })}
                  placeholder="Enter your address"
                  className="w-full p-2 border rounded"
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full"
              >
                Submit Adoption Request
              </button>
            </form>

            <button
              onClick={() => {
                setShowModal(false);
                reset();
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetails;
