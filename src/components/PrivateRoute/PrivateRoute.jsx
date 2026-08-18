import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (user === null) {
    return (
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
          fontWeight: isActive ? "bold" : "normal",
          textDecoration: "none",
          marginRight: "15px",
        })}
      >
        Home
      </NavLink>
    );
  }

  if (user) {
    return children;
  }

  return null;
};
