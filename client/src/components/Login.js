import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
const { useNavigate } = require("react-router-dom");

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    const config = {
      url: "http://localhost:3001/login",
      method: "post",
      withCredentials: true,
      data: {
        username: user.username,
        password: user.password,
      },
    };

    console.log(config);

    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
        setLoginUser(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/famfeed");
  };

  return (
    <div>
      <div className="container">
        <div className="image">
          <div className="bigbird">
            <img alt="" src="/famify_logo.png" />
          </div>
        </div>

        <div className="content">
          <h1>Login</h1>

          <form>
            <label htmlFor="username">Username </label>
            <br></br>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleChange}
            />
            <p></p>
            <br></br>

            <label htmlFor="password">Password</label>
            <br></br>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
              value={user.password}
              onChange={handleChange}
            />
          </form>

          <button className="login-button" 
            type="submit" 
            onClick={login}
          >
            LOG IN
          </button>
          <button
            className="register-button"
            type="submit"
            onClick={() => navigate("/register")}
          >
            Don't have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
