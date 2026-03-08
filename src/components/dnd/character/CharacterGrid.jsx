import React from "react";
import CharacterCard from "./CharacterCard";

export default function CharacterGrid({ characters, onOpenCharacter }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 22,
        gridTemplateColumns: "repeat(auto-fit, 240px)",
        justifyContent: "center",
        alignItems: "start",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px 48px",
      }}
    >
      {characters.map((character) => (
        <CharacterCard
          key={character.id || character.name}
          character={character}
          onOpenCharacter={onOpenCharacter}
        />
      ))}
    </div>
  );
}