import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut } from "react-icons/fi";

// Replace these with your actual layout imports
// import Header from "../../layout/Header";
// import Footer from "../../layout/Footer";

import LocationInfoPanel from "./LocationInfoPanel";
import MapMarker from "./MapMarker";
import PartyOverlay from "./PartyOverlay";

const MIN_SCALE = 1;
const MAX_SCALE = 3.5;
const ZOOM_STEP = 0.2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function MapViewport({
  mapData,
  partyState,
  relatedContent,
  availableMaps = [],
}) {
  const navigate = useNavigate();
  const mapViewportRef = useRef(null);

  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const translateStartRef = useRef({ x: 0, y: 0 });

  const selectedMarker = useMemo(() => {
    return mapData.markers.find((marker) => marker.id === selectedMarkerId) ?? null;
  }, [mapData.markers, selectedMarkerId]);

  const selectedRelatedItems = useMemo(() => {
    if (!selectedMarker?.relatedContentIds?.length) return [];
    return selectedMarker.relatedContentIds
      .map((id) => relatedContent[id])
      .filter(Boolean);
  }, [selectedMarker, relatedContent]);

  function handleMarkerClick(marker) {
    setSelectedMarkerId(marker.id);
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
  }

  function handleMarkerDoubleClick(marker) {
    navigate(marker.route);
  }

  function handleMapChange(event) {
    const nextRoute = event.target.value;
    if (nextRoute) {
      navigate(nextRoute);
    }
  }

  function resetView() {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }

  function handleWheel(event) {
    event.preventDefault();
  
    const nextScale = clamp(
      scale + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP),
      MIN_SCALE,
      MAX_SCALE
    );
  
    if (nextScale === scale) return;
    setScale(nextScale);
  }

  function handleZoomIn() {
    setScale((prev) => clamp(prev + ZOOM_STEP, MIN_SCALE, MAX_SCALE));
  }
  
  function handleZoomOut() {
    setScale((prev) => clamp(prev - ZOOM_STEP, MIN_SCALE, MAX_SCALE));
  }

  function handleMouseDown(event) {
    if (scale <= 1) return;

    setDragging(true);
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    translateStartRef.current = { ...translate };
  }

  function handleMouseMove(event) {
    if (!dragging) return;

    const dx = event.clientX - dragStartRef.current.x;
    const dy = event.clientY - dragStartRef.current.y;

    setTranslate({
      x: translateStartRef.current.x + dx,
      y: translateStartRef.current.y + dy,
    });
  }

  function stopDragging() {
    setDragging(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        background: "linear-gradient(180deg, #3a2414 0%, #1c120c 100%)",
      }}
    >
      {/* Replace with your premade header */}
      {/* <Header /> */}
      {/* <div
        style={{
          borderBottom: "2px solid rgba(186, 139, 74, 0.45)",
          background: "rgba(32, 20, 12, 0.88)",
          color: "#f5e7ca",
          padding: "16px 24px",
          fontWeight: 700,
          fontSize: 24,
        }}
      >
        Header Placeholder
      </div> */}

      <main
        style={{
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: sidebarOpen ? "220px 1fr" : "74px 1fr",
          padding: "14px 16px 0",
          gap: "12px",
        }}
      >
        {/* LEFT INFO RAIL */}
        <aside
          style={{
            minHeight: 0,
            background: "rgba(231, 220, 198, 0.06)",
            border: "4px solid #111",
            borderRadius: 34,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px 12px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: sidebarOpen ? "space-between" : "center",
              gap: 8,
            }}
          >
            {sidebarOpen ? (
              <>
                <select
                  value={mapData.route || ""}
                  onChange={handleMapChange}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: 38,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "#2d1d12",
                    color: "#f6e7c7",
                    padding: "0 10px",
                    fontSize: 14,
                    outline: "none",
                  }}
                >
                  {(availableMaps.length ? availableMaps : [{ label: mapData.name, route: "" }]).map(
                    (map) => (
                      <option key={map.route || map.label} value={map.route}>
                        {map.label}
                      </option>
                    )
                  )}
                </select>

                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Collapse map info"
                  title="Collapse map info"
                  style={collapseButtonStyle}
                >
                  <FiChevronLeft size={22} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Expand map info"
                title="Expand map info"
                style={collapseButtonStyle}
              >
                <FiChevronRight size={22} />
              </button>
            )}
          </div>

          {sidebarOpen && (
            <div
              style={{
                padding: "8px 14px 14px",
                minHeight: 0,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div>
                <div style={sectionTitleStyle}>Map Info</div>
                <LocationInfoPanel
                  marker={selectedMarker}
                  relatedItems={selectedRelatedItems}
                />
              </div>

              <div>
                <div style={sectionTitleStyle}>Other Maps</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {(availableMaps.length ? availableMaps : []).map((map) => (
                    <button
                      key={map.route}
                      type="button"
                      onClick={() => navigate(map.route)}
                      style={mapLinkButtonStyle}
                    >
                      {map.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={sectionTitleStyle}>Map Controls</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button type="button" onClick={handleZoomIn} style={controlButtonStyle}>
                    <FiZoomIn size={16} />
                    <span>Zoom In</span>
                  </button>

                  <button type="button" onClick={handleZoomOut} style={controlButtonStyle}>
                    <FiZoomOut size={16} />
                    <span>Zoom Out</span>
                  </button>

                  <button type="button" onClick={resetView} style={controlButtonStyle}>
                    Reset
                  </button>
                </div>

                <div
                  style={{
                    marginTop: 8,
                    color: "#d9c7a3",
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  Scroll to zoom. Drag to pan when zoomed in.
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* MAP MAIN */}
        <section
          ref={mapViewportRef}
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          style={{
            minWidth: 0,
            minHeight: 0,
            position: "relative",
            overflow: "hidden",
            background: "rgba(240, 232, 217, 0.04)",
            borderRadius: 18,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
            }}
          >
            <div
              onMouseDown={handleMouseDown}
              style={{
                position: "relative",
                display: "inline-block",
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: dragging ? "none" : "transform 0.12s ease-out",
                cursor: dragging ? "grabbing" : scale > 1 ? "grab" : "default",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  border: "6px solid #b88c4c",
                  borderRadius: 18,
                  padding: 8,
                  background: "linear-gradient(180deg, #57371e 0%, #3f2817 100%)",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.34)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    lineHeight: 0,
                    overflow: "hidden",
                    borderRadius: 12,
                    background: "#130d09",
                  }}
                >
                  <img
                    src={mapData.imageSrc}
                    alt={mapData.alt}
                    draggable={false}
                    style={{
                      display: "block",
                      width: "auto",
                      height: "calc(100vh - 170px)",
                      maxHeight: "100%",
                      maxWidth: "none",
                      userSelect: "none",
                    }}
                  />

                  {mapData.markers.map((marker) => (
                    <MapMarker
                      key={marker.id}
                      marker={marker}
                      isSelected={selectedMarkerId === marker.id}
                      onClick={handleMarkerClick}
                      onDoubleClick={handleMarkerDoubleClick}
                    />
                  ))}

                  <PartyOverlay partyState={partyState} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Replace with your premade footer */}
      {/* <Footer /> */}
      {/* <div
        style={{
          borderTop: "2px solid rgba(186, 139, 74, 0.45)",
          background: "rgba(32, 20, 12, 0.88)",
          color: "#f5e7ca",
          padding: "12px 24px",
          fontSize: 16,
        }}
      >
        Footer Placeholder
      </div> */}
    </div>
  );
}

const collapseButtonStyle = {
  width: 42,
  height: 42,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "#2d1d12",
  color: "#f6e7c7",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
};

const sectionTitleStyle = {
  color: "#f6e7c7",
  fontWeight: 700,
  fontSize: 15,
  marginBottom: 10,
};

const controlButtonStyle = {
  height: 36,
  padding: "0 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "#2d1d12",
  color: "#f6e7c7",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const mapLinkButtonStyle = {
  width: "100%",
  textAlign: "left",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(45, 29, 18, 0.85)",
  color: "#f4e5c4",
  cursor: "pointer",
};