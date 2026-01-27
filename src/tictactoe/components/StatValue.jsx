import React from "react";

export default function StatValue({ loading, value }) {
  if (loading) return <span className="stat-spinner" aria-label="Loading" />;
  return value ?? 0;
}
