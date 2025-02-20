import React from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function Watchlist({ movies, watchlist, toggleWatchlist }) {
  return (
    <div>
      <h1 className="title">Your Watchlist</h1>
      <div className="movie-grid"> {/* ✅ Used the correct class for styling */}
        {watchlist.map((id) => {
          const movie = movies.find((movie) => movie.id === id);

          // ✅ Handle cases where movie is not found
          if (!movie) return null;

          return (
            <MovieCard
              key={id}
              movie={movie}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted={true}
            />
          );
        })}
      </div>
    </div>
  );
}
