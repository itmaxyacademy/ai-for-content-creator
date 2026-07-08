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
    paket: "Onsite_Promo", // default option
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);

  // Dynamic price lookup
  const getSelectedPrice = (paketCode: string) => {
    switch (paketCode) {
      case "Online":
        return {
          name: "Online (Zoom) - Early Bird",
          current: APP_CONFIG.prices.onlineEarly,
          normal: APP_CONFIG.prices.onlineNormal,
        };
      case "Onsite":
        return {
          name: "Onsite (Jakarta) - Early Bird",
          current: APP_CONFIG.prices.onsiteEarly,
          normal: APP_CONFIG.prices.onsiteNormal,
        };
      case "Onsite_Promo":
        return {
          name: "Onsite (Promo Khusus) - Early Bird",
          current: APP_CONFIG.prices.onsitePromoEarly,
          normal: APP_CONFIG.prices.onsitePromoNormal,
        };
      default:
        return {
          name: "Pilih paket",
          current: "—",
          normal: "—",
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
    const rawText = `Halo Admin MAXY, saya baru mendaftar Mini Class AI-Driven Content Creation tanggal 12-13 Agustus 2026.

Nama Lengkap: ${submittedLead.nama}
Email Aktif: ${submittedLead.email}
No. WhatsApp: ${submittedLead.whatsapp}
Kota Asal: ${submittedLead.kota}
Pekerjaan: ${submittedLead.pekerjaan}
Nama Perusahaan: ${submittedLead.namaPerusahaan}
Opsi Paket: ${submittedLead.paket}
Harga Early Bird: ${submittedLead.harga}

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
      paket: "Onsite_Promo",
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
              💡 Pilihan Paket Fleksibel
            </h3>
            <p className="text-muted text-xs md:text-sm leading-relaxed mb-4">
              Pilih paket yang paling cocok untuk kebutuhan belajar kamu. Kami menawarkan opsi kelas Onsite interaktif langsung di Jakarta maupun Online via Zoom.
            </p>

            {/* Package 1: Online */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              formData.paket === "Online" 
                ? "bg-white border-blue shadow-md" 
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-muted font-bold">2 Days Online</p>
                  <h4 className="text-base font-black text-navy">Kelas Online (Zoom Class)</h4>
                </div>
                <span className="bg-blue/10 text-blue text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Zoom Live
                </span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-xl md:text-2xl font-black text-blue font-mono">
                  {APP_CONFIG.prices.onlineEarly}
                </span>
                <span className="line-through text-slate-400 text-xs md:text-sm font-semibold mb-0.5">
                  {APP_CONFIG.prices.onlineNormal}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                <li className="flex gap-2">
                  <Check className="w-3.5 h-3.5 text-blue flex-shrink-0 mt-0.5" />
                  <span>Kelas interaktif live 2 hari penuh</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3.5 h-3.5 text-blue flex-shrink-0 mt-0.5" />
                  <span>Prompt Library &amp; JSON Template siap pakai</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3.5 h-3.5 text-blue flex-shrink-0 mt-0.5" />
                  <span>Akses rekaman kelas &amp; grup diskusi alumni</span>
                </li>
              </ul>
            </div>

            {/* Package 2: Onsite Promo */}
            <div className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
              formData.paket === "Onsite_Promo"
                ? "bg-gradient-to-b from-navy to-navy-light text-white border-blue shadow-xl relative"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}>
              {formData.paket === "Onsite_Promo" && (
                <span className="absolute -top-3 left-4 bg-gradient-to-r from-blue to-cyan text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                  PROMO SPESIAL TERBATAS
                </span>
              )}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className={`text-[10px] font-mono tracking-widest uppercase font-bold ${formData.paket === "Onsite_Promo" ? "text-cyan" : "text-muted"}`}>2 Days Onsite Jakarta</p>
                  <h4 className={`text-base font-black ${formData.paket === "Onsite_Promo" ? "text-white" : "text-navy"}`}>Onsite Promo (Early Bird)</h4>
                </div>
                <span className="bg-amber text-navy text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Onsite Promo
                </span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className={`text-xl md:text-2xl font-black font-mono ${formData.paket === "Onsite_Promo" ? "text-cyan" : "text-blue"}`}>
                  {APP_CONFIG.prices.onsitePromoEarly}
                </span>
                <span className="line-through text-slate-400 text-xs md:text-sm font-semibold mb-0.5">
                  {APP_CONFIG.prices.onsitePromoNormal}
                </span>
              </div>
              <ul className={`space-y-1.5 text-xs border-t pt-2.5 ${formData.paket === "Onsite_Promo" ? "text-slate-300 border-white/10" : "text-slate-600 border-slate-100"}`}>
                <li className="flex gap-2">
                  <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${formData.paket === "Onsite_Promo" ? "text-cyan" : "text-blue"}`} />
                  <span>Semua benefit Onsite reguler dengan harga diskon tambahan</span>
                </li>
                <li className="flex gap-2">
                  <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${formData.paket === "Onsite_Promo" ? "text-cyan" : "text-blue"}`} />
                  <span>Makan siang, snack, &amp; networking eksklusif</span>
                </li>
              </ul>
            </div>

            {/* Package 3: Onsite Normal Early */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              formData.paket === "Onsite" 
                ? "bg-white border-blue shadow-md" 
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-muted font-bold">2 Days Onsite Regular</p>
                  <h4 className="text-base font-black text-navy">Kelas Onsite Regular</h4>
                </div>
                <span className="bg-cyan/15 text-cyan-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Onsite Regular
                </span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-xl md:text-2xl font-black text-blue font-mono">
                  {APP_CONFIG.prices.onsiteEarly}
                </span>
                <span className="line-through text-slate-400 text-xs md:text-sm font-semibold mb-0.5">
                  {APP_CONFIG.prices.onsiteNormal}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                <li className="flex gap-2">
                  <Check className="w-3.5 h-3.5 text-blue flex-shrink-0 mt-0.5" />
                  <span>Didampingi mentor langsung selama pengerjaan di Jakarta</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3.5 h-3.5 text-blue flex-shrink-0 mt-0.5" />
                  <span>Konten buatanmu langsung direview oleh pembicara</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3.5 h-3.5 text-blue flex-shrink-0 mt-0.5" />
                  <span>Tempat belajar representatif di MAXY AI HUB</span>
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
                    Pilih Paket Kelas Yang Diinginkan *
                  </label>
                  <select
                    name="paket"
                    value={formData.paket}
                    onChange={handleInputChange}
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy border border-slate-300 focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10 transition-all"
                  >
                    <option value="Onsite_Promo">
                      Onsite Promo (Jakarta) — {APP_CONFIG.prices.onsitePromoEarly} (Paling Hemat!)
                    </option>
                    <option value="Onsite">
                      Onsite Regular (Jakarta) — {APP_CONFIG.prices.onsiteEarly}
                    </option>
                    <option value="Online">
                      Online Zoom Class — {APP_CONFIG.prices.onlineEarly}
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
                    onClick={() => {}}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-4 rounded-xl text-sm md:text-base shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4" /> Konsultasi
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#25D366] to-[#1aaa52] hover:scale-[1.02] active:scale-[0.98] text-white font-black py-4 rounded-xl text-sm md:text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Daftar Sekarang
                  </button>
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
