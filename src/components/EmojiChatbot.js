import React, { useState } from "react";
import "./Chatbot.css";

const emojiResponses = {
  // Food & Drink
  "🍎": "That looks like an apple! Apples are tasty and healthy!",
  "🥛": "Milk helps make your bones strong!",
  "🍚": "Rice is great with curry!",
  "🍌": "Bananas are full of energy!",
  "🍽️": "Are you hungry? Let’s eat something!",
  "🥤": "Don’t forget to drink water!",
  "💧": "Drink some water and stay hydrated!",

  // Emotions
  "😊": "I'm glad you're feeling happy!",
  "😢": "Oh no, are you feeling sad?",
  "😠": "Take a deep breath. Want to talk about it?",
  "😨": "Are you scared? You’re not alone!",
  "😄": "Yay! I love when you're excited!",
  "😴": "Sleep is important! Good night!",

  // Actions
  "⚽": "Playtime is fun! Let's move around!",
  "🚶‍♂️": "Time to go somewhere! Where to?",
  "🏠": "Do you want to go home?",
  "🛏️": "Time to rest in bed!",
  "📖": "Do you want to read a story?",
  "📺": "Shall we watch something fun?",

  // Responses
  "👍": "Yes!",
  "👎": "No.",
  "✅": "I agree!",
  "❌": "I don’t want that.",
  "🤝": "Let’s do it together!",
  "✋": "Stop, please.",
  "👋": "Hi there!",
  "🙏": "Thank you!",
  "❤️": "I love this!",
  "💔": "This makes me sad.",

  // Needs
  "🚽": "I need to go to the bathroom.",
  "🤒": "I’m not feeling well.",
  "😋": "That looks yummy!",
  "🤗": "Can I get a hug?",
  "😐": "I’m feeling okay.",
  "🆘": "I need help right now!"
};


const EmojiChatbot = () => {
  const [showBot, setShowBot] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from: "bot", msg: "Hi! 👋 Send me an emoji and I’ll respond!" }
  ]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { from: "user", msg: chatInput };
    const botReply = interpretEmoji(chatInput);

    setChatHistory((prev) => [...prev, userMsg, { from: "bot", msg: botReply }]);
    setChatInput("");
  };

  const interpretEmoji = (input) => {
    const emoji = input.trim();
    return emojiResponses[emoji] || "Hmm, I don’t know that one yet. Try another emoji!";
  };

  return (
    <div className="chatbot-wrapper">
      <button onClick={() => setShowBot(!showBot)} className="toggle-chatbot">
        {showBot ? "Hide Emoji Bot" : "🤖 Emoji Chatbot"}
      </button>

      {showBot && (
        <div className="chatbot-box">
          <div className="chat-history">
            {chatHistory.map((entry, i) => (
              <div key={i} className={`chat-msg ${entry.from}`}>
                <strong>{entry.from === "bot" ? "🤖" : "You"}:</strong> {entry.msg}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="chat-input">
            <input
              type="text"
              placeholder="Type an emoji (like 🍌 or 😢)"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmojiChatbot;
