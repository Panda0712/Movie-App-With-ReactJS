export default function MovieDescription({ watched }) {
  return (
    <div className="watched-description">
      <p>Plot: {watched.Plot}</p>
      <p>Starring: {watched.Actors}</p>
      <p>Directed by: {watched.Director}</p>
      <p>Written by: {watched.Writer}</p>
    </div>
  );
}
