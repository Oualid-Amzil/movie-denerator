import React, { useState, useEffect } from "react";
import instance from "../axios";
import Youtube from "react-youtube";
import "./Row.css";

import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow, isLast }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || "", {
        id: true,
        multi: true,
      })
        .then((url) => {
          console.log(url);
          // https://www.youtube.com/watch?v=XtMThy8QKqu
          // const urlParams = new URLSearchParams(new URL(url).search);
          // urlParams.get("v")
          setTrailerUrl(`${url && url[0]}`);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={handleClick.bind(this, movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"} ${
                isLast && "row__posterLast"
              }`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
