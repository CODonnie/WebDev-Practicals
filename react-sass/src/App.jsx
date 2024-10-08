import Navbar from "./components/navbar";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Cart from "./pages/cart";
import Product from "./pages/product";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  );
}
