import React from "react";

export default function Grid({
  board,
  onCellClick,
  busy,
  tieFlash,
  winLine,
  gameOver,
  pyReady,
  pyErr,
}) {
  return (
    <div className={(busy ? "grid busy" : "grid") + (tieFlash ? " tie" : "")}>
      {board.map((cell, i) => (
        <button
          key={i}
          className={
            "cell" +
            (cell ? ` filled ${cell}` : "") +
            (winLine?.includes(i) ? " win" : "")
          }
          onClick={() => onCellClick(i)}
          disabled={!pyReady || !!pyErr || busy || !!cell || !!gameOver}
          aria-label={`cell-${i}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
