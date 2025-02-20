import React from "react";
import "../styles.css";

// MovieCard component receives 'movie' as a prop
export default function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  // Handle image error (if the movie image fails to load, set a default image)
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  // Function to determine rating class
  const getRatingClass = (rating) => {
    if (Number(rating) >= 8) return "rating-good"; // High rating
    if (Number(rating) >= 5) return "rating-ok";   // Medium rating
    return "rating-bad";  // Low rating
  };

  return (
    <div className="movie-card">
      {/* Display movie image */}
      <img src={`images/${movie.image}`} alt={movie.title} onError={handleError} />

      {/* Movie details */}
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>

        {/* Watchlist toggle */}
        <label className="switch">
          <input 
            type="checkbox" 
            checked={isWatchlisted}     
            onChange={() => toggleWatchlist(movie.id)} // ✅ Corrected function call
          />        
          <span className="slider"></span>  
          <span className="slider-label">
            {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
          </span>
        </label>
      </div>
    </div>
  );
}
