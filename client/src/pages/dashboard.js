import React, { useEffect, useState } from "react";
import api from "../api";
import axios from "axios";
import Header from "../components/header";
import MovieCard from "../components/movieCard";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(""); // New

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
        const movies = res.data.results;
        setRecommended(movies);

        const withBackdrop = movies.find((movie) => movie.backdrop_path);
        if (withBackdrop) {
          setBackgroundImage(
            `https://image.tmdb.org/t/p/original${withBackdrop.backdrop_path}`
          );
        }
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

      const profileRes = await api.get("/profile");
      setUser(profileRes.data.details);
    } catch (err) {
      alert(err.response?.data?.message || `Failed to add to ${listType}`);
    }
  };

  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div className="overlay"></div>
      <Header user={user} />
      <main className="dashboard-main">

        {user ? (
          <section className="user-info">

            <form className="search-form" onSubmit={searchMovies}>
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            {searchResults.length > 0 && (
              <section className="search-results">
                <h3>Search Results:</h3>
                <ul className="movie-list">
                  {searchResults.map((movie) => (
                    <MovieCard
                      key={movie.id || movie.tmdbId}
                      movie={movie}
                      onAddToList={handleAddToList}
                    />
                  ))}
                </ul>
              </section>
            )}

            {recommended.length > 0 && (
              <section className="recommended-section">
                <h3>Recommended Movies</h3>
                <ul className="movie-list">
                  {recommended.map((movie) => (
                    <MovieCard
                      key={movie.id || movie.tmdbId}
                      movie={movie}
                      onAddToList={handleAddToList}
                    />
                  ))}
                </ul>
              </section>
            )}
          </section>
        ) : (
          <p className="loading">Loading user info...</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
