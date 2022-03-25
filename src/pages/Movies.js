import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import instance from "../axios";
// import requests from "../requests";
import { movieActions } from "../store/movieSlice";
import { uiActions } from "../store/uiSlice";
import MenuIcon from "@mui/icons-material/Menu";

import background from "../img/samuel-regan-asante-wMkaMXTJjlQ-unsplash.jpg";
import Card from "../UI/Card";

import "./Movies.css";

const Movies = () => {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movie.movies);
  const isShown = useSelector((state) => state.ui.isShown);

  const params = useParams();

  const addMovieHandler = (movie) => {
    dispatch(movieActions.addMovie(movie));
  };

  const showNavHandler = () => {
    dispatch(uiActions.showNav());
  };

  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const request = await instance.get(requests.fetchTopRated);

  //     setMovies(request.data.results);
  //   };

  //   fetchMovies();
  // }, []);

  return (
    <div className="movies__page">
      <header
        className="header"
        style={{
          backgroundSize: "containe",
          backgroundImage: `url(${background})`,
          backgroundPosition: "bottom left",
          opacity: 0.8,
        }}
      >
        {!isShown && (
          <MenuIcon className="menu__icon2" onClick={showNavHandler} />
        )}
        <h1>{params.title || "Netflix Originals"}</h1>
        <div className="movies--fadeBottom" />
      </header>
      <Card>
        {movies.map((movie) => {
          return (
            <div className="movie-wrapper">
              <div className="movie__poster">
                <Link to="/details">
                  <img
                    key={movie.id}
                    onClick={addMovieHandler.bind(this, movie)}
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    alt="poster"
                  />
                </Link>
              </div>
              <h3>{movie?.title || movie?.name || movie?.original_name}</h3>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default Movies;
