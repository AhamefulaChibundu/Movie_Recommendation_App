import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";
import { Link } from "react-router-dom";
import "../styles/favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites");
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (tmdbId) => {
    try {
      const res = await api.delete(`/favorites/${tmdbId}`);
      alert(res.data.message);
      setFavorites((prev) =>
        prev.filter((movie) => movie.tmdbId !== tmdbId)
      );
    } catch (err) {
      console.error("Failed to remove from favorites:", err);
    }
  };

  if (loading) return <p className="favorites-message">Loading favorites...</p>;
  if (favorites.length === 0)
    return <p className="favorites-message">No favorites yet</p>;

  return (
    <div className="favorites-container">
      <Header />
      <h2 className="favorites-title">My Favorites</h2>
      <ul className="favorites-list">
        {favorites.map((movie) => (
          <li key={movie._id} className="favorite-card">
            <Link to={`/movie/${movie.tmdbId}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                alt={movie.title}
              />
            </Link>

            <div className="favorite-info">
              <Link
                to={`/movie/${movie.tmdbId}`}
                className="favorite-title"
              >
                {movie.title} ({movie.releaseDate?.split("-")[0]})
              </Link>

              <p><strong>Genres:</strong> {movie.genres?.join(", ")}</p>
              <p><strong>Rating:</strong> {movie.voteAverage}</p>
              <p><strong>Overview:</strong> {movie.overview}</p>

              <button
                onClick={() => handleRemove(movie.tmdbId)}
                className="remove-button"
              >
                Remove from Favorites
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
