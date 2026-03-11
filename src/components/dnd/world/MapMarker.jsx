import React from "react";
import { GiPositionMarker } from "react-icons/gi";

export default function MapMarker({
  marker,
  isSelected,
  onClick,
  onDoubleClick,
}) {
  return (
    <button
      type="button"
      aria-label={marker.name}
      title={marker.name}
      onClick={() => onClick(marker)}
      onDoubleClick={() => onDoubleClick?.(marker)}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translate(-50%, -100%) scale(1.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translate(-50%, -100%) scale(1)")
      }
      style={{
        position: "absolute",
        left: `${marker.xPercent}%`,
        top: `${marker.yPercent}%`,
        transform: "translate(-50%, -100%)",
        zIndex: isSelected ? 30 : 20,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <GiPositionMarker
        size={26}
        color={isSelected ? "#ffd369" : "#ffb84d"}
        style={{
          filter: `
            drop-shadow(0 0 2px #000)
            drop-shadow(0 2px 3px rgba(0,0,0,0.9))
          `,
          stroke: "#ffffff",
          strokeWidth: 20,
          transition: "transform 0.15s ease",
        }}
      />
    </button>
  );
}