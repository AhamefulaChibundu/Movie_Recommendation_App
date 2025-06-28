import Review from "../models/review.js";
import Movie from "../models/movies.js";

export const addOrUpdateReview = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId, rating, comment } = req.body;

  if (!tmdbId || !rating) {
    return res.status(400).json({ message: "tmdbId and rating are required" });
  }

  try {
    const movie = await Movie.findOne({ tmdbId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    let review = await Review.findOne({ user: userId, movie: movie._id });

    if (review) {
      // Update review
      review.rating = rating;
      review.comment = comment || review.comment;
      await review.save();
      return res.status(200).json({ message: "Review updated", review });
    } else {
      // New review
      const newReview = new Review({
        user: userId,
        movie: movie._id,
        rating,
        comment
      });
      await newReview.save();
      return res.status(201).json({ message: "Review added", review: newReview });
    }
  } catch (err) {
    console.error("Review error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteReview = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId } = req.params;

  try {
    const movie = await Movie.findOne({ tmdbId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const result = await Review.findOneAndDelete({ user: userId, movie: movie._id });

    if (!result) return res.status(404).json({ message: "Review not found" });

    return res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.error("Delete review error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getReviewsForMovie = async (req, res) => {
  const { tmdbId } = req.params;

  try {
    const movie = await Movie.findOne({ tmdbId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const reviews = await Review.find({ movie: movie._id }).populate("user", "username profilePicture");

    return res.status(200).json({ reviews });
  } catch (err) {
    console.error("Fetch reviews error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};
