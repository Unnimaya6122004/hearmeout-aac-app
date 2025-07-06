// src/components/CommunicationPage.js
import React, { useState, useEffect } from "react";
import EmojiChatbot from "./EmojiChatbot";
import "./Chatbot.css"; // Make sure this file has the chatbot styles

const defaultCategories = {
  Food: [
    { word: "Apple", img: "🍎" },
    { word: "Milk", img: "🥛" },
    { word: "Rice", img: "🍚" },
    { word: "Water", img: "💧" },
    { word: "Banana", img: "🍌" }
  ],
  Emotions: [
    { word: "Happy", img: "😊" },
    { word: "Sad", img: "😢" },
    { word: "Angry", img: "😠" },
    { word: "Scared", img: "😨" },
    { word: "Excited", img: "😄" }
  ],
  Actions: [
    { word: "Eat", img: "🍽️" },
    { word: "Drink", img: "🥤" },
    { word: "Sleep", img: "😴" },
    { word: "Play", img: "⚽" },
    { word: "Go", img: "🚶‍♂️" }
  ]
};

function CommunicationPage() {
  const [currentCategory, setCurrentCategory] = useState("Food");
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("hearmeout-categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  });
  const [showBot, setShowBot] = useState(false);

  useEffect(() => {
    localStorage.setItem("hearmeout-categories", JSON.stringify(categories));
  }, [categories]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const word = prompt("Enter the word to associate with this image:");
      if (!word) return;
      const newItem = { word, img: reader.result };
      setCategories((prev) => ({
        ...prev,
        [currentCategory]: [...prev[currentCategory], newItem]
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const addNewCategory = () => {
    const newCat = prompt("Enter new category name:");
    if (newCat && !categories[newCat]) {
      setCategories((prev) => ({ ...prev, [newCat]: [] }));
      setCurrentCategory(newCat);
    } else if (categories[newCat]) {
      alert("Category already exists!");
    }
  };

  return (
    <div className="App">
      <h1>HearMeOut - AAC App</h1>

      <div className="category-selector">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            className={cat === currentCategory ? "active" : ""}
            onClick={() => setCurrentCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <button onClick={addNewCategory}>➕ Add Category</button>
      </div>

      <div className="grid">
        {categories[currentCategory].map((item, index) => (
          <div className="card" key={index} onClick={() => speak(item.word)}>
            {item.img.startsWith("data:image") ? (
              <img src={item.img} alt={item.word} />
            ) : (
              <span className="emoji">{item.img}</span>
            )}
            <p>{item.word}</p>
          </div>
        ))}
      </div>

      <div className="upload-section">
        {/* Custom styled Choose File */}
        <label htmlFor="file-upload" className="custom-file-upload">
          📁 Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        {/* Toggle Emoji Chatbot */}
        <button className="toggle-chatbot" onClick={() => setShowBot((prev) => !prev)}>
          🤖 Emoji Chatbot
        </button>
      </div>

      {showBot && <EmojiChatbot />}
    </div>
  );
}

export default CommunicationPage;
