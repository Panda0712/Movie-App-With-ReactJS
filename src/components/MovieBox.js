import Movie from "./Movie";

export default function MovieBox({ data, onSelect }) {
  return (
    <ul className="movie-box">
      {data.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}
    </ul>
  );
}
