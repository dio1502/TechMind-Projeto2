import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireRole = ({ role }) => {
  const { user } = useAuth();

  // Se não houver usuário logado ou o papel for diferente, redireciona para “/”
  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Se o usuário existir *e* tiver o papel correto, renderiza o Outlet (rotas filhas)
  return <Outlet />;
};
export default RequireRole;