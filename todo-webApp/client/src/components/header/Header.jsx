 
import React, {useContext} from "react";
import "./Header.scss";
import { DataContext } from "../../context/DataContext.jsx";

const Header = () => {

	const { setAuth } = useContext(DataContext);

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
          <p onClick={() => setAuth(true)}>LOGIN</p>
          <p onClick={() => setAuth(true)}>SIGN UP</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
