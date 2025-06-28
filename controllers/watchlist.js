import Movie from "../models/movies.js";
import User from "../models/users.js";

// Add to Watchlist
export const addToWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId } = req.body;

  if (!tmdbId) return res.status(400).json({ message: "tmdbId is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const movie = await Movie.findOne({ tmdbId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const isAlreadyAdded = user.watchlist.some(id => id.equals(movie._id));
    if (isAlreadyAdded) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    user.watchlist.push(movie._id);
    await user.save();
    await user.populate('watchlist');

    return res.status(200).json({
      message: "Movie added to watchlist",
      watchlist: user.watchlist
    });
  } catch (error) {
    console.error("Add to watchlist error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Remove from Watchlist
export const removeFromWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const movie = await Movie.findOne({ tmdbId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    user.watchlist = user.watchlist.filter(id => !id.equals(movie._id));
    await user.save();
    await user.populate('watchlist');

    return res.status(200).json({
      message: "Movie removed from watchlist",
      watchlist: user.watchlist
    });
  } catch (error) {
    console.error("Remove from watchlist error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default {addToWatchlist, removeFromWatchlist};