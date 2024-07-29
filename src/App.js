import { useEffect, useState } from "react";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Header from "./components/Header";
import MovieBox from "./components/MovieBox";
import WatchedMovie from "./components/WatchedMovie";
import Evaluate from "./components/Evaluate";
import WatchedList from "./components/WatchedList";

const API_KEY = "c485a6e5";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const [watchedList, setWatchedList] = useState(
    () => JSON.parse(localStorage.getItem("watchedList")) || []
  );
  const [ratings, setRatings] = useState(
    () => JSON.parse(localStorage.getItem("ratings")) || {}
  );
  const [watched, setWatched] = useState([]);
  const [showWatched, setShowWatched] = useState(false);

  function handleShowWatchedList() {
    setShowWatched(true);
  }

  function handleDeleteWatchedMovie(id) {
    setWatchedList((watchedList) => {
      const updatedList = [...watchedList].filter((x) => x.Id !== id);
      localStorage.setItem("watchedList", JSON.stringify(updatedList));
      return updatedList;
    });
  }

  function handleClose() {
    setSelectedId(null);
    setWatched([]);
  }

  function handleSelected(id) {
    setSelectedId((selectedId) => (selectedId = id));

    async function fetchMovieDetails() {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );
        if (!res.ok) throw new Error("Error fetching movie details");

        const data = await res.json();
        setWatched([data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }

  function handleSearch(value) {
    if (!value) return;

    async function fetchMovies() {
      try {
        setData([]);
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${value}`
        );
        if (!res.ok) throw new Error("Error fetching movies from api");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setError("");
        setData(data.Search);
      } catch (err) {
        setError(err.message || "Movie not found");
      } finally {
        setIsLoading(false);
        setQuery("");
        setSelectedId(null);
        setWatched([]);
      }
    }
    fetchMovies();
  }

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        setWatched([]);
        setShowWatched(false);
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, []);

  return (
    <div className="container">
      <Header
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onShow={handleShowWatchedList}
        setShowWatched={setShowWatched}
        setData={setData}
      >
        <p>Found {data.length} results</p>
      </Header>
      <Evaluate watchedList={watchedList} />
      {showWatched ? (
        <WatchedList
          watchedList={watchedList}
          setShowWatched={setShowWatched}
          onDelete={handleDeleteWatchedMovie}
        />
      ) : (
        <>
          {selectedId && watched.length > 0 && !error && (
            <WatchedMovie
              watched={watched[0]}
              ratings={ratings}
              setRatings={setRatings}
              setWatchedList={setWatchedList}
              onClose={handleClose}
            />
          )}
          <div className="movie-container">
            {error && <Error error={error} />}
            {isLoading && <Loader />}
            {data.length > 0 && !error && (
              <MovieBox data={data} onSelect={handleSelected} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
