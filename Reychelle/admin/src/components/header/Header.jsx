//eslint-disable-next-line no-unused-vars
import React from "react";
import "./Header.scss";
import { svg } from "../../assets/assets.js";

const Header = () => {
  return (
    <div className="header">
      <img className="bckgrnd" src={svg.darkGradientbckgrnd} alt="bckgrnd" />
      <div className="logo-profile">
        <div className="logo">
          <img src={svg.reychelleLight} alt="reychelleLight" />
        </div>

        <div className="profile">
          <div className="yoonigg">D</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
