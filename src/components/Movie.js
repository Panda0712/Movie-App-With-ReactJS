export default function Movie({ movie, onSelect }) {
  return (
    <li className="movie" onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} movie img`} />
      <p>{movie.Title}</p>
    </li>
  );
}
