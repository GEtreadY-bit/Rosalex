import { Navigate, useLocation } from "react-router-dom";

// Simulação de autenticação (ajuste para usar contexto real depois)
const isAuthenticated = () => {
  return localStorage.getItem("isAdminAuthenticated") === "true";
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
