import React from 'react'
import ReactDOM from "react-dom";
import "./spinner.scss";

const Spinner = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </div>
    </div>,
    document.getElementById("loader")
  );
}

export default Spinner