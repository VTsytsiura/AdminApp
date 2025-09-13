import React from "react";
import { useUser } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-root">
      <Sidebar onLogout={handleLogout} />
      <div className="dashboard-main">{children}</div>
    </div>
  );
};

export default PrivateLayout;