import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, onAddToList }) => {
  return (
    <li className="movie-card">
      <Link to={`/movie/${movie.id || movie.tmdbId}`}>
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path || movie.posterPath}`}
          alt={movie.title}
        />
      </Link>

      <div className="movie-info">
        <Link
          to={`/movie/${movie.id || movie.tmdbId}`}
          className="movie-title"
        >
          {movie.title} (
          {movie.release_date?.split("-")[0] || movie.releaseDate?.split("-")[0] || "N/A"})
        </Link>
        <p className="movie-rating">
          <strong>Rating:</strong> {movie.vote_average || movie.voteAverage || "N/A"}
        </p>
        <p className="movie-overview">
          {movie.overview || "No overview available."}
        </p>
        <div className="movie-buttons">
          <button onClick={() => onAddToList(movie.id || movie.tmdbId, "favorites")}>❤️ Favorite</button>
          <button onClick={() => onAddToList(movie.id || movie.tmdbId, "watchlist")}>📺 Watchlist</button>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
