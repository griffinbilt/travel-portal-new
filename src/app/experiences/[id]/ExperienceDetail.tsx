"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { experiences } from "@/lib/data";

function ExpHeaderIcon({ type, bg }: { type: string; bg: string }) {
  const map: Record<string, string> = { booking: "📋", arrival: "✈️", dining: "🍽", departure: "🚗", wellness: "🧘", concierge: "🎩" };
  return (
    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[28px] flex-shrink-0" style={{ backgroundColor: bg }}>
      {map[type] || "📦"}
    </div>
  );
}

function SvcIcon({ icon }: { icon: string }) {
  const map: Record<string, string> = {
    helicopter: "🚁", car: "🚗", gift: "🎁", dining: "🍽", cake: "🎂", percent: "🍷",
    fitness: "🚴", points: "⭐", mail: "✉️", clipboard: "📋", concierge: "👤",
    checkout: "🕐", spa: "💆", map: "🗺", minibar: "🧊", feedback: "💬",
  };
  return (
    <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center text-[18px] flex-shrink-0">
      {map[icon] || "📦"}
    </div>
  );
}

const recentActivity = [
  { name: "Isabella Wilson", action: "completed the arrival experience. BLADE transfer confirmed.", time: "2 hours ago", active: true },
  { name: "Francisco Garcia", action: "checked in. Welcome amenity delivered to room 809.", time: "5 hours ago", active: true },
  { name: "Hugo Rodriguez", action: "requested Blacklane instead of BLADE. Updated.", time: "Yesterday", active: false },
];

