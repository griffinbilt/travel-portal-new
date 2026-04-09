"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { reservations, generateFolio, getPointsEarned } from "@/lib/data";

const tierColors: Record<string, string> = {
  X: "bg-[#171717] text-white", Platinum: "bg-[#525252] text-white",
  Gold: "bg-[#fef3c7] text-[#92400e]", Silver: "bg-[#f1f5f9] text-[#475569]", Blue: "bg-[#dbeafe] text-[#1e40af]",
};

const monthNames: Record<string, string> = {
  Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June",
  Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December",
};

function fmtDate(short: string): string {
  const [m, d] = short.split(" ");
  return `${monthNames[m] || m} ${d}, 2026`;
}

export default function ReservationDetail({ id }: { id: string }) {
  const router = useRouter();
  const reservation = reservations.find(r => r.id === parseInt(id));

  if (!reservation) {
    return (
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-[1200px] mx-auto px-8 py-8">
            <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-[14px] text-[#525252] hover:text-black">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 4l-4 4 4 4" /></svg>
              Back to reservations
            </button>
            <p className="text-[16px] text-[#737373] mt-6">Reservation not found.</p>
          </div>
        </main>
      </div>
    );
  }

  const p = reservation.profile;
  const initials = reservation.guest.split(" ").map(n => n[0]).join("").toUpperCase();
  const folioLines = generateFolio(reservation);
  const totalNum = parseFloat(reservation.total.replace(/[$,]/g, ""));
  const taxTotal = totalNum * 0.14750;
  const pointsEarned = getPointsEarned(reservation);
  const hasBirthday = p.birthday && p.occasion === "Birthday";

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-[1300px] mx-auto px-8 py-8">

          {/* Back */}
          <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-[14px] text-[#525252] hover:text-black transition-colors mb-6">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 4l-4 4 4 4" /></svg>
            Back to reservations
          </button>

          <div className="flex gap-8">
            {/* Left: Folio */}
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] font-semibold mb-1">Folio details</h1>
              <div className="flex items-center gap-3 text-[13px] text-[#737373] mb-2">
                <span>📅 {fmtDate(reservation.checkIn)} – {fmtDate(reservation.checkOut)}</span>
                <span>·</span>
                <span>Montage Los Cabos</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] text-[#a3a3a3]">Page 1/3 · last updated 4/5/26</span>
                <span className="text-[13px] text-[#525252]">Confirmation No. <span className="font-mono font-semibold">{reservation.confirmationNo}</span></span>
              </div>

              {/* Folio table */}
              <div className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                      <th className="text-left px-5 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider w-[140px]">Date</th>
                      <th className="text-left px-5 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">Description</th>
                      <th className="text-right px-5 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider w-[110px]">Charges</th>
                      <th className="text-right px-5 py-3 text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider w-[110px]">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {folioLines.map((line, i) => (
                      <tr key={i} className="border-b border-[#f5f5f5] last:border-b-0">
                        <td className="px-5 py-3 text-[13px] text-[#525252]">{line.date}</td>
                        <td className="px-5 py-3 text-[14px]">{line.description}</td>
                        <td className="px-5 py-3 text-[13px] text-right font-mono">{line.credits ? "" : line.charges}</td>
                        <td className="px-5 py-3 text-[13px] text-right font-mono">{line.credits || ""}</td>
                      </tr>
                    ))}

                    {/* Points earned */}
                    <tr className="border-t border-[#e5e5e5] bg-[#f0fdf4]">
                      <td className="px-5 py-3"></td>
                      <td className="px-5 py-3 text-[14px] font-semibold text-[#166534]">Bilt Points earned</td>
                      <td className="px-5 py-3 text-right" colSpan={2}>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#171717] text-white text-[13px] font-semibold">
                          +{pointsEarned.toLocaleString()} pts
                        </span>
                      </td>
                    </tr>

                    {/* Total */}
                    <tr className="border-t border-[#e5e5e5]">
                      <td className="px-5 py-3"></td>
                      <td className="px-5 py-3 text-[14px] font-semibold">Total</td>
                      <td className="px-5 py-3 text-[14px] text-right font-mono font-semibold">{(totalNum + taxTotal).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                      <td className="px-5 py-3 text-[14px] text-right font-mono font-semibold">{(totalNum + taxTotal).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                    </tr>

                    {/* Balance */}
                    <tr className="border-t border-[#e5e5e5]">
                      <td className="px-5 py-3"></td>
                      <td className="px-5 py-3 text-[14px] font-semibold">Balance</td>
                      <td className="px-5 py-3 text-[14px] text-right font-mono font-semibold text-[#16a34a]" colSpan={2}>0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-end mt-3 gap-2 text-[13px] text-[#a3a3a3]">
                Page 1 of 3
                <button className="w-7 h-7 rounded border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3L4 6l4 3" /></svg>
                </button>
                <button className="w-7 h-7 rounded border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 3l4 3-4 3" /></svg>
                </button>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-[320px] min-w-[320px] flex flex-col gap-5">

              {/* Guest card */}
              <div className="text-[11px] font-semibold text-[#a3a3a3] tracking-wider uppercase mb-0">Reservation Details</div>
              <div className="border border-[#e5e5e5] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-semibold ${
                    p.biltTier === "X" || p.biltTier === "Platinum" ? "bg-[#171717] text-white" :
                    p.biltTier === "Gold" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>{initials}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-semibold">{reservation.guest.split(" ")[0][0]}. {reservation.guest.split(" ").slice(-1)[0]}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${tierColors[p.biltTier]}`}>{p.biltTier} MEMBER</span>
                    </div>
                    <div className={`text-[12px] font-medium mt-0.5 ${
                      reservation.status === "Pending" ? "text-[#d97706]" :
                      reservation.status === "Checked-in" ? "text-[#16a34a]" :
                      reservation.status === "Confirmed" ? "text-[#2563eb]" : "text-[#737373]"
                    }`}>● {reservation.status}</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 py-2 rounded-lg bg-[#16a34a] text-white text-[13px] font-medium hover:bg-[#15803d] transition-colors">Apply rate code</button>
                  <button className="flex-1 py-2 rounded-lg border border-[#e5e5e5] text-[13px] font-medium hover:bg-[#f5f5f5] transition-colors">Contact guest</button>
                </div>

                {/* Behavior tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.behaviorTags.map((t) => (
                    <span key={t.label} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#f5f5f5] text-[#525252] border border-[#e5e5e5]">
                      {t.emoji} {t.label}
                    </span>
                  ))}
                </div>

                {/* Birthday callout */}
                {hasBirthday && (
                  <div className="px-3 py-2 rounded-lg bg-[#dcfce7] border border-[#bbf7d0] text-[13px] font-medium text-[#166534] mb-4">
                    🎂 Birthday on {p.birthday} — during stay window
                  </div>
                )}

                {/* Occasion callout */}
                {p.occasion && !hasBirthday && (
                  <div className="px-3 py-2 rounded-lg bg-[#ede9fe] border border-[#ddd6fe] text-[13px] font-medium text-[#6d28d9] mb-4">
                    ✨ {p.occasion}
                  </div>
                )}

                {/* Resort credit */}
                {reservation.credit && (
                  <div className="px-4 py-3 rounded-xl bg-[#171717] text-white mb-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[14px]">💳</span>
                      <span className="text-[15px] font-semibold">${reservation.credit.amount} Resort Credit</span>
                    </div>
                    <div className="text-[12px] text-white/60">
                      {reservation.credit.applied ? "Applied to on-property dining" : `Available to spend on-property — Bilt ${p.biltTier} benefit`}
                    </div>
                  </div>
                )}

                {/* Stay details */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-[#a3a3a3] uppercase tracking-wider">Arrival</div>
                    <div className="text-[14px] font-medium">{fmtDate(reservation.checkIn)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#a3a3a3] uppercase tracking-wider">Departure</div>
                    <div className="text-[14px] font-medium">{fmtDate(reservation.checkOut)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#a3a3a3] uppercase tracking-wider">Confirmation No.</div>
                    <div className="text-[14px] font-medium font-mono">{reservation.confirmationNo}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#a3a3a3] uppercase tracking-wider">Room No.</div>
                    <div className="text-[14px] font-medium">{reservation.roomNo}</div>
                  </div>
                </div>
              </div>

              {/* Guest Profile */}
              <div className="border border-[#e5e5e5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[16px]">👤</span>
                  <h3 className="text-[15px] font-semibold">Guest Profile</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-[#a3a3a3] uppercase tracking-wider">Lives in</div>
                    <div className="text-[14px] font-medium">{p.originCity}, {p.originState}</div>
                  </div>
                  {p.birthday && (
                    <div>
                      <div className="text-[11px] text-[#a3a3a3] uppercase tracking-wider">Birthday</div>
                      <div className="text-[14px] font-medium">{p.birthday} {hasBirthday ? "🎂" : ""}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-[11px] text-[#a3a3a3] uppercase tracking-wider">Language</div>
                    <div className="text-[14px] font-medium">{p.languages.join(", ")}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#a3a3a3] uppercase tracking-wider">Bilt since</div>
                    <div className="text-[14px] font-medium">{p.memberSince}</div>
                  </div>
                </div>
              </div>

              {/* Hotel Preference */}
              {p.hotelPreferences.length > 0 && (
                <div className="border border-[#e5e5e5] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[16px]">🏨</span>
                    <h3 className="text-[15px] font-semibold">Hotel Preference</h3>
                  </div>
                  <div className="space-y-2">
                    {p.hotelPreferences.map((pref, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" className="mt-0.5 flex-shrink-0"><path d="M3 7l3 3 5-5" /></svg>
                        <span className="text-[13px] text-[#525252] leading-snug">{pref}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Travel Insights */}
              {p.travelInsights.length > 0 && (
                <div className="border border-[#e5e5e5] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[16px]">✈️</span>
                    <h3 className="text-[15px] font-semibold">Travel Insights</h3>
                  </div>
                  <div className="space-y-4">
                    {p.travelInsights.map((insight, i) => (
                      <div key={i}>
                        <div className="text-[11px] font-semibold text-[#d97706] uppercase tracking-wider mb-1">{insight.category}</div>
                        <p className="text-[13px] text-[#525252] leading-relaxed">{insight.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Requests */}
              {reservation.specialRequests && (
                <div className="border border-[#fde68a] bg-[#fffbeb] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[16px]">📝</span>
                    <h3 className="text-[14px] font-semibold text-[#92400e]">Special Requests</h3>
                  </div>
                  <p className="text-[13px] text-[#78350f] leading-relaxed">{reservation.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
