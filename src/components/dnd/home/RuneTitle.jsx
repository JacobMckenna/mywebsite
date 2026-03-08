import { useState } from "react";
import { GiCrossedAxes } from "react-icons/gi";

export default function RuneTitle() {
  const [revealed, setRevealed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleLanguage = () => {
    if (animating) return;

    setAnimating(true);

    setTimeout(() => {
      setRevealed((prev) => !prev);
      setAnimating(false);
    }, 350);
  };

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={toggleLanguage}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={
          revealed
            ? "Click to change the text back into runes"
            : "Click to translate the runes"
        }
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          margin: 0,
          color: "inherit",
          cursor: "pointer",
          userSelect: "none",
          outline: "none",
        }}
      >
        <div
          style={{
            marginTop: 18,
            fontSize: 22,
            letterSpacing: 6,
            opacity: animating ? 0 : 0.85,
            textShadow: hovered
              ? "0 3px 12px rgba(0,0,0,.8), 0 0 10px rgba(255,215,120,0.35)"
              : "0 3px 12px rgba(0,0,0,.8)",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
            transition:
              "transform .35s ease, opacity .35s ease, filter .35s ease, text-shadow .35s ease",
            transform: animating ? "scale(1.08)" : "scale(1)",
            filter: animating
              ? "blur(4px) brightness(1.8)"
              : hovered
              ? "brightness(1.15)"
              : "none",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            whiteSpace: "nowrap",
          }}
        >
          <GiCrossedAxes />

          {revealed
            ? "Home of the Gods"
            : "ᚺᛟᛗᛖ ᛟᚠ ᚦᛖ ᚷᛟᛞᛊ"}

          <GiCrossedAxes />
        </div>
      </button>

      <div
        style={{
          marginTop: 6,
          minHeight: 20,
          fontSize: 13,
          letterSpacing: 1,
          fontFamily: '"Cinzel", Georgia, serif',
          color: "rgba(240,224,190,0.88)",
          textShadow: "0 1px 6px rgba(0,0,0,0.75)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity .25s ease, transform .25s ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Cast Comprehend Languages?
      </div>
    </div>
  );
}