import React from "react";

export default function TrustBanner() {
  return (
    <section className="py-5 bg-offwhite border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 text-[10px] md:text-xs text-slate-500 font-bold whitespace-nowrap uppercase tracking-widest font-mono">
          <span className="flex items-center gap-1.5 text-navy">
            🏆 HolonIQ SE Asia EdTech Top 50
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="flex items-center gap-1.5 text-navy">
            🤝 350+ Universitas Mitra
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="flex items-center gap-1.5 text-navy">
            🏢 100+ Organisasi / Klien
          </span>
        </div>
      </div>
    </section>
  );
}
