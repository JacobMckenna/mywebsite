import React, { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GiBroadsword, GiCrownedHeart, GiRoundShield } from "react-icons/gi";
import { IoChevronDown } from "react-icons/io5";

import sessions from "../../config/dnd/sessions.json";
import campaigns from "../../config/dnd/campaigns.json";
import SessionGrid from "../../components/dnd/sessions/SessionGrid";

import Header from "../../components/dnd/layout/Header";
import Footer from "../../components/layout/Footer";

import Background from "../../components/dnd/layout/background";

const sortSessions = (sessionsList, sortBy) => {
  const list = [...sessionsList];

  switch (sortBy) {
    case "session-desc":
      return list.sort((a, b) => b.sessionNumber - a.sessionNumber);

    case "campaign-asc":
      return list.sort((a, b) => {
        const campaignCompare = a.campaignId.localeCompare(b.campaignId);
        return campaignCompare !== 0
          ? campaignCompare
          : a.sessionNumber - b.sessionNumber;
      });

    case "campaign-desc":
      return list.sort((a, b) => {
        const campaignCompare = b.campaignId.localeCompare(a.campaignId);
        return campaignCompare !== 0
          ? campaignCompare
          : a.sessionNumber - b.sessionNumber;
      });

    case "session-asc":
    default:
      return list.sort((a, b) => a.sessionNumber - b.sessionNumber);
  }
};

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-amber-700/40 bg-black/25 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,210,120,0.06)]">
      <div className="mb-2 flex items-center gap-2 text-amber-300/90">
        <span className="text-lg">{icon}</span>
        <span className="text-[11px] uppercase tracking-[0.24em] text-amber-200/90">
          {label}
        </span>
      </div>
      <p className="font-serif text-3xl leading-none text-amber-50">{value}</p>
    </div>
  );
}

export default function SessionsPage() {
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [sortBy, setSortBy] = useState("campaign-asc");
  const [search, setSearch] = useState("");

  const campaignMap = useMemo(() => {
    const map = {};
    campaigns.forEach((campaign) => {
      map[campaign.id] = campaign;
    });
    return map;
  }, []);

  const campaignIds = useMemo(() => {
    return [...new Set(sessions.map((session) => session.campaignId))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, []);

  const filteredSessions = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = sessions.filter((session) => {
      const matchesCampaign =
        campaignFilter === "all" || session.campaignId === campaignFilter;

      const descriptionText = Array.isArray(session.description)
        ? session.description.join(" ").toLowerCase()
        : String(session.description || "").toLowerCase();

      const campaignName = (campaignMap[session.campaignId]?.name || "").toLowerCase();

      const matchesSearch =
        !term ||
        session.title.toLowerCase().includes(term) ||
        session.campaignId.toLowerCase().includes(term) ||
        campaignName.includes(term) ||
        String(session.sessionNumber).includes(term) ||
        descriptionText.includes(term);

      return matchesCampaign && matchesSearch;
    });

    return sortSessions(filtered, sortBy);
  }, [campaignFilter, sortBy, search, campaignMap]);

  return (
    <div>
          <Background>
        <Header
              activePage="sessions"
            />
    <div
      className="min-h-screen text-stone-100"
      style={{
        backgroundImage:
          "linear-gradient(rgba(8,6,5,0.78), rgba(8,6,5,0.92)), url('/dnd/landing_background.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "700px",
        backgroundPosition: "top left",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <section className="relative overflow-hidden rounded-[34px] border border-amber-700/45 bg-[linear-gradient(135deg,rgba(18,13,10,0.96),rgba(25,15,10,0.9),rgba(55,16,10,0.7))] px-5 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.42)] md:px-8 md:py-10 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_36%)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, transparent, rgba(245,158,11,0.08), transparent)",
            }}
          />

          <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_380px] xl:items-start">
            <div className="max-w-4xl">
              <div className="mb-4 flex items-center gap-3 text-amber-300">
                <GiCrownedHeart className="h-5 w-5 shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-amber-300/95">
                  Campaign Session Archives
                </span>
              </div>

              <h1 className="max-w-4xl font-serif text-4xl leading-[0.95] text-amber-50 sm:text-5xl md:text-6xl xl:text-[5.25rem]">
                The Archives of Every Session Ever
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300 md:text-lg">
                Browse every session from king assassination attempts to dragon slaying adventures and even star wars quests. Filter the archives, sort each tale, and revisit every chapter of the
                partys legend.
              </p>
            </div>

            <div className="rounded-[30px] border border-amber-700/40 bg-stone-950/55 p-4 backdrop-blur-[2px] md:p-5">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                <StatCard
                  icon={<GiBroadsword className="h-4 w-4" />}
                  label="Sessions"
                  value={sessions.length}
                />
                <StatCard
                  icon={<GiRoundShield className="h-4 w-4" />}
                  label="Campaigns"
                  value={campaignIds.length}
                />
              </div>

              <div className="mt-4 rounded-3xl border border-amber-700/35 bg-black/20 px-4 py-4 text-sm leading-7 text-stone-300">
                Search by title, description, campaign id, campaign name, or session number.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[30px] border border-amber-700/40 bg-stone-950/82 px-4 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:px-5 md:py-6">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-amber-300">
                Search the archive
              </span>
              <div className="relative">
                <CiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-400/85" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Dragon, Valeria, Echoes..."
                  className="w-full rounded-2xl border border-amber-700/50 bg-stone-900/90 py-3 pl-12 pr-4 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-amber-300">
                Filter by campaign
              </span>
              <div className="relative">
                <select
                  value={campaignFilter}
                  onChange={(e) => setCampaignFilter(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-amber-700/50 bg-stone-900/90 px-4 py-3 pr-11 text-sm text-stone-100 outline-none transition focus:border-amber-400"
                >
                  <option value="all">All Campaigns</option>
                  {campaignIds.map((campaignId) => (
                    <option key={campaignId} value={campaignId}>
                      {campaignMap[campaignId]?.name || campaignId}
                    </option>
                  ))}
                </select>
                <IoChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-amber-300">
                Sort sessions
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-amber-700/50 bg-stone-900/90 px-4 py-3 pr-11 text-sm text-stone-100 outline-none transition focus:border-amber-400"
                >
                  <option value="campaign-asc">Campaign ID (A → Z)</option>
                  <option value="campaign-desc">Campaign ID (Z → A)</option>
                  <option value="session-asc">Session Number (Low → High)</option>
                  <option value="session-desc">Session Number (High → Low)</option>
                </select>
                <IoChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
              </div>
            </label>
          </div>
        </section>

        <section className="mt-8">
          <SessionGrid sessions={filteredSessions} campaignMap={campaignMap} />
        </section>
      </div>
    </div>
    <Footer />

      </Background>
    </div>
  );
}