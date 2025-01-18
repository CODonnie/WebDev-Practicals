import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Todo from "./pages/todo/Todo";
import Note from "./pages/note/Note";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./components/account/Account";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";

const App = () => {
  const url = "http://localhost:5170";
  const { auth } = useContext(DataContext);

  if (!auth) {
    return (
      <div className="account">
        <Account />
      </div>
    );
  }

  return (
    <div className="app">
      <ToastContainer />
      <div className="head">
        <Header />
      </div>
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo url={url} />} />
          <Route path="/note" element={<Note url={url} />} />
        </Routes>
      </div>
      <div className="foot">
        <Footer />
      </div>
    </div>
  );
};

export default App;
