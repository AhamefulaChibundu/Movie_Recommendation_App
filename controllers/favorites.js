import Movie from "../models/movies.js";
import User from "../models/users.js";
import axios from "axios";

// Add to Favorites
export const addToFavorites = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId } = req.body;

  if (!tmdbId) return res.status(400).json({ message: "tmdbId is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let movie = await Movie.findOne({ tmdbId });
    if (!movie) {
      const apiKey = process.env.TMDB_API_KEY;
      const movieRes = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}`);
      const videoRes = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${apiKey}`);

      const data = movieRes.data;
      const trailer = videoRes.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

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

    const alreadyFavorited = user.favorites.some(id => id.equals(movie._id));
    if (alreadyFavorited) return res.status(400).json({ message: "Movie already in favorites" });

    user.favorites.push(movie._id);
    await user.save();
    await user.populate("favorites");

    return res.status(200).json({ message: "Movie added to favorites", favorites: user.favorites });
  } catch (err) {
    console.error("Add to favorites error:", err.message);
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
    await user.populate("favorites");

    return res.status(200).json({ message: "Movie removed from favorites", favorites: user.favorites });
  } catch (err) {
    console.error("Remove from favorites error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//  Get Favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    console.error("Get favorites error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { addToFavorites, removeFromFavorites, getFavorites };
