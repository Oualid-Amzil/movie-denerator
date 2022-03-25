import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShown: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNav(state) {
      state.isShown = true;
    },
    hideNav(state) {
      state.isShown = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
