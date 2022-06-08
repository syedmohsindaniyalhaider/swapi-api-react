import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieDetails = {
    title: "New Movie 11",
  };

  const addMovieHandler = async () => {
    const response = fetch(
      "https://react-https-9c624-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movieDetails),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response;
    console.log("Data from POST :: ", data);
  };

  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url =
        "https://react-https-9c624-default-rtdb.firebaseio.com/movies.json";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Something went Wrong!");
      }
      const data = await res.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key]?.title,
        });
      }
      // console.log(loadedMovies);
      // const transformedMovies = data.results.map((item) => {
      //   return {
      //     title: item.title,
      //   };
      // });
      setMovies(loadedMovies);
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
        <button onClick={addMovieHandler} className="btn btn-warning me-2">
          Add Movie
        </button>
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
          movies.map((item) => <p key={item?.id}>{item?.title}</p>)}
        {!loading && movies.length === 0 && !error && <p>No Data Found.</p>}
        {!loading && error && <p>{error}</p>}
      </div>
    </>
  );
}

// return <>{transformed}</>;
export default App;
