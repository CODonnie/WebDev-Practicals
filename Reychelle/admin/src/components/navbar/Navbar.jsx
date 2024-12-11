//eslint-disable-next-line no-unused-vars
import React from "react";
import "./Navbar.scss";
import { FaList, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { svg } from "../../assets/assets.js";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navs">
        <NavLink to="/add" className="flex-col">
          <div className="icons">
            <FaPlus size="10px" />
          </div>
          <p>Add Product</p>
        </NavLink>
        <NavLink to="/list" className="flex-col">
          <div className="icons">
            <FaList size="10px" />
          </div>
          <p>List Product</p>
        </NavLink>
        <NavLink to="/order" className="flex-col">
          <div className="icons">
            <FaList size="10px" />
          </div>
          <p>Orders</p>
        </NavLink>
      </div>
      <div className="logo">
        <img src={svg.reychelleGold} alt="reychelleGold" />
      </div>
    </div>
  );
};

export default Navbar;
