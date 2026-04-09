"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { reservations, getReservationStats, type BiltReservation } from "@/lib/data";

const tierColors: Record<string, string> = {
  X: "bg-[#171717] text-white",
  Platinum: "bg-[#525252] text-white",
  Gold: "bg-[#fef3c7] text-[#92400e]",
  Silver: "bg-[#f1f5f9] text-[#475569]",
  Blue: "bg-[#dbeafe] text-[#1e40af]",
};

const statusDot: Record<string, string> = {
  "Confirmed": "text-[#16a34a]",
  "Checked-in": "text-[#2563eb]",
  "Pending": "text-[#d97706]",
  "Arriving today": "text-[#9333ea]",
  "Departing today": "text-[#737373]",
};

type Tab = "Active" | "Attention required" | "Upcoming" | "Checked-out";

export default function Reservations() {
  const router = useRouter();
  const stats = getReservationStats();
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vipOnly, setVipOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 25;

  const filtered = reservations.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = q === "" ||
      r.guest.toLowerCase().includes(q) ||
      r.confirmationNo.toLowerCase().includes(q) ||
      r.roomNo.toLowerCase().includes(q) ||
      r.profile.originCity.toLowerCase().includes(q);
    const matchesTier = tierFilter === "All" || r.profile.biltTier === tierFilter;
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    const matchesVip = !vipOnly || r.vip;
    return matchesSearch && matchesTier && matchesStatus && matchesVip;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-8">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[24px] font-semibold">Reservations</h1>
            <p className="text-[14px] text-[#737373] mt-1">Bilt member stays at your property</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-[#e5e5e5] mb-6">
            {([
              { tab: "Active" as Tab, count: "1,932" },
              { tab: "Attention required" as Tab, count: "5", dot: true },
              { tab: "Upcoming" as Tab, count: "847" },
              { tab: "Checked-out" as Tab, count: "12,450" },
            ]).map(({ tab, count, dot }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 pb-3 text-[14px] font-medium border-b-2 transition-colors ${
                  activeTab === tab ? "border-[#171717] text-[#171717]" : "border-transparent text-[#a3a3a3] hover:text-[#525252]"
                }`}
              >
                {dot && <span className="w-2 h-2 rounded-full bg-[#dc2626]" />}
                {tab}
                <span className={`text-[12px] ${activeTab === tab ? "text-[#525252]" : "text-[#d4d4d4]"}`}>{count}</span>
              </button>
            ))}
          </div>

          {/* Alert banner */}
          <div className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#fef3c7] border border-[#fde68a] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#dc2626] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M6 4v3M6 8.5v0" /></svg>
              </div>
              <div>
                <span className="text-[14px] font-semibold text-[#78350f]">5 reservations require attention</span>
                <span className="text-[13px] text-[#92400e] ml-2">Rate code mismatches detected — commissions may be affected for these stays.</span>
              </div>
            </div>
            <button className="px-4 py-1.5 rounded-lg border border-[#92400e] text-[13px] font-medium text-[#92400e] hover:bg-[#fde68a] transition-colors flex-shrink-0">View issues</button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard label="ACTIVE RESERVATIONS" value="1,932" sub="↑ 12% vs last month" />
            <StatCard label="BILT MEMBERS ARRIVING TODAY" value={stats.arrivingToday.toString()} sub={`${stats.vipGuests} VIP guests`} />
            <StatCard label="AVG. NIGHTLY RATE (BILT)" value={`$${Math.round(stats.avgNightlyRate)}`} sub="↑ 5% vs property avg" />
            <StatCard label="COMMISSIONABLE REVENUE" value={`$${(stats.commissionableRevenue / 1000000).toFixed(1)}M`} sub="MTD — May 2026" />
          </div>

          {/* Search + Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-[380px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3]" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" /></svg>
              <input
                type="text" placeholder="Search guests, confirmation numbers, rooms..."
                value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2.5 border border-[#e5e5e5] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-[#a3a3a3] transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-[13px] font-medium text-[#525252] hover:bg-[#f5f5f5] transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h10M4 7h6M6 11h2" /></svg>
              Filters
            </button>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-[13px] font-medium text-[#525252] bg-white focus:outline-none cursor-pointer">
              <option value="All">Status</option>
              <option>Confirmed</option><option>Checked-in</option><option>Pending</option><option>Arriving today</option><option>Departing today</option>
            </select>
            <select value={tierFilter} onChange={(e) => { setTierFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-[13px] font-medium text-[#525252] bg-white focus:outline-none cursor-pointer">
              <option value="All">Bilt Tier</option>
              <option>X</option><option>Platinum</option><option>Gold</option><option>Silver</option><option>Blue</option>
            </select>
            <button
              onClick={() => { setVipOnly(!vipOnly); setCurrentPage(1); }}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors border ${
                vipOnly ? "bg-[#171717] text-white border-[#171717]" : "bg-white text-[#525252] border-[#e5e5e5] hover:bg-[#f5f5f5]"
              }`}
            >VIP Only</button>
            <span className="ml-auto text-[13px] text-[#a3a3a3]">Showing {filtered.length} of 1932</span>
          </div>

          {/* Table */}
          <div className="border border-[#e5e5e5] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Guest</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Bilt Tier</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Confirmation</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Arrival</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Departure</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Room</th>
                  <th className="text-right px-5 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r) => (
                  <tr key={r.id} onClick={() => router.push(`/reservation/${r.id}`)}
                    className="border-b border-[#f5f5f5] last:border-b-0 cursor-pointer transition-colors hover:bg-[#fafafa]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={r.guest} tier={r.profile.biltTier} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-medium">{r.guest}</span>
                            {r.vip && <span className="vip-badge">VIP</span>}
                          </div>
                          <div className="text-[12px] text-[#a3a3a3]">{r.profile.originCity}, {r.profile.originState}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold ${tierColors[r.profile.biltTier]}`}>
                        {r.profile.biltTier}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[14px] font-mono text-[#525252]">{r.confirmationNo}</td>
                    <td className="px-4 py-4">
                      <div className="text-[14px]">{r.checkIn}</div>
                      <div className="text-[12px] text-[#a3a3a3]">{r.nights} nights</div>
                    </td>
                    <td className="px-4 py-4 text-[14px]">{r.checkOut}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${statusDot[r.status] || "text-[#525252]"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[14px]">{r.roomNo}</td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-[14px] font-medium">{r.total}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" className="inline ml-2">
                        <path d="M4.5 2.5l4 4-4 4" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-[13px] text-[#737373]">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e5e5e5] hover:bg-[#f5f5f5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 4l-4 4 4 4" /></svg>
                </button>
                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e5e5e5] hover:bg-[#f5f5f5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 4l4 4-4 4" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Avatar({ name, tier }: { name: string; tier: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
  const bg: Record<string, string> = {
    X: "bg-[#171717] text-white", Platinum: "bg-[#525252] text-white",
    Gold: "bg-amber-100 text-amber-700", Silver: "bg-slate-100 text-slate-600", Blue: "bg-blue-100 text-blue-700",
  };
  return <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0 ${bg[tier] || "bg-gray-100 text-gray-600"}`}>{initials}</div>;
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-[#e5e5e5] p-5">
      <div className="text-[11px] font-semibold text-[#a3a3a3] tracking-wider uppercase mb-2">{label}</div>
      <div className="text-[28px] font-semibold tracking-tight">{value}</div>
      <div className="text-[12px] text-[#a3a3a3] mt-1">{sub}</div>
    </div>
  );
}
