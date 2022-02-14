import { useState, useEffect } from 'react'

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [runtime, setRuntime] = useState(0);

  // fetch movies==================================
  useEffect(() => {
   const fetchMovies = async() => {
     const response = await fetch("http://localhost:4000/movies");
     const listOfMovies = await response.json();
     setMovies(listOfMovies.data);
   }
   fetchMovies();
  }, [movies]);


  // post new movies=================================
  const postNewMovies = async () => {
    const runtimeMins = parseInt(runtime);

    const res = await fetch("http://localhost:4000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, runtimeMins})
    });

    const data = res.json();
    setMovies([...movies, data]);
  }

  // clean form=====================================
  const cleanForm = () => {
    setTitle("");
    setRuntime(0);
  }
  
  // submit form====================================
  const submitMovieHandler = (e) => {
    e.preventDefault();
    postNewMovies();
    cleanForm();
  }
  
  return (
    <>
      <h1>List of movies</h1>
      <ul>
        {movies.map((movie, index)=> {
          return (
            <li key={index}>
              <p>Title: {movie.title}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          )
        })}
      </ul>
      {/* form===================================== */}
      <h2>Create a new movie</h2>
      <form onSubmit={submitMovieHandler}>
        <div>
          <input 
            type="text" 
            placeholder="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
          <br />
        <div>
          <input 
            type="number" 
            placeholder="runtime mins"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default App;
