import React from "react";
import { AlertCircle, ArrowRight, UserMinus, ShieldAlert, TrendingDown, EyeOff } from "lucide-react";

export default function Problem() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        {/* Intro */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Mohon maaf jika sedikit menyinggung, tapi...
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-navy">
            Yakin masih mau bangga jadi<br />
            <span className="text-red-500 underline decoration-red-200">one-man show sampai kurang tidur?</span>
          </h2>
        </div>

        {/* Pain Cards */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-red-50/40 border-l-4 border-red-500 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">😩</span>
              <h4 className="font-black text-sm md:text-base text-navy">Posting kalau lagi sempat (dan ingat)</h4>
            </div>
            <p className="text-muted text-xs md:text-sm leading-relaxed">
              Ide brilian kamu akan selalu kalah dengan ide biasa-biasa saja yang diposting konsisten. Kompetitormu tidak lebih pintar — mereka cuma punya sistem yang mempublikasikan karyanya setiap hari.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-red-50/40 border-l-4 border-red-500 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">😤</span>
              <h4 className="font-black text-sm md:text-base text-navy">Udah coba AI, tapi hasilnya &quot;kaku banget&quot;</h4>
            </div>
            <p className="text-muted text-xs md:text-sm leading-relaxed">
              Niatnya mau cepat, malah nambah kerjaan edit caption yang terdengar seperti robot tanpa emosi. Bukan AI-nya yang salah — tapi workflow kamu yang belum tepat.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-red-50/40 border-l-4 border-red-500 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📉</span>
              <h4 className="font-black text-sm md:text-base text-navy">Views lumayan, tapi dompet tetap aman (alias kosong)</h4>
            </div>
            <p className="text-muted text-xs md:text-sm leading-relaxed">
              Konten viral ke mana-mana, tapi tidak ada satupun yang convert jadi pembeli. Kenapa? Karena belum ada sistem yang menyambungkan penonton ke funnel penjualanmu.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-red-50/40 border-l-4 border-red-500 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">😰</span>
              <h4 className="font-black text-sm md:text-base text-navy">Tiap buka FYP, makin insecure</h4>
            </div>
            <p className="text-muted text-xs md:text-sm leading-relaxed">
              Melihat kreator lain terus berkembang sementara kamu stuck di tempat? Mereka tidak kenal lelah karena punya &apos;mesin konten&apos; yang tidak pernah minta cuti. FYP bukan soal hoki — itu murni soal sistem.
            </p>
          </div>
        </div>

        {/* Before / After Transformation Grid */}
        <div className="bg-navy rounded-3xl p-6 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }}></div>
          
          <div className="text-center mb-10 relative z-10">
            <p className="text-xs font-mono tracking-widest uppercase text-cyan font-bold mb-3">
              Pilihan Ada di Tangan Kamu
            </p>
            <h3 className="text-2xl md:text-4xl font-black">
              Bedanya bukan di bakat.<br />
              <span className="gradient-text">Bedanya ada di workflow.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto relative z-10">
            {/* Before (Cara Lama) */}
            <div className="rounded-2xl p-6 md:p-8 border-2 border-red-500/30 bg-red-500/[0.04] relative">
              <span className="absolute -top-3 left-6 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                Cara Lama 😮‍💨
              </span>
              <h4 className="font-black text-lg mb-4 mt-2 text-red-300">Kamu sekarang</h4>
              <ul className="space-y-3.5 text-xs md:text-sm text-slate-300">
                <li className="flex gap-2.5">
                  <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                  <span>Seharian penuh cuma buat 1 konten tunggal</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                  <span>Upload bergantung sepenuhnya pada mood & energi</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                  <span>Mengalami burnout karena pegang akun sendirian</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                  <span>Melihat kompetitor terus naik, kamu jalan di tempat</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                  <span>Setiap minggu terpaksa mulai produksi dari nol lagi</span>
                </li>
              </ul>
            </div>

            {/* After (Cara MAXY) */}
            <div className="rounded-2xl p-6 md:p-8 border-2 border-cyan/40 bg-cyan/[0.05] relative shadow-[0_0_30px_rgba(0,196,232,0.1)]">
              <span className="absolute -top-3 left-6 bg-gradient-to-r from-blue to-cyan text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                Cara MAXY ⚡
              </span>
              <h4 className="font-black text-lg mb-4 mt-2 text-cyan">Kamu setelah 2 hari</h4>
              <ul className="space-y-3.5 text-xs md:text-sm text-slate-200">
                <li className="flex gap-2.5">
                  <span className="text-cyan font-bold flex-shrink-0">✓</span>
                  <span>1 ide jadi 10+ konten matang dalam 1 jam saja</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-cyan font-bold flex-shrink-0">✓</span>
                  <span>Sistem produksi tetap berjalan walau kamu tidur pulas</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-cyan font-bold flex-shrink-0">✓</span>
                  <span>Mampu mengelola multiple akun tanpa kewalahan</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-cyan font-bold flex-shrink-0">✓</span>
                  <span>Konsisten tinggi tanpa bergantung pada mood</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-cyan font-bold flex-shrink-0">✓</span>
                  <span>Memiliki mesin konten yang scalable selamanya</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs md:text-sm mt-8 max-w-xl mx-auto leading-relaxed relative z-10">
            Sistem yang menghasilkan konten konsisten, berkualitas, dan scalable tanpa harus burnout setiap minggu. Itulah yang akan kamu bangun di kelas ini. Jarak perubahannya cuma <strong className="text-white">2 hari</strong>. Mau mulai sekarang, atau tahun depan masih terjebak di workflow manual?
          </p>
        </div>
      </div>
    </section>
  );
}