export default function ExperienceDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const experience = experiences.find((e) => e.id === id);
  const [serviceStates, setServiceStates] = useState<Record<string, boolean>>(() => {
    if (!experience) return {};
    return Object.fromEntries(experience.services.map((s) => [s.id, s.enabled]));
  });

  if (!experience) {
    return (
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-[1200px] mx-auto px-8 py-8">
            <button onClick={() => router.push("/experiences")} className="flex items-center gap-1.5 text-[14px] text-[#525252] hover:text-black">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 4l-4 4 4 4" /></svg>
              Back to experiences
            </button>
            <p className="text-[16px] text-[#737373] mt-6">Experience not found.</p>
          </div>
        </main>
      </div>
    );
  }

  const toggleService = (sid: string) => setServiceStates(prev => ({ ...prev, [sid]: !prev[sid] }));

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-[1200px] mx-auto px-8 py-8">

          {/* Back */}
          <button onClick={() => router.push("/experiences")} className="flex items-center gap-1.5 text-[14px] text-[#525252] hover:text-black transition-colors mb-6">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 4l-4 4 4 4" /></svg>
            Back to experiences
          </button>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              <ExpHeaderIcon type={experience.icon} bg={experience.iconBg} />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-[24px] font-semibold">{experience.name}</h1>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ${
                    experience.status === "Published" ? "bg-[#dcfce7] text-[#166534]" :
                    experience.status === "Draft" ? "bg-[#fef3c7] text-[#92400e]" :
                    "bg-[#f5f5f5] text-[#737373]"
                  }`}>
                    {experience.status === "Published" && "● "}
                    {experience.status === "Draft" && "● "}
                    {experience.status}
                  </span>
                </div>
                <p className="text-[14px] text-[#737373] max-w-[600px] leading-relaxed">{experience.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-lg border border-[#e5e5e5] text-[14px] font-medium hover:bg-[#f5f5f5] transition-colors">Edit default</button>
              <button className="px-5 py-2.5 rounded-lg bg-[#171717] text-white text-[14px] font-medium hover:bg-[#404040] transition-colors">Save changes</button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Left content */}
            <div className="flex-1 min-w-0">

              {/* Customer Outreach */}
              {experience.outreachMessages.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[18px]">📬</span>
                      <h2 className="text-[17px] font-semibold">Customer Outreach</h2>
                    </div>
                    <span className="text-[13px] text-[#a3a3a3]">{experience.outreachMessages.length} messages</span>
                  </div>
                  <div className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                    {experience.outreachMessages.map((msg, i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors cursor-pointer">
                        <div className="w-7 h-7 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[12px] font-semibold text-[#525252] flex-shrink-0">{i + 1}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] font-semibold">{msg.title}</div>
                          <div className="text-[12px] text-[#a3a3a3]">{msg.trigger} · {msg.description}</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"><path d="M5 3l4 4-4 4" /></svg>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">🎁</span>
                    <h2 className="text-[17px] font-semibold">Services</h2>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e5e5] text-[13px] font-medium hover:bg-[#f5f5f5] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 3v8M3 7h8" /></svg>
                    Add service
                  </button>
                </div>
                <div className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                  {experience.services.map((svc, i) => {
                    const isOn = serviceStates[svc.id] ?? svc.enabled;
                    return (
                      <div key={svc.id} className="flex items-center gap-4 px-5 py-4 border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[11px] font-semibold text-[#a3a3a3] flex-shrink-0">{i + 1}</div>
                        <SvcIcon icon={svc.icon} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] font-semibold">{svc.name}</div>
                          <div className="text-[12px] text-[#a3a3a3]">{svc.description}</div>
                        </div>
                        {svc.partnerBrand && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#f5f5f5] text-[#525252] flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: svc.partnerColor || "#525252" }} />
                            {svc.partnerBrand}
                          </span>
                        )}
                        <button onClick={() => toggleService(svc.id)} className={`toggle-track flex-shrink-0 ${isOn ? "active" : ""}`}>
                          <div className="toggle-thumb" />
                        </button>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" className="flex-shrink-0"><path d="M5 3l4 4-4 4" /></svg>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Offer & Rewards */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">🏆</span>
                    <h2 className="text-[17px] font-semibold">Offer & Rewards</h2>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e5e5] text-[13px] font-medium hover:bg-[#f5f5f5] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 3v8M3 7h8" /></svg>
                    Add reward
                  </button>
                </div>
                <div className="border border-[#e5e5e5] rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[20px]">⭐</span>
                      <div>
                        <div className="text-[14px] font-semibold">Reward guests for checklist completion</div>
                        <div className="text-[12px] text-[#a3a3a3]">Complete preference survey + provide flight details = earn bonus Bilt points</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-[#fef3c7] text-[#92400e]">🎁 500 pts</span>
                      <div className="toggle-track active"><div className="toggle-thumb" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-[280px] min-w-[280px] flex flex-col gap-5">

              {/* Target Audience */}
              <div>
                <div className="text-[11px] font-semibold text-[#a3a3a3] tracking-wider uppercase mb-3">Target Audience</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5]">
                    <div className="w-8 h-8 rounded-full bg-[#171717] flex items-center justify-center text-[10px] font-bold text-white">X</div>
                    <div>
                      <div className="text-[13px] font-semibold">Bilt X Members</div>
                      <div className="text-[11px] text-[#a3a3a3]">~340 upcoming reservations</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5]">
                    <div className="w-8 h-8 rounded-full bg-[#525252] flex items-center justify-center text-[10px] font-bold text-white">P</div>
                    <div>
                      <div className="text-[13px] font-semibold">Bilt Platinum Members</div>
                      <div className="text-[11px] text-[#a3a3a3]">~580 upcoming reservations</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#737373]">Eligible guests</span>
                    <span className="text-[14px] font-semibold">920</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#737373]">Est. activation rate</span>
                    <span className="text-[14px] font-semibold">73%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#737373]">Avg. guest LTV uplift</span>
                    <span className="text-[14px] font-semibold text-[#16a34a]">+$1,240</span>
                  </div>
                </div>
              </div>

              {/* Escalations */}
              <div>
                <div className="text-[11px] font-semibold text-[#a3a3a3] tracking-wider uppercase mb-3">Escalations</div>
                <p className="text-[12px] text-[#737373] mb-3">Hand off to staff when guest needs exceed automation</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"><circle cx="7" cy="5" r="3" /><path d="M2 13c0-3 2.2-5 5-5s5 2 5 5" /></svg>
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold">Maria Gonzalez</div>
                      <div className="text-[11px] text-[#a3a3a3]">VIP Guest Relations Manager</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"><circle cx="7" cy="5" r="3" /><path d="M2 13c0-3 2.2-5 5-5s5 2 5 5" /></svg>
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold">Carlos Rivera</div>
                      <div className="text-[11px] text-[#a3a3a3]">Front Desk Lead</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <div className="text-[11px] font-semibold text-[#a3a3a3] tracking-wider uppercase mb-3">Notifications</div>
                <div className="space-y-0">
                  <NotifRow label="Notify when experience started" defaultOn />
                  <NotifRow label="Notify when guest responds" defaultOn />
                  <NotifRow label="Alert if incomplete within 24h" defaultOn={false} />
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="text-[11px] font-semibold text-[#a3a3a3] tracking-wider uppercase mb-3">Recent Activity</div>
                <div className="space-y-3">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${a.active ? "bg-[#171717]" : "bg-[#d4d4d4]"}`} />
                      <div>
                        <p className="text-[13px] leading-snug"><span className="font-semibold">{a.name}</span> {a.action}</p>
                        <span className="text-[11px] text-[#a3a3a3]">{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NotifRow({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#f5f5f5] last:border-b-0">
      <span className="text-[13px] text-[#525252]">{label}</span>
      <button onClick={() => setOn(!on)} className={`toggle-track ${on ? "active" : ""}`}><div className="toggle-thumb" /></button>
    </div>
  );
}
