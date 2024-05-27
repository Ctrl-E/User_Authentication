import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure this is imported
import axios from "axios";
import "./login_style.css";

const apiUrl = "https://user-login-jwt-authentication.vercel.app";

const LoginSignup = () => {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    setIsActive(true);
  };
  const handleSignInClick = () => {
    setIsActive(false);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/login`, { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/");
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/register`, { name, email, password })
      .then((result) => {
        if (result.data === "Success") {
          alert("Registration Successfull Please Sign in");
          setIsActive(false);
        }
      })
      .catch((err) => {
        alert(`Error: ${err.response.data.error}`);
      });
  };
  return (
    <div>
      <div class={`container ${isActive ? "active" : ""}`} id="container">
        <div class="form-container sign-up">
          <form onSubmit={handleFormSubmit}>
            <h1>Create Account</h1>
            <div class="social-icons">
              <a href="#" class="icon">
                <i class="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registeration</span>
            <input
              type="text"
              placeholder="Enter User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <div class="social-icons">
              <a href="#" class="icon">
                <i class="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email password</span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button class="hidden" id="login" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div class="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button class="hidden" id="register" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
