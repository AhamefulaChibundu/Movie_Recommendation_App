import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";
import { Link } from "react-router-dom";

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
    console.log(res.data.message);
    alert(res.data.message); 
    setFavorites(prev => prev.filter(movie => movie.tmdbId !== tmdbId));
  } catch (err) {
    console.error("Failed to remove from favorites:", err);
  }
};


  if (loading) return <p>Loading favorites...</p>;
  if (favorites.length === 0) return <p>No favorites yet</p>;

  return (
    <div>
      <Header />
      <h2>My Favorites</h2>
      <ul>
        {favorites.map((movie) => (
          <li key={movie._id} style={{ marginBottom: "20px", listStyle: "none" }}>
            <Link to={`/movie/${movie.tmdbId}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                alt={movie.title}
                style={{ width: "100px", verticalAlign: "top", marginRight: "10px" }}
              />
            </Link>

            <div style={{ display: "inline-block", maxWidth: "600px" }}>
              <Link to={`/movie/${movie.tmdbId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h3>{movie.title} ({movie.releaseDate?.split("-")[0]})</h3>
              </Link>

              <p><strong>Genres:</strong> {movie.genres?.join(", ")}</p>
              <p><strong>Rating:</strong> {movie.voteAverage}</p>
              <p><strong>Overview:</strong> {movie.overview}</p>

              <button
                onClick={() => handleRemove(movie.tmdbId)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#c0392b",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
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
