import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data.details);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
        <Header />
      <h2>My Profile</h2>

      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          style={{ width: "100px", borderRadius: "50%", marginBottom: "10px" }}
        />
      )}

      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      <p><strong>Followers:</strong> {user.followers}</p>
      <p><strong>Following:</strong> {user.following}</p>
      <p><strong>Favorites:</strong> {user.favorites}</p>
      <p><strong>Watchlist:</strong> {user.watchlist}</p>
    </div>
  );
};

export default Profile;
