// src/components/MatchGame.js
import React, { useState, useEffect, useCallback } from "react";
import "./MatchGame.css";

const questions = [
  { image: "🐱", correct: "Cat", options: ["Dog", "Fish", "Cat"] },
  { image: "🍎", correct: "Apple", options: ["Banana", "Apple", "Tomato"] },
  { image: "🌳", correct: "Tree", options: ["Flower", "Grass", "Tree"] },
  { image: "🚗", correct: "Car", options: ["Bus", "Bike", "Car"] },
];

function MatchGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question

  const question = questions[current];

  // ✅ Stable reference for goToNext using useCallback
  const goToNext = useCallback(() => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setFeedback("");
      setTimeLeft(10); // Reset timer
    } else {
      setShowResult(true);
    }
  }, [current]);

  // ✅ Countdown Timer with correct dependencies
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setFeedback("⏰ Time's up!");
      setTimeout(() => {
        goToNext();
      }, 1000);
    }
  }, [timeLeft, goToNext, showResult]);

  const handleAnswer = (option) => {
    if (option === question.correct) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Oops! Try again.");
    }

    setTimeout(() => {
      goToNext();
    }, 1000);
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(10);
    setFeedback("");
  };

  return (
    <div className="match-container">
      <h2>🧠 Match the Word Game</h2>

      {showResult ? (
        <div className="result-screen">
          <h3>🎉 Great Job!</h3>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={handleRestart}>🔄 Play Again</button>
        </div>
      ) : (
        <div className="game-card">
          <div className="timer">⏱ Time Left: {timeLeft}s</div>
          <div className="emoji">{question.image}</div>
          <div className="options">
            {question.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
          <p className="feedback">{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default MatchGame;
