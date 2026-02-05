// import { useEffect, useMemo, useState } from "react";
// import { db } from "../../firebase";
// import { doc, onSnapshot, setDoc } from "firebase/firestore";

// export function useFirestoreStats() {
//   const [stats, setStats] = useState(null);
//   const [statsLoading, setStatsLoading] = useState(true);

//   const statsRef = useMemo(() => doc(db, "stats", "tictactoe"), []);

//   useEffect(() => {
//     let unsub = () => {};

//     (async () => {
//       setStatsLoading(true);

//       unsub = onSnapshot(statsRef, (snap) => {
//         if (snap.exists()) setStats(snap.data());
//         setStatsLoading(false);
//       });

//       const { getDoc } = await import("firebase/firestore");
//       const snap = await getDoc(statsRef);
//       if (!snap.exists()) {
//         await setDoc(statsRef, { wins: 0, losses: 0, ties: 0, games: 0 });
//       }
//     })().catch(console.error);

//     return () => unsub();
//   }, [statsRef]);

//   return { stats, statsLoading, statsRef };
// }


import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";

const DEFAULT_STATS = { wins: 0, losses: 0, ties: 0, games: 0 };

export function useFirestoreStats() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  const statsRef = useMemo(() => doc(db, "stats", "tictactoe"), []);

  useEffect(() => {
    setStatsLoading(true);
    setStatsError("");

    // ✅ REAL-TIME LISTENER WITH ERROR HANDLER
    const unsub = onSnapshot(
      statsRef,
      (snap) => {
        if (snap.exists()) {
          setStats(snap.data());
        } else {
          // ✅ prevents "nothing loads" when doc doesn't exist yet
          setStats(DEFAULT_STATS);
        }
        setStatsLoading(false);
      },
      (err) => {
        console.error("Firestore onSnapshot error:", err);
        setStatsError(err?.message || String(err));
        setStatsLoading(false);
      }
    );

    // ✅ Ensure document exists (non-blocking)
    (async () => {
      try {
        const snap = await getDoc(statsRef);
        if (!snap.exists()) {
          await setDoc(statsRef, DEFAULT_STATS);
        }
      } catch (err) {
        console.error("Firestore getDoc/setDoc error:", err);
        setStatsError((prev) => prev || (err?.message || String(err)));
      }
    })();

    return () => unsub();
  }, [statsRef]);

  return { stats, statsLoading, statsError, statsRef };
}
