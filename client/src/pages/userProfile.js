import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/header";
import "../styles/userprofile.css"; // new CSS file

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [id]);

  if (!user) return <p className="loading">Loading user profile...</p>;

  return (
    <div className="user-profile-container">
      <Header />
      <div className="user-profile-box">
        <h2 className="username-title">{user.username}'s Profile</h2>
        <ul className="user-stats-list">
          <li><strong>Followers:</strong> {user.followers}</li>
          <li><strong>Following:</strong> {user.following}</li>
          <li><strong>Favorites:</strong> {user.favorites}</li>
          <li><strong>Watchlist:</strong> {user.watchlist}</li>
          <li><strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}</li>
        </ul>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Users List
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
