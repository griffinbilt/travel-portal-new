"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { experiences, availableServices } from "@/lib/data";

function ExpIcon({ type, bg }: { type: string; bg: string }) {
  return (
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[20px] flex-shrink-0" style={{ backgroundColor: bg }}>
      {type === "booking" && "📋"}
      {type === "arrival" && "✈️"}
      {type === "dining" && "🍽"}
      {type === "departure" && "🚗"}
      {type === "wellness" && "🧘"}
      {type === "concierge" && "🎩"}
    </div>
  );
}

function ServiceToggle({ enabled: init }: { enabled: boolean }) {
  const [on, setOn] = useState(init);
  return (
    <button onClick={(e) => { e.stopPropagation(); setOn(!on); }} className={`toggle-track ${on ? "active" : ""}`}>
      <div className="toggle-thumb" />
    </button>
  );
}

function PartnerServiceIcon({ icon }: { icon: string }) {
  const map: Record<string, string> = {
    helicopter: "🚁", car: "🚗", fitness: "🚴", points: "⭐", dining: "🍽",
    cake: "🎂", spa: "💆", map: "🗺", minibar: "🧊",
  };
  return (
    <div className="w-9 h-9 rounded-lg bg-[#fef3c7] flex items-center justify-center text-[18px] flex-shrink-0">
      {map[icon] || "📦"}
    </div>
  );
}

export default function ExperiencesPage() {
  const router = useRouter();

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-[1200px] mx-auto px-8 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[24px] font-semibold">Experiences</h1>
              <p className="text-[14px] text-[#737373] mt-1">Design curated guest experiences powered by Bilt&apos;s partner network</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#171717] text-white text-[14px] font-medium hover:bg-[#404040] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3v10M3 8h10" /></svg>
              Create experience
            </button>
          </div>

          {/* Info banner */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#fafafa] border border-[#e5e5e5] mb-8">
            <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center text-[18px] flex-shrink-0">✨</div>
            <div>
              <div className="text-[15px] font-semibold mb-1">Bilt Verified Experiences</div>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                Combine services from Bilt&apos;s partner ecosystem — BLADE helicopters, Blacklane transfers, SoulCycle classes, dining credits, and more — into curated guest journeys. Target by Bilt tier, occasion, or guest segment. Each experience auto-triggers based on reservation phases.
              </p>
            </div>
          </div>

          {/* Active Experiences */}
          <div className="text-[12px] font-semibold text-[#a3a3a3] tracking-wider uppercase mb-4">Active Experiences</div>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => router.push(`/experiences/${exp.id}`)}
                className="flex flex-col p-5 rounded-2xl border border-[#e5e5e5] text-left transition-all hover:border-[#a3a3a3] hover:shadow-sm group"
              >
                <div className="flex items-start justify-between mb-3 w-full">
                  <ExpIcon type={exp.icon} bg={exp.iconBg} />
                  <span className={`text-[12px] font-medium ${
                    exp.status === "Published" ? "text-[#16a34a]" :
                    exp.status === "Draft" ? "text-[#d97706]" : "text-[#a3a3a3]"
                  }`}>
                    {exp.status === "Published" && "● "}
                    {exp.status === "Draft" && "● "}
                    {exp.status}
                  </span>
                </div>

                <div className="text-[16px] font-semibold mb-1">{exp.name}</div>
                <p className="text-[13px] text-[#737373] leading-relaxed mb-3 line-clamp-2">{exp.description}</p>

                {/* Service pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {exp.servicePills.map((pill) => (
                    <span key={pill.label} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#f5f5f5] text-[#525252] border border-[#e5e5e5]">
                      {pill.emoji} {pill.label}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between w-full mt-auto pt-2">
                  <span className="text-[12px] text-[#a3a3a3]">
                    Target: <span className="text-[#525252] font-medium">{exp.segment}</span> · {exp.services.length} services
                    {exp.services.some(s => s.isDefault) && " · Default enabled"}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#525252] transition-colors">
                    <path d="M5 3l4 4-4 4" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Available Services */}
          <div className="text-[12px] font-semibold text-[#a3a3a3] tracking-wider uppercase mb-2">Available Services</div>
          <p className="text-[13px] text-[#737373] mb-4">Individual services from Bilt&apos;s partner network. Add these to any experience, or enable them standalone for all guests.</p>
          <div className="grid grid-cols-3 gap-4">
            {availableServices.map((svc) => (
              <div key={svc.id} className="rounded-xl border border-[#e5e5e5] p-5 transition-all hover:border-[#a3a3a3]">
                <div className="flex items-start justify-between mb-3">
                  <PartnerServiceIcon icon={svc.icon} />
                </div>
                <div className="text-[14px] font-semibold mb-1">{svc.name}</div>
                <p className="text-[12px] text-[#737373] leading-relaxed mb-3 line-clamp-2">{svc.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#525252]">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: svc.partnerColor }} />
                    {svc.partnerBrand}
                  </span>
                  <ServiceToggle enabled={svc.enabled} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
