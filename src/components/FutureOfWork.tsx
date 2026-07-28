import React from "react";
import { TrendingUp, Zap, ShieldCheck, Globe, Sparkles } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function FutureOfWork() {
  const { content } = useContent();
  const fw = content.futureWorkConfig || {
    badgeText: "TRENS & DISRUPSI INDUSTRI KREATIF",
    title: "Future of Work: AI Bukan Menggantikan Manusia,",
    titleHighlight: "Tapi Manusia Yang Menggunakan AI Menggantikan Yang Manual.",
    subtitle: "Perubahan lanskap industri digital bergerak 10x lebih cepat. Pahami mengapa penguasaan AI content ecosystem menjadi skill paling krusial di era baru.",
    cards: []
  };

  return (
    <section className="py-16 md:py-24 bg-[#0B1628] text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Subtle Grid Pattern & Glow Effects */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-5 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            {fw.badgeText}
          </div>

          <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-3xl mx-auto mb-4 text-white">
            {fw.title}<br />
            <span className="gradient-text">{fw.titleHighlight}</span>
          </h2>

          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            {fw.subtitle}
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(fw.cards || []).map((card, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 hover:bg-slate-900 p-6 md:p-7 rounded-2xl border border-slate-800 hover:border-cyan/50 transition-all duration-300 shadow-xl hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {card.icon ? (
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {card.icon}
                    </span>
                  ) : (
                    <span className="w-3 h-3 rounded-full bg-cyan"></span>
                  )}
                  {card.stat && (
                    <span className="text-xl md:text-2xl font-black font-mono text-cyan tracking-tight">
                      {card.stat}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-white text-base md:text-lg mb-2 group-hover:text-cyan transition-colors">
                  {card.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>MAXY AI Standard</span>
                <TrendingUp className="w-3.5 h-3.5 text-cyan opacity-60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
