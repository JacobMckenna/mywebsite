import React from "react";
import EpicMomentsGrid from "./EpicMomentsGrid";

export default function CampaignEpicMomentsSection({ campaign }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "22px",
          border: "1px solid rgba(215, 181, 109, 0.18)",
          background:
            "linear-gradient(180deg, rgba(30,19,13,0.84) 0%, rgba(16,10,7,0.94) 100%)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          marginBottom: "1rem",
        }}
      >
        {campaign.coverImageSrc ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.72)), url(${campaign.coverImageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.42,
            }}
          />
        ) : null}

        <div style={{ position: "relative", zIndex: 1, padding: "1.25rem 1.25rem 1.15rem" }}>
          <div
            style={{
              color: "#d7b56d",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.75rem",
              marginBottom: "0.55rem",
              fontWeight: 700,
            }}
          >
            Campaign
          </div>

          <h2
            style={{
              margin: 0,
              color: "#f7e6b7",
              fontFamily: "Cinzel, Georgia, serif",
              fontSize: "clamp(1.6rem, 3vw, 2.3rem)",
              lineHeight: 1.05,
            }}
          >
            {campaign.name}
          </h2>

          {campaign.description ? (
            <p
              style={{
                margin: "0.75rem 0 0",
                color: "#efe2c3",
                lineHeight: 1.7,
                maxWidth: "900px",
              }}
            >
              {campaign.description}
            </p>
          ) : null}
        </div>
      </div>

      <EpicMomentsGrid moments={campaign.epicMoments} />
    </section>
  );
}