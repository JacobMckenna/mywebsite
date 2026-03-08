import React from "react";

export default function ShadowMerchantTitle() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Top Line */}
      <div
        style={{
          fontSize: "clamp(28px, 6vw, 80px)",
          fontWeight: 1000,
          letterSpacing: "0.2vw",
          lineHeight: 1.05,
          fontFamily:
            "Impact, Haettenschweiler, 'Arial Black', system-ui, sans-serif",
          textTransform: "uppercase",
          textShadow:
            "0 6px 0 rgba(0,0,0,.9), 0 0 30px rgba(255,180,60,.35), 0 0 70px rgba(120,80,255,.25)",
        }}
      >
        Meet the{" "}
        <span
          style={{
            textDecoration: "line-through",
            opacity: 0.35,
            marginRight: 8,
          }}
        >
          Players
        </span>
      </div>

      {/* Shadow Merchant */}
      <div
        style={{
          marginTop: 10,
          fontSize: "clamp(40px, 8vw, 100px)",
          fontWeight: 1000,
          letterSpacing: "0.25vw",
          fontFamily:
            "Impact, Haettenschweiler, 'Arial Black', system-ui, sans-serif",
          color: "#ffcc66",
          textShadow:
            "0 8px 0 rgba(0,0,0,.95), 0 0 40px rgba(255,200,90,.5), 0 0 80px rgba(255,120,0,.35)",
        }}
      >
        Shadow Merchant
      </div>

      {/* Money Gang */}
      <div
        style={{
          fontSize: "clamp(40px, 8vw, 100px)",
          fontWeight: 1000,
          letterSpacing: "0.25vw",
          fontFamily:
            "Impact, Haettenschweiler, 'Arial Black', system-ui, sans-serif",
          color: "#ffcc66",
          textShadow:
            "0 8px 0 rgba(0,0,0,.95), 0 0 40px rgba(255,200,90,.5), 0 0 80px rgba(255,120,0,.35)",
        }}
      >
        Money Gang
      </div>
    </div>
  );
}