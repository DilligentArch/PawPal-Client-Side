import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import Loader from "../Componenet/Loader";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loader />;
    }

    // If user is not an admin, immediately redirect to home
    if (!user || !isAdmin) {
        toast.error("You are not authorized to view this page");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;