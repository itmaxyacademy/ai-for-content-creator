import React from "react";
import { Zap, Cpu, Clock, Check } from "lucide-react";

export default function Solutions() {
  const tools = [
    "ChatGPT",
    "Gemini",
    "Claude",
    "Google Flow",
    "Higgsfield",
    "Runway ML",
    "ElevenLabs",
    "CapCut AI",
    "AnswerThePublic",
    "JSON Prompting",
    "WHISK",
  ];

  return (
    <section className="py-16 md:py-24 bg-offwhite border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Solusi Pintar Bersama MAXY
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-navy mb-4">
            2 Hari. Satu Mesin Konten<br />
            <span className="gradient-text font-black">Yang Mengubah Cara Kerja Kamu Selamanya.</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Mini Class intensif: bangun sistem produksi konten end-to-end terintegrasi AI — dari riset tren, pembuatan video, hingga distribusi terjadwal secara terarah.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center text-blue mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy text-base md:text-lg mb-2">Output Berlipat Ganda</h3>
            <p className="text-muted text-xs md:text-sm leading-relaxed">
              Hasilkan puluhan konten berkualitas tinggi dalam waktu yang sama. Mengelola banyak klien atau brand akun sekaligus tidak akan lagi menjadi kendala fisik.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan-700 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy text-base md:text-lg mb-2">Fokus Sistem Terpadu</h3>
            <p className="text-muted text-xs md:text-sm leading-relaxed">
              Kami tidak sekadar mengajarkan trik prompt biasa. Kamu akan menyusun rancangan alur produksi 1 ide dasar menjadi 10+ konten lintas platform yang scalable.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center text-amber-700 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy text-base md:text-lg mb-2">Efisien Tanpa Buang Waktu</h3>
            <p className="text-muted text-xs md:text-sm leading-relaxed">
              Pangkas hingga 80% waktu kerja dari tugas edit dan caption manual yang melelahkan. Kembalikan fokus utama kamu pada aspek konseptual bisnis.
            </p>
          </div>
        </div>

        {/* AI Tools Mastered Badge Section */}
        <div className="bg-navy text-white rounded-3xl p-6 md:p-10 text-center relative overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
          ></div>
          
          <p className="text-xs font-mono tracking-widest uppercase text-cyan font-bold mb-4 relative z-10">
            Daftar Alat AI Utama Yang Bakal Kamu Kuasai
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto relative z-10">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-2 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                {tool}
              </span>
            ))}
            <span className="px-3.5 py-2 rounded-full text-xs font-bold text-cyan border border-cyan/30 bg-cyan/5">
              &amp; banyak lagi...
            </span>
          </div>
          
          <p className="text-[10px] text-slate-500 mt-4 font-mono">
            *Catatan: Kurikulum terus dimutakhirkan secara berkala mengikuti standar industri AI kreatif paling baru (tidak mengajarkan tools usang seperti OpenAI Sora).
          </p>
        </div>
      </div>
    </section>
  );
}
