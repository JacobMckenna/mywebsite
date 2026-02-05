import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

/** @typedef {{ wins:number, losses:number, ties:number, games:number }} Stats */

const DEFAULT_STATS = { wins: 0, losses: 0, ties: 0, games: 0 };

export function useFirestoreStats() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  const statsRef = useMemo(() => doc(db, "stats", "tictactoe"), []);

  useEffect(() => {
    let alive = true;

    setStatsLoading(true);
    setStatsError("");

    const unsub = onSnapshot(
      statsRef,
      (snap) => {
        if (!alive) return;

        setStats(snap.exists() ? snap.data() : DEFAULT_STATS);
        setStatsLoading(false);
      },
      (err) => {
        if (!alive) return;

        console.error("Firestore onSnapshot error:", err);
        setStatsError(err?.message || String(err));
        setStatsLoading(false);
      }
    );

    // Ensure doc exists safely
    (async () => {
      try {
        await setDoc(statsRef, DEFAULT_STATS, { merge: true });
      } catch (err) {
        if (!alive) return;

        console.error("Firestore setDoc error:", err);
        setStatsError((prev) => prev || (err?.message || String(err)));
      }
    })();

    return () => {
      alive = false;
      unsub();
    };
  }, [statsRef]);

  return { stats, statsLoading, statsError, statsRef };
}
