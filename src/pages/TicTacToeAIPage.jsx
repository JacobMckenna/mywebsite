import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/TicTacToeAIPage.css";

import { updateDoc, increment } from "firebase/firestore";

import { loadPy } from "../tictactoe/utils/pyodide";
import { winner, getWinLine, isFull, toBitboards } from "../tictactoe/utils/game";
import { usePyodide } from "../tictactoe/hooks/usePyodide";
import { useFirestoreStats } from "../tictactoe/hooks/useFirestoreStats";

import TopBar from "../tictactoe/components/TopBar";
import GameHeader from "../tictactoe/components/GameHeader";
import Controls from "../tictactoe/components/Controls";
import StatusBar from "../tictactoe/components/StatusBar";
import Grid from "../tictactoe/components/Grid";

export default function TicTacToeAIPage() {
  const { pyReady, pyErr, setPyErr } = usePyodide();
  const { stats, statsLoading, statsRef } = useFirestoreStats();

  const [board, setBoard] = useState(() => Array(9).fill(null));
  const [human, setHuman] = useState("X");
  const bot = human === "X" ? "O" : "X";

  const [status, setStatus] = useState("Your turn.");
  const [turn, setTurn] = useState("X");
  const [busy, setBusy] = useState(false);

  const [winLine, setWinLine] = useState(null);
  const [tieFlash, setTieFlash] = useState(false);

  const countedRef = useRef(false);

  const gameOver = useMemo(() => {
    const line = getWinLine(board);
    if (line) return { type: "win", who: board[line[0]], line };
    if (isFull(board)) return { type: "tie" };
    return null;
  }, [board]);

  useEffect(() => {
    if (!gameOver) return;

    if (gameOver.type === "win") {
      setWinLine(gameOver.line);
      setTieFlash(false);
    } else {
      setWinLine(null);
      setTieFlash(true);
      setTimeout(() => setTieFlash(false), 650);
    }

    if (gameOver.type === "tie") setStatus("Tie game.");
    else setStatus(gameOver.who === human ? "You win!?" : "Bot wins.");

    if (countedRef.current) return;
    countedRef.current = true;

    const updates = { games: increment(1) };
    if (gameOver.type === "tie") updates.ties = increment(1);
    else if (gameOver.who === human) updates.losses = increment(1);
    else updates.wins = increment(1);

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

  function handleClick(i) {
    if (!pyReady || pyErr) return;
    if (busy || board[i] || gameOver) return;
    if (turn !== human) return;

    const next = [...board];
    next[i] = human;
    setBoard(next);

    if (winner(next) || isFull(next)) return;

    setTurn(bot);
    setStatus("Bot thinking...");
  }

  function resetGame(startingHuman = human) {
    countedRef.current = false;
    setWinLine(null);
    setTieFlash(false);
    setBoard(Array(9).fill(null));
    setTurn("X");
    setStatus(startingHuman === "X" ? "Your turn." : "Bot starts...");
  }

  // Bot starts if human = O
  useEffect(() => {
    if (!pyReady || pyErr) return;
    if (human === "O" && board.every((c) => c === null) && !busy) {
      setStatus("Bot thinking...");
      botMove(board, "X");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [human, pyReady]);

  useEffect(() => {
    if (!pyReady || pyErr || busy || gameOver) return;

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
          <TopBar />

          <GameHeader stats={stats} statsLoading={statsLoading} />

          <Controls
            human={human}
            setHuman={setHuman}
            resetGame={resetGame}
            busy={busy}
          />

          <StatusBar
            pyReady={pyReady}
            pyErr={pyErr}
            busy={busy}
            gameOver={gameOver}
            status={status}
          />

          <Grid
            board={board}
            onCellClick={handleClick}
            busy={busy}
            tieFlash={tieFlash}
            winLine={winLine}
            gameOver={gameOver}
            pyReady={pyReady}
            pyErr={pyErr}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
