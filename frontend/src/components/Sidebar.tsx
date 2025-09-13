import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="logo">🎮</div>

      <nav className="side-nav">
        <Link to="/" className={`icon-btn ${location.pathname === "/" ? "active" : ""}`} title="Statistics">
          📊
        </Link>
        <Link to="/players" className={`icon-btn ${location.pathname === "/players" ? "active" : ""}`} title="Players">
          👥
        </Link>
        <Link to="/settings" className={`icon-btn ${location.pathname === "/settings" ? "active" : ""}`} title="Settings">
          ⚙️
        </Link>
        <button onClick={handleLogout} className="icon-btn" title="Logout">
          🚪
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;