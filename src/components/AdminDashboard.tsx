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
  Save,
  LogOut,
  ExternalLink,
  Sparkles,
  LayoutDashboard,
  Shield
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToSite: () => void;
}

export default function AdminDashboard({ onLogout, onBackToSite }: AdminDashboardProps) {
  const {
    content,
    updateAppConfig,
    setModules,
    setSpeakers,
    setFaqs,
    setVideos,
    resetToDefault,
  } = useContent();

  const [activeTab, setActiveTab] = useState<
    "leads" | "hero" | "pricing" | "modules" | "speakers" | "videos" | "faqs"
  >("leads");

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
    loadLeads();
    const handleRefresh = () => loadLeads();
    window.addEventListener("leadSubmitted", handleRefresh);
    return () => window.removeEventListener("leadSubmitted", handleRefresh);
  }, []);

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

  // Save Hero
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
      setModules(content.modules.filter((_, i) => i !== idx));
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

  // Leads Export & Clear
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
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-navy font-sans antialiased selection:bg-cyan/30 relative">
      {/* Toast message popup */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-emerald-400">
          <Check className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0B1628] text-white flex flex-col justify-between p-5 border-r border-white/10 flex-shrink-0">
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue to-cyan flex items-center justify-center text-white shadow-lg shadow-cyan/20 font-black">
              M
            </div>
            <div>
              <h2 className="font-black text-base text-white leading-tight">MAXY Admin CMS</h2>
              <p className="text-[10px] text-cyan font-mono">Control Panel Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "leads"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" /> Data Leads
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("hero")}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "hero"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Settings className="w-4 h-4" /> Hero &amp; General
            </button>

            <button
              onClick={() => setActiveTab("pricing")}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "pricing"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <DollarSign className="w-4 h-4" /> Harga &amp; Countdown
            </button>

            <button
              onClick={() => setActiveTab("modules")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "modules"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" /> Modul Kurikulum
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {content.modules.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("speakers")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "speakers"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4" /> Pemateri / Mentor
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {content.speakers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "videos"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4" /> Video &amp; Portfolio
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {content.videos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "faqs"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4" /> FAQ System
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {content.faqs.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2 mt-6">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" /> Lihat Landing Page
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="text-xl font-black text-navy uppercase tracking-tight">
                {activeTab === "leads" && "Data Pendaftar &amp; CRM Analytics"}
                {activeTab === "hero" && "Pengaturan Hero Section &amp; Media"}
                {activeTab === "pricing" && "Pengaturan Harga &amp; Scarcity Timer"}
                {activeTab === "modules" && "Kelola Modul Kurikulum (CRUD)"}
                {activeTab === "speakers" && "Kelola Data Pemateri &amp; Mentor"}
                {activeTab === "videos" && "Kelola Video Portfolio &amp; Testimoni"}
                {activeTab === "faqs" && "Kelola Pertanyaan FAQ"}
              </h1>
            </div>
            <p className="text-slate-400 text-xs mt-0.5 font-mono">
              Sistem Pengelolaan Konten Terintegrasi Realtime
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSiteContent}
              className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Reset konten ke default awal"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Ke Default
            </button>
          </div>
        </header>

        {/* Content Body Container */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {/* TAB 1: LEADS CRM */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              {/* Analytics summary */}
              <div className="grid sm:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-blue/10 flex items-center justify-center text-blue">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                      Total Leads Terdaftar
                    </p>
                    <h3 className="text-2xl font-black font-mono text-navy">
                      {filteredLeads.length} Leads
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                      Proyeksi Omzet Total
                    </p>
                    <h3 className="text-2xl font-black font-mono text-emerald-600">
                      {formatPrice(totalProjectedValue)}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={handleExportCSV}
                    disabled={!filteredLeads.length}
                    className="px-5 py-3 bg-navy hover:bg-navy-light text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" /> Ekspor Data CSV
                  </button>
                  <button
                    onClick={handleClearLeads}
                    disabled={!leads.length}
                    className="px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" /> Reset Leads
                  </button>
                </div>
              </div>

              {/* Filter / Search Bar */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row gap-3 shadow-sm">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama, email, whatsapp, pekerjaan, kota..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs md:text-sm text-navy placeholder-slate-400 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedFilter("all")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedFilter === "all"
                        ? "bg-blue text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Semua Paket
                  </button>
                  <button
                    onClick={() => setSelectedFilter("Mitra")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedFilter === "Mitra"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Mitra Universitas
                  </button>
                  <button
                    onClick={() => setSelectedFilter("Regular")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedFilter === "Regular"
                        ? "bg-blue text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Masterclass Regular
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
                {filteredLeads.length > 0 ? (
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 font-mono font-bold text-[10px] uppercase tracking-wider">
                        <th className="p-4 pl-6">ID</th>
                        <th className="p-4">Identitas Pendaftar</th>
                        <th className="p-4">WhatsApp / Kota</th>
                        <th className="p-4">Pekerjaan &amp; Instansi</th>
                        <th className="p-4">Pilihan Opsi Paket</th>
                        <th className="p-4 text-right pr-6">Harga / Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-navy">
                      {filteredLeads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50 transition-colors">
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
                              className={`px-3 py-1 rounded-full text-[10px] font-bold ${
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
                  <div className="p-16 text-center">
                    <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h4 className="font-bold text-navy text-sm">Belum ada data leads</h4>
                    <p className="text-slate-400 text-xs mt-1">
                      Data pendaftaran baru akan otomatis muncul di sini.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HERO SETTINGS */}
          {activeTab === "hero" && (
            <form onSubmit={handleSaveHero} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-6 max-w-4xl shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-black text-lg text-navy flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue" /> Teks &amp; Media Utama Hero Section
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Ubah banner pengumuman atas, background image, judul headline, dan video pengantar.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Top Running Announcement Text
                </label>
                <input
                  type="text"
                  value={heroForm.topBannerText}
                  onChange={(e) => setHeroForm({ ...heroForm, topBannerText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy focus:outline-none focus:border-blue focus:bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Background Image URL
                </label>
                <input
                  type="text"
                  value={heroForm.heroBgUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, heroBgUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy focus:outline-none focus:border-blue focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Hero Headline Title
                </label>
                <textarea
                  rows={2}
                  value={heroForm.heroHeadlineTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy focus:outline-none focus:border-blue focus:bg-white font-bold leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Hero Sub-Headline Description
                </label>
                <textarea
                  rows={3}
                  value={heroForm.heroHeadlineSubtitle}
                  onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineSubtitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy focus:outline-none focus:border-blue focus:bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Intro Video Hero URL (YouTube / Reels)
                </label>
                <input
                  type="text"
                  value={heroForm.heroVideoUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, heroVideoUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy focus:outline-none focus:border-blue focus:bg-white font-mono"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-blue hover:bg-blue-light text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan Hero
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PRICING SETTINGS */}
          {activeTab === "pricing" && (
            <form onSubmit={handleSavePricing} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-6 max-w-4xl shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-black text-lg text-navy flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" /> Pengaturan Harga &amp; Countdown Timer
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Atur target countdown deadline, kuota slot pendaftar, dan tarif paket.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                    Target Tanggal Deadline Countdown
                  </label>
                  <input
                    type="text"
                    value={pricingForm.earlyBirdDeadline}
                    onChange={(e) => setPricingForm({ ...pricingForm, earlyBirdDeadline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-mono focus:outline-none focus:border-blue focus:bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Format ISO: YYYY-MM-DDTHH:mm:ss</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">Total Slot</label>
                    <input
                      type="number"
                      value={pricingForm.slotTotal}
                      onChange={(e) => setPricingForm({ ...pricingForm, slotTotal: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold focus:outline-none focus:border-blue focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">Slot Terisi</label>
                    <input
                      type="number"
                      value={pricingForm.slotTaken}
                      onChange={(e) => setPricingForm({ ...pricingForm, slotTaken: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold focus:outline-none focus:border-blue focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <h4 className="font-bold text-sm text-navy uppercase font-mono tracking-wider">
                1. Opsi Paket Mitra Universitas
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Promo saat ini</label>
                  <input
                    type="text"
                    value={pricingForm.mitraCurrent}
                    onChange={(e) => setPricingForm({ ...pricingForm, mitraCurrent: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold focus:outline-none focus:border-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Normal</label>
                  <input
                    type="text"
                    value={pricingForm.mitraNormal}
                    onChange={(e) => setPricingForm({ ...pricingForm, mitraNormal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold focus:outline-none focus:border-blue focus:bg-white"
                  />
                </div>
              </div>

              <h4 className="font-bold text-sm text-navy uppercase font-mono tracking-wider pt-2">
                2. Opsi Paket Masterclass Regular
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Promo saat ini</label>
                  <input
                    type="text"
                    value={pricingForm.masterclassCurrent}
                    onChange={(e) => setPricingForm({ ...pricingForm, masterclassCurrent: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold focus:outline-none focus:border-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Normal</label>
                  <input
                    type="text"
                    value={pricingForm.masterclassNormal}
                    onChange={(e) => setPricingForm({ ...pricingForm, masterclassNormal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold focus:outline-none focus:border-blue focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan Harga
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: MODUL KURIKULUM */}
          {activeTab === "modules" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSaveModule} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue" />
                  {editingModuleIndex !== null ? "Edit Modul Kurikulum" : "Tambah Modul Kurikulum Baru"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hari / Kode (e.g. Day 1)</label>
                    <input
                      type="text"
                      value={moduleInput.id}
                      onChange={(e) => setModuleInput({ ...moduleInput, id: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Topik Modul</label>
                    <input
                      type="text"
                      value={moduleInput.title}
                      onChange={(e) => setModuleInput({ ...moduleInput, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Ringkas Materi</label>
                  <textarea
                    rows={2}
                    value={moduleInput.description}
                    onChange={(e) => setModuleInput({ ...moduleInput, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hasil Pembelajaran (Deliverables)</label>
                    <input
                      type="text"
                      value={moduleInput.deliverables.join(", ")}
                      onChange={(e) =>
                        setModuleInput({
                          ...moduleInput,
                          deliverables: e.target.value.split(",").map((s) => s.trim()),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">AI Tools Yang Digunakan</label>
                    <input
                      type="text"
                      value={moduleInput.tools || ""}
                      onChange={(e) => setModuleInput({ ...moduleInput, tools: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
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
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingModuleIndex !== null ? "Simpan Perubahan Modul" : "Tambah Modul"}
                  </button>
                </div>
              </form>

              {/* Modules List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Modul Kurikulum ({content.modules.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.modules.map((m, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-blue/10 text-blue px-2.5 py-1 rounded-lg">
                          {m.id}
                        </span>
                        <h5 className="font-bold text-sm text-navy mt-1.5">{m.title}</h5>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{m.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingModuleIndex(idx);
                            setModuleInput(m);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteModule(idx)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SPEAKERS */}
          {activeTab === "speakers" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSaveSpeaker} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  {editingSpeakerIndex !== null ? "Edit Data Pemateri" : "Tambah Pemateri Baru"}
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={speakerInput.name}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inisial / Kode</label>
                    <input
                      type="text"
                      value={speakerInput.initials}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, initials: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role / Jabatan</label>
                    <input
                      type="text"
                      value={speakerInput.role}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, role: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Pengalaman</label>
                  <textarea
                    rows={2}
                    value={speakerInput.description}
                    onChange={(e) => setSpeakerInput({ ...speakerInput, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Foto Profile Image URL</label>
                  <input
                    type="text"
                    value={speakerInput.imageUrl || ""}
                    onChange={(e) => setSpeakerInput({ ...speakerInput, imageUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono"
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
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingSpeakerIndex !== null ? "Simpan Perubahan" : "Tambah Pemateri"}
                  </button>
                </div>
              </form>

              {/* Speakers List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Pemateri ({content.speakers.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.speakers.map((s, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-slate-600 text-sm">
                          {s.imageUrl ? (
                            <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover" />
                          ) : (
                            s.initials
                          )}
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-navy">{s.name}</h5>
                          <p className="text-xs text-blue font-semibold">{s.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingSpeakerIndex(idx);
                            setSpeakerInput(s);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSpeaker(idx)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: VIDEO & TESTIMONI */}
          {activeTab === "videos" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSaveVideo} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    >
                      <option value="portfolio">Portfolio MAXY</option>
                      <option value="testimoni">Testimoni Peserta</option>
                      <option value="pendaftaran">Pendaftaran Header</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Video Link URL</label>
                    <input
                      type="text"
                      value={videoInput.url}
                      onChange={(e) => setVideoInput({ ...videoInput, url: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Embed ID (Opsional)</label>
                    <input
                      type="text"
                      value={videoInput.embedId || ""}
                      onChange={(e) => setVideoInput({ ...videoInput, embedId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono"
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
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingVideoIndex !== null ? "Simpan Video" : "Tambah Video"}
                  </button>
                </div>
              </form>

              {/* Videos List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Video &amp; Portfolio ({content.videos.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.videos.map((v, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-md uppercase">
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
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(idx)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FAQ */}
          {activeTab === "faqs" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSaveFaq} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jawaban (Answer)</label>
                  <textarea
                    rows={3}
                    value={faqInput.answer}
                    onChange={(e) => setFaqInput({ ...faqInput, answer: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
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
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingFaqIndex !== null ? "Simpan FAQ" : "Tambah FAQ"}
                  </button>
                </div>
              </form>

              {/* FAQs List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Pertanyaan FAQ ({content.faqs.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.faqs.map((f, idx) => (
                    <div key={idx} className="py-3.5 flex items-start justify-between gap-4">
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
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(idx)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
