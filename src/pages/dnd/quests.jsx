import React, { useEffect, useMemo, useState } from "react";
import {
  GiCrossedSwords,
  GiScrollQuill,
  GiTorch,
  GiTreasureMap,
} from "react-icons/gi";
import { IoChevronDown } from "react-icons/io5";
import questsData from "../../config/dnd/quests.json";

import Header from "../../components/dnd/layout/Header";
import Footer from "../../components/layout/Footer";

import Background from "../../components/dnd/layout/background";

/*
QUEST JSON STRUCTURE (quests.json)
[
  {
    "id": "emberhold",
    "title": "Wrath Beneath Emberhold",
    "campaign": "Echoes of Legends",
    "status": "main quest",
    "priority": "critical",
    "completed": false,
    "objective": "Enter Emberhold and recover the artifact before the dragon awakens.",
    "summary": "Longer story explanation of the quest.",
    "rewards": ["Ancient relic", "Dragon hoard access"],
    "notes": ["Scouts reported cultists nearby", "Tunnel entrance beneath the mine"]
  }
]
*/



function SectionTitle({ icon, children }) {
  return (
    <div className="mb-2 flex items-center gap-2 text-[#6b3e26]">
      <span className="text-sm">{icon}</span>
      <span className="text-[11px] font-bold uppercase tracking-[0.24em]">
        {children}
      </span>
    </div>
  );
}

