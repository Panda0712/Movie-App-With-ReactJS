import { average } from "../App";

export default function Evaluate({ watchedList }) {
  const avgRating = average(
    watchedList.map((item) => (!Number(item.Rating) ? 0 : Number(item.Rating)))
  );
  const avgUserRating = average(
    watchedList.map((item) =>
      !Number(item.userRating) ? 0 : Number(item.userRating)
    )
  );
  const avgRunTime = average(
    watchedList.map((item) =>
      !Number(item.Runtime.split(" ")[0])
        ? 0
        : Number(item.Runtime.split(" ")[0])
    )
  );

  return (
    <div className="evaluate">
      <h3>Movie you watched</h3>
      <ul className="evaluate-list">
        <li>
          #️⃣ <span>{watchedList.length} movies</span>
        </li>
        <li>
          ⭐ <span>{avgRating.toFixed(2)}</span>
        </li>
        <li>
          🌟 <span>{avgUserRating.toFixed(2)}</span>
        </li>
        <li>
          🕛 <span>{avgRunTime.toFixed(2)} min</span>
        </li>
      </ul>
    </div>
  );
}
