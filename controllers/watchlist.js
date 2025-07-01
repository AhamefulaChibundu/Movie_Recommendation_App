import Movie from "../models/movies.js";
import User from "../models/users.js";
import axios from "axios";

// Add to Watchlist
export const addToWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId } = req.body;

  if (!tmdbId) return res.status(400).json({ message: "tmdbId is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If movie doesn't exist locally, fetch from TMDB and save
    let movie = await Movie.findOne({ tmdbId });
    if (!movie) {
      const apiKey = process.env.TMDB_API_KEY;

      const movieRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}`
      );
      const videoRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${apiKey}`
      );

      const data = movieRes.data;
      const trailer = videoRes.data.results.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );

      movie = new Movie({
        tmdbId: data.id.toString(),
        title: data.title,
        releaseDate: data.release_date,
        posterPath: data.poster_path,
        overview: data.overview,
        genres: data.genres.map(g => g.name),
        voteAverage: data.vote_average,
        popularity: data.popularity,
        videoKey: trailer ? trailer.key : null,
      });

      await movie.save();
    }

    // Check if already in watchlist
    const isAlreadyAdded = user.watchlist.some(id => id.equals(movie._id));
    if (isAlreadyAdded) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    // Add to watchlist
    user.watchlist.push(movie._id);
    await user.save();
    await user.populate('watchlist');

    return res.status(200).json({
      message: "Movie added to watchlist",
      watchlist: user.watchlist,
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

// Get Watchlist
export const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchlist");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ watchlist: user.watchlist });
  } catch (err) {
    console.error("Get watchlist error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { addToWatchlist, removeFromWatchlist, getWatchlist };
