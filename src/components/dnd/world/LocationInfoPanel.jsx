import React from "react";
import { Link } from "react-router-dom";

export default function LocationInfoPanel({ marker, relatedItems }) {
  if (!marker) {
    return (
      <div style={{ color: "#e8d7b4", lineHeight: 1.6, fontSize: 14 }}>
        Click a marker to inspect a location. Double click a marker to open its
        zoomed-in map.
      </div>
    );
  }

  return (
    <div style={{ color: "#ead9b7" }}>
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#cda66a",
          marginBottom: 6,
        }}
      >
        {marker.type}
      </div>

      <h2
        style={{
          margin: "0 0 10px",
          fontSize: 24,
          lineHeight: 1.15,
          color: "#fff1d2",
        }}
      >
        {marker.name}
      </h2>

      <p
        style={{
          marginTop: 0,
          marginBottom: 14,
          lineHeight: 1.6,
          fontSize: 14,
          color: "#e8d7b4",
        }}
      >
        {marker.description}
      </p>

      <Link
        to={marker.route}
        style={{
          display: "inline-block",
          marginBottom: 16,
          padding: "9px 12px",
          borderRadius: 10,
          background: "linear-gradient(180deg, #c59a58 0%, #9f7437 100%)",
          color: "#1b120a",
          textDecoration: "none",
          fontWeight: 700,
          border: "1px solid #e0bc7b",
        }}
      >
        Open Map
      </Link>

      {relatedItems.length > 0 && (
        <div style={{ display: "grid", gap: 10 }}>
          {relatedItems.map((item) => (
            <Link
              key={item.id}
              to={item.route}
              style={{
                display: "block",
                padding: 10,
                borderRadius: 12,
                textDecoration: "none",
                color: "#f6ead2",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(214,177,111,0.22)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  color: "#cda66a",
                  marginBottom: 4,
                }}
              >
                {item.type}
              </div>

              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                  color: "#fff0c8",
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: "#e8d7b4",
                }}
              >
                {item.summary}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}