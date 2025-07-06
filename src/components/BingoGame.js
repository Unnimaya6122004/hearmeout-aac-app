import React, { useState, useEffect, useCallback } from "react";
import "./BingoGame.css"; // adjust path based on your folder structure

const generateBingoBoard = () => {
  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
  return numbers.sort(() => Math.random() - 0.5).slice(0, 25);
};

const getRandomQuestion = (choices) => {
  let answer, question;
  const operations = ["+", "-", "×"];

  while (true) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const op = operations[Math.floor(Math.random() * operations.length)];

    switch (op) {
      case "+":
        answer = a + b;
        break;
      case "-":
        answer = a - b;
        break;
      case "×":
        answer = a * b;
        break;
      default:
        continue;
    }

    if (choices.includes(answer)) {
      question = `${a} ${op} ${b}`;
      break;
    }
  }

  return { question, answer };
};

function BingoGame() {
  const [board, setBoard] = useState([]);
  const [marked, setMarked] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleMiss = useCallback(() => {
    if (tries + 1 >= 10) {
      setGameOver(true);
    } else {
      setTries((prev) => prev + 1);
      setCurrentQ(getRandomQuestion(board));
      setTimeLeft(10);
    }
  }, [board, tries]);

  useEffect(() => {
    const newBoard = generateBingoBoard();
    setBoard(newBoard);
    setCurrentQ(getRandomQuestion(newBoard));
  }, []);

  useEffect(() => {
    if (!currentQ || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleMiss();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQ, gameOver, handleMiss]);

  const handleClick = (index) => {
    const value = board[index];
    if (value === currentQ.answer && !marked.includes(index)) {
      setMarked([...marked, index]);
      setScore(score + 1);
    }

    if (tries + 1 >= 10) {
      setGameOver(true);
    } else {
      setTries(tries + 1);
      setCurrentQ(getRandomQuestion(board));
      setTimeLeft(10);
    }
  };

  if (!currentQ || board.length === 0) return <p>Loading game...</p>;

  if (gameOver) {
    return (
      <div className="bingo-container">
        <h2>🎉 Game Over!</h2>
        <p>✅ You got {score} out of 10 correct!</p>
        <button onClick={() => window.location.reload()}>🔄 Play Again</button>
      </div>
    );
  }

  return (
    <div className="bingo-container">
      <h2>🎓 Math Bingo</h2>
      <div className="question-card">
        <p>🧠 Solve: <strong>{currentQ.question}</strong></p>
        <p className="timer">⏳ Time Left: {timeLeft}s</p>
        <p>🔢 Attempt: {tries + 1} / 10</p>
      </div>

      <div className="bingo-grid">
        {board.map((num, idx) => (
          <div
            key={idx}
            className={`bingo-cell ${marked.includes(idx) ? "marked" : ""}`}
            onClick={() => handleClick(idx)}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BingoGame;
