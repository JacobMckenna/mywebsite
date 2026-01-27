import React from "react";

export default function HeaderContent() {
  return (
    <div className="ttt-header-center">
      <h1>Unbeatable Tic-Tac-Toe</h1>

      <p className="sub">
        Python (Pyodide) minimax + bitboards + transposition table
      </p>

      <p className="ttt-description">
        Tic-Tac-Toe is a classic game where the goal is to place three of your
        symbols in a row (horizontally, vertically, or diagonally) before your
        opponent.
        <br />
        <br />
        Choose whether you want to play as <strong>X</strong> or <strong>O</strong>
        , then click any empty square on the board to make your move. X always
        goes first. You’ll be playing against an unbeatable AI, so expect a
        challenge!
      </p>

      <div className="header-actions">
        <a
          className="linkbtn"
          href="https://github.com/JacobMckenna/Unbeatable-TicTacToe/blob/main/ai.py"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Python AI on GitHub
        </a>
      </div>
    </div>
  );
}
