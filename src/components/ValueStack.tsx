import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { APP_CONFIG } from "../data";

export default function ValueStack() {
  const handleScrollToDaftar = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("daftar");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stackItems = [
    {
      title: "AI Content Ecosystem Systemization",
      desc: "Desain sistem 5 komponen end-to-end & audit mandiri akun sosial mediamu.",
      value: "Rp 4.000.000",
    },
    {
      title: "Virtual CMO & Campaign Strategy Builder",
      desc: "Formula melatih AI menyusun Campaign Brief & merangkai funnel TOFU → BOFU.",
      value: "Rp 5.000.000",
    },
    {
      title: "Senior Level Content Planning Masterclass",
      desc: "Template taktis Content Plan mencakup 9 channel sosial media profesional.",
      value: "Rp 3.000.000",
    },
    {
      title: "Cinematic AI Visual Storytelling Methodology",
      desc: "Formula JSON Prompting untuk konsistensi visual video tanpa keahlian coding.",
      value: "Rp 6.000.000",
    },
    {
      title: "Mass Scale Video Creation & Multi-channel Publishing",
      desc: "Teknis ElevenLabs voiceover, auto-caption CapCut AI, dan sistem distribusi kilat.",
      value: "Rp 5.000.000",
    },
    {
      title: "EXCLUSIVE BONUS — Blueprint, Prompt Library & E-Certificate",
      desc: "Akses Claude AI Skill, Prompt Library, grup diskusi, dan sertifikat kelulusan.",
      value: "FREE BONUS",
      isBonus: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Yang Kamu Dapatkan
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-navy">
            Total nilainya jauh di atas<br />
            <span className="gradient-text">harga kelas yang kamu bayar.</span>
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 max-w-xl mx-auto">
            Jika kamu merekrut spesialis luar atau membangun manual, ini perkiraan biaya operasional yang harus kamu bayar:
          </p>
        </div>

        {/* Stack Box */}
        <div className="bg-[#0B1628] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <div className="divide-y divide-white/10">
            {stackItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 md:px-8 md:py-5 gap-3 transition-colors duration-200 hover:bg-white/[0.02] ${
                  item.isBonus ? "bg-white/[0.03]" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5 flex-shrink-0">
                    {item.isBonus ? "🎁" : "💎"}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-white">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="text-right sm:pl-4">
                  {item.isBonus ? (
                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-gradient-to-r from-blue to-cyan text-white whitespace-nowrap uppercase tracking-wider font-mono">
                      Bonus Utama
                    </span>
                  ) : (
                    <span className="text-sm md:text-base font-black text-cyan font-mono whitespace-nowrap">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Summary Footer inside the Card */}
          <div className="bg-gradient-to-r from-blue to-cyan p-6 md:px-8 md:py-6 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm uppercase tracking-wider font-mono font-bold text-white/80">
                Total Akumulasi Nilai Riil:
              </span>
              <span className="text-xl md:text-2xl font-black font-mono text-white">
                Rp 23.000.000
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/20">
              <div>
                <span className="font-black text-sm md:text-base block">
                  Harga Spesial Early Bird (Onsite)
                </span>
                <span className="text-[10px] text-white/80 block font-mono">
                  *Diskon langsung terbatas minggu ini
                </span>
              </div>
              <span className="text-2xl md:text-4xl font-black font-mono text-white">
                {APP_CONFIG.prices.onsiteEarly}
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-400 text-[10px] md:text-xs mt-4 italic font-mono">
          *Perbandingan di atas merupakan estimasi nilai aset &amp; modul kurikulum profesional jika disusun mandiri oleh tim internal.
        </p>

        <div className="text-center mt-8">
          <a
            href="#daftar"
            onClick={handleScrollToDaftar}
            className="inline-flex items-center justify-center gap-2 text-white font-bold bg-gradient-to-r from-[#25D366] to-[#1aaa52] hover:scale-105 active:scale-95 px-8 py-4 rounded-2xl text-sm md:text-base shadow-lg transition-all duration-300"
          >
            Ambil Harga Early Bird Sekarang <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
