import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Search failed:", error.message);
    }
  };

  return (
    <div>
      <h3>Search Movies</h3>
      <input
        type="text"
        placeholder="Enter movie title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: "1rem" }}>
        {results.map((movie) => (
          <div key={movie.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
            <p>{movie.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ maxWidth: "120px" }}
            />
            <br />
            <a href={`/import-movie/${movie.id}`}>📥 Import</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
