import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Review from "../components/review";
import Header from "../components/header";

const MovieDetails = () => {
  const { tmdbId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie details:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [tmdbId]);

  if (loading) return <p>Loading movie...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <h2>{movie.title} ({movie.release_date?.split("-")[0]})</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "200px", marginBottom: "10px" }}
      />
      <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>

      <Review tmdbId={tmdbId} />
    </div>
  );
};

export default MovieDetails;
