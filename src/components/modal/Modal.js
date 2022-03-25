import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

import { uiActions } from "../../store/uiSlice";
import "./Modal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal animate__animated   animate__fadeInRight">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const dispatch = useDispatch();

  const hideNavHandler = () => {
    dispatch(uiActions.hideNav());
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={hideNavHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
