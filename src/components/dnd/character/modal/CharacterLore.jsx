import React from "react";
import CharacterModalSection from "./CharacterModalSection";

export default function CharacterLoreSection({
  character,
  hasBackstory,
  hasEpicMoments,
}) {
  return (
    <>
      <CharacterModalSection title="Quick Summary">
        <div
          style={{
            opacity: 0.94,
            fontSize: 16,
            lineHeight: 1.65,
            fontFamily: "Georgia, serif",
          }}
        >
          {character.summary || "No summary yet."}
        </div>
      </CharacterModalSection>

      {hasBackstory && (
        <CharacterModalSection title="Backstory">
          <div
            style={{
              opacity: 0.94,
              fontSize: 16,
              lineHeight: 1.7,
              fontFamily: "Georgia, serif",
            }}
          >
            {character.backstory}
          </div>
        </CharacterModalSection>
      )}

      {hasEpicMoments && (
        <CharacterModalSection title="Epic Moments">
          <ul
            style={{
              margin: 0,
              paddingLeft: 22,
              opacity: 0.94,
              fontSize: 16,
              lineHeight: 1.7,
              fontFamily: "Georgia, serif",
            }}
          >
            {character.epicMoments.map((moment, index) => (
              <li key={index} style={{ marginBottom: 8 }}>
                {moment}
              </li>
            ))}
          </ul>
        </CharacterModalSection>
      )}
    </>
  );
}