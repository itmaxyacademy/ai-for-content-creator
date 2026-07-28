import React, { useState } from "react";
import { Zap, Cpu, Clock } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { AI_TOOLS } from "../data";
import { AIToolItem } from "../types";

const ToolLogoBadge: React.FC<{ tool: AIToolItem }> = ({ tool }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan/50 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-cyan/10">
      <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm overflow-hidden group-hover:scale-110 transition-transform duration-300 shrink-0">
        {!hasError ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
            alt={`${tool.name} logo`}
            className="w-full h-full object-contain"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="text-navy font-black text-xs">{tool.name.charAt(0)}</span>
        )}
      </div>
      <span className="text-sm font-bold text-slate-100 group-hover:text-cyan transition-colors tracking-wide">
        {tool.name}
      </span>
    </div>
  );
}

export default function Solutions() {
  const { content } = useContent();
  const sol = content.solutionConfig || {
    badgeText: "Solusi Pintar Bersama MAXY",
    title: "8 Pertemuan Hybrid. Satu Mesin Konten",
    titleHighlight: "Yang Mengubah Cara Kerja Kamu Selamanya.",
    subtitle: "",
    cards: []
  };

  const icons = [<Zap key="zap" className="w-6 h-6" />, <Cpu key="cpu" className="w-6 h-6" />, <Clock key="clock" className="w-6 h-6" />];

  return (
    <section className="py-16 md:py-24 bg-offwhite border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            {sol.badgeText}
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-navy mb-4">
            {sol.title}<br />
            <span className="gradient-text font-black">{sol.titleHighlight}</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {sol.subtitle}
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {(sol.cards || []).map((card, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center text-blue mb-4">
                {icons[idx % icons.length]}
              </div>
              <h3 className="font-bold text-navy text-base md:text-lg mb-2">{card.title}</h3>
              <p className="text-muted text-xs md:text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* AI Tools Mastered Badge Section */}
        <div className="bg-navy text-white rounded-3xl p-6 md:p-10 text-center relative overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
          ></div>
          
          <p className="text-xs font-mono tracking-widest uppercase text-cyan font-bold mb-6 relative z-10">
            Daftar Alat AI Utama Yang Bakal Kamu Kuasai
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-4xl mx-auto relative z-10">
            {AI_TOOLS.map((tool) => (
              <ToolLogoBadge key={tool.name} tool={tool} />
            ))}
          </div>
          
          <p className="text-[10px] text-slate-400 mt-6 font-mono relative z-10">
            *Catatan: Kurikulum Masterclass 8 Pertemuan terus dimutakhirkan secara berkala mengikuti standar industri AI kreatif paling baru.
          </p>
        </div>
      </div>
    </section>
  );
}
