import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminProtectedRoute = () => {
  const { token, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    console.warn("Access denied: User is not an admin.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
