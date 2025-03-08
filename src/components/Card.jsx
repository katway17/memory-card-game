export default function Card({ value, isFlipped, onClick }) {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      {isFlipped ? value : "?"}
    </div>
  );
}
