"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { reservations } from "@/lib/data";

// ─── Mock data ───
const revenueData = {
  "Revenue": { value: "$189,600", sub: "Revenue in last 7 days", chart: [42, 38, 51, 48, 44, 52, 49] },
  "Room nights": { value: "284", sub: "Room nights in last 7 days", chart: [38, 42, 45, 40, 36, 48, 44] },
};
const chartLabels = ["Apr 3", "Apr 9"];

const upcomingArrivals = reservations.filter(r => r.status === "Confirmed" || r.status === "Arriving today").slice(0, 5);

export default function DashboardPage() {
  const [chartMode, setChartMode] = useState<"Revenue" | "Room nights">("Revenue");
  const active = revenueData[chartMode];
  const maxBar = Math.max(...active.chart);

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#fdfeff]">
        <div className="max-w-[1100px] mx-auto px-8 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[24px] font-semibold">Dashboard</h1>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#e2e4e6] bg-white text-[14px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0c0c0c" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="4" width="12" height="10" rx="1.5" /><path d="M5 2v3M11 2v3M2 7.5h12" /></svg>
              <span className="font-medium">Montage Los Cabos</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#0c0c0c" strokeWidth="1.5" strokeLinecap="round"><path d="M3 4.5l3 3 3-3" /></svg>
            </div>
          </div>

          {/* Overview summary */}
          <div className="mb-6">
            <h2 className="text-[18px] font-semibold mb-1">Your property overview</h2>
            <p className="text-[15px] text-[#525252]">
              Your property has driven <span className="font-semibold text-[#0c0c0c]">$1,247,000</span> in revenue across <span className="font-semibold text-[#0c0c0c]">1,932 stays</span> in the last 30 days.
            </p>
          </div>

          {/* Revenue chart card */}
          <div className="border border-[#e2e4e6] rounded-2xl bg-white p-6 mb-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-2 text-[#6a6a6a]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="1.5" width="12" height="13" rx="1.5" /><path d="M5 0v2.5M11 0v2.5M5.5 6h5M5.5 9h5M5.5 12h3" /></svg>
                <span className="text-[14px] font-medium text-[#525252]">Revenue for last 7 days</span>
              </div>
              {/* Toggle */}
              <div className="flex items-center bg-[#f5f5f5] rounded-full p-0.5">
                {(["Revenue", "Room nights"] as const).map(mode => (
                  <button key={mode} onClick={() => setChartMode(mode)}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${chartMode === mode ? "bg-white text-[#0c0c0c] shadow-sm" : "text-[#6a6a6a]"}`}>
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-8">
              {/* Stats */}
              <div className="w-[200px] flex-shrink-0">
                <div className="mb-4">
                  <div className="text-[32px] font-semibold leading-none">{active.value}</div>
                  <div className="text-[13px] text-[#6a6a6a] mt-1">{active.sub}</div>
                </div>
                <div>
                  <div className="text-[32px] font-semibold leading-none">{chartMode === "Revenue" ? "284" : "$667"}</div>
                  <div className="text-[13px] text-[#6a6a6a] mt-1">{chartMode === "Revenue" ? "Room nights in last 7 days" : "Avg nightly rate"}</div>
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex items-end gap-[6px] h-[180px]">
                  {active.chart.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div
                        className="w-full max-w-[44px] rounded-[4px] bg-[#202223] transition-all hover:bg-[#404040]"
                        style={{ height: `${(val / maxBar) * 160}px` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 px-2">
                  <span className="text-[12px] text-[#6a6a6a]">{chartLabels[0]}</span>
                  <span className="text-[12px] text-[#6a6a6a]">{chartLabels[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming arrivals table */}
          <div className="border border-[#e2e4e6] rounded-2xl bg-white mb-6">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2 text-[#525252]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="1.5" width="12" height="13" rx="1.5" /><path d="M5 0v2.5M11 0v2.5M5.5 6h5M5.5 9h5M5.5 12h3" /></svg>
                <span className="text-[14px] font-medium">Upcoming arrivals this week</span>
              </div>
              <button className="w-7 h-7 rounded-lg border border-[#e2e4e6] flex items-center justify-center hover:bg-[#f5f5f5]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"><path d="M10 1.5l2.5 2.5M5 9l-1 3.5L7.5 11l7-7L12 1.5l-7 7z" /><path d="M1 7v4.5A1.5 1.5 0 002.5 13H7" /></svg>
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#fdfeff]">
                  <th className="text-left px-6 py-3 text-[13px] font-medium text-[#6a6a6a] border-b border-[#e2e4e6]">Name</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-[#6a6a6a] border-b border-[#e2e4e6]">Reservation</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-[#6a6a6a] border-b border-[#e2e4e6]">Type of guest</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-[#6a6a6a] border-b border-[#e2e4e6]">Tags</th>
                  <th className="text-left px-4 py-3 text-[13px] font-medium text-[#6a6a6a] border-b border-[#e2e4e6]">Benefits</th>
                </tr>
              </thead>
              <tbody>
                {upcomingArrivals.map(r => {
                  const isRepeat = r.profile.totalStays > 1;
                  return (
                    <tr key={r.id} className="border-b border-[#e2e4e6] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-[14px] font-medium">{r.guest}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="#876313"><rect x="1" y="1" width="10" height="10" rx="1" /></svg>
                          <span className="text-[12px] text-[#876313]">{r.profile.biltTier.toLowerCase()} status</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[14px]">{r.checkIn}, 2026</div>
                        <div className="text-[12px] text-[#6a6a6a]">{r.nights} nights &middot; {(r.profile.travelCompanions || 0) + 1} guests</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[14px]">{isRepeat ? "Repeat guest" : "First time guest"}</div>
                        {isRepeat && <div className="text-[12px] text-[#6a6a6a]">{r.profile.totalStays} total stays</div>}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {r.profile.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[12px] text-[#525252] bg-[#f5f5f5] px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                          {r.profile.tags.length === 0 && <span className="text-[12px] text-[#a3a3a3]">None</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          <BenefitPill label={`${r.profile.biltTier === "X" ? "3" : r.profile.biltTier === "Platinum" ? "2.5" : r.profile.biltTier === "Gold" ? "2" : "1"}X pts`} />
                          {r.credit && <BenefitPill label={`$${r.credit.amount} credit`} />}
                          {(r.profile.biltTier === "X" || r.profile.biltTier === "Platinum") && <BenefitPill label="Concierge" />}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="px-6 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#6a6a6a]">Showing 1 to {upcomingArrivals.length} of {upcomingArrivals.length}</span>
                      <div className="flex items-center gap-1">
                        <button disabled className="w-7 h-7 rounded border border-[#e2e4e6] flex items-center justify-center opacity-30">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3L4 6l4 3" /></svg>
                        </button>
                        <button disabled className="w-7 h-7 rounded border border-[#e2e4e6] flex items-center justify-center opacity-30">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 3l4 3-4 3" /></svg>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 3 stat cards row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard icon="dollar" label="Average nightly rate" value="$687" sub="All time" />
            <StatCard icon="guests" label="Average party size" value="1.8" sub="All time" />
            <StatCard icon="spend" label="Average on-property spend" value="$1,840" sub="Per stay" />
          </div>

          {/* Bottom section: Upcoming reservations chart + Points */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Upcoming reservations chart */}
            <div className="border border-[#e2e4e6] rounded-2xl bg-white p-6">
              <div className="flex items-center gap-2 text-[#525252] mb-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="1.5" width="12" height="13" rx="1.5" /><path d="M5 0v2.5M11 0v2.5" /></svg>
                <span className="text-[14px] font-semibold">Upcoming reservations</span>
              </div>
              <div className="mb-4">
                <p className="text-[14px]">
                  Your property has <span className="font-semibold">23</span> arrivals this week, of which <span className="font-semibold">100%</span> are Bilt Members.
                </p>
                <span className="text-[13px] text-[#6a6a6a]">23 Bilt Members</span>
              </div>
              <div className="flex items-end gap-[6px] h-[120px]">
                {[23, 18, 15, 20, 12, 8].map((val, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <div className="w-full max-w-[36px] rounded-[4px] bg-[#202223]" style={{ height: `${(val / 23) * 100}px` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[12px] text-[#6a6a6a]">Apr 9</span>
                <span className="text-[12px] text-[#6a6a6a]">Apr 14</span>
              </div>
            </div>

            {/* Points + loyalty stats */}
            <div className="flex flex-col gap-4">
              <div className="border border-[#e2e4e6] rounded-2xl bg-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6a6a6a" strokeWidth="1.2"><circle cx="8" cy="8" r="6.5" /><rect x="4.5" y="5" width="3" height="2.5" rx="0.3" /><rect x="8.5" y="5" width="3" height="2.5" rx="0.3" /><rect x="4.5" y="8.5" width="4.5" height="2.5" rx="0.3" /><rect x="9.5" y="8.5" width="2" height="2.5" rx="0.3" /></svg>
                  <span className="text-[13px] text-[#6a6a6a]">Points earned by guests</span>
                </div>
                <div className="text-[32px] font-semibold leading-none">2,847,320</div>
                <div className="text-[13px] text-[#6a6a6a] mt-1">All time</div>
              </div>
              <div className="border border-[#e2e4e6] rounded-2xl bg-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6a6a6a" strokeWidth="1.2"><circle cx="8" cy="8" r="6.5" /><rect x="4.5" y="5" width="3" height="2.5" rx="0.3" /><rect x="8.5" y="5" width="3" height="2.5" rx="0.3" /><rect x="4.5" y="8.5" width="4.5" height="2.5" rx="0.3" /><rect x="9.5" y="8.5" width="2" height="2.5" rx="0.3" /></svg>
                  <span className="text-[13px] text-[#6a6a6a]">Points redeemed on property</span>
                </div>
                <div className="text-[32px] font-semibold leading-none">184,500</div>
                <div className="text-[13px] text-[#6a6a6a] mt-1">All time</div>
              </div>
            </div>
          </div>

          {/* Guest satisfaction + Top spenders */}
          <div className="mb-6">
            <h2 className="text-[18px] font-semibold mb-1">Drive guest loyalty through better customer experiences</h2>
            <p className="text-[15px] text-[#525252] mb-4">Guests have left <span className="font-semibold text-[#0c0c0c]">89 reviews</span> at your property.</p>

            <div className="grid grid-cols-2 gap-6">
              {/* Reviews */}
              <div className="border border-[#e2e4e6] rounded-2xl bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6a6a6a" strokeWidth="1.2" strokeLinecap="round"><polygon points="8,1.5 9.8,5.5 14,6 11,9 11.8,13.5 8,11.5 4.2,13.5 5,9 2,6 6.2,5.5" /></svg>
                    <span className="text-[14px] font-semibold">Reviews</span>
                  </div>
                  <button className="text-[13px] text-[#6a6a6a] hover:text-[#0c0c0c] flex items-center gap-1">
                    View all <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 2.5l4 4-4 4" /></svg>
                  </button>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#0c0c0c"><path d="M12.814 2.812a.909.909 0 0 0-1.63 0l-2.653 5.37-5.935.86a.909.909 0 0 0-.504 1.551l4.295 4.178-1.014 5.9a.909.909 0 0 0 1.318.958l5.308-2.786 5.31 2.786a.909.909 0 0 0 1.317-.958l-1.013-5.9 4.293-4.178a.909.909 0 0 0-.503-1.55l-5.934-.861z" /></svg>
                  ))}
                  <span className="text-[24px] font-semibold ml-2">4.8/5</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-[#6a6a6a]">
                  <span>All time</span>
                  <span>89 reviews</span>
                </div>
              </div>

              {/* Top spenders */}
              <div className="border border-[#e2e4e6] rounded-2xl bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6a6a6a" strokeWidth="1.2" strokeLinecap="round"><circle cx="8" cy="5.5" r="3" /><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" /></svg>
                  <span className="text-[14px] font-semibold">Top Spenders</span>
                </div>
                <ol className="space-y-2.5">
                  {reservations.sort((a, b) => parseFloat(b.total.replace(/[$,]/g, "")) - parseFloat(a.total.replace(/[$,]/g, ""))).slice(0, 5).map((r, i) => (
                    <li key={r.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-[#a3a3a3] w-4">{i + 1}.</span>
                        <span className="text-[14px]">{r.guest}</span>
                      </div>
                      <span className="text-[14px] font-semibold">{r.total}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) {
  return (
    <div className="border border-[#e2e4e6] rounded-2xl bg-white p-6">
      <div className="flex items-center gap-2 mb-3">
        <StatIcon type={icon} />
        <span className="text-[13px] text-[#6a6a6a]">{label}</span>
      </div>
      <div className="text-[32px] font-semibold leading-none">{value}</div>
      <div className="text-[13px] text-[#6a6a6a] mt-1">{sub}</div>
    </div>
  );
}

function StatIcon({ type }: { type: string }) {
  const props = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", stroke: "#6a6a6a", strokeWidth: 1.2, strokeLinecap: "round" as const };
  switch (type) {
    case "dollar": return <svg {...props}><circle cx="8" cy="8" r="6.5" /><path d="M8 4v8M5.5 6.5c0-.8.8-1.5 2.5-1.5s2.5.7 2.5 1.5-.8 1.5-2.5 1.5-2.5.7-2.5 1.5.8 1.5 2.5 1.5 2.5-.7 2.5-1.5" /></svg>;
    case "guests": return <svg {...props}><circle cx="6" cy="5" r="2.5" /><path d="M1.5 13c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" /><circle cx="11.5" cy="5.5" r="1.8" /><path d="M14.5 13c0-2-1.5-3.5-3-3.5" /></svg>;
    case "spend": return <svg {...props}><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" /><path d="M1.5 7h13" /><path d="M4.5 10h3" /></svg>;
    default: return null;
  }
}

function BenefitPill({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#e2e4e6] text-[12px] font-medium text-[#0c0c0c] bg-white hover:bg-[#f5f5f5] transition-colors">
      {label}
    </button>
  );
}
