import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="ttt-topbar">
      <Link to="/" className="backbtn">
        ← Back to Portfolio
      </Link>
    </div>
  );
}
