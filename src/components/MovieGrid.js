import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, watchlist, toggleWatchlist }) {  
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Genre change
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  // Handle Rating change
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  // Function to filter by Genre (handles multiple genres correctly)
  const matchesGenre = (movie, selectedGenre) => {
    return (
      selectedGenre === "All Genres" || 
      movie.genre.toLowerCase().includes(selectedGenre.toLowerCase()) // ✅ Checks if genre exists
    );
  };

  // Function to filter by Search Term (Title)
  const matchesSearchTerm = (movie, search) => {
    return movie.title.toLowerCase().includes(search.toLowerCase());
  };

  // Function to filter by Rating
  const matchesRating = (movie, selectedRating) => {
    const movieRating = Number(movie.rating); // ✅ Ensures numeric comparison
    if (selectedRating === "All") return true;
    if (selectedRating === "Good") return movieRating >= 8;
    if (selectedRating === "Ok") return movieRating >= 5 && movieRating < 8;
    if (selectedRating === "Bad") return movieRating < 5;
    return true;
  };

  // Final Filtered Movies List
  const filteredMovies = movies.filter((movie) => 
    matchesGenre(movie, genre) &&
    matchesSearchTerm(movie, searchTerm) &&
    matchesRating(movie, rating)
  );

  return (
    <div>
      {/* Search input */}
      <input 
        type="text" 
        className="search-input"
        placeholder="Search movies..." 
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Filter Section */}
      <div className="filter-bar">
        {/* Genre Dropdown */}
        <div className="filter-slot">
          <label>Genre</label>
          <select className="filter-dropdown" value={genre} onChange={handleGenreChange}>
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>

        {/* Rating Dropdown */}
        <div className="filter-slot">
          <label>Rating</label>
          <select className="filter-dropdown" value={rating} onChange={handleRatingChange}>
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <MovieCard 
            movie={movie} 
            key={movie.id} 
            toggleWatchlist={toggleWatchlist}
            isWatchlisted={watchlist?.includes(movie.id) || false} // ✅ Prevents undefined error
          />  
        ))}
      </div>
    </div>
  );
}
