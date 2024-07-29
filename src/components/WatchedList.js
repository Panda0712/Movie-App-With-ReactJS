import { useEffect } from "react";
import WatchedListMovie from "./WatchedListMovie";

export default function WatchedList({ watchedList, setShowWatched, onDelete }) {
  useEffect(() => {}, []);

  return (
    <ul className="watched-list">
      <span onClick={() => setShowWatched(false)}>🔙</span>
      {!watchedList.length ? (
        <p style={{ color: "#fff" }}>No movie in here</p>
      ) : (
        watchedList.length > 0 &&
        watchedList.map((movie) => (
          <WatchedListMovie key={movie.Id} movie={movie} onDelete={onDelete} />
        ))
      )}
    </ul>
  );
}
