import React from "react";

export default function CharacterModalOverlay({ stage, origin }) {
  const portalDuration = 260;

  const originX =
    origin?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const originY = origin?.y ?? 200;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.7)",
          opacity: stage === "open" ? 1 : 0,
          transition: `opacity ${portalDuration}ms ease`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(closest-side, rgba(160,110,255,.22), rgba(0,0,0,0) 65%), radial-gradient(circle at 50% 30%, rgba(255,190,90,.12), rgba(0,0,0,0) 60%)",
          clipPath:
            stage === "open"
              ? `circle(160% at ${originX}px ${originY}px)`
              : `circle(0% at ${originX}px ${originY}px)`,
          transition: `clip-path ${portalDuration}ms ease`,
          pointerEvents: "none",
        }}
      />
    </>
  );
}