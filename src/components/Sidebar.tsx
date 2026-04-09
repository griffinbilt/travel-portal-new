"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Reporting", icon: "chart", href: "/dashboard" },
  { name: "Reservations", icon: "calendar", href: "/" },
  { name: "Experiences", icon: "heart", href: "/experiences" },
  { name: "Commissions", icon: "dollar", href: "/commissions" },
  { name: "Payments", icon: "wallet", href: "/payments" },
  { name: "Agencies", icon: "globe", href: "/agencies" },
];

const bottomNavItems = [
  { name: "Settings", icon: "settings", href: "/settings" },
];

function NavIcon({ type }: { type: string }) {
  switch (type) {
    case "chart":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="10" width="4" height="7" rx="0.5" />
          <rect x="7" y="6" width="4" height="11" rx="0.5" />
          <rect x="13" y="1" width="4" height="16" rx="0.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="16" height="14" rx="2" />
          <path d="M1 7h16" />
          <path d="M5 1v4M13 1v4" />
        </svg>
      );
    case "heart":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 16s-6.5-4.35-6.5-8.5A3.5 3.5 0 019 4.63 3.5 3.5 0 0115.5 7.5C15.5 11.65 9 16 9 16z" />
        </svg>
      );
    case "dollar":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="9" r="8" />
          <path d="M9 4v10M6.5 7c0-1.1 1.1-2 2.5-2s2.5.9 2.5 2-1.1 2-2.5 2-2.5.9-2.5 2 1.1 2 2.5 2 2.5-.9 2.5-2" />
        </svg>
      );
    case "wallet":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="16" height="12" rx="2" />
          <path d="M1 8h16" />
          <path d="M5 2v2" />
          <circle cx="13" cy="12" r="1" />
        </svg>
      );
    case "globe":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="9" r="8" />
          <path d="M1 9h16" />
          <path d="M9 1c2.2 2.6 3.4 5.6 3.4 8s-1.2 5.4-3.4 8c-2.2-2.6-3.4-5.6-3.4-8s1.2-5.4 3.4-8z" />
        </svg>
      );
    case "settings":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="9" r="2.5" />
          <path d="M7.6 1.5h2.8l.4 2.1a5.5 5.5 0 011.4.8l2-.8 1.4 2.4-1.6 1.3a5.6 5.6 0 010 1.6l1.6 1.3-1.4 2.4-2-.8a5.5 5.5 0 01-1.4.8l-.4 2.1H7.6l-.4-2.1a5.5 5.5 0 01-1.4-.8l-2 .8-1.4-2.4 1.6-1.3a5.6 5.6 0 010-1.6L2.4 6l1.4-2.4 2 .8a5.5 5.5 0 011.4-.8l.4-2.1z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname.startsWith("/reservation");
    if (href === "/experiences") return pathname.startsWith("/experiences");
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-[220px] min-w-[220px] h-full bg-[#fafafa] border-r border-[#e5e5e5] flex flex-col">
      {/* Property selector */}
      <div className="px-4 pt-5 pb-1">
        <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/60 transition-colors">
          <div>
            <div className="text-[14px] font-semibold text-left">Montage Los Cabos</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5l3 3 3-3" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
              isActive(item.href)
                ? "bg-white text-black shadow-sm"
                : "text-[#525252] hover:bg-white/60"
            }`}
          >
            <NavIcon type={item.icon} />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom Nav */}
      <nav className="px-3 pb-2">
        {bottomNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
              isActive(item.href)
                ? "bg-white text-black shadow-sm"
                : "text-[#525252] hover:bg-white/60"
            }`}
          >
            <NavIcon type={item.icon} />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-[#e5e5e5] px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#e5e5e5] flex items-center justify-center text-[11px] font-semibold text-[#525252]">
          TM
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium truncate">Theo Mason</div>
          <div className="text-[11px] text-[#a3a3a3] truncate">theo@gmail.com</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6l3-3 3 3" />
          <path d="M4 8l3 3 3-3" />
        </svg>
      </div>

      {/* Footer */}
      <div className="border-t border-[#e5e5e5] px-4 py-2 flex items-center justify-between">
        <div className="font-mono text-[9px] tracking-[0.2em] text-[#a3a3a3] leading-tight">
          TRAVEL<br/>SUPPLIER PLATFORM
        </div>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#a3a3a3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 10.5L7 2l6 8.5H1z" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#a3a3a3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="6" />
            <path d="M7 4v3l2 2" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
