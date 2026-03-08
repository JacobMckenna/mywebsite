import React, { useMemo, useState } from "react";
import { getCharacters } from "../../lib/dnd/characters";
import CharacterGrid from "../../components/dnd/character/CharacterGrid";
import CharacterModal from "../../components/dnd/character/CharacterModal";

import RuneTitle from "../../components/dnd/home/RuneTitle";
import ShadowMerchantTitle from "../../components/dnd/home/ShadowMerchantTitle";

import Header from "../../components/dnd/layout/Header";
import Footer from "../../components/layout/Footer";

import Background from "../../components/dnd/layout/background";

export default function DnDHome() {
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
      <Background>
        <Header
          activePage="home"
        />
        
        <div
          style={{
            textAlign: "center",
            padding: "70px 20px 40px",
            color: "white",
          }}
        >  
          <ShadowMerchantTitle />
          <RuneTitle />

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

      <Footer />

      </Background>
    </div>
  );
}