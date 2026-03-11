// src/pages/WorldMapPage.jsx

import React from "react";
import MapViewport from "../../components/dnd/world/MapViewport";
import { worldMapData } from "../../lib/dnd/world/worldMapData";
import { partyState } from "../../lib/dnd/world/partyState";
import { relatedContent } from "../../lib/dnd/world/relatedContent";

import Header from "../../components/dnd/layout/Header";
import Footer from "../../components/layout/Footer";

import Background from "../../components/dnd/layout/background";

export default function WorldMapPage() {
  return (
    <div>
          <Background>
        <Header
              activePage="map"
            />
    <MapViewport
      mapData={worldMapData}
      partyState={partyState}
      relatedContent={relatedContent}
    />
    <Footer />

      </Background>
    </div>
  );
}