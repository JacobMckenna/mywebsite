import React from "react";

export default function CharacterModalPanel({ stage, onClose, children }) {
  const panelWidth =
    typeof window !== "undefined"
      ? Math.min(1200, window.innerWidth - 80)
      : 1200;

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        left: "50%",
        top: 28,
        transform: "translateX(-50%)",
        width: `min(${panelWidth}px, calc(100vw - 40px))`,
        height: "calc(100vh - 56px)",
        borderRadius: 26,
        background:
          "linear-gradient(180deg, rgba(5,5,10,.92) 0%, rgba(0,0,0,.82) 100%)",
        boxShadow:
          "0 24px 70px rgba(0,0,0,.85), inset 0 0 0 1px rgba(255,255,255,.08)",
        opacity: stage === "open" ? 1 : 0,
        transition: "opacity 220ms ease 120ms",
        zIndex: 10000,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: "60%",
          height: 320,
          background:
            "radial-gradient(circle at center, rgba(120,80,255,.18), rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />

      <div
        className="character-modal-scroll"
        style={{
          position: "relative",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "36px 28px 28px",
          color: "white",
          boxSizing: "border-box",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          .character-modal-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {children}
      </div>
    </div>
  );
}