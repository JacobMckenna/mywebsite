import React, { useState } from "react";

export default function CharacterModalHeader({ character, stage }) {
  const [showAlt, setShowAlt] = useState(false);

  const hasAltImage = Boolean(character.fullImageSrc && character.fullImageAlt);

  const imageHeight =
    typeof window !== "undefined"
      ? Math.min(360, window.innerHeight * 0.42)
      : 360;

  const handleFlip = () => {
    if (hasAltImage) {
      setShowAlt((prev) => !prev);
    }
  };

  const sharedImageStyle = {
    maxHeight: imageHeight,
    width: "auto",
    objectFit: "contain",
    display: "block",
    filter:
      "drop-shadow(0 18px 30px rgba(0,0,0,.75)) drop-shadow(0 0 24px rgba(120,80,255,.22))",
    userSelect: "none",
    WebkitUserSelect: "none",
  };

  return (
    <>
      {character.fullImageSrc && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
            opacity: stage === "open" ? 1 : 0,
            transform:
              stage === "open"
                ? "translateY(0px) scale(1)"
                : "translateY(30px) scale(0.92)",
            transition:
              "opacity 260ms ease 220ms, transform 360ms cubic-bezier(.2,.9,.2,1) 220ms",
            perspective: 1200,
          }}
        >
          <div
            onClick={handleFlip}
            style={{
              position: "relative",
              display: "inline-block",
              cursor: hasAltImage ? "pointer" : "default",
              transformStyle: "preserve-3d",
              transition: "transform 700ms cubic-bezier(.2,.8,.2,1)",
              transform: showAlt ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            title={hasAltImage ? "Click to flip appearance" : undefined}
          >
            {/* invisible sizing image so wrapper keeps original natural size */}
            <img
              src={character.fullImageSrc}
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                ...sharedImageStyle,
                visibility: "hidden",
                pointerEvents: "none",
              }}
            />

            {/* front */}
            <img
              src={character.fullImageSrc}
              alt={character.name}
              draggable={false}
              style={{
                ...sharedImageStyle,
                position: "absolute",
                inset: 0,
                margin: "auto",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />

            {/* back */}
            {hasAltImage && (
              <img
                src={character.fullImageAlt}
                alt={`${character.name} alternate appearance`}
                draggable={false}
                style={{
                  ...sharedImageStyle,
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              />
            )}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <h2
            style={{
              fontFamily:
                "Impact, Haettenschweiler, 'Arial Black', system-ui, sans-serif",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontSize: 34,
              margin: 0,
            }}
          >
            {character.name}
          </h2>

          {Array.isArray(character.classes) &&
            character.classes.map((cls) => (
              <span
                key={cls}
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "rgba(120,80,255,.16)",
                  border: "1px solid rgba(160,120,255,.28)",
                  color: "#d8c7ff",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                {cls}
              </span>
            ))}
        </div>

        {(character.race || character.level !== undefined) && (
          <div
            style={{
              fontSize: 16,
              fontStyle: "italic",
              opacity: 0.88,
              marginBottom: 8,
            }}
          >
            {character.race || ""}
            {character.race && character.level !== undefined ? " • " : ""}
            {character.level !== undefined ? `Level ${character.level}` : ""}
          </div>
        )}
      </div>
    </>
  );
}