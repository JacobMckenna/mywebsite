import React from "react";

export default function CharacterModalSection({ title, children }) {
  return (
    <div
      style={{
        marginTop: 16,
        padding: 14,
        borderRadius: 14,
        background: "rgba(255,255,255,.05)",
      }}
    >
      <div
        style={{
          fontWeight: 900,
          marginBottom: 10,
          color: "#ffcc66",
          fontSize: 18,
        }}
      >
        {title}
      </div>

      {children}
    </div>
  );
}