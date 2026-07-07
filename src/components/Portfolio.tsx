import React from "react";
import { Film, Play } from "lucide-react";
import { VIDEOS } from "../data";

export default function Portfolio() {
  // Filter portfolio videos
  const portfolioVideos = VIDEOS.filter((v) => v.category === "portfolio");

  return (
    <section className="py-16 md:py-24 bg-offwhite border-t border-slate-200" id="portfolio">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Portfolio Hasil Kerja
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">
            Kumpulan Video Portfolio <span className="gradient-text">MAXY Academy</span>
          </h2>
          <p className="text-muted text-xs md:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Lihat langsung hasil nyata karya-karya kreatif dan studi pembuatan aset multimedia video bertenaga AI yang kami kembangkan bersama para alumni dan praktisi.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {portfolioVideos.map((video, index) => (
            <div
              key={video.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Video Embed Container */}
              <div className="aspect-video w-full bg-slate-900 overflow-hidden relative">
                {video.url.includes("drive.google.com") ? (
                  <iframe
                    className="w-full h-full border-0"
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : video.embedId ? (
                  <iframe
                    className="w-full h-full border-0"
                    src={`https://www.youtube.com/embed/${video.embedId}?rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-800">
                    <Play className="w-8 h-8 opacity-40" />
                  </div>
                )}
              </div>

              {/* Title Content */}
              <div className="p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan-700 flex-shrink-0">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan uppercase tracking-wider">
                    Aset Karya AI #{index + 1}
                  </span>
                  <h4 className="font-bold text-sm text-navy leading-snug">
                    {video.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
