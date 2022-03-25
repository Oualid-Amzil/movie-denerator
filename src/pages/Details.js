import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { uiActions } from "../store/uiSlice";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu";
import "./Details.css";

const Details = () => {
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movie.movie);
  const isShown = useSelector((state) => state.ui.isShown);

  const showNavHandler = () => {
    dispatch(uiActions.showNav());
  };

  return (
    <div
      className="container"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
        opacity: 0.9,
      }}
    >
      {!isShown && (
        <MenuIcon className="menu__icon1" onClick={showNavHandler} />
      )}
      <div className="wrapper">
        <div className="poster-image">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt="movie poster"
          />
        </div>
        <div className="details">
          <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
          <h3>
            + Language: <span>{movie?.original_language}</span>
          </h3>
          <h3>
            + rating: <span>{movie?.vote_average}</span>
            <StarIcon className="star__icon" />
          </h3>
          <p>{movie?.overview}</p>
          <div className="details-button">
            <button>
              <img src="/images/play-icon-black.png" alt="play icon" /> TRAILER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
