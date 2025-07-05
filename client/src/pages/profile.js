import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

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
        formData.append("profilePicture", profilePicture); // only append if user selected a file
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

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: "20px" }}>
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

      <hr style={{ margin: "20px 0" }} />

      <div style={{ marginBottom: "20px" }}>
        <label><strong>New Username:</strong></label><br />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "5px", width: "250px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label><strong>Upload New Profile Picture:</strong></label><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        {profilePicture && (
          <div style={{ marginTop: "10px" }}>
            <strong>Preview:</strong><br />
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Preview"
              style={{ width: "100px", borderRadius: "50%" }}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleUpdateProfile}
        disabled={isUpdating}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        {isUpdating ? "Updating..." : "Update Profile"}
      </button>

      <button
        onClick={handleDeleteAccount}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Delete My Account
      </button>
    </div>
  );
};

export default Profile;
