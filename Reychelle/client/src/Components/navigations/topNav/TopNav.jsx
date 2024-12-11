//eslint-disable-next-line no-unused-vars
import React from "react";
import { logo } from "../../../assets/assets";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import "./TopNav.scss";

const TopNav = () => {
  return (
    <div className="top-navigation">
      <img className="background" src={logo.darkGradBckgd} alt="bck" />
      <div className="logo">
        <img src={logo.reychelleLight} alt="reychelle gold" />
      </div>
      <div className="search-box">
        <input type="type" placeholder="search our store" />
        <FaSearch className="search-icon" />
      </div>
      <div className="navs">
        <div className="nav-left">
          <ul>
            <li>All Product</li>
            <li>Designers</li>
            <li>Customers</li>
            <li>Designs</li>
            <li>About</li>
          </ul>
        </div>
        <div className="nav-right">
          <FaShoppingCart />
          <p>Auth</p>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
