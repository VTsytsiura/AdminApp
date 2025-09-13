import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};