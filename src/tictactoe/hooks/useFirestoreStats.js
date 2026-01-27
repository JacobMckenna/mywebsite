import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export function useFirestoreStats() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const statsRef = useMemo(() => doc(db, "stats", "tictactoe"), []);

  useEffect(() => {
    let unsub = () => {};

    (async () => {
      setStatsLoading(true);

      unsub = onSnapshot(statsRef, (snap) => {
        if (snap.exists()) setStats(snap.data());
        setStatsLoading(false);
      });

      const { getDoc } = await import("firebase/firestore");
      const snap = await getDoc(statsRef);
      if (!snap.exists()) {
        await setDoc(statsRef, { wins: 0, losses: 0, ties: 0, games: 0 });
      }
    })().catch(console.error);

    return () => unsub();
  }, [statsRef]);

  return { stats, statsLoading, statsRef };
}
