import React from "react";
import EpicMomentCard from "./EpicMomentCard";

export default function EpicMomentsGrid({ moments = [] }) {
  if (!moments.length) {
    return (
      <div
        style={{
          color: "#f4e7c5",
          background:
            "linear-gradient(180deg, rgba(31,20,14,0.92) 0%, rgba(18,11,8,0.96) 100%)",
          border: "1px solid rgba(215, 181, 109, 0.18)",
          borderRadius: "20px",
          padding: "1.5rem",
          textAlign: "center",
          boxShadow: "0 14px 28px rgba(0,0,0,0.3)",
        }}
      >
        No epic moments have been recorded yet.
      </div>
    );
  }

  const [featuredMoment, ...remainingMoments] = moments;

  return (
    <div style={{ display: "grid", gap: "1.35rem" }}>
      {featuredMoment ? <EpicMomentCard moment={featuredMoment} featured /> : null}

      {remainingMoments.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {remainingMoments.map((moment) => (
            <EpicMomentCard key={moment.id} moment={moment} />
          ))}
        </div>
      ) : null}
    </div>
  );
}