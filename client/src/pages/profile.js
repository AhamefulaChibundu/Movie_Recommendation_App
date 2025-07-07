import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css"; // Import the custom profile styles

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data.details);
        setUsername(res.data.details.username);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmDelete) return;

    try {
      const res = await api.delete("/users/delete");
      alert(res.data.message || "Account deleted successfully");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Delete account error:", err);
      alert("Failed to delete account. Please try again.");
    }
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const res = await api.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Profile updated successfully");
      setUser(res.data.details);
    } catch (err) {
      console.error("Update profile error:", err);
      alert("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <Header />
      <h2 className="profile-title">My Profile</h2>

      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-avatar"
        />
      )}

      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Followers:</strong> {user.followers}</p>
        <p><strong>Following:</strong> {user.following}</p>
        <p><strong>Favorites:</strong> {user.favorites}</p>
        <p><strong>Watchlist:</strong> {user.watchlist}</p>
      </div>

      <hr className="profile-divider" />

      <div className="profile-form-group">
        <label>New Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="profile-form-group">
        <label>Upload New Profile Picture:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        {profilePicture && (
          <div>
            <strong>Preview:</strong>
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Preview"
              className="preview-img"
            />
          </div>
        )}
      </div>

      <div className="profile-buttons">
        <button
          onClick={handleUpdateProfile}
          disabled={isUpdating}
          className="update-btn"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>

        <button
          onClick={handleDeleteAccount}
          className="delete-btn"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
