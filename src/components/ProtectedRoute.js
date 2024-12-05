import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use useAuth hook instead of importing AuthContext directly

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth(); // Use the useAuth hook to get the token

  const location = useLocation();

  // Check if there is a token to decide if the user is authenticated
  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
