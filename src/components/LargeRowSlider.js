import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import instance from "../axios";
import "./LargeRowSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { movieActions } from "../store/movieSlice";
import Loader from "../UI/Loader";

const base_url = "https://image.tmdb.org/t/p/original";

const RowSlider = ({ title, fetchUrl }) => {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addMoviesHandler = () => {
    dispatch(movieActions.addMovies(movies));
  };

  const addMovieHandler = (movie) => {
    dispatch(movieActions.addMovie(movie));
  };

  let settings = {};

  if (window.innerWidth > 900) {
    settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      beforeChange: (current, next) => setImageIndex(next),
    };
  }

  if (window.innerWidth < 900) {
    settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      beforeChange: (current, next) => setImageIndex(next),
    };
  }

  if (window.innerHeight < 500) {
    settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      beforeChange: (current, next) => setImageIndex(next),
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
        {movies.map((movie, idx) => {
          return (
            <div className="wrap" key={movie.id}>
              <Link to="/details">
                <img
                  onClick={addMovieHandler.bind(this, movie)}
                  className={idx === imageIndex ? "slide activeSlide" : "slide"}
                  src={`${base_url}${movie?.poster_path}`}
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
    <div className="row">
      <Link to={`/movies/${title}`}>
        <h2 onClick={addMoviesHandler}>{title}</h2>
      </Link>
      {content}
    </div>
  );
};

export default RowSlider;
