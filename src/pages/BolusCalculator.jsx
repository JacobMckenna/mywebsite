// src/pages/BolusCalculator.jsx
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DotBackground from "../components/layout/DotBackground";

const EASTERN_TIME_ZONE = "America/Toronto";

const CARB_RATIOS = [
  {
    label: "6am - 11am",
    startHour: 6,
    endHour: 11,
    carbsPerUnit: 8.1,
  },
  {
    label: "11am - 4pm",
    startHour: 11,
    endHour: 16,
    carbsPerUnit: 9.5,
  },
  {
    label: "4pm - 9pm",
    startHour: 16,
    endHour: 21,
    carbsPerUnit: 11.5,
  },
  {
    label: "9pm - 6am",
    startHour: 21,
    endHour: 6,
    carbsPerUnit: 13.5,
  },
];

const DEFAULT_BOLUS_CONTEXT = {
  currentGlucose: 9.5,
  insulinSensitivityFactor: 1.61,
  targetGlucose: 6.7,
};

// Replace the body of this function later when your glucose/ISF API is ready.
// Example:
// const response = await fetch("/api/bolus-context");
// return response.json();
async function getBolusContext() {
  return DEFAULT_BOLUS_CONTEXT;
}

function getEasternHour(date = new Date()) {
  const hourPart = new Intl.DateTimeFormat("en-CA", {
    timeZone: EASTERN_TIME_ZONE,
    hour: "numeric",
    hour12: false,
  })
    .formatToParts(date)
    .find((part) => part.type === "hour");

  const hour = Number(hourPart?.value ?? 0);
  return hour === 24 ? 0 : hour;
}

function getEasternTimeLabel(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EASTERN_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(date);
}

function getActiveCarbRatio(date = new Date()) {
  const easternHour = getEasternHour(date);

  return CARB_RATIOS.find((ratio) => {
    const doesNotCrossMidnight = ratio.startHour < ratio.endHour;

    if (doesNotCrossMidnight) {
      return easternHour >= ratio.startHour && easternHour < ratio.endHour;
    }

    return easternHour >= ratio.startHour || easternHour < ratio.endHour;
  });
}

function formatUnits(value) {
  if (!Number.isFinite(value)) return "0.00";
  return value.toFixed(2);
}

function formatGlucose(value) {
  if (!Number.isFinite(value)) return "0.0";
  return value.toFixed(1);
}

