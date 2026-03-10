import React from "react";
import SessionCard from "./SessionCard";

export default function SessionGrid({ sessions, campaignMap }) {
  if (!sessions.length) {
    return (
      <div className="rounded-[30px] border border-amber-700/45 bg-stone-950/85 px-6 py-12 text-center shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <p className="font-serif text-3xl text-amber-100">No chronicles found</p>
        <p className="mt-3 text-stone-300">
          Change the search or filters to reveal more tales from the archive.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {sessions.map((session, index) => (
        <SessionCard
          key={`${session.campaignId}-${session.sessionNumber}-${session.title}-${index}`}
          session={session}
          campaignMap={campaignMap}
        />
      ))}
    </div>
  );
}