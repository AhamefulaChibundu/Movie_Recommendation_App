import React, { useEffect, useState } from "react";
import api from "../api";

const Review = ({ tmdbId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [myReview, setMyReview] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/${tmdbId}`);
      setReviews(res.data.reviews || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch reviews:", err.message);
    }
  };

  const submitReview = async () => {
    try {
      const res = await api.post("/reviews", { tmdbId, rating, comment });
      alert(res.data.message);
      fetchReviews(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review.");
    }
  };

  const deleteMyReview = async () => {
    try {
      const res = await api.delete(`/reviews/${tmdbId}`);
      alert(res.data.message);
      setRating("");
      setComment("");
      fetchReviews();
    } catch (err) {
      alert("Failed to delete review.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [tmdbId]);

  useEffect(() => {
    // Detect if user has already submitted a review
    const fetchMyProfile = async () => {
      try {
        const res = await api.get("/profile");
        const userId = res.data.details.id;
        const mine = reviews.find((r) => r.user._id === userId);
        if (mine) {
          setMyReview(mine);
          setRating(mine.rating);
          setComment(mine.comment);
        }
      } catch (err) {
        console.error("Could not fetch profile for review check");
      }
    };

    if (reviews.length > 0) fetchMyProfile();
  }, [reviews]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Reviews</h3>

      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul>
              {reviews.map((r) => (
                <li key={r._id} style={{ marginBottom: "10px", listStyle: "none" }}>
                  <strong>{r.user.username}</strong> ⭐ {r.rating}
                  <p>{r.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <h4>{myReview ? "Update Your Review" : "Leave a Review"}</h4>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
          placeholder="Rating (1-10)"
        />
        <br />
        <textarea
          rows="4"
          cols="50"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button onClick={submitReview}>{myReview ? "Update Review" : "Submit Review"}</button>
        {myReview && (
          <button onClick={deleteMyReview} style={{ marginLeft: "10px", color: "red" }}>
            Delete Review
          </button>
        )}
      </div>
    </div>
  );
};

export default Review;
