import React from "react";
import HeaderContent from "./HeaderContent";
import StatsPanel from "./StatsPanel";

export default function GameHeader({ stats, statsLoading }) {
  return (
    <div className="ttt-header">
      <HeaderContent />
      <StatsPanel stats={stats} loading={statsLoading} />
    </div>
  );
}
