import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieGrid from "./components/MovieGrid";
import Watchlist from "./components/Watchlist"; // ✅ Fixed incorrect import path
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetch("/movies.json") // ✅ Ensure movies.json is in the `public` folder
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  return (
    <Router> {/* ✅ Router should wrap the entire app */}
      <div className="App">
        <div className="container">
          <Header />

          {/* ✅ Navigation Bar */}
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link> {/* ✅ Fixed incorrect <link> tag */}
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link> {/* ✅ Fixed casing in the URL */}
              </li>
            </ul>
          </nav>

          {/* ✅ Route Definitions */}
          <Routes>
            <Route
              path="/"
              element={<MovieGrid movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />}
            />
            <Route
              path="/watchlist"
              element={<Watchlist watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
