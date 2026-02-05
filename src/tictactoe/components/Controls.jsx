import React from "react";

export default function Controls({ human, setHuman, resetGame, busy }) {
  return (
    <div className="ttt-controls">
      <div className="pill" aria-label="Choose your symbol">
        <span className="youare-label">You are</span>

        <button
          type="button"
          className={`chip ${human === "X" ? "active" : ""}`}
          onClick={() => {
            if (busy) return;
            if (human === "X") return;
            setHuman("X");
            resetGame("X");
          }}
          disabled={busy}
          aria-pressed={human === "X"}
        >
          X
        </button>

        <button
          type="button"
          className={`chip ${human === "O" ? "active" : ""}`}
          onClick={() => {
            if (busy) return;
            if (human === "O") return;
            setHuman("O");
            resetGame("O");
          }}
          disabled={busy}
          aria-pressed={human === "O"}
        >
          O
        </button>
      </div>

      <button
        type="button"
        className="btn"
        onClick={() => resetGame(human)}
        disabled={busy}
      >
        New game
      </button>
    </div>
  );
}
