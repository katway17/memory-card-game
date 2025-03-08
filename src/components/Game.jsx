import { useState } from "react";
import Card from "./Card.jsx";
import "./../styles/game.css";
import { v4 as uuidv4 } from "uuid";

const initialCards = [
  { id: uuidv4(), value: "🍎", matched: false },
  { id: uuidv4(), value: "🍎", matched: false },
  { id: uuidv4(), value: "🍌", matched: false },
  { id: uuidv4(), value: "🍌", matched: false },
  { id: uuidv4(), value: "🍇", matched: false },
  { id: uuidv4(), value: "🍇", matched: false },
  { id: uuidv4(), value: "🍉", matched: false },
  { id: uuidv4(), value: "🍉", matched: false },
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Game() {
  const [cards, setCards] = useState(shuffleArray(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameWon, setIsGameWon] = useState(false);

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

        // Check if all cards are matched
        if (newMatchedCards.length === cards.length) {
          setIsGameWon(true);
        }
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }

  function resetGame() {
    setCards(shuffleArray(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsGameWon(false);
  }

  return (
    <div className="game">
      <h2>Memory Game</h2>
      {isGameWon && (
        <div>
          <h2>Congratulations! You've won!</h2>
          <button onClick={resetGame}>Play Again</button> {/* Reset button */}
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
