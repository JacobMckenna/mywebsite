import React, { useState } from "react";
import { GiScrollQuill } from "react-icons/gi";
import { IoChevronDown } from "react-icons/io5";

const normalizeDescription = (description) => {
  if (Array.isArray(description)) return description;
  if (typeof description === "string" && description.trim()) return [description];
  return [];
};

const getSessionImage = (session) => {
  if (session.imageSrc) {
    if (session.imageSrc.startsWith("http") || session.imageSrc.startsWith("/")) {
      return session.imageSrc;
    }
    return `/dnd/sessions/${session.imageSrc}`;
  }

  return "/dnd/landing_background.png";
};

const getCampaignDisplayName = (campaignId, campaignMap) => {
  const fullName = campaignMap[campaignId]?.name || campaignId;
  if (fullName.includes(":")) return fullName.split(":")[0].trim();
  return fullName;
};

export default function SessionCard({ session, campaignMap }) {
  const [isOpen, setIsOpen] = useState(false);
  const description = normalizeDescription(session.description);
  const imageSrc = getSessionImage(session);
  const campaignName = getCampaignDisplayName(session.campaignId, campaignMap);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-amber-700/40 bg-stone-950/90 shadow-[0_18px_45px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-1 hover:border-amber-500/60">
      <div className="relative h-64 overflow-hidden border-b border-amber-800/50 bg-black">
        <img
          src={imageSrc}
          alt={`${session.title} artwork`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-amber-500/60 bg-stone-950/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-200">
            {campaignName}
          </span>

          <span className="rounded-full border border-red-500/40 bg-red-950/75 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-100">
            Session {session.sessionNumber}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h2 className="max-w-[92%] font-serif text-2xl leading-tight text-amber-50 drop-shadow md:text-3xl">
            {session.title}
          </h2>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between rounded-2xl border border-amber-700/40 bg-black/15 px-4 py-3 text-left transition hover:border-amber-500/60 hover:bg-black/25"
        >
          <div className="flex items-center gap-2 text-amber-300/85">
            <GiScrollQuill className="h-4 w-4 shrink-0" />
            <span className="text-[11px] uppercase tracking-[0.28em]">Description</span>
          </div>

          <IoChevronDown
            className={`h-4 w-4 shrink-0 text-amber-300 transition duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-4 space-y-3 text-sm leading-7 text-stone-200 md:text-[15px]">
            {description.length > 0 ? (
              description.map((line, index) => {
                const isLink = typeof line === "string" && /^https?:\/\//i.test(line);

                return isLink ? (
                  <a
                    key={index}
                    href={line}
                    target="_blank"
                    rel="noreferrer"
                    className="block break-all text-amber-300 underline decoration-amber-700 underline-offset-4 transition hover:text-amber-200"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={index} className="text-stone-200/95">
                    {line}
                  </p>
                );
              })
            ) : (
              <p className="text-stone-400">No tale has been recorded for this session yet.</p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}