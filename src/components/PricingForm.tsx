import React, { useState, useEffect } from "react";
import { Check, ShieldCheck, HelpCircle, Users, Sparkles, Send } from "lucide-react";
import { APP_CONFIG } from "../data";
import { Lead } from "../types";
import CountdownTimer from "./CountdownTimer";

export default function PricingForm() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    whatsapp: "",
    kota: "",
    pekerjaan: "",
    namaPerusahaan: "",
    paket: "Hybrid_Promo", // default option
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);

  // Dynamic price lookup
  const getSelectedPrice = (paketCode: string) => {
    switch (paketCode) {
      case "Hybrid_Promo":
      case "Onsite_Promo":
      case "Online":
      case "Onsite":
        return {
          name: "8 Pertemuan Hybrid - Promo 10 Orang Pertama",
          current: APP_CONFIG.prices.promoFirst10,
          normal: APP_CONFIG.prices.earlyBird,
        };
      case "Hybrid_Early":
        return {
          name: "8 Pertemuan Hybrid - Early Bird Regular",
          current: APP_CONFIG.prices.earlyBird,
          normal: APP_CONFIG.prices.normal,
        };
      default:
        return {
          name: "8 Pertemuan Hybrid",
          current: APP_CONFIG.prices.promoFirst10,
          normal: APP_CONFIG.prices.earlyBird,
        };
    }
  };

  const currentPriceInfo = getSelectedPrice(formData.paket);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Email aktif wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp wajib diisi";
    } else if (formData.whatsapp.length < 9) {
      newErrors.whatsapp = "Nomor WhatsApp terlalu pendek";
    }
    if (!formData.kota.trim()) newErrors.kota = "Kota asal wajib diisi";
    if (!formData.pekerjaan.trim()) newErrors.pekerjaan = "Pekerjaan wajib diisi";
    if (!formData.namaPerusahaan.trim()) {
      newErrors.namaPerusahaan = "Nama instansi/perusahaan wajib diisi";
    }
    if (!formData.paket) newErrors.paket = "Pilih salah satu opsi paket";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedPriceObj = getSelectedPrice(formData.paket);
    const newLead: Lead = {
      id: Math.random().toString(36).substring(2, 9),
      nama: formData.nama.trim(),
      email: formData.email.trim(),
      whatsapp: formData.whatsapp.trim(),
      kota: formData.kota.trim(),
      pekerjaan: formData.pekerjaan.trim(),
      namaPerusahaan: formData.namaPerusahaan.trim(),
      paket: selectedPriceObj.name,
      harga: selectedPriceObj.current,
      timestamp: new Date().toLocaleString("id-ID"),
    };

    // Store to localStorage
    try {
      const existingLeads = localStorage.getItem("maxy_aicc_leads");
      const leadsList = existingLeads ? JSON.parse(existingLeads) : [];
      leadsList.unshift(newLead);
      localStorage.setItem("maxy_aicc_leads", JSON.stringify(leadsList));
    } catch (e) {
      console.error("Local storage error:", e);
    }

    setSubmittedLead(newLead);
    setIsSubmitted(true);

    // Trigger local CustomEvent to notify AdminDashboard to reload leads
    window.dispatchEvent(new CustomEvent("leadSubmitted"));
  };

  const getWaLink = () => {
    if (!submittedLead) return "#";
    const rawText = `Halo Admin MAXY, saya baru mendaftar Kelas AI-Driven Content Creation (8 Pertemuan Hybrid) yang mulai 4 Agustus 2026.

Nama Lengkap: ${submittedLead.nama}
Email Aktif: ${submittedLead.email}
No. WhatsApp: ${submittedLead.whatsapp}
Kota Asal: ${submittedLead.kota}
Pekerjaan: ${submittedLead.pekerjaan}
Nama Perusahaan: ${submittedLead.namaPerusahaan}
Opsi Paket: ${submittedLead.paket}
Harga Promo: ${submittedLead.harga}

Mohon dipandu langkah selanjutnya untuk konfirmasi pembayaran. Terima kasih!`;
    return `https://wa.me/${APP_CONFIG.waAdmin}?text=${encodeURIComponent(rawText)}`;
  };

  const handleReset = () => {
    setFormData({
      nama: "",
      email: "",
      whatsapp: "",
      kota: "",
      pekerjaan: "",
      namaPerusahaan: "",
      paket: "Hybrid_Promo",
    });
    setIsSubmitted(false);
    setSubmittedLead(null);
  };

  const scarcityPercentage = Math.round(
    (APP_CONFIG.slotTaken / APP_CONFIG.slotTotal) * 100
  );

  return (
    <section className="py-16 md:py-24 bg-offwhite border-y border-slate-200" id="daftar">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        
        {/* Urgent Headers */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Pendaftaran Kelas Intensif
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4">
            Amankan Kursi Kamu Sekarang
          </h2>

          {/* Scarcity Progress Bar */}
          <div className="max-w-md mx-auto bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-6">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-ember flex items-center gap-1">
                🔥 Slot Early Bird Terbatas!
              </span>
              <span className="text-navy">
                {APP_CONFIG.slotTaken} / {APP_CONFIG.slotTotal} Terisi
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-ember to-amber rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${scarcityPercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">
              Tersisa <strong className="text-ember font-extrabold">{APP_CONFIG.slotTotal - APP_CONFIG.slotTaken} slot</strong> untuk harga diskon khusus ini. Setelah penuh, harga otomatis kembali normal.
            </p>
          </div>

          {/* Countdown timer under scarcity */}
          <div className="max-w-md mx-auto">
            <p className="text-xs text-ember font-bold mb-2.5 font-mono">
              ⏳ Harga Early Bird Khusus Berakhir Dalam:
            </p>
            <CountdownTimer targetDate={APP_CONFIG.earlyBirdDeadline} theme="light" size="sm" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Package Info Grid */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-black text-xl text-navy mb-1 flex items-center gap-1.5">
              💡 Paket Kelas 8 Pertemuan Hybrid
            </h3>
            <p className="text-muted text-xs md:text-sm leading-relaxed mb-4">
              Kurikulum eksklusif dengan 8 pertemuan intensif. Kamu leluasa memilih hadir langsung (offline di MAXY AI HUB Jakarta) ataupun eksekusi online live via Zoom.
            </p>

            {/* Featured Hybrid Promo Package */}
            <div className="p-6 rounded-3xl border-2 bg-gradient-to-b from-navy to-navy-light text-white border-cyan shadow-xl relative mt-4">
              <span className="absolute -top-3 left-6 bg-gradient-to-r from-ember to-amber text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest font-mono shadow-md">
                🔥 PROMO 10 ORANG PERTAMA
              </span>
              
              <div className="flex items-center justify-between mb-3 mt-1">
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-cyan font-bold">8 Pertemuan · Mulai 4 Agustus 2026</p>
                  <h4 className="text-lg font-black text-white">Intensive Class Hybrid</h4>
                </div>
                <span className="bg-amber text-navy text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Selasa &amp; Kamis
                </span>
              </div>

              <div className="flex items-end gap-2.5 my-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Harga Diskon Terbatas:</p>
                  <span className="text-2xl md:text-3xl font-black font-mono text-cyan block">
                    {APP_CONFIG.prices.promoFirst10}
                  </span>
                </div>
                <div className="pb-1 text-right ml-auto">
                  <span className="text-[10px] text-slate-400 block font-mono">Early Bird Regular:</span>
                  <span className="line-through text-slate-400 text-sm md:text-base font-semibold font-mono block">
                    {APP_CONFIG.prices.earlyBird}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 border-t border-white/10 pt-4">
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                  <span><strong>8 Pertemuan Hybrid</strong> (Pilih Offline di MAXY AI HUB Jakarta atau Online via Zoom)</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                  <span>Dilangsungkan rutin setiap <strong>Selasa &amp; Kamis</strong> (Start 4 Agustus 2026)</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                  <span>Didampingi mentor secara langsung &amp; review konten secara mendalam</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                  <span>Prompt Library, JSON Template AI &amp; Akses Rekaman Kelas</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                  <span>Makan siang, snack, &amp; sesi networking eksklusif untuk peserta Onsite</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Registration Interactive Form */}
          <div className="lg:col-span-7 bg-[#0B1628] text-white p-6 md:p-8 rounded-3xl shadow-2xl relative border border-white/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue/10 to-transparent rounded-full pointer-events-none"></div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-black mb-1">Formulir Leads Pendaftaran</h3>
                  <p className="text-slate-400 text-xs leading-normal mb-2">
                    Lengkapi data diri kamu secara valid di bawah ini untuk mengamankan slot diskon.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Nama */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      placeholder="Nama lengkap kamu"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy placeholder-slate-400 border border-slate-300 focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10 transition-all"
                    />
                    {errors.nama && (
                      <p className="text-red-400 text-[10px] mt-1 font-bold">⚠️ {errors.nama}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Aktif *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@domain.com"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy placeholder-slate-400 border border-slate-300 focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10 transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-[10px] mt-1 font-bold">⚠️ {errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* No Whatsapp */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="Contoh: 082144995255"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy placeholder-slate-400 border border-slate-300 focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10 transition-all"
                    />
                    {errors.whatsapp && (
                      <p className="text-red-400 text-[10px] mt-1 font-bold">⚠️ {errors.whatsapp}</p>
                    )}
                  </div>

                  {/* Kota */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Kota Tinggal Saat Ini *
                    </label>
                    <input
                      type="text"
                      name="kota"
                      value={formData.kota}
                      onChange={handleInputChange}
                      placeholder="Contoh: Jakarta Selatan"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy placeholder-slate-400 border border-slate-300 focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10 transition-all"
                    />
                    {errors.kota && (
                      <p className="text-red-400 text-[10px] mt-1 font-bold">⚠️ {errors.kota}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Pekerjaan */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Pekerjaan / Profesi *
                    </label>
                    <input
                      type="text"
                      name="pekerjaan"
                      value={formData.pekerjaan}
                      onChange={handleInputChange}
                      placeholder="Contoh: Content Creator, Editor"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy placeholder-slate-400 border border-slate-300 focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10 transition-all"
                    />
                    {errors.pekerjaan && (
                      <p className="text-red-400 text-[10px] mt-1 font-bold">⚠️ {errors.pekerjaan}</p>
                    )}
                  </div>

                  {/* Nama Perusahaan */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nama Perusahaan / Instansi *
                    </label>
                    <input
                      type="text"
                      name="namaPerusahaan"
                      value={formData.namaPerusahaan}
                      onChange={handleInputChange}
                      placeholder="Nama kantor / instansi / usaha"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy placeholder-slate-400 border border-slate-300 focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10 transition-all"
                    />
                    {errors.namaPerusahaan && (
                      <p className="text-red-400 text-[10px] mt-1 font-bold">⚠️ {errors.namaPerusahaan}</p>
                    )}
                  </div>
                </div>

                {/* Paket Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Pilih Opsi Harga Paket *
                  </label>
                  <select
                    name="paket"
                    value={formData.paket}
                    onChange={handleInputChange}
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy font-bold border border-slate-300 focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10 transition-all"
                  >
                    <option value="Hybrid_Promo">
                      8 Pertemuan Hybrid — Promo 10 Orang Pertama ({APP_CONFIG.prices.promoFirst10})
                    </option>
                    <option value="Hybrid_Early">
                      8 Pertemuan Hybrid — Early Bird Regular ({APP_CONFIG.prices.earlyBird})
                    </option>
                  </select>
                  {errors.paket && (
                    <p className="text-red-400 text-[10px] mt-1 font-bold">⚠️ {errors.paket}</p>
                  )}
                </div>

                {/* Display Dynamic Early Bird Price */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center mt-2">
                  <div>
                    <p className="text-[10px] font-mono text-cyan uppercase tracking-wider font-bold">
                      Harga Promo Yang Kamu Dapatkan:
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Sesuai dengan pilihan paket: {currentPriceInfo.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 line-through text-xs font-mono block">
                      {currentPriceInfo.normal}
                    </span>
                    <span className="text-lg md:text-xl font-black text-cyan font-mono block">
                      {currentPriceInfo.current}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button
                    type="submit"
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-4 rounded-xl text-sm md:text-base shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4" /> Konsultasi
                  </button>
                  <a
                    href="https://maxy.academy/events"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-gradient-to-r from-[#25D366] to-[#1aaa52] hover:scale-[1.02] active:scale-[0.98] text-white font-black py-4 rounded-xl text-sm md:text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Daftar Sekarang
                  </a>
                </div>

                <p className="text-[10px] text-slate-500 text-center leading-normal">
                  Dengan mengirim data di atas, kamu menyetujui syarat layanan kami &amp; bersedia dihubungi admin terkait agenda kelas ini.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-green-500/15 text-wa rounded-full flex items-center justify-center mb-5 border border-green-500/30 animate-pulse">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                
                <h4 className="text-2xl font-black text-white mb-2">Pendaftaran Berhasil Diterima! 🎉</h4>
                <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                  Terima kasih <strong className="text-white font-bold">{submittedLead?.nama}</strong>! Langkah terakhir untuk mengamankan slot diskon adalah mengonfirmasi data pendaftaran ini ke WhatsApp Admin MAXY Academy.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 max-w-sm mx-auto text-left space-y-2 text-xs md:text-sm text-slate-300">
                  <p><strong>Nama:</strong> {submittedLead?.nama}</p>
                  <p><strong>Pekerjaan:</strong> {submittedLead?.pekerjaan} @ {submittedLead?.namaPerusahaan}</p>
                  <p><strong>Paket &amp; Harga:</strong> {submittedLead?.paket} ({submittedLead?.harga})</p>
                </div>

                <div className="space-y-3 max-w-sm mx-auto">
                  <a
                    href={getWaLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-gradient-to-r from-wa to-[#1aaa52] hover:scale-105 text-white font-black py-4 px-6 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Lanjutkan ke WhatsApp Admin →
                  </a>
                  
                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-white underline transition-colors"
                  >
                    Daftar Peserta Baru / Reset Form
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
