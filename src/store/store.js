import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./uiSlice";
import movieSlice from "./movieSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    movie: movieSlice.reducer,
  },
});

export default store;
