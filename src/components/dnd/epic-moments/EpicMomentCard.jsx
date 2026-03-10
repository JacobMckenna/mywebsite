import React from "react";
import EpicMomentCharacterList from "./EpicMomentCharacterList";

export default function EpicMomentCard({ moment, featured = false }) {
  return (
    <article
      className="epic-moment-card"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: featured ? "24px" : "20px",
        border: "1px solid rgba(215, 181, 109, 0.22)",
        background:
          "linear-gradient(180deg, rgba(44,28,18,0.96) 0%, rgba(18,11,8,0.98) 100%)",
        boxShadow: featured
          ? "0 24px 50px rgba(0,0,0,0.45)"
          : "0 14px 32px rgba(0,0,0,0.36)",
        transform: "translateY(0)",
        transition:
          "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: featured ? "21 / 9" : "16 / 9",
          overflow: "hidden",
          background: "#0f0906",
        }}
      >
        <img
          src={moment.imageSrc}
          alt={moment.title}
          className="epic-moment-image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: "scale(1)",
            transition: "transform 350ms ease",
            filter: featured ? "saturate(1.02) contrast(1.02)" : "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: featured
              ? "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 35%, rgba(12,7,5,0.80) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.18) 42%, rgba(12,7,5,0.82) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,180,70,0.16), transparent 32%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: featured ? "1.4rem 1.4rem 1.15rem" : "1rem 1rem 0.9rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              marginBottom: "0.65rem",
              padding: "0.38rem 0.65rem",
              borderRadius: "999px",
              background: "rgba(16, 10, 7, 0.72)",
              border: "1px solid rgba(215, 181, 109, 0.24)",
              color: "#d7b56d",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 700,
            }}
          >
            {featured ? "Featured Chronicle" : "Legendary Deed"}
          </div>

          <h2
            style={{
              margin: 0,
              color: "#f7e6b7",
              fontSize: featured ? "clamp(1.8rem, 2.8vw, 2.6rem)" : "1.35rem",
              lineHeight: 1.08,
              fontFamily: "Cinzel, Georgia, serif",
              textShadow: "0 2px 12px rgba(0,0,0,0.42)",
            }}
          >
            {moment.title}
          </h2>
        </div>
      </div>

      <div style={{ padding: featured ? "1.35rem 1.4rem 1.5rem" : "1.1rem 1.1rem 1.2rem" }}>
        <p
          style={{
            margin: 0,
            color: "#eee0c0",
            lineHeight: 1.78,
            fontSize: featured ? "1.02rem" : "0.97rem",
          }}
        >
          {moment.description}
        </p>

        <EpicMomentCharacterList characters={moment.characters} />
      </div>
    </article>
  );
}