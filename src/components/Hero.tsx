import React from "react";
import { Zap, Sparkles, ArrowRight } from "lucide-react";
import { APP_CONFIG } from "../data";
import CountdownTimer from "./CountdownTimer";
import holonIqLogo from "../assets/holonIQ.svg";

export default function Hero() {
  const handleScrollToDaftar = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("daftar");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-8 pb-16 md:pb-24 overflow-hidden bg-[#eaf4fd] min-h-[650px] flex flex-col justify-between">
      {/* Background Image Layer (Vertical Stripes Light Blue) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none" 
        style={{ 
          backgroundImage: "url('https://lh3.googleusercontent.com/d/1xXjsZbHy46u6KcNG5Xw7rHiQT15K5HA2')" 
        }}
      ></div>

      {/* Decorative Credibility Badge on Top Right */}
      <div className="hidden md:block absolute top-12 right-12 z-20 w-32 md:w-40 lg:w-44 select-none hover:scale-105 transition-all duration-300">
        <img
          src={holonIqLogo}
          alt="Southeast Asia Edtech 50 - HolonIQ by QS"
          referrerPolicy="no-referrer"
          className="w-full h-auto rounded-xl shadow-lg border border-slate-200/40 bg-white"
        />
      </div>

      {/* Left Avatar: Boy with Laptop */}
      <img
        src="https://lh3.googleusercontent.com/d/15IP7HQj2-t7YIdtmiMKxqzX-ht8CLV3a"
        alt="Boy with laptop"
        referrerPolicy="no-referrer"
        className="hidden lg:block absolute bottom-0 left-[1%] xl:left-[3%] h-[420px] xl:h-[480px] 2xl:h-[530px] w-auto object-contain z-10 pointer-events-none"
      />

      {/* Right Avatar: Girl with Camera */}
      <img
        src="https://lh3.googleusercontent.com/d/1BMD7TNuXaBITZQ50DB1fyBl5aA5CYaG8"
        alt="Girl with camera"
        referrerPolicy="no-referrer"
        className="hidden lg:block absolute bottom-0 right-[1%] xl:right-[3%] h-[420px] xl:h-[480px] 2xl:h-[530px] w-auto object-contain z-10 pointer-events-none"
      />

      {/* Center content container */}
      <div className="max-w-4xl mx-auto px-5 relative z-10 text-center pt-8 md:pt-12 pb-6 flex flex-col items-center">
        {/* Main Pill/Badge */}
        <div className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#1e293b] text-white font-black text-xs md:text-sm tracking-wide mb-6 shadow-sm">
          Intensive Class · {APP_CONFIG.eventDates} · Online & Onsite
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5 tracking-tight font-sans text-[#0B1628]">
          BANGUN SISTEM <br />
          KONTEN KAMU <br />
          <span className="text-[#1B4FD8]">DENGAN AI SEKARANG!</span>
        </h1>

        {/* Sub-Headline */}
        <p className="text-xs sm:text-sm md:text-base text-slate-800 font-semibold max-w-xl mx-auto leading-relaxed mb-4">
          <strong className="text-black font-black">Stop bikin konten manual satu per satu!</strong> Kreator yang tumbuh cepat bukan karena timnya lebih besar — tapi karena mereka punya <span className="text-[#1B4FD8] font-bold underline decoration-[#1B4FD8]/30">sistem.</span>
        </p>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
          Sambil kamu masih begadang edit satu video, ada kreator yang sudah tidur pulas — tapi kontennya tetap berjalan otomatis sampai pagi.
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 text-xs font-black">
          <span className="px-4 py-2 bg-[#1e293b] text-white rounded-xl flex items-center gap-1.5 shadow-sm">
            ⚡ 1 ide → 10 konten / jam
          </span>
          <span className="px-4 py-2 bg-[#1e293b] text-white rounded-xl flex items-center gap-1.5 shadow-sm">
            🤖 Sistem Aktif 24/7
          </span>
          <span className="px-4 py-2 bg-[#1e293b] text-white rounded-xl flex items-center gap-1.5 shadow-sm">
            📈 80% Lebih Efisien
          </span>
        </div>

        {/* Countdown Box */}
        <div className="w-full max-w-md mx-auto mb-6 bg-gradient-to-r from-[#1B4FD8] to-[#1241be] border border-white/20 rounded-2xl p-5 shadow-[0_12px_40px_rgba(27,79,216,0.35)] relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/15 rounded-full blur-xl pointer-events-none"></div>

          <p className="text-[11px] text-amber-300 font-extrabold mb-3 uppercase tracking-widest font-mono text-center">
            ⏳ Penawaran Early Bird Berakhir Dalam:
          </p>
          <CountdownTimer targetDate={APP_CONFIG.earlyBirdDeadline} theme="dark" size="sm" />
        </div>

        {/* CTA Button */}
        <div className="mb-4 w-full sm:w-auto">
          <a
            href="#daftar"
            onClick={handleScrollToDaftar}
            className="inline-flex items-center justify-center gap-2 text-white font-black text-sm md:text-base px-8 py-4.5 rounded-full w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-[#25D366] to-[#1aaa52] shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.45)] cursor-pointer"
          >
            Amankan Harga Early Bird Sekarang <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-3 text-[10px] text-slate-500 font-mono">
            Tinggalkan cara manual. Mulai adu sistem bersama MAXY.
          </p>
        </div>
      </div>
    </section>
  );
}
