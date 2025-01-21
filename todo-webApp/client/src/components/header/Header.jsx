import React, { useContext } from "react";
import "./Header.scss";
import { DataContext } from "../../context/DataContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const { auth, setAuth, url } = useContext(DataContext);

  const handleLogout = async () => {
		try {
			const response = await axios.get(`${url}/api/auth/logout`, { withCredentials: true });
      if (response.data.success) {
        toast.success("user logout successful");
				setAuth(false);
      }
    } catch (error) {
      console.log(`error while logging out - ${error.message}`);
      toast.error(`kasala - ${error.message}`);
    }
  };

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
          {auth ? (
            <p onClick={handleLogout}>LOGOUT</p>
          ) : (
            <>
              <p onClick={() => setAuth(false)}>LOGIN</p>
              <p onClick={() => setAuth(false)}>SIGN UP</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
