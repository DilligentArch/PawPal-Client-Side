import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const UpdateAdminPet = () => {
  const location = useLocation();
  const pet = location.state?.pet;
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate= useNavigate();

  // Define petCategories first
  const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "bird", label: "Bird" },
  ];

  // Now use petCategories in useForm
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      petName: pet?.petName || "",
      petAge: pet?.petAge || "",
      petLocation: pet?.petLocation || "",
      shortDescription: pet?.shortDescription || "",
      petCategory: petCategories.find(
        category => category.value.toLowerCase() === pet?.petCategory?.toLowerCase()
      ) || null
    }
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: pet?.longDescription || "",
  });

  const IMAGEBB_API_KEY = import.meta.env.VITE_ImageApiKey;

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
        formData
      );
      return response.data.data.url;
    } catch (error) {
      // console.error("Image upload failed:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    let imageUrl = pet.petImage; // Keep existing image by default
    
    if (data.petImage?.[0]) {
      // Only upload new image if one was selected
      imageUrl = await handleImageUpload(data.petImage[0]);
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const capitalizeFirstLetter = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const petCategory = data.petCategory?.value
      ? capitalizeFirstLetter(data.petCategory.value)
      : pet.petCategory;

    const updatedPetData = {
      petName: data.petName,
      petAge: data.petAge,
      petCategory,
      petLocation: data.petLocation,
      shortDescription: data.shortDescription,
      longDescription: editor?.getHTML() || pet.longDescription,
      petImage: imageUrl,
      status: pet.status,
      addedBy: pet.addedBy,
      requestedBy: pet.requestedBy,
      dateAdded: pet.dateAdded
    };

    axiosSecure.put(`/pets/${pet._id}`, updatedPetData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `You have successfully updated ${updatedPetData.petName}`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/admin-dashboard/all-pets");
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
    <div className="flex justify-center items-center min-h-screen bg-green-50 mt-64">
      <div className="w-full max-w-4xl bg-green-600 text-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-4">Update Pet</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Pet Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Pet Image</label>
            {pet.petImage && (
              <div className="mb-2">
                <img
                  src={pet.petImage}
                  alt="Current pet"
                  className="h-24 w-24 object-cover rounded"
                />
                <p className="text-xs mt-1">Current image</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              {...register("petImage")}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

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

          {/* Pet Age */}
          <div>
            <label className="block text-sm font-medium mb-2">Pet Age</label>
            <input
              type="number"
              {...register("petAge", { required: true })}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter the pet's age"
            />
          </div>

          {/* Pet Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Pet Category</label>
            <Controller
              name="petCategory"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={petCategories}
                  className="text-black"
                  placeholder="Select a category"
                  onChange={(option) => setValue("petCategory", option)}
                />
              )}
            />
          </div>

          {/* Pet Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Pet Location</label>
            <input
              type="text"
              {...register("petLocation", { required: true })}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter the pickup location"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <textarea
              {...register("shortDescription", { required: true })}
              rows="3"
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Write a short note about the pet"
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Long Description</label>
            <div className="bg-white text-black rounded-lg p-2">
              <EditorContent editor={editor} className="prose focus:outline-none" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
          >
            Update Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdminPet;