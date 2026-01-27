// src/tictactoe/helpers.js

export const WIN_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  export function winner(board) {
    for (const [a, b, c] of WIN_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
  }
  
  export function getWinLine(board) {
    for (const [a, b, c] of WIN_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return [a, b, c];
    }
    return null;
  }
  
  export function isFull(board) {
    return board.every(Boolean);
  }
  
  // Convert board -> bitboards (bit 8 = cell 0, bit 0 = cell 8)
  export function toBitboards(board) {
    let x = 0,
      o = 0;
    for (let i = 0; i < 9; i++) {
      const bit = 1 << (8 - i);
      if (board[i] === "X") x |= bit;
      if (board[i] === "O") o |= bit;
    }
    return { x, o };
  }
  