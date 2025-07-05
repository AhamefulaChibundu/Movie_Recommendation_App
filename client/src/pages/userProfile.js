import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import api from "../api";
import Header from "../components/header";

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

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div>
      <Header />
      <h2>{user.username}'s Profile</h2>

      <p><strong>Followers:</strong> {user.followers}</p>
      <p><strong>Following:</strong> {user.following}</p>
      <p><strong>Favorites:</strong> {user.favorites}</p>
      <p><strong>Watchlist:</strong> {user.watchlist}</p>
      <p><strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}</p>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ← Back to Users List
      </button>
    </div>
  );
};

export default UserProfile;
