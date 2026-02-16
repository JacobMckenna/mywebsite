import React, { useMemo, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DotBackground from "../components/layout/DotBackground";

function normalizeRate(x) {
  return x > 1 ? x / 100 : x;
}

const PAYMENT_SCHEDULES = {
  weekly: { label: "Weekly", paymentsPerYear: 52 },
  biweekly: { label: "Bi-weekly", paymentsPerYear: 26 },
  monthly: { label: "Monthly", paymentsPerYear: 12 },
};

function simulate(inputs) {
  if (inputs.homeValueStart <= 0) throw new Error("Home value must be > 0");
  if (inputs.mortgageStart < 0) throw new Error("Mortgage must be >= 0");
  if (inputs.mortgageStart === 0) return [];
  if (inputs.paymentAmount <= 0) throw new Error("Payment amount must be > 0");
  if (inputs.amortizationYears <= 0) throw new Error("Amortization years must be > 0");
  if (inputs.paymentsPerYear <= 0) throw new Error("Payments per year must be > 0");

  const r = normalizeRate(inputs.annualInterestRate);
  const a = normalizeRate(inputs.annualAppreciationRate);
  const periodRate = r / inputs.paymentsPerYear;

  let balance = inputs.mortgageStart;
  let homeValue = inputs.homeValueStart;
  let cumulative = 0;

  const rows = [];

  for (let year = 1; year <= inputs.amortizationYears; year++) {
    if (balance <= 0) break;

    let interestPaid = 0;
    let principalPaid = 0;
    let totalPaid = 0;

    for (let p = 0; p < inputs.paymentsPerYear; p++) {
      if (balance <= 0) break;

      const interest = balance * periodRate;

      let payment = inputs.paymentAmount;
      let principal = payment - interest;

      // Cap final payment
      if (principal > balance) {
        principal = balance;
        payment = interest + principal;
      }

      // Note: if payment < interest => negative amortization (principal negative)
      balance -= principal;

      interestPaid += interest;
      principalPaid += principal;
      totalPaid += payment;
    }

    const homeStart = homeValue;
    homeValue = homeValue * (1 + a);
    const appreciationGain = homeValue - homeStart;

    const equityGain = principalPaid + appreciationGain;
    const netForYear = equityGain - totalPaid;
    cumulative += netForYear;

    rows.push({
      year,
      home_value_end: homeValue,
      remaining_mortgage_end: Math.max(0, balance),
      total_payments: totalPaid,
      interest_paid: interestPaid,
      principal_paid: principalPaid,
      appreciation_gain: appreciationGain,
      equity_gain: equityGain,
      net_profit_loss_for_year: netForYear,
      cumulative_profit_loss: cumulative,
    });

    if (balance <= 0) break;
  }

  return rows;
}

function toCsv(rows) {
  const headers = [
    "year",
    "home_value_end",
    "remaining_mortgage_end",
    "total_payments",
    "interest_paid",
    "principal_paid",
    "appreciation_gain",
    "equity_gain",
    "net_profit_loss_for_year",
    "cumulative_profit_loss",
  ];

  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.year,
        r.home_value_end.toFixed(2),
        r.remaining_mortgage_end.toFixed(2),
        r.total_payments.toFixed(2),
        r.interest_paid.toFixed(2),
        r.principal_paid.toFixed(2),
        r.appreciation_gain.toFixed(2),
        r.equity_gain.toFixed(2),
        r.net_profit_loss_for_year.toFixed(2),
        r.cumulative_profit_loss.toFixed(2),
      ].join(",")
    ),
  ];

  return lines.join("\n");
}

function downloadCsv(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function money(n) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, { style: "currency", currency: "CAD" });
}

function signClass(n) {
  if (!Number.isFinite(n)) return "text-[color:var(--text)]";
  if (n > 0) return "text-emerald-300";
  if (n < 0) return "text-rose-300";
  return "text-[color:var(--text)]";
}

function inputClass() {
  return (
    "mt-1 w-full rounded-[var(--r-md)] border border-[color:var(--border)] bg-[color:var(--bg-2)] " +
    "px-3 py-2 text-[color:var(--text)] outline-none shadow-sm transition " +
    "placeholder:text-[color:var(--text-muted)] " +
    "focus:border-[color:var(--border-strong)] focus:ring-4 focus:ring-[color:var(--bg-2)]"
  );
}

function selectClass() {
  return (
    "mt-1 w-full rounded-[var(--r-md)] border border-[color:var(--border)] bg-[color:var(--bg-2)] " +
    "px-3 py-2 text-[color:var(--text)] outline-none shadow-sm transition " +
    "focus:border-[color:var(--border-strong)] focus:ring-4 focus:ring-[color:var(--bg-2)]"
  );
}

