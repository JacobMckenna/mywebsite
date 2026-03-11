import React, { useEffect, useMemo, useState } from "react";
import {
  GiCrossedSwords,
  GiScrollQuill,
  GiTorch,
  GiTreasureMap,
  GiQuillInk,
  GiAmethyst,
} from "react-icons/gi";
import { IoChevronDown } from "react-icons/io5";
import questsData from "../../config/dnd/quests.json";
import campaignsData from "../../config/dnd/campaigns.json";

import Header from "../../components/dnd/layout/Header";
import Footer from "../../components/layout/Footer";

import Background from "../../components/dnd/layout/background";

function SectionTitle({ icon, children }) {
  return (
    <div
      className="mb-3 flex items-center gap-2 text-[#5b2f19]"
      style={{ fontFamily: "MedievalSharp, serif" }}
    >
      <span className="text-sm">{icon}</span>
      <span className="text-[13px] uppercase tracking-[0.16em] underline decoration-[#8b512d] decoration-2 underline-offset-4">
        {children}
      </span>
    </div>
  );
}

function getCampaignName(campaignId, campaignMap) {
  return campaignMap[campaignId]?.name || campaignId || "Unassigned Campaign";
}

function QuestEntry({ quest, isOpen, onToggle, campaignMap }) {
  const rewardList = Array.isArray(quest.rewards) ? quest.rewards : [];
  const noteList = Array.isArray(quest.notes) ? quest.notes : [];
  const campaignName = getCampaignName(quest.campaignId, campaignMap);

  return (
    <article className="rounded-[26px] border border-[rgba(105,63,35,0.22)] bg-[linear-gradient(180deg,rgba(246,226,194,0.88),rgba(226,192,148,0.82))] p-5 shadow-[0_10px_30px_rgba(56,28,10,0.16),inset_0_1px_0_rgba(255,250,240,0.35)] md:p-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="min-w-0 flex-1">
          {/* <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className="rounded-full border border-[#9a6944] bg-[rgba(255,248,236,0.82)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6a3a22]"
              style={{ fontFamily: "MedievalSharp, serif" }}
            >
              Quest
            </span>
            <span
              className="rounded-full border border-[#9a6944] bg-[rgba(255,248,236,0.82)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6a3a22]"
              style={{ fontFamily: "MedievalSharp, serif" }}
            >
              Active Record
            </span>
          </div> */}

          <h2
            className="text-3xl leading-tight text-[#432012] md:text-[2.4rem]"
            style={{
              fontFamily: "MedievalSharp, serif",
              textShadow: "0 1px 0 rgba(255,245,230,0.25)",
            }}
          >
            {quest.title}
          </h2>

          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#865132] italic">
            {campaignName}
          </p>

          <p className="mt-5 text-[18px] leading-8 text-[#4d2716]">
            <span className="font-semibold underline decoration-[#8b512d] decoration-2 underline-offset-4">
              Objective:
            </span>{" "}
            <span className="font-semibold">{quest.objective}</span>
          </p>
        </div>

        <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#9a6944] bg-[rgba(255,248,236,0.95)] text-[#6b3e26] shadow-sm">
          <IoChevronDown
            className={`h-6 w-6 transition duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="mt-6 grid gap-6 border-t border-[rgba(113,69,39,0.22)] pt-5 md:grid-cols-3">
          <div>
            <SectionTitle icon={<GiScrollQuill />}>Quest Record</SectionTitle>
            <p className="text-[18px] leading-9 text-[#432314]">
              <span className="font-medium italic">{quest.summary || "No additional summary has been written for this quest yet."}</span>
            </p>
          </div>

          <div>
            <SectionTitle icon={<GiAmethyst  />}>Rewards</SectionTitle>
            {rewardList.length > 0 ? (
              <ul className="space-y-3 text-[18px] leading-8 text-[#432314]">
                {rewardList.map((reward, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#8b512d]" /> <span>{reward}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[18px] leading-8 text-[#432314] italic">
                No known rewards recorded.
              </p>
            )}
          </div>

          <div>
            <SectionTitle icon={<GiTorch />}>Notes</SectionTitle>
            {noteList.length > 0 ? (
              <ul className="space-y-3 text-[18px] leading-8 text-[#432314]">
                {noteList.map((note, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#8b512d]" /> <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[18px] leading-8 text-[#432314] italic">
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
  const campaignMap = useMemo(() => {
    const map = {};
    campaignsData.forEach((campaign) => {
      map[campaign.id] = campaign;
    });
    return map;
  }, []);

  const quests = useMemo(() => {
    return questsData.filter((quest) => !quest.hidden);
  }, []);

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
    return {
      total: quests.length,
      visible: quests.length,
      pageCount: totalPages,
    };
  }, [quests, totalPages]);

  return (
    <div>
          <Background>
            <Header
              activePage="quests"
            />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <section className="relative overflow-hidden rounded-[34px] border border-amber-700/40 bg-[linear-gradient(135deg,rgba(20,13,9,0.97),rgba(37,20,11,0.94),rgba(74,24,11,0.76))] px-5 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.42)] md:px-8 md:py-10 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_36%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,transparent,rgba(245,158,11,0.08),transparent)]" />

          <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-start">
            <div className="max-w-4xl">
              <div className="mb-4 flex items-center gap-3 text-amber-300">
                <GiQuillInk className="h-5 w-5 shrink-0" />
                <span
                  className="text-[11px] uppercase tracking-[0.35em] text-amber-300/95"
                  style={{ fontFamily: "MedievalSharp, serif" }}
                >
                  Only quests here, no toast
                </span>
              </div>

              <h1
                className="max-w-4xl text-4xl leading-[0.95] text-amber-50 sm:text-5xl md:text-6xl xl:text-[5rem]"
                style={{
                  fontFamily: "MedievalSharp, serif",
                  textShadow: "0 2px 18px rgba(0,0,0,0.28)",
                }}
              >
                Quest Log
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300 md:text-lg">
                A record of all the missions and quests that have been undertaken
                during our DnD sessions. Open each entry to reveal
                its information and track your objectives.
              </p>
            </div>

            <div className="rounded-[30px] border border-amber-700/35 bg-stone-950/55 p-4 backdrop-blur-[2px] md:p-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-amber-700/35 bg-black/25 px-4 py-5 text-center">
                  <p
                    className="text-[11px] uppercase tracking-[0.2em] text-amber-300"
                    style={{ fontFamily: "MedievalSharp, serif" }}
                  >
                    Quests
                  </p>
                  <p className="mt-2 text-3xl text-amber-50" style={{ fontFamily: "MedievalSharp, serif" }}>
                    {questStats.total}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-700/35 bg-black/25 px-4 py-5 text-center">
                  <p
                    className="text-[11px] uppercase tracking-[0.2em] text-amber-300"
                    style={{ fontFamily: "MedievalSharp, serif" }}
                  >
                    Visible
                  </p>
                  <p className="mt-2 text-3xl text-amber-50" style={{ fontFamily: "MedievalSharp, serif" }}>
                    {questStats.visible}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-700/35 bg-black/25 px-4 py-5 text-center">
                  <p
                    className="text-[11px] uppercase tracking-[0.2em] text-amber-300"
                    style={{ fontFamily: "MedievalSharp, serif" }}
                  >
                    Pages
                  </p>
                  <p className="mt-2 text-3xl text-amber-50" style={{ fontFamily: "MedievalSharp, serif" }}>
                    {questStats.pageCount}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-amber-700/30 bg-black/15 px-4 py-4 text-sm leading-7 text-stone-300">
                Only active quests will appear in this journal. Hidden quests remain stored and archived.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[30px] border border-[#8a5a36] bg-[linear-gradient(180deg,rgba(236,205,164,0.96),rgba(214,176,133,0.94))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_0_40px_rgba(120,70,30,0.12)] md:p-8">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#9b6a43] bg-[rgba(255,248,236,0.92)] px-5 py-2.5 text-[#5a2d17] shadow-sm">
                  <GiCrossedSwords className="h-4 w-4" />
                  <span
                    className="text-[12px] font-semibold uppercase tracking-[0.22em]"
                    style={{ fontFamily: "MedievalSharp, serif" }}
                  >
                    Current Objectives
                  </span>
                </div>
              </div>

              {quests.length === 0 ? (
                <div className="rounded-[22px] border border-[rgba(94,52,28,0.18)] p-8 text-center text-[#4f2a18]">
                  <h2
                    className="text-3xl text-[#4c2416]"
                    style={{ fontFamily: "MedievalSharp, serif" }}
                  >
                    No Active Quests
                  </h2>
                  <p className="mt-3 text-lg leading-8">
                    The party has no visible quests recorded at this time.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {visibleQuests.map((quest) => (
                      <QuestEntry
                        key={quest.id}
                        quest={quest}
                        campaignMap={campaignMap}
                        isOpen={openQuestId === quest.id}
                        onToggle={() =>
                          setOpenQuestId((prev) =>
                            prev === quest.id ? null : quest.id
                          )
                        }
                      />
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-[rgba(103,61,34,0.18)] pt-4 text-[#6b3e26]">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="rounded-full border border-[rgba(103,61,34,0.22)] bg-[rgba(255,248,236,0.88)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-[rgba(255,248,236,0.98)] disabled:cursor-not-allowed disabled:opacity-40"
                      style={{ fontFamily: "MedievalSharp, serif" }}
                    >
                      Previous Page
                    </button>

                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ fontFamily: "MedievalSharp, serif" }}
                    >
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
                      className="rounded-full border border-[rgba(103,61,34,0.22)] bg-[rgba(255,248,236,0.88)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-[rgba(255,248,236,0.98)] disabled:cursor-not-allowed disabled:opacity-40"
                      style={{ fontFamily: "MedievalSharp, serif" }}
                    >
                      Next Page
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      </Background>
    </div>
  );
}