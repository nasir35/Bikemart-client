import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, admin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center py-6">
        <div className="animate-bounce text-stromboli mr-5 font-qsand font-medium">
          loading...
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral"></div>
      </div>
    );
  }
  if (user.email && !admin) {
    return (
      <div className="flex h-full justify-center items-center py-6">
        <div className="text-2xl text-red-400 mr-5 font-qsand font-medium">
          Error! You are not Authorized to access the Page.
        </div>
      </div>
    );
  }

  if (!user.email || !admin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
