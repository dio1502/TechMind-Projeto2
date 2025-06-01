import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = () => {
  const { user } = useAuth();

  // Se não houver usuário logado, redireciona para a página de login (“/”)
  if (!user) {
    return <Navigate to="/" replace />;
  }
  // Se estiver logado, renderiza as rotas filhas (Outlet)
  return <Outlet />;
};
export default RequireAuth;