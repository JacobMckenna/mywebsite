import React from "react";
import StatValue from "./StatValue";

export default function StatsPanel({ stats, loading }) {
  return (
    <div className="stats">
      <div className="stat bot-wins">
        <div className="label">Bot Wins</div>
        <div className="value">
          <StatValue loading={loading} value={stats?.wins} />
        </div>
      </div>

      <div className="stat bot-losses">
        <div className="label">Bot Losses</div>
        <div className="value">
          <StatValue loading={loading} value={stats?.losses} />
        </div>
      </div>

      <div className="stat ties">
        <div className="label">Ties</div>
        <div className="value">
          <StatValue loading={loading} value={stats?.ties} />
        </div>
      </div>
    </div>
  );
}
