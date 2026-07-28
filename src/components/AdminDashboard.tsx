import React, { useState, useEffect } from "react";
import { Lead, ModulItem, SpeakerItem, FAQItem, VideoItem } from "../types";
import { useContent } from "../context/ContentContext";
import {
  Download,
  Trash2,
  Users,
  ShieldAlert,
  X,
  DollarSign,
  Search,
  Calendar,
  Settings,
  BookOpen,
  UserCheck,
  Video,
  HelpCircle,
  Plus,
  Edit2,
  RotateCcw,
  Check,
  Save
} from "lucide-react";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const {
    content,
    updateAppConfig,
    setModules,
    setSpeakers,
    setFaqs,
    setVideos,
    resetToDefault,
  } = useContent();

  // Active Tab: "leads" | "hero" | "pricing" | "modules" | "speakers" | "videos" | "faqs"
  const [activeTab, setActiveTab] = useState<
    "leads" | "hero" | "pricing" | "modules" | "speakers" | "videos" | "faqs"
  >("leads");

  // Local state for toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Leads logic
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem("maxy_aicc_leads");
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }

    const handleRefresh = () => {
      loadLeads();
    };
    window.addEventListener("leadSubmitted", handleRefresh);
    return () => window.removeEventListener("leadSubmitted", handleRefresh);
  }, [isOpen]);

  // Form states for CMS edits
  const [heroForm, setHeroForm] = useState({
    topBannerText: content.appConfig.topBannerText || "",
    heroBgUrl: content.appConfig.heroBgUrl || "",
    heroHeadlineTitle: content.appConfig.heroHeadlineTitle || "",
    heroHeadlineSubtitle: content.appConfig.heroHeadlineSubtitle || "",
    heroVideoUrl: content.appConfig.heroVideoUrl || "",
  });

  const [pricingForm, setPricingForm] = useState({
    earlyBirdDeadline: content.appConfig.earlyBirdDeadline || "",
    slotTotal: content.appConfig.slotTotal || 10,
    slotTaken: content.appConfig.slotTaken || 7,
    mitraCurrent: content.appConfig.prices.mitraCurrent || "Rp 1.800.000",
    mitraNormal: content.appConfig.prices.mitraNormal || "Rp 2.500.000",
    masterclassCurrent: content.appConfig.prices.masterclassCurrent || "Rp 1.800.000",
    masterclassNormal: content.appConfig.prices.masterclassNormal || "Rp 2.500.000",
    earlyBirdCurrent: content.appConfig.prices.earlyBirdCurrent || "Rp 1.500.000",
    earlyBirdNormal: content.appConfig.prices.earlyBirdNormal || "Rp 1.800.000",
  });

  // Module state for CRUD
  const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null);
  const [moduleInput, setModuleInput] = useState<ModulItem>({
    id: `Day ${content.modules.length + 1}`,
    title: "",
    description: "",
    deliverables: [""],
    tools: "",
  });

  // Speaker state for CRUD
  const [editingSpeakerIndex, setEditingSpeakerIndex] = useState<number | null>(null);
  const [speakerInput, setSpeakerInput] = useState<SpeakerItem>({
    initials: "",
    name: "",
    role: "",
    description: "",
    imageUrl: "",
  });

  // FAQ state for CRUD
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [faqInput, setFaqInput] = useState<FAQItem>({
    question: "",
    answer: "",
  });

  // Video state for CRUD
  const [editingVideoIndex, setEditingVideoIndex] = useState<number | null>(null);
  const [videoInput, setVideoInput] = useState<VideoItem>({
    id: `vid-${Date.now()}`,
    title: "",
    url: "",
    category: "portfolio",
    embedId: "",
    thumbnail: "",
  });

  useEffect(() => {
    setHeroForm({
      topBannerText: content.appConfig.topBannerText || "",
      heroBgUrl: content.appConfig.heroBgUrl || "",
      heroHeadlineTitle: content.appConfig.heroHeadlineTitle || "",
      heroHeadlineSubtitle: content.appConfig.heroHeadlineSubtitle || "",
      heroVideoUrl: content.appConfig.heroVideoUrl || "",
    });

    setPricingForm({
      earlyBirdDeadline: content.appConfig.earlyBirdDeadline || "",
      slotTotal: content.appConfig.slotTotal || 10,
      slotTaken: content.appConfig.slotTaken || 7,
      mitraCurrent: content.appConfig.prices.mitraCurrent || "Rp 1.800.000",
      mitraNormal: content.appConfig.prices.mitraNormal || "Rp 2.500.000",
      masterclassCurrent: content.appConfig.prices.masterclassCurrent || "Rp 1.800.000",
      masterclassNormal: content.appConfig.prices.masterclassNormal || "Rp 2.500.000",
      earlyBirdCurrent: content.appConfig.prices.earlyBirdCurrent || "Rp 1.500.000",
      earlyBirdNormal: content.appConfig.prices.earlyBirdNormal || "Rp 1.800.000",
    });
  }, [content]);

  if (!isOpen) return null;

  // Save Hero / General
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppConfig({
      topBannerText: heroForm.topBannerText,
      heroBgUrl: heroForm.heroBgUrl,
      heroHeadlineTitle: heroForm.heroHeadlineTitle,
      heroHeadlineSubtitle: heroForm.heroHeadlineSubtitle,
      heroVideoUrl: heroForm.heroVideoUrl,
    });
    showToast("Pengaturan Hero & General berhasil disimpan!");
  };

  // Save Pricing
  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppConfig({
      earlyBirdDeadline: pricingForm.earlyBirdDeadline,
      slotTotal: Number(pricingForm.slotTotal),
      slotTaken: Number(pricingForm.slotTaken),
      prices: {
        ...content.appConfig.prices,
        mitraCurrent: pricingForm.mitraCurrent,
        mitraNormal: pricingForm.mitraNormal,
        masterclassCurrent: pricingForm.masterclassCurrent,
        masterclassNormal: pricingForm.masterclassNormal,
        earlyBirdCurrent: pricingForm.earlyBirdCurrent,
        earlyBirdNormal: pricingForm.earlyBirdNormal,
      },
    });
    showToast("Pengaturan Harga & Countdown berhasil disimpan!");
  };

  // Module Handlers
  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleInput.title.trim()) return;
    const newModules = [...content.modules];
    if (editingModuleIndex !== null) {
      newModules[editingModuleIndex] = moduleInput;
    } else {
      newModules.push(moduleInput);
    }
    setModules(newModules);
    setEditingModuleIndex(null);
    setModuleInput({
      id: `Day ${newModules.length + 1}`,
      title: "",
      description: "",
      deliverables: [""],
      tools: "",
    });
    showToast("Modul kurikulum berhasil diperbarui!");
  };

  const handleDeleteModule = (idx: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
      const newModules = content.modules.filter((_, i) => i !== idx);
      setModules(newModules);
      showToast("Modul berhasil dihapus!");
    }
  };

  // Speaker Handlers
  const handleSaveSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speakerInput.name.trim()) return;
    const newSpeakers = [...content.speakers];
    if (editingSpeakerIndex !== null) {
      newSpeakers[editingSpeakerIndex] = speakerInput;
    } else {
      newSpeakers.push(speakerInput);
    }
    setSpeakers(newSpeakers);
    setEditingSpeakerIndex(null);
    setSpeakerInput({ initials: "", name: "", role: "", description: "", imageUrl: "" });
    showToast("Data pemateri berhasil diperbarui!");
  };

  const handleDeleteSpeaker = (idx: number) => {
    if (window.confirm("Hapus data pemateri ini?")) {
      setSpeakers(content.speakers.filter((_, i) => i !== idx));
      showToast("Pemateri berhasil dihapus!");
    }
  };

  // FAQ Handlers
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqInput.question.trim()) return;
    const newFaqs = [...content.faqs];
    if (editingFaqIndex !== null) {
      newFaqs[editingFaqIndex] = faqInput;
    } else {
      newFaqs.push(faqInput);
    }
    setFaqs(newFaqs);
    setEditingFaqIndex(null);
    setFaqInput({ question: "", answer: "" });
    showToast("FAQ berhasil diperbarui!");
  };

  const handleDeleteFaq = (idx: number) => {
    if (window.confirm("Hapus pertanyaan FAQ ini?")) {
      setFaqs(content.faqs.filter((_, i) => i !== idx));
      showToast("FAQ berhasil dihapus!");
    }
  };

  // Video Handlers
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInput.title.trim()) return;
    const newVideos = [...content.videos];
    if (editingVideoIndex !== null) {
      newVideos[editingVideoIndex] = videoInput;
    } else {
      newVideos.push(videoInput);
    }
    setVideos(newVideos);
    setEditingVideoIndex(null);
    setVideoInput({
      id: `vid-${Date.now()}`,
      title: "",
      url: "",
      category: "portfolio",
      embedId: "",
      thumbnail: "",
    });
    showToast("Video item berhasil diperbarui!");
  };

  const handleDeleteVideo = (idx: number) => {
    if (window.confirm("Hapus video item ini?")) {
      setVideos(content.videos.filter((_, i) => i !== idx));
      showToast("Video item berhasil dihapus!");
    }
  };

  // Leads export & clear
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      lead.kota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.pekerjaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.namaPerusahaan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "Early" && (lead.paket.includes("Early") || lead.paket.includes("Promo"))) ||
      (selectedFilter === "Mitra" && lead.paket.includes("Mitra")) ||
      (selectedFilter === "Regular" && (lead.paket.includes("Regular") || lead.paket.includes("Masterclass")));

    return matchesSearch && matchesFilter;
  });

  const totalProjectedValue = filteredLeads.reduce((acc, lead) => {
    const numericStr = lead.harga.replace(/[^0-9]/g, "");
    const value = parseInt(numericStr, 10) || 0;
    return acc + value;
  }, 0);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExportCSV = () => {
    if (!filteredLeads.length) return;
    const headers = [
      "ID",
      "Nama Lengkap",
      "Email Aktif",
      "No. WhatsApp",
      "Kota",
      "Pekerjaan",
      "Perusahaan/Instansi",
      "Paket Kelas",
      "Harga",
      "Waktu Daftar",
    ];
    const csvRows = [
      headers.join(","),
      ...filteredLeads.map((l) =>
        [
          `"${l.id}"`,
          `"${l.nama.replace(/"/g, '""')}"`,
          `"${l.email.replace(/"/g, '""')}"`,
          `"${l.whatsapp}"`,
          `"${l.kota.replace(/"/g, '""')}"`,
          `"${l.pekerjaan.replace(/"/g, '""')}"`,
          `"${l.namaPerusahaan.replace(/"/g, '""')}"`,
          `"${l.paket}"`,
          `"${l.harga}"`,
          `"${l.timestamp}"`,
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `MAXY_AICC_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLeads = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus semua data pendaftaran lokal? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      localStorage.removeItem("maxy_aicc_leads");
      setLeads([]);
    }
  };

  const handleResetSiteContent = () => {
    if (
      window.confirm(
        "Reset seluruh isi website (Hero, Teks, Harga, Modul, Pemateri, Testimoni) ke data bawaan awal?"
      )
    ) {
      resetToDefault();
      showToast("Seluruh konten website telah di-reset ke data bawaan!");
    }
  };

  return (
    <div className="fixed inset-0 z-200 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 relative">
        {/* Toast message notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" /> {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="bg-navy text-white p-5 md:px-8 flex justify-between items-center border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base md:text-lg">
                Admin Panel &amp; Content Management (CMS)
              </h2>
              <p className="text-[10px] text-slate-400 font-mono">
                Kelola Data Leads Pendaftar &amp; Edit Seluruh Isi Landing Page Realtime
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetSiteContent}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              title="Reset konten ke default"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Default
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-5 pt-3 border-b border-slate-200 flex gap-2 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "leads"
                ? "bg-white text-navy border-t-2 border-cyan shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Users className="w-4 h-4 text-blue" /> Data Leads ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab("hero")}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "hero"
                ? "bg-white text-navy border-t-2 border-cyan shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Settings className="w-4 h-4 text-purple-600" /> Hero &amp; General
          </button>

          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "pricing"
                ? "bg-white text-navy border-t-2 border-cyan shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-600" /> Harga &amp; Countdown
          </button>

          <button
            onClick={() => setActiveTab("modules")}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "modules"
                ? "bg-white text-navy border-t-2 border-cyan shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue" /> Modul ({content.modules.length})
          </button>

          <button
            onClick={() => setActiveTab("speakers")}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "speakers"
                ? "bg-white text-navy border-t-2 border-cyan shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-600" /> Pemateri ({content.speakers.length})
          </button>

          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "videos"
                ? "bg-white text-navy border-t-2 border-cyan shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Video className="w-4 h-4 text-rose-600" /> Video &amp; Testi ({content.videos.length})
          </button>

          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "faqs"
                ? "bg-white text-navy border-t-2 border-cyan shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-cyan" /> FAQ ({content.faqs.length})
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-auto bg-slate-50/50 p-5 md:p-8">
          {/* TAB 1: LEADS MONITORING */}
          {activeTab === "leads" && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center text-blue">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                      Total Pendaftar
                    </p>
                    <h3 className="text-xl font-black font-mono text-navy">
                      {filteredLeads.length} Leads
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                      Proyeksi Pendapatan
                    </p>
                    <h3 className="text-xl font-black font-mono text-green-600">
                      {formatPrice(totalProjectedValue)}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={handleExportCSV}
                    disabled={!filteredLeads.length}
                    className="px-4 py-2.5 bg-navy hover:bg-navy-light text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" /> Ekspor CSV
                  </button>
                  <button
                    onClick={handleClearLeads}
                    disabled={!leads.length}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" /> Reset Data
                  </button>
                </div>
              </div>

              {/* Filter / Search Row */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama, email, whatsapp, pekerjaan, kota..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-xs md:text-sm text-navy placeholder-slate-400 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedFilter("all")}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      selectedFilter === "all"
                        ? "bg-blue text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Semua Paket
                  </button>
                  <button
                    onClick={() => setSelectedFilter("Mitra")}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      selectedFilter === "Mitra"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Mitra Universitas
                  </button>
                  <button
                    onClick={() => setSelectedFilter("Regular")}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      selectedFilter === "Regular"
                        ? "bg-blue text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Masterclass Regular
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                {filteredLeads.length > 0 ? (
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-mono font-bold text-[10px] uppercase tracking-wider">
                        <th className="p-4 pl-6">ID</th>
                        <th className="p-4">Identitas Leads</th>
                        <th className="p-4">WhatsApp / Kota</th>
                        <th className="p-4">Pekerjaan &amp; Instansi</th>
                        <th className="p-4">Pilihan Paket</th>
                        <th className="p-4 text-right pr-6">Harga / Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-navy">
                      {filteredLeads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 pl-6 font-mono text-slate-400">#{l.id}</td>
                          <td className="p-4">
                            <div className="font-bold text-sm text-navy">{l.nama}</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">{l.email}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-blue">{l.whatsapp}</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">{l.kota}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-slate-700">{l.pekerjaan}</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">
                              {l.namaPerusahaan}
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                l.paket.includes("Mitra")
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {l.paket}
                            </span>
                          </td>
                          <td className="p-4 text-right pr-6">
                            <div className="font-black text-cyan-800 font-mono">{l.harga}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 justify-end font-mono">
                              <Calendar className="w-3 h-3" /> {l.timestamp}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-12 text-center">
                    <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <h4 className="font-bold text-navy text-sm">Belum ada leads terdaftar</h4>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HERO & GENERAL SETTINGS */}
          {activeTab === "hero" && (
            <form onSubmit={handleSaveHero} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5 max-w-3xl mx-auto shadow-xs">
              <h3 className="font-black text-lg text-navy flex items-center gap-2 border-b pb-3">
                <Settings className="w-5 h-5 text-purple-600" /> Pengaturan Text &amp; Media Hero
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Top Running Banner Text (Pengumuman Paling Atas)
                </label>
                <input
                  type="text"
                  value={heroForm.topBannerText}
                  onChange={(e) => setHeroForm({ ...heroForm, topBannerText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy focus:outline-none focus:border-blue"
                  placeholder="Contoh: 🔥 HARGA KHUSUS MITRA UNIVERSITAS: Rp 1.800.000!"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Background Image URL (Garis Biru / Background)
                </label>
                <input
                  type="text"
                  value={heroForm.heroBgUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, heroBgUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy focus:outline-none focus:border-blue font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Headline Title
                </label>
                <textarea
                  rows={2}
                  value={heroForm.heroHeadlineTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy focus:outline-none focus:border-blue font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Sub-Headline Description
                </label>
                <textarea
                  rows={3}
                  value={heroForm.heroHeadlineSubtitle}
                  onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineSubtitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy focus:outline-none focus:border-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Intro Video Hero URL (YouTube / Reels)
                </label>
                <input
                  type="text"
                  value={heroForm.heroVideoUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, heroVideoUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy focus:outline-none focus:border-blue font-mono"
                  placeholder="https://youtu.be/..."
                />
              </div>

              <div className="pt-3 border-t flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue hover:bg-blue-light text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan Hero
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PRICING & COUNTDOWN */}
          {activeTab === "pricing" && (
            <form onSubmit={handleSavePricing} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5 max-w-3xl mx-auto shadow-xs">
              <h3 className="font-black text-lg text-navy flex items-center gap-2 border-b pb-3">
                <DollarSign className="w-5 h-5 text-emerald-600" /> Pengaturan Harga &amp; Scarcity Countdown
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Tanggal Deadline Countdown
                  </label>
                  <input
                    type="text"
                    value={pricingForm.earlyBirdDeadline}
                    onChange={(e) => setPricingForm({ ...pricingForm, earlyBirdDeadline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono focus:outline-none focus:border-blue"
                    placeholder="YYYY-MM-DDTHH:mm:ss"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Format: 2026-07-31T23:59:59</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Slot</label>
                    <input
                      type="number"
                      value={pricingForm.slotTotal}
                      onChange={(e) => setPricingForm({ ...pricingForm, slotTotal: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold focus:outline-none focus:border-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Slot Terisi</label>
                    <input
                      type="number"
                      value={pricingForm.slotTaken}
                      onChange={(e) => setPricingForm({ ...pricingForm, slotTaken: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold focus:outline-none focus:border-blue"
                    />
                  </div>
                </div>
              </div>

              <hr />

              <h4 className="font-bold text-sm text-navy">Harga Khusus Mitra Universitas</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Promo (Saat ini)</label>
                  <input
                    type="text"
                    value={pricingForm.mitraCurrent}
                    onChange={(e) => setPricingForm({ ...pricingForm, mitraCurrent: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold focus:outline-none focus:border-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Normal</label>
                  <input
                    type="text"
                    value={pricingForm.mitraNormal}
                    onChange={(e) => setPricingForm({ ...pricingForm, mitraNormal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold focus:outline-none focus:border-blue"
                  />
                </div>
              </div>

              <h4 className="font-bold text-sm text-navy">Harga Masterclass Regular</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Diskon Regular</label>
                  <input
                    type="text"
                    value={pricingForm.masterclassCurrent}
                    onChange={(e) => setPricingForm({ ...pricingForm, masterclassCurrent: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold focus:outline-none focus:border-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Normal Regular</label>
                  <input
                    type="text"
                    value={pricingForm.masterclassNormal}
                    onChange={(e) => setPricingForm({ ...pricingForm, masterclassNormal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold focus:outline-none focus:border-blue"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan Harga
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: MODUL KURIKULUM (CRUD) */}
          {activeTab === "modules" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <form onSubmit={handleSaveModule} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue" />
                  {editingModuleIndex !== null ? "Edit Modul Kurikulum" : "Tambah Modul Baru"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Label Hari / Id (e.g. Day 1)</label>
                    <input
                      type="text"
                      value={moduleInput.id}
                      onChange={(e) => setModuleInput({ ...moduleInput, id: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Topik Modul</label>
                    <input
                      type="text"
                      value={moduleInput.title}
                      onChange={(e) => setModuleInput({ ...moduleInput, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-bold"
                      placeholder="Judul materi..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={2}
                    value={moduleInput.description}
                    onChange={(e) => setModuleInput({ ...moduleInput, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy"
                    placeholder="Penjelasan ringkas..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hasil Pembelajaran (Deliverables - Pisahkan Koma)</label>
                    <input
                      type="text"
                      value={moduleInput.deliverables.join(", ")}
                      onChange={(e) =>
                        setModuleInput({
                          ...moduleInput,
                          deliverables: e.target.value.split(",").map((s) => s.trim()),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy"
                      placeholder="Audit Funnel, Plan Strategy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">AI Tools Yang Digunakan</label>
                    <input
                      type="text"
                      value={moduleInput.tools || ""}
                      onChange={(e) => setModuleInput({ ...moduleInput, tools: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy"
                      placeholder="Gemini, ChatGPT, Claude..."
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  {editingModuleIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingModuleIndex(null);
                        setModuleInput({
                          id: `Day ${content.modules.length + 1}`,
                          title: "",
                          description: "",
                          deliverables: [""],
                          tools: "",
                        });
                      }}
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingModuleIndex !== null ? "Simpan Perubahan Modul" : "Tambah Modul"}
                  </button>
                </div>
              </form>

              {/* Modules List */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Modul Kurikulum ({content.modules.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.modules.map((m, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-blue/10 text-blue px-2 py-0.5 rounded-md">
                          {m.id}
                        </span>
                        <h5 className="font-bold text-sm text-navy mt-1">{m.title}</h5>
                        <p className="text-xs text-slate-500 line-clamp-1">{m.description}</p>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Tools: {m.tools || "-"}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingModuleIndex(idx);
                            setModuleInput(m);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteModule(idx)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PEMATERI & MENTOR (CRUD) */}
          {activeTab === "speakers" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <form onSubmit={handleSaveSpeaker} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  {editingSpeakerIndex !== null ? "Edit Pemateri" : "Tambah Pemateri Baru"}
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={speakerInput.name}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inisial / Kode</label>
                    <input
                      type="text"
                      value={speakerInput.initials}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, initials: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-bold"
                      placeholder="SL"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role / Jabatan</label>
                    <input
                      type="text"
                      value={speakerInput.role}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, role: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-bold"
                      placeholder="Applied AI Expert..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat Pengalaman</label>
                  <textarea
                    rows={2}
                    value={speakerInput.description}
                    onChange={(e) => setSpeakerInput({ ...speakerInput, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Foto Profile Image URL</label>
                  <input
                    type="text"
                    value={speakerInput.imageUrl || ""}
                    onChange={(e) => setSpeakerInput({ ...speakerInput, imageUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-mono"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  {editingSpeakerIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSpeakerIndex(null);
                        setSpeakerInput({ initials: "", name: "", role: "", description: "", imageUrl: "" });
                      }}
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingSpeakerIndex !== null ? "Simpan Perubahan" : "Tambah Pemateri"}
                  </button>
                </div>
              </form>

              {/* Speakers List */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Pemateri ({content.speakers.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.speakers.map((s, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-slate-600 text-xs">
                          {s.imageUrl ? (
                            <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover" />
                          ) : (
                            s.initials
                          )}
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-navy">{s.name}</h5>
                          <p className="text-xs text-blue font-semibold">{s.role}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{s.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingSpeakerIndex(idx);
                            setSpeakerInput(s);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSpeaker(idx)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: VIDEO & TESTIMONI (CRUD) */}
          {activeTab === "videos" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <form onSubmit={handleSaveVideo} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <Video className="w-4 h-4 text-rose-600" />
                  {editingVideoIndex !== null ? "Edit Video Item" : "Tambah Video Baru"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Video</label>
                    <input
                      type="text"
                      value={videoInput.title}
                      onChange={(e) => setVideoInput({ ...videoInput, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                    <select
                      value={videoInput.category}
                      onChange={(e) =>
                        setVideoInput({
                          ...videoInput,
                          category: e.target.value as "pendaftaran" | "testimoni" | "portfolio",
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-bold"
                    >
                      <option value="portfolio">Portfolio MAXY</option>
                      <option value="testimoni">Testimoni Peserta</option>
                      <option value="pendaftaran">Pendaftaran Header</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Video Link URL (Instagram / Youtube)</label>
                    <input
                      type="text"
                      value={videoInput.url}
                      onChange={(e) => setVideoInput({ ...videoInput, url: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Embed ID (Opsional)</label>
                    <input
                      type="text"
                      value={videoInput.embedId || ""}
                      onChange={(e) => setVideoInput({ ...videoInput, embedId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-mono"
                      placeholder="e.g. Rt4q44v09qc"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  {editingVideoIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingVideoIndex(null);
                        setVideoInput({
                          id: `vid-${Date.now()}`,
                          title: "",
                          url: "",
                          category: "portfolio",
                          embedId: "",
                          thumbnail: "",
                        });
                      }}
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingVideoIndex !== null ? "Simpan Video" : "Tambah Video"}
                  </button>
                </div>
              </form>

              {/* Videos List */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Video &amp; Portfolio ({content.videos.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.videos.map((v, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md uppercase">
                          {v.category}
                        </span>
                        <h5 className="font-bold text-sm text-navy mt-1">{v.title}</h5>
                        <p className="text-xs text-slate-400 font-mono line-clamp-1">{v.url}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingVideoIndex(idx);
                            setVideoInput(v);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(idx)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FAQ (CRUD) */}
          {activeTab === "faqs" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <form onSubmit={handleSaveFaq} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan" />
                  {editingFaqIndex !== null ? "Edit Pertanyaan FAQ" : "Tambah Pertanyaan FAQ Baru"}
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pertanyaan (Question)</label>
                  <input
                    type="text"
                    value={faqInput.question}
                    onChange={(e) => setFaqInput({ ...faqInput, question: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jawaban (Answer)</label>
                  <textarea
                    rows={3}
                    value={faqInput.answer}
                    onChange={(e) => setFaqInput({ ...faqInput, answer: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-navy"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  {editingFaqIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaqIndex(null);
                        setFaqInput({ question: "", answer: "" });
                      }}
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingFaqIndex !== null ? "Simpan FAQ" : "Tambah FAQ"}
                  </button>
                </div>
              </form>

              {/* FAQs List */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Pertanyaan FAQ ({content.faqs.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.faqs.map((f, idx) => (
                    <div key={idx} className="py-3 flex items-start justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-sm text-navy">❓ {f.question}</h5>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{f.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingFaqIndex(idx);
                            setFaqInput(f);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(idx)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
