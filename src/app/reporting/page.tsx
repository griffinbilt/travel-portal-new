"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

// ─── Mock dashboard data ───

const periods = ["This week", "This month", "This quarter", "This year"] as const;

const revenueByPeriod: Record<string, { total: number; change: number; chartData: number[] }> = {
  "This week": { total: 47200, change: 12.3, chartData: [6200, 5800, 7100, 6400, 7800, 6900, 7000] },
  "This month": { total: 189600, change: 8.7, chartData: [42000, 38500, 51200, 47800, 44100, 52300, 48700, 46200, 49800, 51000, 47200, 53800] },
  "This quarter": { total: 584300, change: 15.2, chartData: [172400, 189600, 222300] },
  "This year": { total: 1247000, change: 22.8, chartData: [285000, 312000, 298000, 352000] },
};

const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthLabels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];
const quarterLabels = ["Jan", "Feb", "Mar"];
const yearLabels = ["Q1", "Q2", "Q3", "Q4"];
const labelsByPeriod: Record<string, string[]> = {
  "This week": weekLabels,
  "This month": monthLabels,
  "This quarter": quarterLabels,
  "This year": yearLabels,
};

const guestOrigins = [
  { city: "New York, NY", guests: 38, revenue: 312400, pct: 32 },
  { city: "Los Angeles, CA", guests: 22, revenue: 168200, pct: 18 },
  { city: "San Francisco, CA", guests: 15, revenue: 124800, pct: 13 },
  { city: "Miami, FL", guests: 14, revenue: 118600, pct: 12 },
  { city: "Chicago, IL", guests: 11, revenue: 82400, pct: 8 },
  { city: "Boston, MA", guests: 8, revenue: 64200, pct: 7 },
  { city: "Dallas, TX", guests: 6, revenue: 42800, pct: 5 },
  { city: "Other", guests: 7, revenue: 33600, pct: 5 },
];

const tierBreakdown = [
  { tier: "Platinum", guests: 28, avgSpend: 8420, avgNights: 5.2, repeatRate: 72, color: "#171717" },
  { tier: "Gold", guests: 34, avgSpend: 4180, avgNights: 4.1, repeatRate: 58, color: "#d97706" },
  { tier: "Silver", guests: 32, avgSpend: 2640, avgNights: 3.4, repeatRate: 34, color: "#94a3b8" },
  { tier: "Blue", guests: 27, avgSpend: 1820, avgNights: 2.8, repeatRate: 18, color: "#3b82f6" },
];

const onPropertySpend = [
  { category: "Room revenue", amount: 842000, pct: 56, icon: "bed" },
  { category: "Dining & restaurants", amount: 312000, pct: 21, icon: "dining" },
  { category: "Spa & wellness", amount: 168000, pct: 11, icon: "spa" },
  { category: "Activities & excursions", amount: 98000, pct: 7, icon: "activity" },
  { category: "Other (minibar, shop, etc.)", amount: 75000, pct: 5, icon: "other" },
];

const guestSatisfaction = [
  { category: "Overall experience", score: 4.7, reviews: 89, bars: [2, 3, 8, 34, 42] },
  { category: "Service", score: 4.8, reviews: 89, bars: [1, 2, 5, 28, 53] },
  { category: "Room quality", score: 4.5, reviews: 86, bars: [2, 4, 10, 30, 40] },
  { category: "Dining", score: 4.6, reviews: 72, bars: [1, 3, 7, 26, 35] },
];

const upcomingHighValue = [
  { name: "Nikolai Sorokin", tier: "Platinum", checkIn: "Apr 10", nights: 6, total: "$15,600", occasion: "BLADE arrival", origin: "New York, NY" },
  { name: "Nadia Volkov", tier: "Gold", checkIn: "Apr 10", nights: 4, total: "$4,240", occasion: null, origin: "New York, NY" },
  { name: "David Kim", tier: "Gold", checkIn: "Apr 11", nights: 4, total: "$3,360", occasion: "Business", origin: "Los Angeles, CA" },
  { name: "Camille Rousseau", tier: "Platinum", checkIn: "Apr 12", nights: 5, total: "$6,450", occasion: "Anniversary", origin: "New York, NY" },
  { name: "Tariq Al-Farsi", tier: "Silver", checkIn: "Apr 12", nights: 4, total: "$2,960", occasion: null, origin: "Dallas, TX" },
];

