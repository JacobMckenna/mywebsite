import React, { useMemo, useState } from "react";

export default function FocusTabs({ tabs: tabsProp }) {
  // Allow passing tabs in, but also support a default.
  const tabs = useMemo(
    () =>
      tabsProp ?? [
        { key: "build", label: "What I Build", items: [] },
        { key: "work", label: "How I Work", items: [] },
        { key: "explore", label: "What I'm Exploring", items: [] },
      ],
    [tabsProp]
  );

  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "build");
  const activeIndex = Math.max(0, tabs.findIndex((t) => t.key === activeTab));
  const active = tabs[activeIndex];

  return (
    <div className="w-full bg-slate-800/35 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 w-full min-w-0">
        {/* Left rail: tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="relative rounded-2xl bg-slate-900/25 border border-slate-700/40 p-2 overflow-hidden">
            {/* moving pill */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-2 left-2 right-2 h-[44px] rounded-xl
                         bg-gradient-to-r from-blue-500/25 to-cyan-400/10 border border-blue-500/30
                         shadow-lg shadow-blue-500/10 transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `translate3d(0, ${activeIndex * 52}px, 0)` }}
            />

            <div className="relative z-10 flex flex-col gap-2">
              {tabs.map((t) => {
                const isActive = t.key === activeTab;

                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    aria-pressed={isActive}
                    className={[
                      "group w-full h-[44px] px-4 rounded-xl",
                      "flex items-center justify-between",
                      "text-sm font-semibold",
                      "transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                      "active:scale-[0.99]",
                      isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-slate-800/35",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={[
                          "inline-block h-2 w-2 rounded-full transition-all duration-200",
                          isActive
                            ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.65)]"
                            : "bg-slate-600 group-hover:bg-slate-400",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                      {t.label}
                    </span>

                    <span
                      className={[
                        "text-slate-500 transition-all duration-200",
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="flex-1 min-w-0 relative overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-900/20 p-4 sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-24 opacity-60 blur-3xl animate-pulse
                       bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.22),transparent_55%),
                           radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.14),transparent_55%)]"
          />

          <div key={activeTab} className="relative z-10 animate-[fadeInUp_260ms_ease-out]">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {active?.label}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-4">
              Click a tab to switch focus.
            </p>

            <ul className="space-y-3">
              {active?.items?.map((x, i) => (
                <li
                  key={x}
                  className="flex gap-3 text-slate-200 leading-relaxed opacity-0 animate-[fadeInUp_320ms_ease-out]"
                  style={{ animationDelay: `${i * 70}ms`, animationFillMode: "forwards" }}
                >
                  <span className="text-blue-400 mt-1.5">•</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Local keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
