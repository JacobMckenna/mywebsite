import React from "react";

function CharacterToken({ xPercent, yPercent, imageSrc, label, size = 34 }) {
  return (
    <div
      title={label}
      aria-label={label}
      style={{
        position: "absolute",
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 25,
      }}
    >
      <img
        src={imageSrc}
        alt={label}
        draggable={false}
        style={{
          width: size,
          height: size,
          borderRadius: "999px",
          objectFit: "cover",
          border: "2px solid #f3dfb2",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          background: "#1b120a",
        }}
      />
    </div>
  );
}

function PartyToken({
  xPercent,
  yPercent,
  imageSrc,
  label,
  size = 58,
}) {
  return (
    <div
      title={label}
      aria-label={label}
      style={{
        position: "absolute",
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 26,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "999px",
          padding: 1,
          background:
            "linear-gradient(180deg, #f2d48b 0%, #c99542 38%, #7a4d21 100%)",
          boxShadow: `
            0 0 0 2px rgba(35, 20, 10, 0.75),
            0 6px 14px rgba(0,0,0,0.45),
            0 0 10px rgba(255,214,120,0.18)
          `,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "999px",
            overflow: "hidden",
            background: "#120b07",
            border: "2px solid rgba(255, 240, 210, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={imageSrc}
            alt={label}
            draggable={false}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              filter: "saturate(1.06) contrast(1.03)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PartyOverlay({ partyState }) {
  if (!partyState) return null;

  if (partyState.mode === "characters") {
    return (
      <>
        {partyState.characters.map((character) => (
          <CharacterToken
            key={character.id}
            xPercent={character.xPercent}
            yPercent={character.yPercent}
            imageSrc={character.imageSrc}
            label={character.name}
            size={32}
          />
        ))}
      </>
    );
  }

  return (
    <PartyToken
      xPercent={partyState.party.xPercent}
      yPercent={partyState.party.yPercent}
      imageSrc={partyState.party.imageSrc}
      label={partyState.party.label || "The Party"}
      size={28}
    />
  );
}