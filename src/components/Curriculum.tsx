import React from "react";
import { MODULES } from "../data";
import { BookOpen, Calendar, ArrowRight, Video, Target, Sparkles, Send } from "lucide-react";
import DrivePlayer from "./DrivePlayer";

export default function Curriculum() {
  const day1Modules = MODULES.slice(0, 3);
  const day2Modules = MODULES.slice(3, 5);

  const getModuleIcon = (id: string) => {
    switch (id) {
      case "M1":
        return <Target className="w-5 h-5 text-blue" />;
      case "M2":
        return <Sparkles className="w-5 h-5 text-blue" />;
      case "M3":
        return <BookOpen className="w-5 h-5 text-blue" />;
      case "M4":
        return <Video className="w-5 h-5 text-cyan" />;
      case "M5":
        return <Send className="w-5 h-5 text-cyan" />;
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
            Kurikulum 5 Modul · 2 Hari
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-navy">
            Hari 1: Strategi &amp; Sistem.<br />
            <span className="gradient-text">Hari 2: Produksi &amp; Publish.</span>
          </h2>
        </div>

        {/* DAY 1 Block */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-navy text-white text-xs font-black px-4 py-2 rounded-xl tracking-wider font-mono">
              DAY 1
            </div>
            <div className="flex-1 h-px bg-slate-200"></div>
            <p className="text-muted text-[10px] md:text-xs font-semibold uppercase tracking-wider font-mono">
              Modul 1–3 · Strategy to System
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {day1Modules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue to-cyan"></div>
                
                <div className="flex items-center gap-2 mb-3 pt-1">
                  <span className="bg-blue/10 text-blue text-xs font-black px-2.5 py-1 rounded-lg font-mono">
                    {mod.id}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-50 group-hover:bg-blue/5 transition-colors">
                    {getModuleIcon(mod.id)}
                  </div>
                </div>

                <h3 className="font-black text-navy text-base md:text-lg mb-2 leading-snug">
                  {mod.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed mb-4">
                  {mod.description}
                </p>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    🎯 Rincian Pembelajaran:
                  </p>
                  <ul className="space-y-2 text-xs text-navy">
                    {mod.deliverables.map((del, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <span className="text-blue font-black flex-shrink-0">→</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DAY 2 Block */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue to-cyan text-white text-xs font-black px-4 py-2 rounded-xl tracking-wider font-mono">
              DAY 2
            </div>
            <div className="flex-1 h-px bg-slate-200"></div>
            <p className="text-muted text-[10px] md:text-xs font-semibold uppercase tracking-wider font-mono">
              Modul 4–5 · Production to Publish
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {day2Modules.map((mod) => {
              const isDark = mod.id === "M5";
              return (
                <div
                  key={mod.id}
                  className={`p-6 md:p-8 rounded-2xl border relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
                    isDark
                      ? "bg-navy text-white border-white/5"
                      : "bg-white text-navy border-slate-200 shadow-xs"
                  }`}
                >
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-blue"></div>
                  {isDark && (
                    <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle,#00C4E8,transparent)" }}></div>
                  )}

                  <div className="flex items-center gap-2 mb-3 pt-1">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg font-mono ${
                      isDark ? "bg-white/10 text-cyan" : "bg-cyan/10 text-cyan-700"
                    }`}>
                      {mod.id}
                    </span>
                    <div className={`p-1.5 rounded-lg ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                      {getModuleIcon(mod.id)}
                    </div>
                  </div>

                  <h3 className="font-black text-lg md:text-xl mb-2 leading-snug">
                    {mod.title}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-5 ${isDark ? "text-slate-300" : "text-muted"}`}>
                    {mod.description}
                  </p>

                  <div className={`pt-4 border-t ${isDark ? "border-white/10" : "border-slate-100"}`}>
                    <p className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-2.5 ${
                      isDark ? "text-slate-400" : "text-slate-400"
                    }`}>
                      🎯 Rincian Pembelajaran:
                    </p>
                    <ul className="space-y-2 text-xs">
                      {mod.deliverables.map((del, index) => (
                        <li key={index} className="flex gap-2 items-start">
                          <span className={`font-black flex-shrink-0 ${isDark ? "text-cyan" : "text-blue"}`}>→</span>
                          <span className={isDark ? "text-slate-200" : "text-navy"}>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`mt-5 pt-3 border-t text-[11px] font-semibold ${
                    isDark ? "border-white/10 text-slate-500" : "border-slate-100 text-muted"
                  }`}>
                    {mod.id === "M4" ? (
                      <span>Alat Pendukung: <strong className={isDark ? "text-white" : "text-navy"}>ChatGPT · WHISK · Runway ML</strong></span>
                    ) : (
                      <span>Alat Pendukung: <strong className={isDark ? "text-white" : "text-navy"}>ElevenLabs · CapCut AI</strong></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day 2 Real-world Alumni Results (Google Drive Videos) */}
          <div className="mt-10 bg-gradient-to-br from-navy to-[#0F2342] rounded-3xl p-6 md:p-8 text-white border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div>
                <span className="text-[10px] font-mono font-black text-cyan uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md">
                  Hasil Nyata Alumni Hari 2
                </span>
                <h4 className="text-xl md:text-2xl font-black mt-2">
                  Hasil Karya Video AI yang Diproduksi di Kelas
                </h4>
              </div>
              <p className="text-slate-300 text-xs md:max-w-md leading-relaxed">
                Ini adalah video asli hasil kreasi mandiri para alumni yang dirancang, di-generate, dan dipublikasikan langsung selama sesi praktik Hari ke-2.
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
