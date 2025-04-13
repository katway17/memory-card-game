import { useState } from "react";
import Card from "./Card.jsx";
import "./../styles/game.css";
import { v4 as uuidv4 } from "uuid";

// Emoji Sets by Difficulty
const easyCards = ["🍎", "🍌", "🍇", "🍉"];
const mediumCards = ["🍎", "🍌", "🍇", "🍉", "🍊", "🍒"];
const hardCards = ["🍎", "🍌", "🍇", "🍉", "🍊", "🍒", "🍓", "🍍"];

function generateCardPairs(values) {
  return values.flatMap((value) => [
    { id: uuidv4(), value, matched: false },
    { id: uuidv4(), value, matched: false },
  ]);
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Game() {
  const [difficulty, setDifficulty] = useState("medium");

  const getInitialCards = (level) => {
    if (level === "easy") return shuffleArray(generateCardPairs(easyCards));
    if (level === "hard") return shuffleArray(generateCardPairs(hardCards));
    return shuffleArray(generateCardPairs(mediumCards));
  };

  const [cards, setCards] = useState(getInitialCards(difficulty));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameWon, setIsGameWon] = useState(false);

  const handleLevelChange = (level) => {
    setDifficulty(level);
    setCards(getInitialCards(level));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsGameWon(false);
  };

  function handleCardClick(index) {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        const newMatchedCards = [...matchedCards, firstIndex, secondIndex];
        setMatchedCards(newMatchedCards);

        if (newMatchedCards.length === cards.length) {
          setIsGameWon(true);
        }
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }

  function resetGame() {
    setCards(getInitialCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsGameWon(false);
  }

  return (
    <div className="game">

      {/* Difficulty Buttons */}
      <div className="difficulty-buttons">
        <button
          className={difficulty === "easy" ? "active" : ""}
          onClick={() => handleLevelChange("easy")}
        >
          Easy
        </button>
        <button
          className={difficulty === "medium" ? "active" : ""}
          onClick={() => handleLevelChange("medium")}
        >
          Medium
        </button>
        <button
          className={difficulty === "hard" ? "active" : ""}
          onClick={() => handleLevelChange("hard")}
        >
          Hard
        </button>
      </div>

      {isGameWon && (
        <div>
          <h2>Congratulations! You've won!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      <div className="board">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
