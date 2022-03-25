import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import Nav from "./components/Nav";
import MobileNav from "./components/MobileNav";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  const isShown = useSelector((state) => state.ui.isShown);

  return (
    <>
      <BrowserRouter>
        {isShown && <MobileNav />}
        <Nav />

        <Routes>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/movies" element={<Movies />}>
            <Route path=":title" element={<Movies />}></Route>
          </Route>
          {/* <Route path="/movies/:title" element={<Movies />}></Route> */}
          <Route path="/details" element={<Details />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
