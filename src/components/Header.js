import { useEffect, useRef } from "react";

export default function Header({
  query,
  setQuery,
  onSearch,
  onShow,
  setShowWatched,
  setData,
  setWatched,
  children,
}) {
  const el = useRef(null);

  useEffect(() => {
    el.current.focus();
  }, []);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Enter") {
        onSearch(query);
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery, query, onSearch]);

  return (
    <nav className="navbar">
      <h2
        className="navbar-logo"
        onClick={() => {
          setData([]);
          setWatched([]);
          setShowWatched(false);
        }}
      >
        BuildT
      </h2>
      <ul className="navbar-list">
        <li className="navbar-item" onClick={onShow}>
          Watched List
        </li>
      </ul>
      <div className="navbar-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          ref={el}
        />
        <button onClick={() => onSearch(query)}>Search</button>
      </div>
      {children}
    </nav>
  );
}
