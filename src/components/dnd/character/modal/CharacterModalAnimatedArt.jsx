import React from "react";

export default function CharacterModalAnimatedArt({
  character,
  tokenRect,
  animatedArtStyle,
}) {
  if (!character?.fullImageSrc || !tokenRect) return null;

  const maxHeight =
    typeof window !== "undefined"
      ? Math.min(360, window.innerHeight * 0.42)
      : 360;

  return (
    <div style={animatedArtStyle}>
      <img
        src={character.fullImageSrc}
        alt={character.name}
        style={{
          maxHeight,
          width: "auto",
          objectFit: "contain",
          filter:
            "drop-shadow(0 18px 30px rgba(0,0,0,.75)) drop-shadow(0 0 24px rgba(120,80,255,.22))",
          display: "block",
        }}
      />
    </div>
  );
}