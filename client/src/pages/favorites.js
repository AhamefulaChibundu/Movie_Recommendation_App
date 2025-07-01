import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";

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

  if (loading) return <p>Loading favorites...</p>;
  if (favorites.length === 0) return <p>No favorites yet</p>;

  return (
    <div>
      <Header />
      <h2>My Favorites</h2>
      <ul>
        {favorites.map((movie) => (
          <li key={movie._id} style={{ marginBottom: "20px", listStyle: "none" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
              alt={movie.title}
              style={{ width: "100px", verticalAlign: "top", marginRight: "10px" }}
            />
            <div style={{ display: "inline-block", maxWidth: "600px" }}>
              <h3>{movie.title} ({movie.releaseDate?.split("-")[0]})</h3>
              <p><strong>Genres:</strong> {movie.genres?.join(", ")}</p>
              <p><strong>Rating:</strong> {movie.voteAverage}</p>
              <p><strong>Overview:</strong> {movie.overview}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
