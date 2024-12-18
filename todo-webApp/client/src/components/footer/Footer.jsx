//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Footer.scss";
import { FaPlus, FaMinus, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="footer">
      <div className="add-icon">
		{show ? (<FaMinus size={22} onClick={() => setShow(!show)} />)
			: (<FaPlus size={22} onClick={() => setShow(!show)} />)
		}
      </div>
      {show ? (
        <div className="show" onClick={() => setShow(!show)}>
          <Link className="link" to="/todo">TODO</Link>
          <Link className="link" to="/note">NOTE</Link>
        </div>
      ) : (
        <></>
      )}
      <div className="nav">
        <FaCheckCircle size={22} />
        <FaBookOpen size={22} />
      </div>
    </div>
  );
};

export default Footer;
