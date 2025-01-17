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
    ],
  },
  {
    path: "/dashboard/add-pet",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AddPet></AddPet>
      },

    ]

  },
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
