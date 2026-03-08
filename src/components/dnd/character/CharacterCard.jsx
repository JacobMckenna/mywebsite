import React, { useState } from "react";
import { CiLink } from "react-icons/ci";

export default function CharacterCard({ character, onOpenCharacter }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      style={{
        width: 240,
        border: "2px solid rgba(255,255,255,.25)",
        borderRadius: 16,
        background: "rgba(0,0,0,.55)",
        boxShadow: "0 10px 25px rgba(0,0,0,.45)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ padding: 18 }}>
        <div
          style={{ position: "relative", width: 110, height: 110, cursor: "pointer" }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={(e) => onOpenCharacter(character, e.currentTarget)}
          title="Open character summary"
        >
          <img
            src={character.portraitSrc}
            alt={character.name}
            onError={(e) => (e.currentTarget.style.opacity = "0.25")}
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              objectFit: "cover",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%,-50%) scale(${isHover ? 1.35 : 1})`,
              transition: "transform 160ms ease",
              boxShadow: isHover
                ? "0 0 22px rgba(255,210,120,.55), 0 6px 16px rgba(0,0,0,.6)"
                : "0 6px 16px rgba(0,0,0,.6)",
              zIndex: 2,
            }}
          />

          {character.tokenSrc && (
            <img
              src={character.tokenSrc}
              alt=""
              aria-hidden="true"
              style={{
                width: 110,
                height: 110,
                objectFit: "contain",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          )}
        </div>
      </div>

      <div
        style={{
          paddingBottom: 18,
          textAlign: "center",
          color: "#fff",
          textShadow: "0 2px 6px rgba(0,0,0,.75)",
          width: "100%",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 10 }}>
          {character.name}
        </div>

        <a
          href={character.sheetUrl || "#"}
          {...(character.sheetUrl
            ? { target: "_blank", rel: "noreferrer" }
            : { onClick: (e) => e.preventDefault() })}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.25)",
            background: "rgba(0,0,0,.35)",
            color: "#fff",
            textDecoration: "none",
            opacity: character.sheetUrl ? 0.95 : 0.45,
          }}
        >
          <CiLink size={18} />
          character sheet
        </a>
      </div>
    </div>
  );
}