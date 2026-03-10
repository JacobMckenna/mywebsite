import React from "react";

export default function EpicMomentCharacterList({ characters = [] }) {
  if (!characters.length) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <div
        style={{
          fontSize: "0.78rem",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "#d7b56d",
          marginBottom: "0.7rem",
          fontWeight: 700,
        }}
      >
        Party Involved
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.7rem",
          alignItems: "center",
        }}
      >
        {characters.map((character) => {
          const imageSrc =
            character.tokenSrc ||
            character.portraitSrc ||
            character.fullImageSrc ||
            null;

          return (
            <div
              key={character.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.45rem 0.7rem 0.45rem 0.45rem",
                borderRadius: "999px",
                border: "1px solid rgba(215, 181, 109, 0.28)",
                background:
                  "linear-gradient(180deg, rgba(42,27,18,0.95) 0%, rgba(22,14,10,0.95) 100%)",
                color: "#f5e8c8",
                boxShadow: "0 6px 14px rgba(0,0,0,0.28)",
              }}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={character.name}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "999px",
                    objectFit: "cover",
                    border: "1px solid rgba(215, 181, 109, 0.35)",
                    display: "block",
                    background: "#120c08",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "999px",
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(215, 181, 109, 0.12)",
                    border: "1px solid rgba(215, 181, 109, 0.35)",
                    color: "#f7e6b7",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {character.name?.charAt(0) || "?"}
                </div>
              )}

              <span
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {character.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}