import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Favorites from "./pages/favorites";
import Watchlist from "./pages/watchlist";
import Profile from "./pages/profile";
import MovieDetails from "./pages/movieDetails";
import UsersList from "./pages/userList";
import UserProfile from "./pages/userProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:tmdbId" element={<MovieDetails />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
