import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "animate.css";

import "./Nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__logo">
        <h1>
          <span className="title">A</span>.Movie
        </h1>
      </div>
      <div className="nav__list">
        <ul>
          <li>
            <NavLink
              to="/home"
              className={(navData) => (navData.isActive ? " active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
