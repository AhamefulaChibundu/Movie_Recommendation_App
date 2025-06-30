import React, { useEffect, useState } from "react";
import api from "../api";

const MovieCard = ({ tmdbId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/${tmdbId}`);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };

    fetchReviews();
  }, [tmdbId]);

  return (
    <div className="movie-card">
      <h3>Movie ID: {tmdbId}</h3>
      <h4>Reviews:</h4>
      {reviews.map((r) => (
        <p key={r._id}><strong>{r.user.username}:</strong> {r.comment} ⭐ {r.rating}</p>
      ))}
    </div>
  );
};

export default MovieCard;
