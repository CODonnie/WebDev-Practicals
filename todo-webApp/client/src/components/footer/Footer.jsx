import React, { useState } from "react";
import "./Footer.scss";
import { FaPlus, FaMinus, FaCheck, FaBookOpen, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState();
  const [selected, setSelected] = useState("home");
  return (
    <div className="footer">
      <div className={show ? "ani-note-icon" : "note-icon"}>
        <Link style={{ color: "#fff" }} to="/note">
          <FaBookOpen
            onClick={() => {
              setShow(!show);
              setFilter(null);
            }}
            size={20}
          />
        </Link>
      </div>
      <div className={show ? "ani-todo-icon" : "todo-icon"}>
        <Link style={{ color: "#fff" }} to="/todo">
          <FaCheck
            onClick={() => {
              setShow(!show);
              setFilter(null);
            }}
            size={20}
          />
        </Link>
      </div>

      <div className="footer-container">
        <div className="home">
          <Link style={{ color: "#fff" }} to="/home">
            <FaHome size={30} onClick={() => {
							setFilter("home");
							setSelected("home");
						}}
					/>
          </Link>
          <div className="filter">
            <div className={filter ? "ani-p1" : "p1"}
							onClick={() => setSelected("note")}
						>
              <p>Note</p>
              {selected === "note" ? <hr /> : null}
            </div>
            <div className={filter ? "ani-p2" : "p2"}
							onClick={() => setSelected("todo")}
						>
              <p>Todo</p>
              {selected === "todo" ? <hr /> : null}
            </div>
          </div>
        </div>
        <div className="add-icon">
          {show ? (
            <FaMinus size={22} onClick={() => setShow(!show)} />
          ) : (
            <FaPlus size={22} onClick={() => setShow(!show)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
