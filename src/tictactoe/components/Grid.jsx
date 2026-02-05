import React, { useMemo } from "react";

export default function Grid({
  board,
  onCellClick,
  busy,
  tieFlash,
  winLine,
  gameOver,
  pyReady,
  pyErr,
  onNewGame,
}) {
  const disabledAll = !pyReady || !!pyErr || busy;

  const winSet = useMemo(() => new Set(winLine || []), [winLine]);

  return (
    <div className="grid-wrap">
      <div className={`grid ${tieFlash ? "tie" : ""}`}>
        {board.map((v, i) => {
          const filled = v !== null;
          const isWinCell = winSet.has(i);

          const cls = [
            "cell",
            v ? v : "",
            filled ? "filled" : "",
            isWinCell ? "win" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={i}
              type="button"
              className={cls}
              onClick={() => onCellClick(i)}
              disabled={disabledAll || !!gameOver || filled}
              aria-label={`Cell ${i + 1}${v ? `: ${v}` : ""}`}
            >
              {v || ""}
            </button>
          );
        })}
      </div>

      {/* Overlay: only when game ended */}
      {gameOver && (
        <div className="board-overlay" role="dialog" aria-label="Game over">
          <div className="board-overlay-card">
            <div className="board-overlay-title">
              {gameOver.type === "tie" ? "Tie game" : "Game over"}
            </div>
            <button
              type="button"
              className="btn board-overlay-btn"
              onClick={onNewGame}
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
