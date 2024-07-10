import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (user?.email) {
    return children ? children : <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
