import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { userData, isLoggedIn } = useContext(AppContent);

  // User is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // User is not an admin
  if (!userData || userData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // User is an admin
  return children;
};

export default AdminRoute;