function QuestEntry({ quest, isOpen, onToggle }) {
  const rewardList = Array.isArray(quest.rewards) ? quest.rewards : [];
  const noteList = Array.isArray(quest.notes) ? quest.notes : [];

  return (
    <article className="rounded-[24px] border border-[rgba(103,61,34,0.16)] bg-transparent p-4 shadow-[0_8px_24px_rgba(91,52,32,0.08)] backdrop-blur-[1px] md:p-5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="min-w-0 flex-1">

          <h2 className="font-serif text-2xl leading-tight text-[#4c2416] md:text-[2rem]">
            {quest.title}
          </h2>

          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#8a5837]">
            {quest.campaign || "Unassigned Campaign"}
          </p>

          <p className="mt-4 text-[15px] leading-7 text-[#5a3521] md:text-base">
            {quest.objective}
          </p>
        </div>

        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(103,61,34,0.16)] bg-[rgba(255,251,245,0.9)] text-[#6b3e26] shadow-sm">
          <IoChevronDown
            className={`h-5 w-5 transition duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="mt-5 grid gap-5 border-t border-[rgba(103,61,34,0.14)] pt-5 md:grid-cols-3">
          <div>
            <SectionTitle icon={<GiScrollQuill />}>Quest Record</SectionTitle>
            <p className="text-[15px] leading-7 text-[#5a3521] md:text-base">
              {quest.summary ||
                "No additional summary has been written for this quest yet."}
            </p>
          </div>

          <div>
            <SectionTitle icon={<GiTreasureMap />}>Rewards</SectionTitle>
            {rewardList.length > 0 ? (
              <ul className="space-y-2 text-[15px] leading-7 text-[#5a3521] md:text-base">
                {rewardList.map((reward, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8b512d]" />
                    <span>{reward}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] text-[#6b3e26]">
                No known rewards recorded.
              </p>
            )}
          </div>

          <div>
            <SectionTitle icon={<GiTorch />}>Notes</SectionTitle>
            {noteList.length > 0 ? (
              <ul className="space-y-2 text-[15px] leading-7 text-[#5a3521] md:text-base">
                {noteList.map((note, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8b512d]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] text-[#6b3e26]">
                No notes have been recorded.
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function QuestLogPage({ HeaderComponent, FooterComponent }) {
  const quests = useMemo(
    () => questsData.filter((quest) => !quest.completed),
    []
  );

  const questsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(quests.length / questsPerPage));

  const [currentPage, setCurrentPage] = useState(1);

  const visibleQuests = useMemo(() => {
    const pageStart = (currentPage - 1) * questsPerPage;
    return quests.slice(pageStart, pageStart + questsPerPage);
  }, [quests, currentPage]);

  const [openQuestId, setOpenQuestId] = useState(visibleQuests[0]?.id || null);

  useEffect(() => {
    setOpenQuestId(visibleQuests[0]?.id || null);
  }, [visibleQuests]);

  const questStats = useMemo(() => {
    const total = quests.length;
    return { total };
  }, [quests]);

  return (
    <div>
              <Background>
            <Header
                  activePage="quests"
                />
    <div
      className="min-h-screen text-stone-100"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,7,5,0.76), rgba(10,7,5,0.9)), url('/dnd/landing_background.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "700px",
        backgroundPosition: "top left",
      }}
    >
      {HeaderComponent ? <HeaderComponent /> : null}

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <section className="relative overflow-hidden rounded-[34px] border border-amber-700/40 bg-[linear-gradient(135deg,rgba(18,13,10,0.96),rgba(25,15,10,0.92),rgba(55,16,10,0.68))] px-5 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.42)] md:px-8 md:py-10 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.10),transparent_36%)]" />

          <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-start">
            <div className="max-w-4xl">
              <div className="mb-4 flex items-center gap-3 text-amber-300">
                <GiScrollQuill className="h-5 w-5 shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-amber-300/95">
                  Chronicle of Quests
                </span>
              </div>

              <h1 className="max-w-4xl font-serif text-4xl leading-[0.95] text-amber-50 sm:text-5xl md:text-6xl xl:text-[5rem]">
                The Party Quest Log
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300 md:text-lg">
                A living record of sworn missions, unfinished bargains, looming
                threats, and legendary objectives. Open each parchment entry to
                reveal its secrets.
              </p>
            </div>

            <div className="rounded-[30px] border border-amber-700/35 bg-stone-950/55 p-4 backdrop-blur-[2px] md:p-5">
                <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
                    <div className="rounded-2xl border border-amber-700/35 bg-black/25 px-4 py-5 text-center">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300">
                        Total
                    </p>
                    <p className="mt-2 font-serif text-3xl text-amber-50">
                        {questStats.total}
                    </p>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-amber-700/30 bg-black/15 px-4 py-4 text-sm leading-7 text-stone-300">
                    Completed quests remain stored in your JSON archive, but only unfinished quests appear here.
                </div>
                </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="relative mx-auto max-w-[1240px]">
            <img
              src="/dnd/ui/quest_scroll.png"
              alt="Quest log scroll"
              className="pointer-events-none mx-auto block w-full max-w-[1240px] select-none"
            />

            <div className="absolute inset-x-0 top-[12%] mx-auto w-[48%]">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(103,61,34,0.16)] bg-[rgba(255,248,236,0.88)] px-4 py-2 text-[#6b3e26] shadow-sm">
                  <GiCrossedSwords className="h-4 w-4" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em]">
                    Current Objectives
                  </span>
                </div>
              </div>

              <div className="px-2 pb-8">
                {quests.length === 0 ? (
                  <div className="rounded-[26px] border border-[rgba(103,61,34,0.16)] bg-transparent p-8 text-center text-[#5a3521] shadow-[0_8px_24px_rgba(91,52,32,0.08)]">
                    <h2 className="font-serif text-3xl text-[#4c2416]">
                      No Active Quests
                    </h2>
                    <p className="mt-3 text-base leading-7">
                      The party has no unfinished quests recorded at this time.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {visibleQuests.map((quest) => (
                        <QuestEntry
                          key={quest.id}
                          quest={quest}
                          isOpen={openQuestId === quest.id}
                          onToggle={() =>
                            setOpenQuestId((prev) =>
                              prev === quest.id ? null : quest.id
                            )
                          }
                        />
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-[rgba(103,61,34,0.14)] pt-4 text-[#6b3e26]">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="rounded-full border border-[rgba(103,61,34,0.2)] bg-[rgba(255,248,236,0.72)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-[rgba(255,248,236,0.92)] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Previous Page
                      </button>

                      <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-full border border-[rgba(103,61,34,0.2)] bg-[rgba(255,248,236,0.72)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-[rgba(255,248,236,0.92)] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next Page
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />

    </Background>
  </div>
  );
}