import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: {},
  movies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovie(state, action) {
      state.movie = action.payload;
    },
    addMovies(state, action) {
      state.movies = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice;
