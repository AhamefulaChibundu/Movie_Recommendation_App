import React, { useEffect, useState } from "react";
import api from "../api";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setWatchlist(res.data.details.watchlist || []);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>My Watchlist 📺</h2>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <ul>
          {watchlist.map((movie) => (
            <li key={movie._id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                alt={movie.title}
                style={{ width: "100px", marginRight: "10px" }}
              />
              <strong>{movie.title}</strong> ({movie.releaseDate?.split("-")[0]})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
