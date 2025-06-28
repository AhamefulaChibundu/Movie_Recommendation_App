import Movie from "../models/movies.js";
import User from "../models/users.js";

// Add to Favorites
export const addToFavorites = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId } = req.body;

  if (!tmdbId) return res.status(400).json({ message: "tmdbId is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const movie = await Movie.findOne({ tmdbId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const alreadyFavorited = user.favorites.some(id => id.equals(movie._id));
    if (alreadyFavorited) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    user.favorites.push(movie._id);
    await user.save();
    await user.populate('favorites');

    return res.status(200).json({
      message: "Movie added to favorites",
      favorites: user.favorites
    });
  } catch (error) {
    console.error("Add to favorites error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Remove from Favorites
export const removeFromFavorites = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const movie = await Movie.findOne({ tmdbId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    user.favorites = user.favorites.filter(id => !id.equals(movie._id));
    await user.save();
    await user.populate('favorites');

    return res.status(200).json({
      message: "Movie removed from favorites",
      favorites: user.favorites
    });
  } catch (error) {
    console.error("Remove from favorites error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { addToFavorites, removeFromFavorites };