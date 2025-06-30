import React from "react";
import api from "../api";

const WatchlistButton = ({ tmdbId }) => {
  const handleClick = async () => {
    try {
      const res = await api.post("/watchlist", { tmdbId });
      alert(res.data.message);
    } catch (err) {
      console.error("Failed to update watchlist", err);
    }
  };

  return <button onClick={handleClick}>Toggle Watchlist</button>;
};

export default WatchlistButton;
