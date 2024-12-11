//eslint-disable-next-line no-unused-vars
import React from "react";
import "./Catalog.scss";
import { FaSearch } from "react-icons/fa";

const Catalog = () => {
  return (
    <div className="container">
      <div className="catalog-container">
        <div className="header">
          <h1>Catalog</h1>
          <div className="search-filter">
            <div className="search">
              <input type="text" placeholder="search categories" />
              <FaSearch className="search-icon"/>
            </div>
            <button>filter</button>
          </div>
          <button className="view-all">View all</button>
        </div>
        {[...Array(7)].map((index) => {
          return (
            <div key={index} className="name-product">
              <div className="name">name of product</div>
              <div className="product">products display</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
