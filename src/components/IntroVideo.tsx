import React from "react";
import { Instagram, Play } from "lucide-react";

export default function IntroVideo() {
  return (
    <section className="py-14 bg-gradient-to-b from-[#eaf4fd] to-white relative z-10">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#1B4FD8] uppercase bg-blue-100 px-3 py-1 rounded-full">
            🎞️ INTRO VIDEO
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-3 text-[#0B1628] tracking-tight">
            Tonton Video Pengantar Kami Di Bawah Ini
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-2 max-w-xl mx-auto">
            Pelajari konsep revolusi sistem pembuatan konten bertenaga kecerdasan buatan dari MAXY Academy.
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <div className="grid md:grid-cols-12 gap-6 items-stretch">
            {/* YouTube Main Video Embed */}
            <div className="md:col-span-8 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-xl aspect-video relative group">
              <iframe
                id="intro-video-iframe"
                className="w-full h-full"
                src="https://www.youtube.com/embed/Rt4q44v09qc?rel=0"
                title="MAXY AI-Driven Content Creation Registration Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Instagram Reels Link Card */}
            <div className="md:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-full"></div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-600 mb-4">
                  <Instagram className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#0B1628] mb-2">Lihat di Instagram Reels</h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-5">
                  Video Reels pendaftaran interaktif dari MAXY mengenai pentingnya beradaptasi dengan AI content creation secara menyeluruh.
                </p>
              </div>
              <a
                id="reels-cta-btn"
                href="https://www.instagram.com/reel/DZ4bquZzePJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Buka Instagram Reels
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
