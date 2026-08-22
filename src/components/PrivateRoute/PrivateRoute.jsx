import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (user === null) {
    return <Navigate to="/"></Navigate>;
  }

  if (user) {
    return children;
  }

  return null;
};
