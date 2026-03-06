import React from "react";
import { CiLink } from "react-icons/ci";

export default function CharacterModalActions({ sheetUrl, onClose }) {
  return (
    <>
      {sheetUrl && (
        <div style={{ marginTop: 16 }}>
          <a
            href={sheetUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 12px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.2)",
              background: "rgba(0,0,0,.35)",
              color: "white",
              textDecoration: "none",
            }}
          >
            <CiLink size={18} />
            Open character sheet
          </a>
        </div>
      )}

      <button
        onClick={onClose}
        style={{
          marginTop: 16,
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,.25)",
          background: "rgba(0,0,0,.45)",
          color: "white",
          cursor: "pointer",
          fontWeight: 800,
        }}
      >
        Close
      </button>
    </>
  );
}