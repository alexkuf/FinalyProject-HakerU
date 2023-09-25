import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const ProtectedRoute = ({ children, onlyAdmin = false }) => {
  const { user } = useAuth();

  if (!user || (onlyAdmin && !user.isAdmin)) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
