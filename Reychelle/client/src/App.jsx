//eslint-disable-next-line no-unused-vars
import React from "react";
import TopNav from "./Components/navigations/topNav/TopNav";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home/Home";

const App = () => {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
