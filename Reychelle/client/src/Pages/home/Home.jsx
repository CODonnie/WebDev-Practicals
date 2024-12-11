//eslint-disable-next-line no-unused-vars
import React from "react";
import "./Home.scss";
import Hero from "../../Components/hero/Hero";
import TextScroll from "../../Components/scroll/TextScroll";
import Catalog from "../../Components/catalog/Catalog";

const Home = () => {
  return (
    <div>
      <div className="sideNav-hero">
        <Hero />
      </div>
     <div className="scrolling">
        <TextScroll />
      </div>
      <div className="catalog">
        <Catalog />
      </div>
    </div>
  );
};

export default Home;
