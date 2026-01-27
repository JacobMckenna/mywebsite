export async function loadPy() {
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

  const resp = await fetch(`/py/ttt_ai.py?v=${Date.now()}`);
  const code = await resp.text();
  await pyodide.runPythonAsync(code);

  return pyodide;
}
