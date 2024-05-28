import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Ensure this is imported
import axios from "axios";

const apiUrl = "https://user-login-jwt-authentication.vercel.app";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/logout`, {});
      if (response.data === "Logout Successfull") {
        // Remove the JWT cookie
        Cookies.remove("token"); // Ensure 'token' matches the name of your cookie
        navigate("/register"); // Navigate to the login page on successful logout
      } else {
        // Handle unexpected response
        alert("Unexpected response from the server.");
      }
    } catch (err) {
      // Handle errors
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
