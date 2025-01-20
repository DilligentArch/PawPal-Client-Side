import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLayout from "./MainLayout/MainLayout";
import Home from "./Componenet/Home";
import Login from "./Componenet/Login";
import AuthProvider from "./AuthProvider/AuthProvider";
import Register from "./Componenet/Register";
import DashboardLayout from "./DashboardLayout/DashboardLayout";
import AddPet from "./Componenet/AddPet";
import Pets from "./Componenet/Pets";
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MyPets from "./Componenet/MyPets";
import UpdatePet from "./Componenet/UpdatePet";
import AddCampaign from "./Componenet/AddCampaign";
import DonationCampaign from "./Componenet/DonationCampaign";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/pets",
        element: <Pets></Pets>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/donations",
        element: <DonationCampaign />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path:"add-pets",
        element: <AddPet />,
      },
      {
        path: "my-pets", // Correctly define the path
        element: <MyPets />,
      },
      {
        path: "update-pets", 
        element: <UpdatePet />,
      },
      {
        path: "create-donation", 
        element: <AddCampaign />,
      },
    ],
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>

        <RouterProvider router={router} />

      </QueryClientProvider>
    </AuthProvider>

  </React.StrictMode>
);
