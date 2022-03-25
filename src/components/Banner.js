import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import instance from "../axios";
import requests from "../requests";
import { uiActions } from "../store/uiSlice";
import { movieActions } from "../store/movieSlice";
import MenuIcon from "@mui/icons-material/Menu";

import "./Banner.css";

const Banner = (props) => {
  const dispatch = useDispatch();

  const [movie, setMovie] = useState([]);
  const isShown = useSelector((state) => state.ui.isShown);

  const showNavHandler = () => {
    dispatch(uiActions.showNav());
  };

  const addMovieHandler = () => {
    dispatch(movieActions.addMovie(movie));
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(requests.fetchNetflixOriginals);
      const randomID = Math.floor(Math.random() * request.data.results.length);

      setMovie(request.data.results[randomID]);
      dispatch(movieActions.addMovies(request.data.results));
    };

    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
        opacity: 0.9,
      }}
    >
      {!isShown && (
        <div>
          <MenuIcon className="menu__icon" onClick={showNavHandler} />
        </div>
      )}
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className="banner__description">{truncate(movie?.overview, 140)}</p>

        <div className="banner__buttons">
          <Link to="/details">
            <button className="banner__button--play" onClick={addMovieHandler}>
              More Details
            </button>
          </Link>
          <button className="banner__button--list">My List</button>
        </div>
      </div>
      <div className="banner__poster">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          alt="poster"
          className="image"
        />
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
