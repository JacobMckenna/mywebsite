import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles/TicTacToeAIPage.css";

import { db } from "../firebase";
import { doc, onSnapshot, setDoc, updateDoc, increment } from "firebase/firestore";

// ---------- Pyodide loader ----------
async function loadPy() {
  if (!window.loadPyodide) {
    throw new Error(
      "Pyodide not found. Did you add the script tag in public/index.html?"
    );
  }
  if (window.__pyodide) return window.__pyodide;

  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
  });
  window.__pyodide = pyodide;

  // Load our python AI file from /public/py/ttt_ai.py
  const resp = await fetch("/py/ttt_ai.py");
  const code = await resp.text();
  await pyodide.runPythonAsync(code);

  return pyodide;
}

// ---------- Game helpers ----------
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function getWinLine(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return [a, b, c];
  }
  return null;
}

function isFull(board) {
  return board.every(Boolean);
}

// Convert board -> bitboards (bit 8 = cell 0, bit 0 = cell 8)
function toBitboards(board) {
  let x = 0,
    o = 0;
  for (let i = 0; i < 9; i++) {
    const bit = 1 << (8 - i);
    if (board[i] === "X") x |= bit;
    if (board[i] === "O") o |= bit;
  }
  return { x, o };
}

export default function TicTacToeAIPage() {
  const [pyReady, setPyReady] = useState(false);
  const [pyErr, setPyErr] = useState("");
  const [board, setBoard] = useState(() => Array(9).fill(null));
  const [human, setHuman] = useState("X"); // human plays X by default
  const bot = human === "X" ? "O" : "X";
  const [status, setStatus] = useState("Your turn.");
  const [turn, setTurn] = useState("X"); // X always starts
  const [busy, setBusy] = useState(false);

  // Win/tie UI feedback
  const [winLine, setWinLine] = useState(null); // [a,b,c] or null
  const [tieFlash, setTieFlash] = useState(false);

  // Firestore live stats
  const [stats, setStats] = useState({ wins: 0, losses: 0, ties: 0, games: 0 });

  const statsRef = useMemo(() => doc(db, "stats", "tictactoe"), []);
  const countedRef = useRef(false);

  useEffect(() => {
    let unsub = () => {};
  
    (async () => {
      // Subscribe FIRST so UI always reflects Firestore
      unsub = onSnapshot(statsRef, (snap) => {
        if (snap.exists()) setStats(snap.data());
      });
  
      // Only create the doc if it doesn't exist
      const { getDoc } = await import("firebase/firestore");
      const snap = await getDoc(statsRef);
      if (!snap.exists()) {
        await setDoc(statsRef, {
          wins: 0,
          losses: 0,
          ties: 0,
          games: 0,
        });
      }
    })().catch(console.error);
  
    return () => unsub();
  }, [statsRef]);
  

  useEffect(() => {
    loadPy()
      .then(() => setPyReady(true))
      .catch((e) => setPyErr(String(e)));
  }, []);

  const gameOver = useMemo(() => {
    const line = getWinLine(board);
    if (line) return { type: "win", who: board[line[0]], line };
    if (isFull(board)) return { type: "tie" };
    return null;
  }, [board]);

  useEffect(() => {
    if (!gameOver) return;

    // Highlight line or tie pulse
    if (gameOver.type === "win") {
      setWinLine(gameOver.line);
      setTieFlash(false);
    } else {
      setWinLine(null);
      setTieFlash(true);
      setTimeout(() => setTieFlash(false), 650);
    }

    // Set UI status
    if (gameOver.type === "tie") setStatus("Tie game.");
    else setStatus(gameOver.who === human ? "You win!?" : "Bot wins.");

    // Update Firestore stats ONCE per finished game
    if (countedRef.current) return;
    countedRef.current = true;

    const updates = { games: increment(1) };
    if (gameOver.type === "tie") updates.ties = increment(1);
    else if (gameOver.who === human) updates.losses = increment(1); // bot "loss"
    else updates.wins = increment(1); // bot "win"

    updateDoc(statsRef, updates);
  }, [gameOver, human, statsRef]);

  async function botMove(nextBoard, whoseTurn) {
    setBusy(true);
    try {
      const pyodide = await loadPy();

      const { x, o } = toBitboards(nextBoard);
      pyodide.globals.set("x_bits", x);
      pyodide.globals.set("o_bits", o);
      pyodide.globals.set("turn", whoseTurn);

      const mv = await pyodide.runPythonAsync(
        "best_move(int(x_bits), int(o_bits), str(turn))"
      );

      const move = Number(mv);
      if (move >= 0 && move <= 8 && !nextBoard[move]) {
        const updated = [...nextBoard];
        updated[move] = bot;
        setBoard(updated);
      
        // If game not over after bot move, give turn to human
        if (!winner(updated) && !isFull(updated)) {
          setTurn(human);
          setStatus("Your turn.");
        }
      }
      
    } catch (e) {
      setPyErr(String(e));
    } finally {
      setBusy(false);
    }
  }

  async function handleClick(i) {
    if (!pyReady || pyErr) return;
    if (busy) return;
    if (board[i]) return;
    if (gameOver) return;
  
    // ✅ don't allow human to play when it's not their turn
    if (turn !== human) return;
  
    const next = [...board];
    next[i] = human;
    setBoard(next);
  
    const w = winner(next);
    if (w || isFull(next)) return;
  
    // ✅ now it's bot's turn
    setTurn(bot);
    setStatus("Bot thinking...");
  }
  

  function resetGame(startingHuman = human) {
    countedRef.current = false;
    setWinLine(null);
    setTieFlash(false);
    setBoard(Array(9).fill(null));
  
    // X always starts
    setTurn("X");
  
    // If human is X -> human starts. If human is O -> bot starts.
    setStatus(startingHuman === "X" ? "Your turn." : "Bot starts...");
  }

  // If bot starts (human=O), make first move on reset
  useEffect(() => {
    if (!pyReady || pyErr) return;
    if (human === "O" && board.every((c) => c === null) && !busy) {
      setStatus("Bot thinking...");
      botMove(board, "X"); // X always starts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [human, pyReady]);

  useEffect(() => {
    if (!pyReady || pyErr) return;
    if (busy) return;
    if (gameOver) return;
  
    // If it's bot's turn, make bot move
    if (turn === bot) {
      setStatus("Bot thinking...");
      botMove(board, turn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, pyReady, pyErr, busy, gameOver, bot, board]);
  

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="app-container">
      <Header />

      <div className="ttt-wrap">
        <div className="ttt-card">
          <div className="ttt-topbar">
            <Link to="/" className="backbtn">
              ← Back to Portfolio
            </Link>
          </div>

          <div className="ttt-header">
            <div>
              <h1>Unbeatable Tic-Tac-Toe</h1>
              <p className="sub">
                Python (Pyodide) minimax + bitboards + transposition table
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

            <div className="stats">
              <div className="stat bot-wins">
                <div className="label">Bot Wins</div>
                <div className="value">{stats.wins}</div>
              </div>

              <div className="stat bot-losses">
                <div className="label">Bot Losses</div>
                <div className="value">{stats.losses}</div>
              </div>

              <div className="stat ties">
                <div className="label">Ties</div>
                <div className="value">{stats.ties}</div>
              </div>
            </div>
          </div>

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

          <div
            className={
              "status status-prominent " +
              (pyErr ? "status-error" : busy ? "status-busy" : gameOver ? "status-done" : "status-ready")
            }
          >
            {!pyReady && !pyErr && "Loading Python engine…"}
            {pyErr ? `Error: ${pyErr}` : status}
          </div>

          <div className={(busy ? "grid busy" : "grid") + (tieFlash ? " tie" : "")}>
            {board.map((cell, i) => (
              <button
                key={i}
                className={
                  "cell" +
                  (cell ? ` filled ${cell}` : "") +
                  (winLine?.includes(i) ? " win" : "")
                }
                onClick={() => handleClick(i)}
                disabled={!pyReady || !!pyErr || busy || !!cell || !!gameOver}
                aria-label={`cell-${i}`}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
