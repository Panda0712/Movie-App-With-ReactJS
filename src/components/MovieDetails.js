export default function MovieDetails({ watched }) {
  return (
    <div className="watched-details">
      <h3>Title: {watched.Title}</h3>
      <p>Released: {watched.Released}</p>
      <p>Year: {watched.Year}</p>
      <p>Genre: {watched.Genre}</p>
      <p>⭐ {watched.imdbRating} IMDB Rating</p>
      <p>🕛 {watched.Runtime}</p>
    </div>
  );
}
