import { useEffect, useState } from "react";
import { loadPy } from "../utils/pyodide";

export function usePyodide() {
  const [pyReady, setPyReady] = useState(false);
  const [pyErr, setPyErr] = useState("");

  useEffect(() => {
    loadPy()
      .then(() => setPyReady(true))
      .catch((e) => setPyErr(String(e)));
  }, []);

  return { pyReady, pyErr, setPyErr };
}
