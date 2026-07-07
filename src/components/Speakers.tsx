import React, { useEffect, useState, useRef } from "react";
import { SPEAKERS } from "../data";
import { Award, Briefcase, ChevronRight, Clock, Users } from "lucide-react";

export default function Speakers() {
  const [hoursCount, setHoursCount] = useState(0);
  const [contentMult, setContentMult] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate hours (0 to 15)
            let hoursStart = 0;
            const hoursEnd = 15;
            const hoursInterval = setInterval(() => {
              hoursStart += 1;
              if (hoursStart >= hoursEnd) {
                setHoursCount(hoursEnd);
                clearInterval(hoursInterval);
              } else {
                setHoursCount(hoursStart);
              }
            }, 50);

            // Animate multiplier (0 to 9)
            let multStart = 0;
            const multEnd = 9;
            const multInterval = setInterval(() => {
              multStart += 1;
              if (multStart >= multEnd) {
                setContentMult(multEnd);
                clearInterval(multInterval);
              } else {
                setContentMult(multStart);
              }
            }, 80);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Pemateri Utama
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-navy">
            Belajar dari <span className="gradient-text">ahli aktif,</span><br />
            bukan sekadar pengajar teori.
          </h2>
        </div>

        {/* Speakers Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {SPEAKERS.map((sp, idx) => {
            const isDark = idx === 0;
            return (
              <div
                key={sp.name}
                className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.01] shadow-sm relative overflow-hidden flex flex-col justify-between ${
                  isDark
                    ? "bg-navy text-white border-blue-900/30"
                    : "bg-offwhite text-navy border-slate-200"
                }`}
              >
                {isDark && (
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                    style={{ background: "radial-gradient(circle,#00C4E8,transparent)" }}
                  ></div>
                )}
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
                  <div
                    className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl md:rounded-[2rem] flex items-center justify-center text-3xl font-black overflow-hidden border flex-shrink-0 shadow-md ${
                      isDark 
                        ? "bg-blue/20 text-cyan border-white/10 ring-4 ring-cyan/5" 
                        : "bg-blue/10 text-blue border-slate-200 ring-4 ring-blue/5"
                    }`}
                  >
                    {sp.imageUrl && !imgErrors[sp.name] ? (
                      <img
                        src={sp.imageUrl}
                        alt={sp.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top scale-105 transition-transform duration-500 hover:scale-110"
                        onError={() => {
                          setImgErrors((prev) => ({ ...prev, [sp.name]: true }));
                        }}
                      />
                    ) : (
                      <span>{sp.initials}</span>
                    )}
                  </div>
                  
                  <div className="flex-1 mt-3 md:mt-0">
                    <h4 className="text-xl md:text-2xl font-black mb-1 leading-snug">{sp.name}</h4>
                    <p
                      className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                        isDark ? "text-cyan" : "text-blue"
                      }`}
                    >
                      {sp.role}
                    </p>
                    <p className={`text-xs md:text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {sp.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/20 flex items-center gap-1.5 text-xs font-semibold">
                  {isDark ? (
                    <span className="text-cyan flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Konsultan Bisnis AI Terpercaya
                    </span>
                  ) : (
                    <span className="text-blue flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" /> Master Digital Strategist
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cost of Inaction Sub-section */}
        <div className="max-w-4xl mx-auto pt-16 border-t border-slate-100" ref={statsRef}>
          <div className="text-center mb-10">
            <p className="text-xs font-mono tracking-widest uppercase text-ember font-bold mb-3">
              Harga dari &quot;Nanti Aja&quot;
            </p>
            <h3 className="text-2xl md:text-4xl font-black leading-tight text-navy">
              Menunda Itu Benar-Benar <span className="ember-text font-black">Tidak Gratis.</span>
            </h3>
            <p className="text-muted mt-3 max-w-xl mx-auto text-xs md:text-sm">
              Setiap minggu kamu bersikeras menggunakan cara manual, ini yang diam-diam hilang dari produktivitasmu:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 max-w-2xl mx-auto">
            <div className="bg-offwhite rounded-2xl p-6 text-center border border-slate-200 transition-all duration-300 hover:shadow-xs">
              <p className="text-4xl md:text-5xl font-black font-mono ember-text">{hoursCount}</p>
              <p className="text-xs md:text-sm text-navy font-semibold mt-2 leading-snug">
                jam / minggu terbuang
              </p>
              <p className="text-muted text-[11px] mt-1 leading-normal">
                untuk tugas-tugas repetitif yang sebenarnya bisa di-otomasi penuh oleh AI.
              </p>
            </div>

            <div className="bg-offwhite rounded-2xl p-6 text-center border border-slate-200 transition-all duration-300 hover:shadow-xs">
              <p className="text-4xl md:text-5xl font-black font-mono ember-text">{contentMult}×</p>
              <p className="text-xs md:text-sm text-navy font-semibold mt-2 leading-snug">
                lebih sedikit output konten
              </p>
              <p className="text-muted text-[11px] mt-1 leading-normal">
                dibandingkan kreator cerdas yang sudah menggunakan sistem akselerasi AI.
              </p>
            </div>
          </div>

          <div className="bg-[#0B1628] text-white rounded-2xl p-5 md:p-6 text-center shadow-lg">
            <p className="text-xs md:text-sm font-medium leading-relaxed">
              Investasi kelas ini akan terbayar lunas <span className="text-cyan font-bold">di minggu pertama</span> hanya dari nilai efisiensi waktu yang berhasil kamu selamatkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
