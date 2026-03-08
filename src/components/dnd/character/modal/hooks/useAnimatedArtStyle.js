import { useMemo } from "react";

export default function useAnimatedArtStyle({ character, tokenRect, stage }) {
  return useMemo(() => {
    if (!character || !tokenRect || typeof window === "undefined") return {};

    const artFinalLeft = window.innerWidth / 2;
    const artFinalTop = 64;

    const startCenterX = tokenRect.left + tokenRect.width / 2;
    const startCenterY = tokenRect.top + tokenRect.height / 2;

    const dx = artFinalLeft - startCenterX;
    const dy = artFinalTop - startCenterY;

    return {
      position: "fixed",
      left: startCenterX,
      top: startCenterY,
      transform:
        stage === "open"
          ? `translate(${dx}px, ${dy}px) translate(-50%, 0) scale(1)`
          : `translate(0px, 0px) translate(-50%, -50%) scale(0.28)`,
      transformOrigin: "center center",
      opacity: stage === "open" ? 0 : 0.95,
      transition: "transform 360ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease 180ms",
      zIndex: 10002,
      pointerEvents: "none",
    };
  }, [character, tokenRect, stage]);
}