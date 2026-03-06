import React, { useMemo, useState } from "react";
import { getCharacters } from "../lib/dnd/characters";
import CharacterGrid from "../components/dnd/CharacterGrid";
import CharacterModal from "../components/dnd/CharacterModal";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function DnDPage() {
  const list = useMemo(() => getCharacters(), []);
  const [selected, setSelected] = useState(null);
  const [portalOrigin, setPortalOrigin] = useState({ x: window.innerWidth / 2, y: 200 });
  const [tokenRect, setTokenRect] = useState(null);

  const handleOpenCharacter = (character, tokenEl) => {
    if (tokenEl) {
      const rect = tokenEl.getBoundingClientRect();
  
      setPortalOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
  
      setTokenRect(rect);
    }
  
    setSelected(character);
  };

  const handleCloseCharacter = () => {
    setSelected(null);
    setTokenRect(null);
  };

  return (
    <div>
    {/* <Header /> */}
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url(/dnd/landing_background.png)",
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
        backgroundSize: "50%",
        imageRendering: "pixelated",
      }}
    >

      {/* BACK BUTTON */}
      <button
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "/";
          }
        }}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,.25)",
          background: "rgba(0,0,0,.65)",
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
          backdropFilter: "blur(4px)",
          boxShadow: "0 4px 14px rgba(0,0,0,.45)",
        }}
      >
        ← Back
      </button>
      <div
        style={{
          textAlign: "center",
          padding: "70px 20px 40px",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 1000,
            letterSpacing: 3,
            lineHeight: 1.05,
            fontFamily:
              "Impact, Haettenschweiler, 'Arial Black', system-ui, sans-serif",
            textTransform: "uppercase",
            textShadow:
              "0 6px 0 rgba(0,0,0,.9), 0 0 30px rgba(255,180,60,.35), 0 0 70px rgba(120,80,255,.25)",
          }}
        >
          Meet the{" "}
          <span
            style={{
              textDecoration: "line-through",
              opacity: 0.35,
              marginRight: 8,
            }}
          >
            Players
          </span>
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 100,
            fontWeight: 1000,
            letterSpacing: 4,
            fontFamily:
              "Impact, Haettenschweiler, 'Arial Black', system-ui, sans-serif",
            color: "#ffcc66",
            textShadow:
              "0 8px 0 rgba(0,0,0,.95), 0 0 40px rgba(255,200,90,.5), 0 0 80px rgba(255,120,0,.35)",
          }}
        >
          Shadow Merchant
        </div>

        <div
          style={{
            fontSize: 100,
            fontWeight: 1000,
            letterSpacing: 4,
            fontFamily:
              "Impact, Haettenschweiler, 'Arial Black', system-ui, sans-serif",
            color: "#ffcc66",
            textShadow:
              "0 8px 0 rgba(0,0,0,.95), 0 0 40px rgba(255,200,90,.5), 0 0 80px rgba(255,120,0,.35)",
          }}
        >
          Money Gang
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 22,
            letterSpacing: 6,
            opacity: 0.85,
            textShadow: "0 3px 12px rgba(0,0,0,.8)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
          }}
        >
          ⚔ ᛖᚲᚺᛟᛖᛊ ᛟᚠ ᛚᛖᚷᛖᚾᛞᛊ ⚔
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 28,
            fontStyle: "italic",
            letterSpacing: 1,
            opacity: 0.92,
            textShadow: "0 3px 14px rgba(0,0,0,.9)",
            fontFamily: "Georgia, serif",
          }}
        >
          we loooove casting spellls ✨
        </div>
      </div>

      <CharacterGrid characters={list} onOpenCharacter={handleOpenCharacter} />

      <CharacterModal
        character={selected}
        origin={portalOrigin}
        tokenRect={tokenRect}
        onClose={handleCloseCharacter}
      />
    </div>
    <Footer />
    </div>
  );
}