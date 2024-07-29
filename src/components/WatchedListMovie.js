export default function WatchedListMovie({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} movie img`} />
      <div>
        <h4>{movie.Title}</h4>
        <p>⭐ {movie.Rating}</p>
        <p>🌟 {movie.userRating}</p>
        <p>🕛 {movie.Runtime}</p>
        <button onClick={() => onDelete(movie.Id)}>✖️</button>
      </div>
    </li>
  );
}
