// src/components/WelcomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="overlay">
        <h1 className="welcome-title">🌟 Welcome to HearMeOut!</h1>
        <p className="welcome-subtitle">
          A fun and inclusive communication app for kids of all abilities 💬🧩
        </p>
        <button className="start-btn" onClick={() => navigate("/communication")}>
          🚀 Start Exploring
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
