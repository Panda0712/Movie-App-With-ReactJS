import { useState } from "react";
import StarRating from "./StarRating";
import MovieDetails from "./MovieDetails";
import MovieDescription from "./MovieDescription";

export default function WatchedMovie({
  watched,
  ratings,
  setRatings,
  setWatchedList,
  onClose,
}) {
  const [movieRating, setMovieRating] = useState(ratings[watched.Title] || 0);

  function handleAdd() {
    const newRating = { ...ratings, [watched.Title]: movieRating };
    setRatings(newRating);
    localStorage.setItem("ratings", JSON.stringify(newRating));

    const newWatched = {
      Id: watched.imdbID,
      Title: watched.Title,
      Rating: watched.imdbRating,
      Runtime: watched.Runtime,
      Year: watched.Year,
      Type: watched.Type,
      Poster: watched.Poster,
      userRating: movieRating,
    };
    setWatchedList((watchedList) => {
      const isContain =
        [...watchedList].filter((x) => x.imdbID === watched.imdbID).length ===
        0;
      if (isContain) {
        const updatedList = [...watchedList, newWatched];
        localStorage.setItem("watchedList", JSON.stringify(updatedList));
        return updatedList;
      }
      return watchedList;
    });
    onClose();
  }

  return (
    <ul className="watched-movie">
      <span role="button" onClick={onClose} className="out-button">
        ❌
      </span>
      <li className="watched">
        <div className="watched-poster">
          <img src={watched.Poster} alt={`${watched.Title} movie img`} />
          <div className="watched-wrapper">
            <MovieDetails watched={watched} />
            <div className="rating">
              {ratings[watched.Title] > 0 ? (
                <p>You have rated this movie {ratings[watched.Title]}⭐</p>
              ) : (
                <>
                  <StarRating onSetRating={setMovieRating} />
                  {movieRating > 0 && (
                    <button onClick={handleAdd} className="add-button">
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <MovieDescription watched={watched} />
          </div>
        </div>
      </li>
    </ul>
  );
}
