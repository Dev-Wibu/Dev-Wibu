import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"; // Icon cho input
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3001/accounts?username=${username}&password=${password}`)
      .then((response) => {
        if (response.data.length > 0) {
          navigate("/manage");
        } else {
          alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
      })
      .catch((error) => console.error("Lỗi:", error));
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Type your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="login-button">LOGIN</button>
      </form>

      <div className="social-login">
        <p>Or Sign Up Using</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-google"></i></a>
        </div>
      </div>

      <div className="signup-link">
        <p>Or Sign Up Using</p>
        <a href="#">SIGN UP</a>
      </div>
    </div>
  );
}

export default Login;