export default function BolusCalculator() {
  const [carbs, setCarbs] = useState("");
  const [bolusContext, setBolusContext] = useState(DEFAULT_BOLUS_CONTEXT);
  const [now, setNow] = useState(new Date());
  const [isLoadingContext, setIsLoadingContext] = useState(true);
  const [showMealDetails, setShowMealDetails] = useState(false);
  const [showFormulaReference, setShowFormulaReference] = useState(false);
  const [hasConfirmedSafety, setHasConfirmedSafety] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadBolusContext() {
      try {
        const context = await getBolusContext();

        if (isMounted) {
          setBolusContext(context);
        }
      } catch (error) {
        console.error("Unable to load bolus context", error);
      } finally {
        if (isMounted) {
          setIsLoadingContext(false);
        }
      }
    }

    loadBolusContext();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const calculation = useMemo(() => {
    const activeRatio = getActiveCarbRatio(now);
    const carbAmount = Number.parseFloat(carbs);
    const safeCarbAmount = Number.isFinite(carbAmount) && carbAmount > 0 ? carbAmount : 0;

    const mealUnits = safeCarbAmount / activeRatio.carbsPerUnit;
    const correctionUnits =
      (bolusContext.currentGlucose - bolusContext.targetGlucose) /
      bolusContext.insulinSensitivityFactor;
    const totalUnits = mealUnits + correctionUnits;

    return {
      activeRatio,
      safeCarbAmount,
      mealUnits,
      correctionUnits,
      totalUnits,
    };
  }, [bolusContext, carbs, now]);

  return (
    <DotBackground>
      <Header />

      <main className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <section className="flex flex-col gap-8 sm:gap-10">
          {/* ---------- INTRO ---------- */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-900/25 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Personal Diabetes Tool
            </p>

            <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                Bolus Calculator
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed pl-4 border-l border-slate-700/50">
              Enter the number of carbs for a meal to calculate the meal insulin,
              correction insulin, and estimated total units using the active carb
              ratio for the current Eastern Time window.
            </p>

            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">
                  Dexcom safety note
                </p>

                <h2 className="text-lg font-bold text-amber-50">
                  Do not treat Dexcom API data as a blind insulin-dosing source.
                </h2>

                <p className="text-sm text-amber-100 leading-relaxed">
                  This bolus calculator uses glucose to calculate insulin, which is a
                  treatment decision. Before using any result, manually confirm that
                  the glucose reading matches how you feel and your personal diabetes
                  care plan. If Dexcom readings do not match your symptoms or
                  expectations, use a blood glucose meter to make treatment decisions.
                </p>

                <p className="text-sm text-amber-100 leading-relaxed">
                  Incorrect use, missed warnings, stale readings, or relying on a CGM
                  value that does not match your symptoms can lead to missed low/high
                  glucose or a treatment decision that may result in injury. This page
                  is a calculation aid only and does not replace medical advice.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
            {/* ---------- INPUT CARD ---------- */}
            <div className="rounded-3xl border border-slate-700/40 bg-slate-900/25 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
              <div className="flex flex-col gap-2 mb-6">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Calculator Input
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Meal carbs
                </h2>
              </div>

              <label htmlFor="carbs" className="block text-sm font-semibold text-slate-200 mb-2">
                Total carbs
              </label>

              <div className="relative">
                <input
                  id="carbs"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="decimal"
                  value={carbs}
                  onChange={(event) => setCarbs(event.target.value)}
                  placeholder="Example: 65"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-5 py-4 pr-20 text-3xl font-bold text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  carbs
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowMealDetails((currentValue) => !currentValue)}
                aria-expanded={showMealDetails}
                className="mt-6 inline-flex w-full items-center justify-between rounded-2xl border border-slate-700/40 bg-slate-950/30 px-5 py-4 text-left transition-all hover:border-blue-400/60 hover:bg-slate-900/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                <span>
                  <span className="block text-sm font-semibold text-white">
                    Calculator details
                  </span>
                  <span className="mt-1 block text-xs text-slate-400">
                    Current time window, active carb ratio, glucose, target, and sensitivity factor
                  </span>
                </span>
                <span className="text-sm font-semibold text-blue-200">
                  {showMealDetails ? "Hide" : "Show"}
                </span>
              </button>

              {showMealDetails && (
                <div className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-700/40 bg-slate-950/30 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Eastern time
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {getEasternTimeLabel(now)}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-700/40 bg-slate-950/30 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Active ratio
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {calculation.activeRatio.carbsPerUnit} carbs / unit
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {calculation.activeRatio.label}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-700/40 bg-slate-950/30 p-5">
                    <h3 className="font-semibold text-white">Current settings</h3>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-400">Current glucose</span>
                        <span className="font-semibold text-slate-100">
                          {formatGlucose(bolusContext.currentGlucose)} mmol/L
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-400">Target glucose</span>
                        <span className="font-semibold text-slate-100">
                          {formatGlucose(bolusContext.targetGlucose)} mmol/L
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-400">Insulin sensitivity factor</span>
                        <span className="font-semibold text-slate-100">
                          {bolusContext.insulinSensitivityFactor} mmol/L per unit
                        </span>
                      </div>
                    </div>

                    {isLoadingContext && (
                      <p className="mt-4 text-xs text-slate-500">
                        Loading calculator context...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ---------- BREAKDOWN CARD ---------- */}
            <div className="rounded-3xl border border-slate-700/40 bg-slate-900/25 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
              <div className="flex flex-col gap-2 mb-6">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Dose Breakdown
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Estimated units
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-700/40 bg-slate-950/30 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">Meal insulin</h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {calculation.safeCarbAmount} carbs ÷ {calculation.activeRatio.carbsPerUnit}
                      </p>
                    </div>

                    <p className="text-2xl font-bold text-white">
                      {formatUnits(calculation.mealUnits)}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700/40 bg-slate-950/30 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">Correction insulin</h3>
                      <p className="mt-1 text-xs text-slate-400">
                        ({formatGlucose(bolusContext.currentGlucose)} - {formatGlucose(bolusContext.targetGlucose)}) ÷ {bolusContext.insulinSensitivityFactor}
                      </p>
                    </div>

                    <p className="text-2xl font-bold text-white">
                      {formatUnits(calculation.correctionUnits)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-700/70 pt-5 mt-5">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                    <span>Meal subtotal</span>
                    <span>{formatUnits(calculation.mealUnits)} units</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-3 text-sm text-slate-400">
                    <span>Correction</span>
                    <span>{formatUnits(calculation.correctionUnits)} units</span>
                  </div>

                  <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 transition-all hover:border-amber-300/40">
                    <input
                      type="checkbox"
                      checked={hasConfirmedSafety}
                      onChange={(event) => setHasConfirmedSafety(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-950 text-blue-500 focus:ring-blue-500/30"
                    />

                    <span className="text-sm text-amber-100 leading-relaxed">
                      I confirm this glucose reading is current, matches my symptoms,
                      and that I will follow my personal care plan before taking insulin.
                    </span>
                  </label>

                  <div
                    className={`mt-5 rounded-2xl p-5 shadow-lg transition-all ${
                      hasConfirmedSafety
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/25"
                        : "border border-slate-700/50 bg-slate-950/40 shadow-slate-950/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                          hasConfirmedSafety ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        Total
                      </span>
                      <span
                        className={`text-4xl font-bold ${
                          hasConfirmedSafety ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {hasConfirmedSafety ? formatUnits(calculation.totalUnits) : "Confirm"}
                      </span>
                    </div>

                    <p
                      className={`mt-2 text-sm ${
                        hasConfirmedSafety ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {hasConfirmedSafety
                        ? "units before any personal rounding rules"
                        : "Review the safety confirmation above to show the estimated total."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- FORMULA REFERENCE ---------- */}
          <div className="rounded-3xl border border-slate-700/40 bg-slate-900/25 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setShowFormulaReference((currentValue) => !currentValue)}
              aria-expanded={showFormulaReference}
              className="flex w-full items-center justify-between gap-4 text-left focus:outline-none"
            >
              <span>
                <span className="block text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Formulas used
                </span>
                <span className="mt-2 block text-sm text-slate-400">
                  View the meal and correction equations behind the estimate.
                </span>
              </span>
              <span className="shrink-0 rounded-full border border-slate-700/60 bg-slate-950/40 px-4 py-2 text-sm font-semibold text-blue-200 transition-all hover:border-blue-400/60 hover:bg-slate-900/60 focus:ring-4 focus:ring-blue-500/10">
                {showFormulaReference ? "Hide" : "Show"}
              </span>
            </button>

            {showFormulaReference && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-slate-700/40 bg-slate-950/30 p-5">
                  <h3 className="font-semibold text-white">Meal insulin</h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Total carbs ÷ active carb ratio
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700/40 bg-slate-950/30 p-5">
                  <h3 className="font-semibold text-white">Correction insulin</h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    (current glucose - target glucose) ÷ insulin sensitivity factor
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </DotBackground>
  );
}
