// src/routes/worldRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import WorldMapPage from "../pages/WorldMapPage";

function PlaceholderMapPage({ title }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0f172a",
        color: "#fff",
        fontSize: 32,
      }}
    >
      {title}
    </div>
  );
}

export default function WorldRoutes() {
  return (
    <Routes>
      <Route path="/maps/world" element={<WorldMapPage />} />
      <Route
        path="/maps/regions/mudra"
        element={<PlaceholderMapPage title="Mudra Region Map" />}
      />
      <Route
        path="/maps/regions/dwarven-district"
        element={<PlaceholderMapPage title="Dwarven District Map" />}
      />
      <Route
        path="/maps/regions/elder-tree"
        element={<PlaceholderMapPage title="Elder Tree Region Map" />}
      />
    </Routes>
  );
}