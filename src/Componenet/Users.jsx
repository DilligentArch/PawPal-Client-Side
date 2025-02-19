import React from "react";
import useUsers from "../Hooks/useUsers";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const { users, refetch } = useUsers();
  const axiosSecure = useAxiosSecure();
//   console.log(users);

const handleMakeAdmin = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/admin/${userId}`, {
        isAdmin: true,
      });
  
      // Check if the response indicates success
      
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "User promoted to admin successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
         
      
    } catch (error) {
      // console.error("Error promoting user to admin:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to promote user to admin. Please try again.",
      });
    }
    refetch();
  };
  

  return (
    <div className="w-20rem">
        <div className="container mx-auto p-6 mt-12">
      <h2 className="text-3xl font-bold text-center mb-6 pt-5">All Users</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Profile Picture</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const { _id, name, email, image, isAdmin } = user;

              return (
                <tr key={_id} className="border-b">
                  {/* Profile Picture */}
                  <td className="px-4 py-2 text-center">
                    <img
                      src={image}
                      alt={name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-4 py-2 text-center">{name}</td>

                  {/* Email */}
                  <td className="px-4 py-2 text-center">{email}</td>

                  {/* Actions */}
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleMakeAdmin(_id)}
                      disabled={isAdmin}
                      className={`px-4 py-2 rounded ${
                        isAdmin
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {isAdmin ? "Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    </div>
  );
};

export default Users;
