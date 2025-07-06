// src/components/LearnPage.js
import React, { useState } from "react";
import BingoGame from "./BingoGame";
import MatchGame from "./MatchGame";
import "./LearnPage.css";

const categories = {
  Food: [
    { word: "Apple", emoji: "🍎", fact: "Apples are sweet and crunchy!" },
    { word: "Milk", emoji: "🥛", fact: "Milk helps your bones grow!" },
    { word: "Banana", emoji: "🍌", fact: "Bananas give you energy!" }
  ],
  Emotions: [
    { word: "Happy", emoji: "😊", fact: "We smile when we're happy!" },
    { word: "Sad", emoji: "😢", fact: "Sometimes we cry when we're sad." },
    { word: "Excited", emoji: "😄", fact: "We jump when we're excited!" }
  ],
  Math: [
    { word: "1 + 1", emoji: "➕", fact: "1 plus 1 equals 2!" },
    { word: "2 x 2", emoji: "✖️", fact: "2 times 2 equals 4!" }
  ],
  English: [
    { word: "Cat", emoji: "🐱", fact: "C-A-T spells cat!" },
    { word: "Dog", emoji: "🐶", fact: "D-O-G spells dog!" }
  ]
};

const quizData = {
  Food: [
    { question: "Which fruit is red and crunchy?", options: ["Banana", "Apple"], answer: "Apple" },
    { question: "What gives you strong bones?", options: ["Milk", "Chips"], answer: "Milk" }
  ],
  Emotions: [
    { question: "What face shows happiness?", options: ["😊", "😢"], answer: "😊" },
    { question: "What emoji means excited?", options: ["😄", "😴"], answer: "😄" }
  ],
  English: [
    { question: "Which animal spells C-A-T?", options: ["Cat", "Dog"], answer: "Cat" },
    { question: "Which word spells D-O-G?", options: ["Fish", "Dog"], answer: "Dog" }
  ]
};

const gameList = [
  {
    title: "🎨 Coloring Book",
    url: "https://www.thecolor.com/",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/2755/2755673.png"
  },
  {
    title: "🧇 Bubble Pop",
    url: "https://games.construct.net/1605/latest",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
  }
];

const LearnPage = () => {
  const [currentCat, setCurrentCat] = useState("Food");
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [step, setStep] = useState("learn"); // learn -> game -> quiz or bingo or match
  const [showGameModal, setShowGameModal] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (option) => {
    const currentQuestion = quizData[currentCat][quizIndex];
    if (option === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
      speak("Correct answer!");
    } else {
      setFeedback("❌ Oops! Try again.");
      speak("Oops! Try again.");
    }
    setTimeout(() => {
      setFeedback("");
      if (quizIndex + 1 < quizData[currentCat].length) {
        setQuizIndex(quizIndex + 1);
      } else {
        setStep("learn");
        setQuizIndex(0);
        setScore(0);
      }
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentCat === "Math") {
      setStep("bingo");
    } else if (currentCat === "English") {
      setStep("match");
    } else {
      setShowGameModal(true);
    }
  };

  const handleCloseGameModal = () => {
    setShowGameModal(false);
    setStep("quiz");
  };

  return (
    <div className="learn-page">
      <h2>📘 Fun Learning Time!</h2>

      <div className="category-buttons">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCurrentCat(cat);
              setQuizIndex(0);
              setScore(0);
              setStep("learn");
            }}
            className={currentCat === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {step === "learn" && (
        <>
          <div className="learning-section">
            <h3>🧠 Words and Facts</h3>
            <div className="learning-cards">
              {categories[currentCat].map((item, index) => (
                <div
                  className="learn-card"
                  key={index}
                  onClick={() => speak(item.word + ". " + item.fact)}
                >
                  <div className="emoji">{item.emoji}</div>
                  <h4>{item.word}</h4>
                  <p>{item.fact}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="next-button" onClick={handleNextStep}>
            🎮 Take a Fun Break
          </button>
        </>
      )}

      {step === "quiz" && currentCat !== "Math" && currentCat !== "English" && (
        <div className="quiz-section">
          <h3>🎯 Quick Quiz</h3>
          <p>{quizData[currentCat][quizIndex].question}</p>
          <div className="quiz-options">
            {quizData[currentCat][quizIndex].options.map((option, i) => (
              <button key={i} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      )}

      {step === "bingo" && currentCat === "Math" && (
        <div className="bingo-wrapper">
          <BingoGame />
          <button className="next-button" onClick={() => setStep("learn")}>🔁 Restart</button>
        </div>
      )}

      {step === "match" && currentCat === "English" && (
        <div className="match-wrapper">
          <MatchGame />
          <button className="next-button" onClick={() => setStep("learn")}>🔁 Restart</button>
        </div>
      )}

      {/* Game Modal */}
      {showGameModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>🎉 Take a Break – Play!</h3>
            <button className="close-button" onClick={handleCloseGameModal}>❌ Back to Quiz</button>
            <div className="game-grid-modal">
              {gameList.map((game, i) => (
                <a
                  key={i}
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-card-mini"
                >
                  <img src={game.thumbnail} alt={game.title} />
                  <p>{game.title}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
