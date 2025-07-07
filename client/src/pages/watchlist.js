import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";
import { Link } from "react-router-dom";
import "../styles/watchlist.css"; // ✅ import

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await api.get("/watchlist");
        setWatchlist(res.data.watchlist || []);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemove = async (tmdbId) => {
    try {
      const res = await api.delete(`/watchlist/${tmdbId}`);
      alert(res.data.message);
      setWatchlist((prev) =>
        prev.filter((movie) => movie.tmdbId !== tmdbId)
      );
    } catch (err) {
      console.error("Failed to remove from watchlist:", err);
    }
  };

  if (loading) return <p className="watchlist-message">Loading watchlist...</p>;
  if (watchlist.length === 0)
    return <p className="watchlist-message">No movies in watchlist</p>;

  return (
    <div className="watchlist-container">
      <Header />
      <h2 className="watchlist-title">My Watchlist</h2>
      <ul className="watchlist-list">
        {watchlist.map((movie) => (
          <li key={movie._id} className="watchlist-card">
            <Link to={`/movie/${movie.tmdbId}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                alt={movie.title}
              />
            </Link>
            <div className="watchlist-info">
              <Link to={`/movie/${movie.tmdbId}`} className="watchlist-title-link">
                {movie.title} ({movie.releaseDate?.split("-")[0]})
              </Link>

              <p><strong>Genres:</strong> {movie.genres?.join(", ")}</p>
              <p><strong>Rating:</strong> {movie.voteAverage}</p>
              <p><strong>Overview:</strong> {movie.overview}</p>

              <button
                onClick={() => handleRemove(movie.tmdbId)}
                className="remove-watchlist-button"
              >
                Remove from Watchlist
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
