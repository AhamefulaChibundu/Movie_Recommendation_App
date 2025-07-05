import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, onAddToList }) => {
  return (
    <li style={{ display: "flex", marginBottom: "20px", listStyle: "none" }}>
      <Link to={`/movie/${movie.id || movie.tmdbId}`}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path || movie.posterPath}`}
          alt={movie.title}
          style={{ width: "100px", marginRight: "10px" }}
        />
      </Link>

      <div>
        <Link to={`/movie/${movie.id || movie.tmdbId}`} style={{ textDecoration: "none", color: "inherit" }}>
          <h4>
            {movie.title} ({movie.release_date?.split("-")[0] || movie.releaseDate?.split("-")[0] || "N/A"})
          </h4>
        </Link>
        <p><strong>Rating:</strong> {movie.vote_average || movie.voteAverage || "N/A"}</p>
        <p><strong>Overview:</strong> {movie.overview || "No overview available."}</p>
        <button onClick={() => onAddToList(movie.id || movie.tmdbId, "favorites")}>❤️ Favorite</button>
        <button onClick={() => onAddToList(movie.id || movie.tmdbId, "watchlist")}>📺 Watchlist</button>
      </div>
    </li>
  );
};

export default MovieCard;
