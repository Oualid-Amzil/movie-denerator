import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { uiActions } from "../store/uiSlice";
import Modal from "./modal/Modal";
import CloseIcon from "@mui/icons-material/Close";

import "./MobileNav.css";

const MobileNav = () => {
  const dispatch = useDispatch();

  const hideNavHandler = () => {
    dispatch(uiActions.hideNav());
  };

  return (
    <Modal>
      <div className="mobilenav__list">
        <CloseIcon className="close__icon" onClick={hideNavHandler} />
        <ul>
          <li>
            <Link to="/home" onClick={hideNavHandler}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" onClick={hideNavHandler}>
              Movies
            </Link>
          </li>
          <li>
            <Link to="/tvseries" onClick={hideNavHandler}>
              TV Series
            </Link>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default MobileNav;
