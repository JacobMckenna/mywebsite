// import React, { useEffect, useMemo, useState } from "react";
// import CharacterModalHeader from "./Header";

// import CharacterModalActions from "./Actions";
// import CharacterLoreSection from "./CharacterLore";

// export default function CharacterModal({ character, origin, tokenRect, onClose }) {
//   const [stage, setStage] = useState("closed");

//   useEffect(() => {
//     if (!character) return;

//     setStage("enter");
//     const t = requestAnimationFrame(() => {
//       requestAnimationFrame(() => setStage("open"));
//     });

//     return () => cancelAnimationFrame(t);
//   }, [character]);

//   useEffect(() => {
//     if (!character) return;

//     const oldOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const onKey = (e) => {
//       if (e.key === "Escape") handleClose();
//     };

//     window.addEventListener("keydown", onKey);

//     return () => {
//       document.body.style.overflow = oldOverflow;
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [character]);

//   const animatedArtStyle = useMemo(() => {
//     if (!character || !tokenRect) return {};

//     const artFinalLeft = window.innerWidth / 2;
//     const artFinalTop = 64;

//     const startCenterX = tokenRect.left + tokenRect.width / 2;
//     const startCenterY = tokenRect.top + tokenRect.height / 2;

//     const dx = artFinalLeft - startCenterX;
//     const dy = artFinalTop - startCenterY;

//     return {
//       position: "fixed",
//       left: startCenterX,
//       top: startCenterY,
//       transform:
//         stage === "open"
//           ? `translate(${dx}px, ${dy}px) translate(-50%, 0) scale(1)`
//           : `translate(0px, 0px) translate(-50%, -50%) scale(0.28)`,
//       transformOrigin: "center center",
//       opacity: stage === "open" ? 0 : 0.95,
//       transition: "transform 360ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease 180ms",
//       zIndex: 10002,
//       pointerEvents: "none",
//     };
//   }, [character, tokenRect, stage]);

//   const handleClose = () => {
//     setStage("exit");
//     setTimeout(() => {
//       onClose();
//     }, 320);
//   };

//   if (!character) return null;

//   const portalDuration = 260;
//   const panelWidth = Math.min(1200, window.innerWidth - 80);

//   const hasBackstory =
//     typeof character.backstory === "string" && character.backstory.trim().length > 0;

//   const hasEpicMoments =
//     Array.isArray(character.epicMoments) && character.epicMoments.length > 0;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 9999,
//       }}
//       onMouseDown={handleClose}
//     >
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: "rgba(0,0,0,.7)",
//           opacity: stage === "open" ? 1 : 0,
//           transition: `opacity ${portalDuration}ms ease`,
//         }}
//       />

//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "radial-gradient(closest-side, rgba(160,110,255,.22), rgba(0,0,0,0) 65%), radial-gradient(circle at 50% 30%, rgba(255,190,90,.12), rgba(0,0,0,0) 60%)",
//           clipPath:
//             stage === "open"
//               ? `circle(160% at ${origin?.x || window.innerWidth / 2}px ${origin?.y || 200}px)`
//               : `circle(0% at ${origin?.x || window.innerWidth / 2}px ${origin?.y || 200}px)`,
//           transition: `clip-path ${portalDuration}ms ease`,
//           pointerEvents: "none",
//         }}
//       />

//       {character.fullImageSrc && tokenRect && (
//         <div style={animatedArtStyle}>
//           <img
//             src={character.fullImageSrc}
//             alt={character.name}
//             style={{
//               maxHeight: Math.min(360, window.innerHeight * 0.42),
//               width: "auto",
//               objectFit: "contain",
//               filter:
//                 "drop-shadow(0 18px 30px rgba(0,0,0,.75)) drop-shadow(0 0 24px rgba(120,80,255,.22))",
//               display: "block",
//             }}
//           />
//         </div>
//       )}

//       <div
//         onMouseDown={(e) => e.stopPropagation()}
//         style={{
//           position: "fixed",
//           left: "50%",
//           top: 28,
//           transform: "translateX(-50%)",
//           width: `min(${panelWidth}px, calc(100vw - 40px))`,
//           height: "calc(100vh - 56px)",
//           borderRadius: 26,
//           background:
//             "linear-gradient(180deg, rgba(5,5,10,.92) 0%, rgba(0,0,0,.82) 100%)",
//           boxShadow:
//             "0 24px 70px rgba(0,0,0,.85), inset 0 0 0 1px rgba(255,255,255,.08)",
//           opacity: stage === "open" ? 1 : 0,
//           transition: "opacity 220ms ease 120ms",
//           zIndex: 10000,
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             left: "50%",
//             top: 0,
//             transform: "translateX(-50%)",
//             width: "60%",
//             height: 320,
//             background:
//               "radial-gradient(circle at center, rgba(120,80,255,.18), rgba(0,0,0,0) 70%)",
//             pointerEvents: "none",
//             filter: "blur(8px)",
//           }}
//         />

//         <div
//           className="character-modal-scroll"
//           style={{
//             position: "relative",
//             height: "100%",
//             overflowY: "auto",
//             overflowX: "hidden",
//             padding: "36px 28px 28px",
//             color: "white",
//             boxSizing: "border-box",
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           <style>{`
//             .character-modal-scroll::-webkit-scrollbar {
//               display: none;
//             }
//           `}</style>

//           <CharacterModalHeader character={character} stage={stage} />

//           <CharacterLoreSection
//             character={character}
//             hasBackstory={hasBackstory}
//             hasEpicMoments={hasEpicMoments}
//           />

//           <CharacterModalActions
//             sheetUrl={character.sheetUrl}
//             onClose={handleClose}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import CharacterModalHeader from "./modal/CharacterModalHeader";
import CharacterModalActions from "./modal/CharacterModalActions";
import CharacterLoreSection from "./modal/CharacterLore";
import CharacterModalOverlay from "./modal/CharacterModalOverlay";
import CharacterModalPanel from "./modal/CharacterModalPanel";
import CharacterModalAnimatedArt from "./modal/CharacterModalAnimatedArt";
import useCharacterModalLifecycle from "./modal/hooks/useCharacterModalLifecycle";
import useAnimatedArtStyle from "./modal/hooks/useAnimatedArtStyle";

export default function CharacterModal({ character, origin, tokenRect, onClose }) {
  const { stage, handleClose } = useCharacterModalLifecycle({
    character,
    onClose,
  });

  const animatedArtStyle = useAnimatedArtStyle({
    character,
    tokenRect,
    stage,
  });

  if (!character) return null;

  const hasBackstory =
    typeof character.backstory === "string" && character.backstory.trim().length > 0;

  const hasEpicMoments =
    Array.isArray(character.epicMoments) && character.epicMoments.length > 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
      }}
      onMouseDown={handleClose}
    >
      <CharacterModalOverlay stage={stage} origin={origin} />

      <CharacterModalAnimatedArt
        character={character}
        tokenRect={tokenRect}
        animatedArtStyle={animatedArtStyle}
      />

      <CharacterModalPanel
        stage={stage}
        onClose={handleClose}
      >
        <CharacterModalHeader character={character} stage={stage} />

        <CharacterLoreSection
          character={character}
          hasBackstory={hasBackstory}
          hasEpicMoments={hasEpicMoments}
        />

        <CharacterModalActions
          sheetUrl={character.sheetUrl}
          onClose={handleClose}
        />
      </CharacterModalPanel>
    </div>
  );
}