import "./navbar.scss";
import logo from "../assets/exodus1-01.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ItemContext } from "../context/itemContext";

export default function Navbar() {
  const { changeNav, setChangeNav } = useContext(ItemContext);

  return (
    <div className="navbar">
      <ul>
        {changeNav === "Home" ? (
          <Link to="/" className="link">
            Home <hr />
          </Link>
        ) : (
          <Link className="link" onClick={() => setChangeNav("Home")} to="/">
            Home
          </Link>
        )}
        {changeNav === "Cart" ? (
          <Link to="/cart" className="link">
            Cart <hr />
          </Link>
        ) : (
          <Link
            className="link"
            onClick={() => setChangeNav("Cart")}
            to="/cart"
          >
            Cart
          </Link>
        )}
      </ul>
      <Link onClick={() => setChangeNav("Home")} to="/">
        <img src={logo} className="logo" />
      </Link>
      <div className="account">
        {changeNav === "Auth" ? (
          <Link to="/auth" className="link">
            Account <hr />
          </Link>
        ) : (
          <Link
            className="link"
            onClick={() => setChangeNav("Auth")}
            to="/auth"
          >
            Account
          </Link>
        )}
        <div className="auth-cont">
          <Link className="linko">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
