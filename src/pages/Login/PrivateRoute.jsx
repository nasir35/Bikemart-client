import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="animate-bounce text-stromboli mr-5 font-qsand font-medium">
          loading...
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral"></div>
      </div>
    );
  }

  if (user?.email) {
    return children ? children : <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
