import React from "react";

export default function Controls({ human, setHuman, resetGame, busy }) {
  return (
    <div className="ttt-controls">
      <div className="pill youare-pill">
        <span className="youare-label">You are</span>

        <button
          className={human === "X" ? "chip active" : "chip"}
          onClick={() => {
            setHuman("X");
            resetGame("X");
          }}
          disabled={busy}
        >
          X
        </button>

        <button
          className={human === "O" ? "chip active" : "chip"}
          onClick={() => {
            setHuman("O");
            resetGame("O");
          }}
          disabled={busy}
        >
          O
        </button>
      </div>

      <button className="btn" onClick={() => resetGame(human)} disabled={busy}>
        New game
      </button>
    </div>
  );
}
