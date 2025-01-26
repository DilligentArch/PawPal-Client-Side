import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // Replace with your backend base URL
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // Request interceptor to add the Authorization header
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token"); // Retrieve token from localStorage
            if (token) {
                config.headers.authorization = `Bearer ${token}`; // Add token to request headers
            }
            return config;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    // Response interceptor to handle errors (e.g., 401 or 403)
    axiosSecure.interceptors.response.use(
        (response) => {
            return response; // Pass through successful responses
        },
        async (error) => {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                // If unauthorized or forbidden, log out the user and redirect to login
                await logOut();
                navigate("/login");
            }
            return Promise.reject(error); // Reject the error for further handling
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
