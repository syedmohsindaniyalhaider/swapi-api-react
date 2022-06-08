import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = "https://swapi.dev/api/films";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Something went Wrong!");
      }
      const data = await res.json();
      const transformedMovies = data.results.map((item) => {
        return {
          title: item.title,
        };
      });
      setMovies(transformedMovies);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);
  // useEffect(() => {
  //   loadMovies().then((data) => {
  //     setMovies(data.results);
  //   });
  // }, []);

  // const transformed = movies.map((item) => (
  //   <p key={item.title}>{item.title}</p>
  // ));

  return (
    <>
      <div className="container p-5">
        <button className="btn btn-dark" onClick={loadMovies} type="button">
          {!loading && "Fetch Data"}
          {loading && (
            <>
              Loading...
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </>
          )}
        </button>

        {!loading &&
          movies.length > 0 &&
          movies.map((item) => <p key={item.title}>{item.title}</p>)}
        {!loading && movies.length === 0 && !error && <p>No Data Found.</p>}
        {!loading && error && <p>{error}</p>}
      </div>
    </>
  );
}

// return <>{transformed}</>;
export default App;
