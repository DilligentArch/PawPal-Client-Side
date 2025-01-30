import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const UpdateProfile = () => {
  const { updateUserProfile, user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || ""); // Default to the current name
  const [photoURL, setPhotoURL] = useState(user?.photoURL || ""); // Default to the current photo URL
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the Firebase profile first
      await updateUserProfile({ displayName: name, photoURL });

      // Update the database record for the user
      await axiosPublic.patch(`/users/${user.email}`, {
        name,
        image: photoURL,
      });

      // Update the context state
      setUser((prevUser) => ({
        ...prevUser,
        displayName: name,
        photoURL,
      }));

      toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      // console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">Profile Photo URL</label>
            <input
              type="url"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter a photo URL"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full bg-green-600 py-2 text-white rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
