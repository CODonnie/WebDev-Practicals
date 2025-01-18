import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext.jsx";
import "./Account.scss";
import {useNavigate} from "react-router-dom";

const Account = () => {
  const { stats, setStats } = useContext(DataContext);
	const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmP: "",
  });

  const handleDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (stats === "login") {
      setLoginData((currLogin) => ({ ...currLogin, [name]: value }));
    } else {
      setSignUp((currSignUp) => ({ ...currSignUp, [name]: value }));
    }
  };

  const handleDataSubmit = async () => {};

  return (
    <div className="account">
      <div className="image">
        <div className="circle"></div>
        <div className="circlet"></div>
      </div>
      <div className="pop-up">
        {stats === "login" ? (
          <div className="form-wrapper">
            <div className="form-header">
					LOGIN
					<div className="back" onClick={() => navigate(-1)}>X</div>
					</div>
            <div className="form">
              <form onSubmit={handleDataSubmit}>
                <div className="email">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleDataChange}
                  />
                </div>

                <div className="password">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleDataChange}
                  />
                </div>
                <div className="remember">
                  <div></div>
                  <p>
                    Remember me<span>forgot password</span>
                  </p>
                </div>

                <button type="submit">Login</button>

                <div className="switch">
                  <p>
                    Dont have an account?{" "}
                    <span onClick={() => setStats("signup")}>SIGN UP HERE</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="form-wrapper">
            <div className="form-header">
					SIGN UP
					<div className="back" onClick={() => navigate(-1)}>X</div>
					</div>
            <div className="form">
              <form onSubmit={handleDataSubmit}>
                <div className="afa">
                  <div className="firstName">
                    <input
                      type="text"
                      placeholder="first name"
                      name="firstName"
                      value={signUp.firstName}
                      onChange={handleDataChange}
                    />
                  </div>

                  <div className="lastName">
                    <input
                      type="text"
                      placeholder="last name"
                      name="lastName"
                      value={signUp.lastName}
                      onChange={handleDataChange}
                    />
                  </div>
                </div>

                <div className="username">
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={signUp.username}
                    onChange={handleDataChange}
                  />
                </div>

                <div className="email">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={signUp.email}
                    onChange={handleDataChange}
                  />
                </div>

                <div className="password">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={signUp.password}
                    onChange={handleDataChange}
                  />
                </div>
                <div className="confirm">
                  <input
                    type="password"
                    placeholder="confirm password"
                    name="confirm"
                    value={signUp.confirmP}
                    onChange={handleDataChange}
                  />
                </div>
                <div className="agree">
                  <div></div>{" "}
                  <p>
                    I Agree with <span>privacy</span> and <span>policy</span>
                  </p>
                </div>

                <button type="submit">Sign Up</button>

                <div className="switch">
                  <p>
                    already have an account?
                    <span onClick={() => setStats("login")}>LOGIN HERE</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
