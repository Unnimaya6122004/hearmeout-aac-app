// src/components/GamePage.js
import React, { useState } from "react";
import "./GamePage.css";

const games = [
  {
    title: "🫧 Bubble Pop",
    description: "Pop bubbles to calm your mind!",
    src: "https://games.construct.net/1605/latest",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/1086/1086933.png"
  },
  {
    title: "🎨 Coloring Book",
    description: "Color different pictures to relax!",
    src: "https://www.thecolor.com/",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/650/650143.png"
  },
  {
    title: "🎵 Sound Box",
    description: "Play fun sounds and melodies!",
    src: "https://toytheater.com/sound-box/",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/2046/2046627.png"
  },
  {
    title: "🧩 Puzzle Maze",
    description: "Solve mazes to boost focus!",
    src: "https://www.mathplayground.com/logic_puzzle.html",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/6481/6481853.png"
  },
  {
    title: "🧠 Memory Match",
    description: "Test your memory skills!",
    src: "https://toytheater.com/memory/",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/5355/5355212.png"
  }
];


function GamePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlay = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    new Audio("https://www.myinstants.com/media/sounds/mario-coin.mp3").play();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="game-page">
      <h1>🎮 Calming Games for Kids</h1>
      <p className="intro-text">Choose a calming game to play and relax your mind!</p>

      <input
        type="text"
        className="game-search"
        placeholder="🔍 Search games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search games"
      />

      {isModalOpen && selectedGame && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal} aria-label="Close game preview">
              ❌ Close
            </button>
            <h2>{selectedGame.title} Preview</h2>
            <iframe
              src={selectedGame.src}
              title={selectedGame.title}
              width="100%"
              height="500"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="game-grid">
        {filteredGames.map((game, index) => (
          <div className="game-card" key={index}>
            <img
              src={game.thumbnail}
              alt={`${game.title} thumbnail`}
              className="game-thumbnail"
              onError={(e) => {
                e.target.src = "https://cdn-icons-png.flaticon.com/512/854/854866.png";
              }}
            />
            <div className="game-details">
              <h3>{game.title}</h3>
              <p className="game-desc">{game.description}</p>
              <button
                className="play-button"
                onClick={() => handlePlay(game)}
                aria-label={`Play ${game.title}`}
              >
                ▶️ Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamePage;
