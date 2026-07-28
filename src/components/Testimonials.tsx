import React from "react";
import { Star, Instagram } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function Testimonials() {
  const { content } = useContent();

  return (
    <section className="py-16 md:py-24 bg-white" id="testimoni">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Bukti Nyata Alumni
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-navy">
            Bukan Sekadar Janji Manis,<br />
            <span className="gradient-text">Mereka Sudah Membuktikan Hasilnya.</span>
          </h2>
        </div>

        {/* Testimonials Dynamic Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
          {content.testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* YouTube Video Player if present */}
                {testi.videoEmbedUrl && (
                  <div className="mb-5">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-lg">
                      <iframe
                        src={testi.videoEmbedUrl}
                        title={`Testimoni ${testi.name}`}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                <div className="flex gap-1 mb-3 text-yellow-400">
                  {[...Array(testi.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-navy text-xs leading-relaxed mb-6 font-medium italic">
                  &quot;{testi.quote}&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50">
                <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue font-black text-sm flex-shrink-0">
                  {testi.avatarUrl ? (
                    <img src={testi.avatarUrl} alt={testi.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    testi.name.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm text-navy">{testi.name}</p>
                  <p className="text-muted text-[11px] leading-tight">{testi.role}</p>
                  <p className="text-[10px] text-blue font-semibold leading-tight">{testi.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Reels Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-50 via-pink-50/30 to-purple-50/50 p-6 md:p-8 rounded-3xl border border-purple-200/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-full pointer-events-none"></div>

          <div className="flex-1 text-left relative z-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white mb-5 shadow-md animate-pulse">
              <Instagram className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-purple-700 font-bold mb-2">
              🎥 SOSIAL MEDIA REELS
            </p>
            <h4 className="font-black text-2xl md:text-3xl text-navy mt-1 leading-snug mb-3">
              Tonton Kesaksian Langsung di Instagram Reels
            </h4>
            <p className="text-muted text-sm leading-relaxed max-w-xl">
              Dapatkan cerita jujur alumni MAXY Masterclass mengenai pengalaman belajar langsung di kelas dan bagaimana tools AI mengubah produktivitas harian mereka.
            </p>
          </div>

          <div className="w-full md:w-[340px] flex-shrink-0 relative z-10">
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-purple-100">
              <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                <iframe
                  src="https://www.instagram.com/reel/DZ60asPTBl1/embed"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allowFullScreen={true}
                  title="Testimoni Alumni MAXY di Instagram"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