const biltVsOther = {
  bilt: { avgNightly: 890, avgStay: 4.2, repeatRate: 52, onPropertySpend: 1840, satisfaction: 4.7 },
  other: { avgNightly: 620, avgStay: 2.8, repeatRate: 24, onPropertySpend: 680, satisfaction: 4.1 },
};

function fmt(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n}`;
}

export default function ReportingPage() {
  const [period, setPeriod] = useState<string>("This month");
  const rev = revenueByPeriod[period];
  const labels = labelsByPeriod[period];
  const maxBar = Math.max(...rev.chartData);

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#fafafa]">
        <div className="max-w-[1240px] mx-auto px-8 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[24px] font-semibold">Reporting</h1>
              <p className="text-[14px] text-[#737373] mt-1">Bilt member insights for Montage Los Cabos</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-[#e5e5e5] rounded-xl p-1">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    period === p ? "bg-[#171717] text-white" : "text-[#525252] hover:bg-[#f5f5f5]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Hero stat cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <HeroStat label="Revenue from Bilt" value={fmt(rev.total)} change={`+${rev.change}%`} positive />
            <HeroStat label="Bilt guests" value="121" change="+18 vs last period" positive />
            <HeroStat label="Avg stay value" value="$4,120" change="+$340" positive />
            <HeroStat label="Repeat guest rate" value="52%" change="+6pts" positive />
          </div>

          {/* Revenue chart */}
          <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[16px] font-semibold">Revenue from Bilt members</h2>
                <p className="text-[13px] text-[#a3a3a3] mt-0.5">{period.toLowerCase()} &middot; all booking channels</p>
              </div>
              <div className="text-right">
                <div className="text-[28px] font-semibold tracking-tight">{fmt(rev.total)}</div>
                <div className="text-[13px] text-[#16a34a] font-medium">+{rev.change}% vs prior</div>
              </div>
            </div>
            <div className="flex items-end gap-[3px] h-[180px]">
              {rev.chartData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex justify-center">
                    <div
                      className="w-full max-w-[48px] rounded-t-md bg-[#171717] transition-all hover:bg-[#404040]"
                      style={{ height: `${(val / maxBar) * 160}px` }}
                      title={fmt(val)}
                    />
                  </div>
                  <span className="text-[10px] text-[#a3a3a3] font-medium">{labels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Two column: Bilt vs Others + Guest Origins */}
          <div className="grid grid-cols-2 gap-6 mb-6">

            {/* Bilt vs Other Guests */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <h2 className="text-[16px] font-semibold mb-1">Bilt members vs. other guests</h2>
              <p className="text-[13px] text-[#a3a3a3] mb-5">Why Bilt members are your highest-value guests</p>
              <div className="space-y-4">
                <CompareRow label="Avg nightly rate" bilt={`$${biltVsOther.bilt.avgNightly}`} other={`$${biltVsOther.other.avgNightly}`} biltPct={biltVsOther.bilt.avgNightly / (biltVsOther.bilt.avgNightly + biltVsOther.other.avgNightly) * 100} />
                <CompareRow label="Avg stay length" bilt={`${biltVsOther.bilt.avgStay} nights`} other={`${biltVsOther.other.avgStay} nights`} biltPct={biltVsOther.bilt.avgStay / (biltVsOther.bilt.avgStay + biltVsOther.other.avgStay) * 100} />
                <CompareRow label="On-property spend" bilt={`$${biltVsOther.bilt.onPropertySpend}`} other={`$${biltVsOther.other.onPropertySpend}`} biltPct={biltVsOther.bilt.onPropertySpend / (biltVsOther.bilt.onPropertySpend + biltVsOther.other.onPropertySpend) * 100} />
                <CompareRow label="Repeat rate" bilt={`${biltVsOther.bilt.repeatRate}%`} other={`${biltVsOther.other.repeatRate}%`} biltPct={biltVsOther.bilt.repeatRate / (biltVsOther.bilt.repeatRate + biltVsOther.other.repeatRate) * 100} />
                <CompareRow label="Satisfaction" bilt={biltVsOther.bilt.satisfaction.toString()} other={biltVsOther.other.satisfaction.toString()} biltPct={biltVsOther.bilt.satisfaction / (biltVsOther.bilt.satisfaction + biltVsOther.other.satisfaction) * 100} />
              </div>
            </div>

            {/* Guest Origins */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <h2 className="text-[16px] font-semibold mb-1">Where your guests come from</h2>
              <p className="text-[13px] text-[#a3a3a3] mb-5">Top origin markets for Bilt members</p>
              <div className="space-y-3">
                {guestOrigins.map((o) => (
                  <div key={o.city} className="flex items-center gap-3">
                    <div className="w-[140px] text-[13px] font-medium truncate">{o.city}</div>
                    <div className="flex-1 h-[22px] bg-[#f5f5f5] rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-[#171717] rounded-full transition-all"
                        style={{ width: `${o.pct}%` }}
                      />
                    </div>
                    <div className="w-[60px] text-right">
                      <div className="text-[13px] font-semibold">{o.guests}</div>
                      <div className="text-[10px] text-[#a3a3a3]">{fmt(o.revenue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tier breakdown + On-property spend */}
          <div className="grid grid-cols-2 gap-6 mb-6">

            {/* Tier breakdown */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <h2 className="text-[16px] font-semibold mb-1">Guest tier breakdown</h2>
              <p className="text-[13px] text-[#a3a3a3] mb-5">Spending patterns by Bilt membership tier</p>

              {/* Tier bar visualization */}
              <div className="flex h-[14px] rounded-full overflow-hidden mb-5">
                {tierBreakdown.map((t) => {
                  const totalGuests = tierBreakdown.reduce((s, x) => s + x.guests, 0);
                  return (
                    <div
                      key={t.tier}
                      className="h-full transition-all"
                      style={{ width: `${(t.guests / totalGuests) * 100}%`, backgroundColor: t.color }}
                      title={`${t.tier}: ${t.guests} guests`}
                    />
                  );
                })}
              </div>

              <div className="space-y-3">
                {tierBreakdown.map((t) => (
                  <div key={t.tier} className="flex items-center gap-4 py-2 border-b border-[#f5f5f5] last:border-b-0">
                    <div className="flex items-center gap-2 w-[100px]">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                      <span className="text-[13px] font-semibold">{t.tier}</span>
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-2 text-center">
                      <div>
                        <div className="text-[14px] font-semibold">{t.guests}</div>
                        <div className="text-[10px] text-[#a3a3a3]">guests</div>
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold">{fmt(t.avgSpend)}</div>
                        <div className="text-[10px] text-[#a3a3a3]">avg spend</div>
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold">{t.avgNights}</div>
                        <div className="text-[10px] text-[#a3a3a3]">avg nights</div>
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold">{t.repeatRate}%</div>
                        <div className="text-[10px] text-[#a3a3a3]">repeat</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* On-property spend */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <h2 className="text-[16px] font-semibold mb-1">On-property spend</h2>
              <p className="text-[13px] text-[#a3a3a3] mb-5">Where Bilt members spend during their stay</p>
              <div className="space-y-4">
                {onPropertySpend.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <SpendIcon type={cat.icon} />
                        <span className="text-[13px] font-medium">{cat.category}</span>
                      </div>
                      <span className="text-[13px] font-semibold">{fmt(cat.amount)}</span>
                    </div>
                    <div className="h-[10px] bg-[#f5f5f5] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${cat.pct}%`,
                          backgroundColor: cat.pct > 40 ? "#171717" : cat.pct > 15 ? "#525252" : "#a3a3a3",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-5 pt-4 border-t border-[#e5e5e5] flex items-center justify-between">
                <span className="text-[14px] font-semibold">Total on-property</span>
                <span className="text-[18px] font-semibold">{fmt(onPropertySpend.reduce((s, c) => s + c.amount, 0))}</span>
              </div>
            </div>
          </div>

          {/* Guest satisfaction + Upcoming high-value arrivals */}
          <div className="grid grid-cols-2 gap-6 mb-6">

            {/* Guest satisfaction */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <h2 className="text-[16px] font-semibold mb-1">Guest satisfaction</h2>
              <p className="text-[13px] text-[#a3a3a3] mb-5">Bilt member post-stay ratings</p>
              <div className="grid grid-cols-2 gap-4">
                {guestSatisfaction.map((s) => (
                  <div key={s.category} className="border border-[#e5e5e5] rounded-xl p-4">
                    <div className="text-[13px] font-medium text-[#525252] mb-3">{s.category}</div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[32px] font-semibold leading-none">{s.score}</div>
                        <div className="text-[12px] text-[#a3a3a3] mt-1">{s.reviews} reviews</div>
                      </div>
                      <div className="flex items-end gap-[3px] h-[48px]">
                        {s.bars.map((b, i) => (
                          <div
                            key={i}
                            className="w-[8px] rounded-t-sm bg-[#171717]"
                            style={{ height: `${Math.max(4, (b / Math.max(...s.bars)) * 44)}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming high-value arrivals */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <h2 className="text-[16px] font-semibold mb-1">Upcoming high-value arrivals</h2>
              <p className="text-[13px] text-[#a3a3a3] mb-4">Next 7 days</p>
              <div className="space-y-0">
                {upcomingHighValue.map((g, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-[#f5f5f5] last:border-b-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                      g.tier === "Platinum" ? "bg-neutral-800 text-white" :
                      g.tier === "Gold" ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {g.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold">{g.name}</span>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          g.tier === "Platinum" ? "tier-platinum" :
                          g.tier === "Gold" ? "tier-gold" : "tier-silver"
                        }`}>{g.tier}</span>
                      </div>
                      <div className="text-[12px] text-[#a3a3a3]">
                        {g.checkIn} &middot; {g.nights} nights &middot; {g.origin}
                        {g.occasion && <span className="text-[#9333ea]"> &middot; {g.occasion}</span>}
                      </div>
                    </div>
                    <div className="text-[14px] font-semibold">{g.total}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key insights callout */}
          <div className="bg-[#171717] rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h2 className="text-[16px] font-semibold mb-2">Bilt member insights</h2>
                <div className="grid grid-cols-3 gap-6 mt-4">
                  <div>
                    <div className="text-[28px] font-semibold">43%</div>
                    <div className="text-[13px] text-white/60 mt-0.5">higher avg nightly rate than non-Bilt guests</div>
                  </div>
                  <div>
                    <div className="text-[28px] font-semibold">2.7x</div>
                    <div className="text-[13px] text-white/60 mt-0.5">more on-property spend vs. OTA bookings</div>
                  </div>
                  <div>
                    <div className="text-[28px] font-semibold">52%</div>
                    <div className="text-[13px] text-white/60 mt-0.5">of Bilt members rebook within 12 months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// ─── Subcomponents ───

function HeroStat({ label, value, change, positive }: { label: string; value: string; change: string; positive?: boolean }) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5">
      <div className="text-[13px] text-[#737373] mb-1">{label}</div>
      <div className="text-[28px] font-semibold tracking-tight">{value}</div>
      <div className={`text-[12px] font-medium mt-1 ${positive ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{change}</div>
    </div>
  );
}

function CompareRow({ label, bilt, other, biltPct }: { label: string; bilt: string; other: string; biltPct: number }) {
  return (
    <div>
      <div className="text-[13px] text-[#737373] mb-1.5">{label}</div>
      <div className="flex h-[28px] rounded-lg overflow-hidden bg-[#f5f5f5]">
        <div
          className="h-full bg-[#171717] rounded-l-lg flex items-center justify-end px-2 transition-all"
          style={{ width: `${biltPct}%` }}
        >
          <span className="text-[11px] font-semibold text-white whitespace-nowrap">{bilt}</span>
        </div>
        <div className="flex-1 flex items-center px-2">
          <span className="text-[11px] font-medium text-[#737373] whitespace-nowrap">{other}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] font-medium text-[#171717]">Bilt members</span>
        <span className="text-[10px] text-[#a3a3a3]">Other guests</span>
      </div>
    </div>
  );
}

function SpendIcon({ type }: { type: string }) {
  const props = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", stroke: "#525252", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "bed":
      return <svg {...props}><rect x="1" y="6" width="14" height="7" rx="1.5" /><path d="M3 6V4a1 1 0 011-1h8a1 1 0 011 1v2" /><path d="M1 11v2M15 11v2" /></svg>;
    case "dining":
      return <svg {...props}><path d="M5 2v4a3 3 0 006 0V2" /><path d="M8 6v8" /></svg>;
    case "spa":
      return <svg {...props}><path d="M8 2C6 5 4 7 4 9a4 4 0 008 0c0-2-2-4-4-7z" /></svg>;
    case "activity":
      return <svg {...props}><circle cx="8" cy="4" r="2" /><path d="M4 14l2-5h4l2 5" /><path d="M6 9l-2 1M10 9l2 1" /></svg>;
    case "other":
      return <svg {...props}><rect x="2" y="2" width="12" height="12" rx="2" /><path d="M6 6h4M6 10h4" /></svg>;
    default:
      return null;
  }
}
