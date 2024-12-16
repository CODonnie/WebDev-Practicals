//eslint-disable-next-line no-unused-vars
import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <p>
          <span>DO</span>it
        </p>
      </div>
      <div className="account">
        <div className="account-profile">
          <p>Account</p>
          <div className="profile-image">D</div>
        </div>
        <div className="links">
          <p>LOGIN</p>
          <p>SIGN UP</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
