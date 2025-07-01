import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/header";

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

  if (loading) return <p>Loading watchlist...</p>;
  if (watchlist.length === 0) return <p>No movies in watchlist</p>;

  return (
    <div>
      <Header />
      <h2>My Watchlist</h2>
      <ul>
        {watchlist.map((movie) => (
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

export default Watchlist;
