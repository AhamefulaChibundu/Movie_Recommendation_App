import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import MovieCard from "../components/movieCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data.details);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    const fetchRecommended = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        setRecommended(res.data.results);
      } catch (error) {
        console.error("Failed to fetch recommended movies:", error.message);
      }
    };

    fetchProfile();
    fetchRecommended();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      setSearchResults(res.data.results);
    } catch (error) {
      console.error("Search error:", error.message);
    }
  };

  const handleAddToList = async (tmdbId, listType) => {
    try {
      const res = await api.post(`/${listType}`, { tmdbId });
      alert(res.data.message);

      // Refresh profile data to reflect updated favorites/watchlist
      const profileRes = await api.get("/profile");
      setUser(profileRes.data.details);
    } catch (err) {
      alert(err.response?.data?.message || `Failed to add to ${listType}`);
    }
  };

  return (
    <div>
      <Header />
      <h2>ChizFLix</h2>
      {user ? (
        <div>
          <p>
            Welcome, <strong>{user.username}</strong> 👋
          </p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
          <p>Favorites: {user.favorites}</p>
          <p>Watchlist: {user.watchlist}</p>

          {/* Search Movies */}
          <form onSubmit={searchMovies}>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div>
              <h3>Search Results:</h3>
              <ul style={{ padding: 0 }}>
                {searchResults.map((movie) => (
                  <MovieCard
                    key={movie.id || movie.tmdbId}
                    movie={movie}
                    onAddToList={handleAddToList}
                  />
                ))}
              </ul>
            </div>
          )}

          <Link to="/users">
            <button>👥 View All Users</button>
          </Link>


          {/* Recommended Movies */}
          {recommended.length > 0 && (
            <div>
              <h3>Recommended Movies</h3>
              <ul style={{ padding: 0 }}>
                {recommended.map((movie) => (
                  <MovieCard
                    key={movie.id || movie.tmdbId}
                    movie={movie}
                    onAddToList={handleAddToList}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
