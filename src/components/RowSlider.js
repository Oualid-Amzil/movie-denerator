import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import instance from "../axios";
import "./RowSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { movieActions } from "../store/movieSlice";
import Loader from "../UI/Loader";

const base_url = "https://image.tmdb.org/t/p/original";

const RowSlider = ({ title, fetchUrl, isLast }) => {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMoviesHandler = () => {
    dispatch(movieActions.addMovies(movies));
  };

  const addMovieHandler = (movie) => {
    dispatch(movieActions.addMovie(movie));
  };

  let settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  if (window.innerWidth < 700) {
    settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
  }

  if (window.innerWidth < 500) {
    settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const request = await instance.get(fetchUrl);
        setMovies(request.data.results);
        setIsLoading(false);
        return request;
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [fetchUrl]);

  let content = <h3>Found no movies.</h3>;

  if (movies.length > 0) {
    content = (
      <Slider {...settings}>
        {movies.map((movie) => {
          return (
            <div className="wraper" key={movie.id}>
              <Link to="/details">
                <img
                  onClick={addMovieHandler.bind(this, movie)}
                  src={`${base_url}${movie.backdrop_path}`}
                  alt={movie.name}
                />
              </Link>
            </div>
          );
        })}
      </Slider>
    );
  }

  if (error) {
    content = <h2 style={{ color: "red" }}>{error}</h2>;
  }

  if (isLoading) {
    content = <Loader />;
  }

  return (
    <div className={isLast ? "row-slider last-row" : "row-slider"}>
      <Link to={`/movies/${title}`}>
        <h2 onClick={addMoviesHandler}>{title}</h2>
      </Link>
      {content}
    </div>
  );
};

export default RowSlider;
