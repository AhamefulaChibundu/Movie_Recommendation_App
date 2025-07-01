import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";

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
      <h2>Dashboard</h2>
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
                  <li key={movie.id} style={{ display: "flex", marginBottom: "20px", listStyle: "none" }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                    <div>
                      <h4>{movie.title} ({movie.release_date?.split("-")[0] || "N/A"})</h4>
                      <p><strong>Rating:</strong> {movie.vote_average || "N/A"}</p>
                      <p><strong>Overview:</strong> {movie.overview || "No overview available."}</p>

                      <button onClick={() => handleAddToList(movie.id, "favorites")}>❤️ Favorite</button>
                      <button onClick={() => handleAddToList(movie.id, "watchlist")}>📺 Watchlist</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link to="/favorites">
            <button>❤️ View Favorites</button>
          </Link>
          <Link to="/watchlist">
            <button>📺 View Watchlist</button>
          </Link>
          <Link to="/profile">
            <button>View Profile</button>
          </Link>

          {/* ⭐ Recommended Movies */}
          {recommended.length > 0 && (
            <div>
              <h3>Recommended Movies</h3>
              <ul style={{ padding: 0 }}>
                {recommended.map((movie) => (
                  <li key={movie.id} style={{ display: "flex", marginBottom: "20px", listStyle: "none" }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                    <div>
                      <h4>{movie.title} ({movie.release_date?.split("-")[0] || "N/A"})</h4>
                      <p><strong>Rating:</strong> {movie.vote_average}</p>
                      <p><strong>Overview:</strong> {movie.overview}</p>
                      <button onClick={() => handleAddToList(movie.id, "favorites")}>❤️ Favorite</button>
                      <button onClick={() => handleAddToList(movie.id, "watchlist")}>📺 Watchlist</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/*  Navigation */}
          
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
