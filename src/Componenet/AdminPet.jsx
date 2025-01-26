import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAllPets from "../Hooks/useAllPets";

const AdminPet = () => {
  const [pets, refetch] = useAllPets();
  const [sorting, setSorting] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Table columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "serialNumber",
        header: "Serial No.",
        cell: (info) => info.row.index + 1, // Auto-increment serial number
      },
      {
        accessorKey: "petName",
        header: "Pet Name",
      },
      {
        accessorKey: "petCategory",
        header: "Category",
      },
      {
        accessorKey: "petImage",
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Pet"
            className="h-full w-[100rem] lg:h-24 lg:w-36 rounded"
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Adoption Status",
        cell: (info) =>
          info.getValue() === "Adopted" ? (
            <span className="text-green-600 font-medium">Adopted</span>
          ) : (
            <span className="text-red-600 font-medium">Not Adopted</span>
          ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const pet = row.original;
          const isAdopted = pet.status === "Adopted";
          
          return (
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600"
                onClick={() => handleUpdate(pet)}
              >
                Update
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(pet._id)}
              >
                Delete
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  isAdopted 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                onClick={() => handleAdoptionToggle(pet)}
              >
                {isAdopted ? "Cancel Adoption" : "Mark as Adopted"}
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  // React Table instance
  const table = useReactTable({
    data: pets,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Handlers
  const handleUpdate = (pet) => {
    console.log("Update pet:", pet);
    navigate('/user-dashboard/update-pets', { state: { pet } });
  };
  
  const handleDelete = (pet) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/pets/${pet}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
        }
    });
  };

  const handleAdoptionToggle = (data) => {
    const newStatus = data.status === "Adopted" ? "Not adopted" : "Adopted";
    const updatedPetData = { status: newStatus };

    axiosSecure.put(`/pets-status/${data._id}`, updatedPetData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Successfully updated adoption status for ${data.petName}`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch(error => {
        console.error("Failed to update pet status:", error);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to update pet status",
          text: "Please try again",
          showConfirmButton: true
        });
      });
  };

  return (
    <div className="bg-green-50  mt-24">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          My Added Pets
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-green-600 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 text-left text-sm font-medium"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" && " 🔼"}
                      {header.column.getIsSorted() === "desc" && " 🔽"}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPet;