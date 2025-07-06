// src/components/FloatingAlarmButton.js
import React from "react";
import "./FloatingAlarmButton.css";

const FloatingAlarmButton = () => {
  const handleAlarmClick = () => {
    alert("🚨 Emergency Alert Sent!\nHelp is on the way.");
    const utterance = new SpeechSynthesisUtterance("Emergency! Help is on the way.");
    speechSynthesis.speak(utterance);
  };

  return (
    <button className="floating-alarm-btn" onClick={handleAlarmClick}>
      🚨 Emergency
    </button>
  );
};

export default FloatingAlarmButton;
