import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";

const PublicRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user?.email) {
    alert("You are already logged in.");
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
};

export default PublicRoute;
