import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users/all");
        setUsers(res.data.users);
        setFollowing(res.data.currentUserFollowing.map(id => id.toString()));
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (id) => {
    try {
      await api.put(`/users/follow/${id}`);
      setFollowing([...following, id]);
    } catch (err) {
      console.error("Follow error:", err);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      await api.put(`/users/unfollow/${id}`);
      setFollowing(following.filter(fid => fid !== id));
    } catch (err) {
      console.error("Unfollow error:", err);
    }
  };

  return (
    <div>
      <Header />
      <h2>All Users</h2>
      {users.map(user => {
        const isFollowing = following.includes(user._id);
        return (
          <div key={user._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            {/* Username links to profile */}
            <Link to={`/users/${user._id}`} style={{ textDecoration: "none", color: "blue" }}>
              <h4>{user.username}</h4>
            </Link>

            {isFollowing ? (
              <button onClick={() => handleUnfollow(user._id)}>Unfollow</button>
            ) : (
              <button onClick={() => handleFollow(user._id)}>Follow</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
