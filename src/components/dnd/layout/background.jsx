import React from "react";

export default function Background({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url(/dnd/landing_background.png)",
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
        backgroundSize: "50%",
        imageRendering: "pixelated",
      }}
    >
      {children}
    </div>
  );
}