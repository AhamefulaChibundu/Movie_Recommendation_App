import axios from 'axios';
import Movie from '../models/movies.js';
import dotenv from 'dotenv';
dotenv.config();

const importMovie = async (req, res) => {
  const { tmdbId } = req.params;
  const apiKey = process.env.TMDB_API_KEY;

  try {
    // Check if movie exists
    const existingMovie = await Movie.findOne({ tmdbId });
    if (existingMovie) {
      return res.status(200).json({
        message: 'Movie already exists in database',
        movie: existingMovie
      });
    }

    // 1. Fetch movie data
    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = movieRes.data;

    // 2. Fetch video data (for trailers)
    const videoRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${process.env.TMDB_API_KEY}`
    );

    const videos = videoRes.data.results;
    const trailer = videos.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );

    const newMovie = new Movie({
      tmdbId: data.id.toString(),
      title: data.title,
      releaseDate: data.release_date,
      posterPath: data.poster_path,
      overview: data.overview,
      genres: data.genres.map(genre => genre.name),
      voteAverage: data.vote_average,
      popularity: data.popularity,
      videoKey: trailer ? trailer.key : null
    });

    await newMovie.save();

    res.status(201).json({
      message: 'Movie imported and saved successfully',
      movie: newMovie
    });
  } catch (error) {
    console.error('Error importing movie:', error.message);
    console.error(error.response?.data || error);
    res.status(500).json({ message: 'Failed to import movie' });
  }
};

export default importMovie;
