import { useContext } from "react";
import { AuthContext } from "../Pages/providers/AuthProvider";
import UseAdmin from "../Hooks/UseAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <span className="loading loading-infinity items-center loading-lg"></span>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default AdminRoute;