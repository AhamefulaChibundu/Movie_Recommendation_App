import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/signup", form);
      alert(res.data.message || "Signup successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Create Account</button>

      <p>Already have an account?</p>
      <Link to="/login">
        <button type="button">Login</button>
      </Link>
    </form>
  );
};

export default Signup;
