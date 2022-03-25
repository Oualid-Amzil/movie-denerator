import React from "react";

import background from "../img/jason-dent-SnXIF8_2oPw-unsplash.jpg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${background})`,
        backgroundPosition: "center center",
        opacity: 0.9,
      }}
    >
      <div className="footer__logo">
        <img
          className="footer__icon"
          src="https://upload.wikimedia.org/wikipedia/commons/6/64/Play_-_The_Noun_Project.svg"
          alt="Netflix Logo"
        />
        <h1>tMovie</h1>
      </div>
      <div className="footer__list">
        <ul>
          <li>Home</li>
          <li>Contact us</li>
          <li>Term of services</li>
          <li>About us</li>
        </ul>
        <ul>
          <li>Live</li>
          <li>FAQ</li>
          <li>Premium</li>
          <li>Privacy policy</li>
        </ul>
        <ul>
          <li>You must watch</li>
          <li>Recent release</li>
          <li>Top IMDB</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
