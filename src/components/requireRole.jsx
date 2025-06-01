import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireRole = ({ role }) => {
  const { user } = useAuth();


  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};
export default RequireRole;