import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";
import { Link } from "react-router-dom";
import "../styles/userslist.css"; // import the new styles

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
    <div className="userslist-container">
      <Header />
      <h2 className="userslist-title">All Users</h2>
      {users.map(user => {
        const isFollowing = following.includes(user._id);
        return (
          <div key={user._id} className="user-card">
            <Link to={`/users/${user._id}`} className="user-link">
              <h4>{user.username}</h4>
            </Link>

            {isFollowing ? (
              <button className="unfollow-btn" onClick={() => handleUnfollow(user._id)}>Unfollow</button>
            ) : (
              <button className="follow-btn" onClick={() => handleFollow(user._id)}>Follow</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
