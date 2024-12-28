import React, { useState } from "react";
import "./Footer.scss";
import { FaPlus, FaMinus, FaCheck, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="footer">
      <div className={show ? "ani-note-icon" : "note-icon"}>
        <Link style={{ color: "white" }} to="/note">
          <FaBookOpen size={20} />
        </Link>
      </div>
      <div className={show ? "ani-todo-icon" : "todo-icon"}>
        <Link style={{ color: "white" }} to="/todo">
          <FaCheck size={20} />
        </Link>
      </div>
 
      <div className="footer-container">
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
