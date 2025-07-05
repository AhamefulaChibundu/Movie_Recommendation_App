import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.post("/logout");
      alert(res.data.message);
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <nav>
        <Link to="/dashboard"><button>🏠 Dashboard</button></Link>{" | "}
        <Link to="/favorites"><button>❤️ Favorites</button></Link>{" | "}
        <Link to="/watchlist"><button>📺 Watchlist</button></Link>{" | "}
        <Link to="/profile"><button>👤 Profile</button></Link>{" | "}
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          🔓 Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
