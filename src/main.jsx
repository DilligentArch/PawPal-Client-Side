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
import PetDetails from "./Componenet/PetDetails";
import AdoptionRequest from "./Componenet/AdoptionRequest";
import MyCampaign from "./Componenet/MyCampaign";
import EditCampaign from "./Componenet/EditCampaign";
import CampaignDetails from "./Componenet/CampaignDetails";
import AdminDashboard from "./AdminDashboardLayout.jsx/AdminDashboard";
import Users from "./Componenet/Users";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import AdminPet from "./Componenet/AdminPet";

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
        path: "/pet-details/:id",
        element: <PetDetails></PetDetails>,
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
      {
        path: "/campaign-details/:id",
        element: <CampaignDetails />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>,
    children: [
      {
        path:"add-pets",
        element: <AddPet />,
      },
      {
        path:"adoption-requests",
        element: <AdoptionRequest />,
      },
      {
        path: "my-pets", 
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
      {
        path: "my-donations", 
        element: <MyCampaign />,
      },
      {
        path: "edit-campaign/:id", 
        element: <EditCampaign />,
      },
    ],
  },
  {
    path: "/Admin-dashboard",
    element: <AdminRoute>
      <AdminDashboard />
    </AdminRoute>,
    children: [
      {
        path: "users",
        element:<Users />,
      },
      {
        path: "all-pets",
        element:<AdminPet />,
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
