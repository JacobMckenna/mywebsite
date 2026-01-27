import React from "react";

export default function StatusBar({ pyReady, pyErr, busy, gameOver, status }) {
  const cls =
    "status status-prominent " +
    (pyErr
      ? "status-error"
      : busy
      ? "status-busy"
      : gameOver
      ? "status-done"
      : "status-ready");

  return (
    <div className={cls}>
      {!pyReady && !pyErr && "Loading Python engine…"}
      {pyErr ? `Error: ${pyErr}` : status}
    </div>
  );
}
