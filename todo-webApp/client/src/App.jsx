import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Todo from "./pages/todo/Todo";
import Note from "./pages/note/Note";

const App = () => {
  return (
    <div className="app">
      <div className="head">
        <Header />
      </div>
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/note" element={<Note />} />
        </Routes>
      </div>
      <div className="foot">
        <Footer />
      </div>
    </div>
  );
};

export default App;
