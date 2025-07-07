import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/header.css";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.post("/logout");
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <h1 className="app-title">🎬 ChizFLix</h1>

        <div className="header-right">
          <nav className="app-nav">
            <Link to="/dashboard"><button>🏠 Dashboard</button></Link>
            <Link to="/favorites"><button>❤️ Favorites</button></Link>
            <Link to="/watchlist"><button>📺 Watchlist</button></Link>
            <Link to="/profile"><button>👤 Profile</button></Link>
            <Link to="/users"><button>👥 View All Users</button></Link>
            <button onClick={handleLogout}>🔓 Logout</button>
          </nav>

          {user && (
            <p className="welcome-message">
              Welcome, <strong>{user.username}</strong> 👋
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
