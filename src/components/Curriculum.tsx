import React from "react";
import { MODULES, AI_TOOLS } from "../data";
import { BookOpen, Calendar, ArrowRight, Video, Target, Sparkles, Send, MessageSquare, Layers, UserCheck } from "lucide-react";
import DrivePlayer from "./DrivePlayer";

export default function Curriculum() {
  const getModuleIcon = (id: string) => {
    switch (id) {
      case "Day 1":
        return <Target className="w-5 h-5 text-blue" />;
      case "Day 2":
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case "Day 3":
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case "Day 4":
        return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case "Day 5":
        return <Layers className="w-5 h-5 text-amber-600" />;
      case "Day 6":
        return <UserCheck className="w-5 h-5 text-cyan-600" />;
      case "Day 7":
        return <Video className="w-5 h-5 text-rose-600" />;
      case "Day 8":
        return <Send className="w-5 h-5 text-blue" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-offwhite border-y border-slate-200" id="kurikulum">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Kurikulum 5 Modul · 8 Pertemuan Hybrid
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-navy">
            Dari Strategi &amp; Sistem<br />
            <span className="gradient-text">Hingga Produksi &amp; Publish.</span>
          </h2>
        </div>

        {/* 8 Pertemuan Hybrid Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {MODULES.map((mod) => (
            <div
              key={mod.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group flex flex-col justify-between"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue via-cyan to-indigo"></div>
              
              <div>
                <div className="flex items-center gap-2 mb-3.5 pt-1">
                  <span className="bg-blue/10 text-blue text-xs font-black px-3 py-1 rounded-lg font-mono tracking-wide">
                    {mod.id}
                  </span>
                  <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-blue/5 transition-colors">
                    {getModuleIcon(mod.id)}
                  </div>
                </div>

                <h3 className="font-black text-navy text-base md:text-lg mb-2 leading-snug group-hover:text-blue transition-colors">
                  {mod.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed mb-5">
                  {mod.description}
                </p>

                <div className="pt-3 border-t border-slate-100 mb-5">
                  <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    🎯 Rincian Pembelajaran:
                  </p>
                  <ul className="space-y-1.5 text-xs font-bold text-navy">
                    {mod.deliverables.map((del, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <span className="text-blue font-black flex-shrink-0">→</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tools used in this module with Logo */}
              {mod.tools && (
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">
                    🛠️ Alat AI &amp; Tools:
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {AI_TOOLS.filter((t) =>
                      mod.tools?.toLowerCase().includes(t.name.toLowerCase()) ||
                      (t.name === "Answer The Public" && mod.tools?.toLowerCase().includes("answer"))
                    ).map((t) => (
                      <span
                        key={t.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-slate-50 border border-slate-200 text-navy hover:bg-blue/5 hover:border-blue/30 transition-all shadow-xs"
                      >
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=64`}
                          alt={t.name}
                          className="w-3.5 h-3.5 object-contain rounded-2xs"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Real-world Alumni Results (Google Drive Videos) */}
        <div>
          <div className="mt-10 bg-gradient-to-br from-navy to-[#0F2342] rounded-3xl p-6 md:p-8 text-white border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div>
                <span className="text-[10px] font-mono font-black text-cyan uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md">
                  Hasil Nyata Alumni
                </span>
                <h4 className="text-xl md:text-2xl font-black mt-2">
                  Hasil Karya Video AI yang Diproduksi di Kelas
                </h4>
              </div>
              <p className="text-slate-300 text-xs md:max-w-md leading-relaxed">
                Ini adalah video asli hasil kreasi mandiri para alumni yang dirancang, di-generate, dan dipublikasikan langsung selama sesi praktik di kelas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              {/* Video 1 */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
                <div>
                  <DrivePlayer
                    src="https://drive.google.com/file/d/1ARNJ6Sv8b2iM31wakkLxp77wYG5zylL5/preview"
                    title="Alumni Showcase 1"
                  />
                </div>
                <div className="mt-3.5">
                  <p className="text-[10px] font-mono text-cyan font-bold tracking-wider uppercase">Alumni Showcase #1</p>
                  <p className="text-xs font-bold text-white mt-0.5">Video Cinematic AI Storytelling</p>
                </div>
              </div>

              {/* Video 2 */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
                <div>
                  <DrivePlayer
                    src="https://drive.google.com/file/d/1y3gCP5UqUVUSBaO_91_foLjiEwaRlTXH/preview"
                    title="Alumni Showcase 2"
                  />
                </div>
                <div className="mt-3.5">
                  <p className="text-[10px] font-mono text-cyan font-bold tracking-wider uppercase">Alumni Showcase #2</p>
                  <p className="text-xs font-bold text-white mt-0.5">High-Conversion Video Campaign AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