function cardClass() {
  return (
    "rounded-[var(--r-lg)] border border-[color:var(--border)] bg-[color:var(--bg-3)] " +
    "shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
  );
}

function pillClass() {
  return (
    "inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] " +
    "bg-[color:var(--bg-2)] px-3 py-1 text-xs text-[color:var(--text-muted)]"
  );
}

export default function MortgageSimPage() {
  const [homeValueStart, setHomeValueStart] = useState(600000);
  const [mortgageStart, setMortgageStart] = useState(540000);
  const [annualInterestRate, setAnnualInterestRate] = useState(3.94);
  const [annualAppreciationRate, setAnnualAppreciationRate] = useState(3);
  const [amortizationYears, setAmortizationYears] = useState(30);

  const [paymentFrequency, setPaymentFrequency] = useState("biweekly");
  const [paymentAmount, setPaymentAmount] = useState(1600);

  const [error, setError] = useState("");

  const schedule = PAYMENT_SCHEDULES[paymentFrequency] || PAYMENT_SCHEDULES.biweekly;

  const inputs = useMemo(
    () => ({
      homeValueStart,
      mortgageStart,
      annualInterestRate,
      annualAppreciationRate,
      amortizationYears,
      paymentAmount,
      paymentsPerYear: schedule.paymentsPerYear,
    }),
    [
      homeValueStart,
      mortgageStart,
      annualInterestRate,
      annualAppreciationRate,
      amortizationYears,
      paymentAmount,
      schedule.paymentsPerYear,
    ]
  );

  const rows = useMemo(() => {
    try {
      setError("");
      return simulate(inputs);
    } catch (e) {
      setError(e?.message || "Unknown error");
      return [];
    }
  }, [inputs]);

  const last = rows.length ? rows[rows.length - 1] : null;

  const annualPaymentTotal = useMemo(() => {
    const n = (PAYMENT_SCHEDULES[paymentFrequency] || PAYMENT_SCHEDULES.biweekly).paymentsPerYear;
    return paymentAmount * n;
  }, [paymentFrequency, paymentAmount]);

  const showNegAmortWarning = useMemo(() => {
    // quick check: interest on first payment > payment amount (rough)
    const r = normalizeRate(annualInterestRate);
    const ppy = schedule.paymentsPerYear;
    const periodRate = r / ppy;
    const interestFirst = mortgageStart * periodRate;
    return paymentAmount < interestFirst;
  }, [annualInterestRate, schedule.paymentsPerYear, mortgageStart, paymentAmount]);

  return (
    <DotBackground>
      <Header />

      <main className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24">
        <section className="flex flex-col gap-8 w-full min-w-0">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <div className={pillClass()}>
              <span className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
              Mortgage simulator
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[color:var(--text)]">
              Mortgage + Appreciation Profit/Loss
            </h1>
            <p className="text-sm sm:text-base text-[color:var(--text-muted)] max-w-3xl">
              Net P/L (per year) = (principal paid + appreciation) − total payments. Uses payment-by-payment amortization
              and compounds home value annually. Stops early if mortgage hits $0.
            </p>
          </div>

          {/* Inputs */}
          <div className={`${cardClass()} p-5 sm:p-6`}>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[color:var(--text)]">Inputs</h2>
                <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                  Rates accept percent (3) or decimal (0.03). Payment amount is per selected frequency.
                </p>
              </div>

              <button
                type="button"
                onClick={() => downloadCsv("mortgage_projection.csv", toCsv(rows))}
                disabled={!rows.length}
                className="inline-flex items-center justify-center rounded-[var(--r-md)] bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Download CSV
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
              <div>
                <label className="text-sm font-medium text-[color:var(--text)]">Home value</label>
                <input className={inputClass()} type="number" value={homeValueStart} onChange={(e) => setHomeValueStart(Number(e.target.value))} />
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--text)]">Mortgage</label>
                <input className={inputClass()} type="number" value={mortgageStart} onChange={(e) => setMortgageStart(Number(e.target.value))} />
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--text)]">Interest rate</label>
                <input className={inputClass()} type="number" step="0.01" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(Number(e.target.value))} />
                <p className="mt-1 text-xs text-[color:var(--text-muted)]">Example: 3.94 or 0.0394</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--text)]">Appreciation</label>
                <input className={inputClass()} type="number" step="0.01" value={annualAppreciationRate} onChange={(e) => setAnnualAppreciationRate(Number(e.target.value))} />
                <p className="mt-1 text-xs text-[color:var(--text-muted)]">Example: 3 or 0.03</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--text)]">Amortization (yrs)</label>
                <input className={inputClass()} type="number" value={amortizationYears} onChange={(e) => setAmortizationYears(Number(e.target.value))} />
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--text)]">Payment frequency</label>
                <select className={selectClass()} value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value)}>
                  <option value="weekly">Weekly (52/yr)</option>
                  <option value="biweekly">Bi-weekly (26/yr)</option>
                  <option value="monthly">Monthly (12/yr)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--text)]">
                  Payment amount ({schedule.label})
                </label>
                <input className={inputClass()} type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(Number(e.target.value))} />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <span className={pillClass()}>
                  Annual payments: <span className="text-[color:var(--text)] font-semibold">{money(annualPaymentTotal)}</span>
                </span>
                <span className={pillClass()}>
                  Payments/year: <span className="text-[color:var(--text)] font-semibold">{schedule.paymentsPerYear}</span>
                </span>
              </div>

              {showNegAmortWarning && (
                <div className="rounded-[var(--r-md)] border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                  Warning: payment may be lower than interest due (negative amortization).
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-[var(--r-md)] border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                {error}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className={`${cardClass()} p-5`}>
              <div className="text-xs text-[color:var(--text-muted)]">Home value (end)</div>
              <div className="mt-1 text-lg font-semibold text-[color:var(--text)]">
                {last ? money(last.home_value_end) : "—"}
              </div>
            </div>

            <div className={`${cardClass()} p-5`}>
              <div className="text-xs text-[color:var(--text-muted)]">Remaining mortgage</div>
              <div className="mt-1 text-lg font-semibold text-[color:var(--text)]">
                {last ? money(last.remaining_mortgage_end) : "—"}
              </div>
            </div>

            <div className={`${cardClass()} p-5`}>
              <div className="text-xs text-[color:var(--text-muted)]">Cumulative profit/loss</div>
              <div className={`mt-1 text-lg font-semibold ${signClass(last?.cumulative_profit_loss)}`}>
                {last ? money(last.cumulative_profit_loss) : "—"}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className={`${cardClass()} overflow-hidden`}>
            <div className="px-5 py-4 border-b border-[color:var(--border)] bg-[color:var(--bg-2)]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[color:var(--text)]">Yearly results</h2>
                <span className="text-xs text-[color:var(--text-muted)]">
                  {last ? `Simulated through year ${last.year}` : "No results"}
                </span>
              </div>
            </div>

            {/* REAL sticky headers: make table container scroll */}
            <div className="max-h-[70vh] overflow-auto no-scrollbar">
              <table className="w-full min-w-[1100px] text-sm">
                <thead>
                  <tr className="sticky top-0 z-30 bg-slate-950 text-left text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)] shadow-[0_1px_0_0_rgba(148,163,184,0.25)]">
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3">Home Value</th>
                    <th className="px-4 py-3">Mortgage</th>
                    <th className="px-4 py-3">Payments</th>
                    <th className="px-4 py-3">Interest</th>
                    <th className="px-4 py-3">Principal</th>
                    <th className="px-4 py-3">Appreciation</th>
                    <th className="px-4 py-3">Net P/L</th>
                    <th className="px-4 py-3">Cumulative</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[color:var(--border)]">
                  {rows.map((r) => (
                    <tr key={r.year} className="hover:bg-white/5 transition">
                      <td className="px-4 py-3 font-semibold text-[color:var(--text)]">{r.year}</td>
                      <td className="px-4 py-3 text-[color:var(--text)] whitespace-nowrap">{money(r.home_value_end)}</td>
                      <td className="px-4 py-3 text-[color:var(--text)] whitespace-nowrap">{money(r.remaining_mortgage_end)}</td>
                      <td className="px-4 py-3 text-[color:var(--text)] whitespace-nowrap">{money(r.total_payments)}</td>
                      <td className="px-4 py-3 text-[color:var(--text)] whitespace-nowrap">{money(r.interest_paid)}</td>
                      <td className="px-4 py-3 text-[color:var(--text)] whitespace-nowrap">{money(r.principal_paid)}</td>
                      <td className="px-4 py-3 text-[color:var(--text)] whitespace-nowrap">{money(r.appreciation_gain)}</td>
                      <td className={`px-4 py-3 font-semibold whitespace-nowrap ${signClass(r.net_profit_loss_for_year)}`}>
                        {money(r.net_profit_loss_for_year)}
                      </td>
                      <td className={`px-4 py-3 font-semibold whitespace-nowrap ${signClass(r.cumulative_profit_loss)}`}>
                        {money(r.cumulative_profit_loss)}
                      </td>
                    </tr>
                  ))}

                  {!rows.length && !error && (
                    <tr>
                      <td className="px-4 py-10 text-[color:var(--text-muted)]" colSpan={9}>
                        Enter inputs above to see results.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-[color:var(--border)] text-xs text-[color:var(--text-muted)]">
              Note: ignores property tax, insurance, maintenance, closing costs, and selling fees. If payment &lt; interest
              due, mortgage can grow (negative amortization).
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </DotBackground>
  );
}
