import React from "react";
import { Instagram, Play } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function IntroVideo() {
  const { content } = useContent();

  const youtubeUrl = content.appConfig.introYoutubeUrl || content.appConfig.heroVideoUrl || "https://www.youtube.com/embed/Rt4q44v09qc";
  let embedSrc = "https://www.youtube.com/embed/Rt4q44v09qc?rel=0";

  if (youtubeUrl.includes("youtube.com/embed/")) {
    embedSrc = youtubeUrl;
  } else if (youtubeUrl.includes("youtu.be/")) {
    const id = youtubeUrl.split("youtu.be/")[1]?.split("?")[0];
    if (id) embedSrc = `https://www.youtube.com/embed/${id}?rel=0`;
  } else if (youtubeUrl.includes("watch?v=")) {
    const id = youtubeUrl.split("watch?v=")[1]?.split("&")[0];
    if (id) embedSrc = `https://www.youtube.com/embed/${id}?rel=0`;
  }

  const instagramUrl = content.appConfig.introInstagramUrl || "https://www.instagram.com/reel/DZ4bquZzePJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
  const instagramTitle = content.appConfig.introInstagramTitle || "Lihat di Instagram Reels";
  const instagramCta = content.appConfig.introInstagramCta || "Buka Instagram Reels";

  return (
    <section className="py-14 bg-slate-50 relative z-10">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#1B4FD8] uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
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
            <div className="md:col-span-8 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-video relative group">
              <iframe
                id="intro-video-iframe"
                className="w-full h-full"
                src={embedSrc}
                title="MAXY AI-Driven Content Creation Registration Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Instagram Reels Link Card */}
            <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between text-left shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1B4FD8] mb-4 border border-blue-100">
                  <Instagram className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#0B1628] mb-2">{instagramTitle}</h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-5">
                  Video Reels pendaftaran interaktif dari MAXY mengenai pentingnya beradaptasi dengan AI content creation secara menyeluruh.
                </p>
              </div>
              <a
                id="reels-cta-btn"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#1B4FD8] hover:bg-blue-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> {instagramCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
