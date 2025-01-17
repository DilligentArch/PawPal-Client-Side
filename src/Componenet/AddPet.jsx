import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddPet = () => {
  const { register, handleSubmit, control, setValue, reset} = useForm();
  const axiosSecure = useAxiosSecure();
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
    

  const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "bird", label: "Bird" },
  ];

  const IMAGEBB_API_KEY = import.meta.env.VITE_ImageApiKey;

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
        formData
      );
      return response.data.data.url; // Return the image URL from ImageBB
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    // Step 1: Handle image upload
    let imageUrl = null;
    if (data.petImage?.[0]) {
      imageUrl = await handleImageUpload(data.petImage[0]);
    }

    if (!imageUrl) {
      alert("Image upload failed. Please try again.");
      return;
    }

    // Step 2: Prepare the data object
    const petData = {
      petName: data.petName,
      petAge: data.petAge,
      petCategory: data.petCategory?.value || null,
      petLocation: data.petLocation,
      shortDescription: data.shortDescription,
      longDescription: editor?.getHTML() || "",
      petImage: imageUrl, // Image URL from ImageBB
    };

    // console.log("Data to submit:", petData);

    axiosSecure.post('/pets', petData)
    .then(res => {
        // console.log(res.data)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `You have succesfully added ${petData.petName} `,
                showConfirmButton: false,
                timer: 1500
                
            });
            reset();
            editor?.commands.setContent("");
           
        }

    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 mt-64">
      <div className="w-full max-w-4xl bg-green-600 text-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-4">Add a New Pet</h2>
        <p className="text-center text-sm mb-6">
          Help us connect your pet with a loving home! Fill out the form below
          with as much detail as possible to ensure your pet gets the best match.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Pet Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Pet Image</label>
            <p className="text-xs mb-2">
              Upload a clear and recent image of your pet.
            </p>
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
              className="w-full h-14 px-3 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
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
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
