import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        const res = await api.post("/login", form);
        alert(res.data.message || "Login successful!");
        navigate("/dashboard");
    } catch (err) {
        alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Log In</button>
      
      <p>Don't have an account</p>
      <Link to="/">
        <button type="button">Signup</button>
      </Link>
    </form>
  );
};

export default Login;
