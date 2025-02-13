import React, { useState } from "react";
import axios from "axios";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? "http://localhost:5000/api/auth/signup" : "http://localhost:5000/api/auth/login";

    try {
      const { data } = await axios.post(url, userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload(); // Refresh to update header
    } catch (error) {
      alert(error.response.data.msg || "Something went wrong");
    }
    onClose();
  };

  return isOpen ? (
    <div className="auth-modal">
      <div className="auth-container">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default AuthModal;
