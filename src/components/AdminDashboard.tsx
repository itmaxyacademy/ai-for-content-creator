import React, { useState, useEffect } from "react";
import {
  Lead,
  ModulItem,
  SpeakerItem,
  FAQItem,
  VideoItem,
  TestimonialItem,
  PackageOptionItem,
  CustomSection
} from "../types";
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
  MessageCircle,
  Layers,
  ArrowUp,
  ArrowDown,
  Upload,
  Star,
  Package,
  Clock,
  Sparkles
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
    setPackages,
    setTestimonials,
    setCustomSections,
    setSectionOrder,
    updatePopupConfig,
    updateWaConfig,
    resetToDefault,
  } = useContent();

  const [activeTab, setActiveTab] = useState<
    "leads" | "hero" | "intro" | "pricing" | "packages" | "modules" | "speakers" | "testimonials" | "faqs" | "wa_popup" | "sections"
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

  const handleDeleteSingleLead = (id: string) => {
    if (window.confirm("Hapus baris pendaftar ini?")) {
      const updated = leads.filter((l) => l.id !== id);
      setLeads(updated);
      localStorage.setItem("maxy_aicc_leads", JSON.stringify(updated));
      showToast("Data pendaftar berhasil dihapus!");
    }
  };

  // Form states for CMS Hero
  const [heroForm, setHeroForm] = useState({
    topBannerText: content.appConfig.topBannerText || "",
    heroBgUrl: content.appConfig.heroBgUrl || "",
    heroEventBadge: content.appConfig.heroEventBadge || "",
    heroHeadlineTitle: content.appConfig.heroHeadlineTitle || "",
    heroHeadlineSubtitle: content.appConfig.heroHeadlineSubtitle || "",
    heroHeadlineSubtitle2: content.appConfig.heroHeadlineSubtitle2 || "",
    heroFeatureTags: (content.appConfig.heroFeatureTags || []).join(", "),
    heroCountdownTitle: content.appConfig.heroCountdownTitle || "",
    heroCtaText: content.appConfig.heroCtaText || "",
    heroCtaSubtext: content.appConfig.heroCtaSubtext || "",
  });

  // Intro Video Form
  const [introForm, setIntroForm] = useState({
    introYoutubeUrl: content.appConfig.introYoutubeUrl || "",
    introInstagramUrl: content.appConfig.introInstagramUrl || "",
    introInstagramTitle: content.appConfig.introInstagramTitle || "",
    introInstagramCta: content.appConfig.introInstagramCta || "",
  });

  // Pricing Form
  const [pricingForm, setPricingForm] = useState({
    earlyBirdDeadline: content.appConfig.earlyBirdDeadline || "",
    slotTotal: content.appConfig.slotTotal || 10,
    slotTaken: content.appConfig.slotTaken || 7,
  });

  // WA & Popup Form
  const [waForm, setWaForm] = useState({
    adminWa: content.waConfig.adminWa || "",
    csWa: content.waConfig.csWa || "",
    waMessageTemplate: content.waConfig.waMessageTemplate || "",
    customWaLink: content.waConfig.customWaLink || "",
  });

  const [popupForm, setPopupForm] = useState({
    exitTitle: content.popupConfig.exitTitle || "",
    exitDesc: content.popupConfig.exitDesc || "",
    exitPriceTag: content.popupConfig.exitPriceTag || "",
    exitCtaText: content.popupConfig.exitCtaText || "",
    stickyLabel: content.popupConfig.stickyLabel || "",
    stickyCtaText: content.popupConfig.stickyCtaText || "",
  });

  // CRUD Package Option Form
  const [editingPackageIndex, setEditingPackageIndex] = useState<number | null>(null);
  const [packageInput, setPackageInput] = useState<PackageOptionItem>({
    code: `Pkg_${Date.now().toString().slice(-4)}`,
    name: "",
    currentPrice: "Rp 1.800.000",
    normalPrice: "Rp 2.500.000",
    badgeTag: "🎓 PROMO",
    subtitle: "",
    features: [""],
    isPopular: false,
  });

  // CRUD Testimonials Form
  const [editingTestiIndex, setEditingTestiIndex] = useState<number | null>(null);
  const [testiInput, setTestiInput] = useState<TestimonialItem>({
    id: `testi-${Date.now()}`,
    name: "",
    role: "",
    company: "",
    quote: "",
    videoEmbedUrl: "",
    avatarUrl: "",
    rating: 5,
  });

  // CRUD Module Form
  const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null);
  const [moduleInput, setModuleInput] = useState<ModulItem>({
    id: `Day ${content.modules.length + 1}`,
    title: "",
    description: "",
    deliverables: [""],
    tools: "",
  });

  // CRUD Speaker Form
  const [editingSpeakerIndex, setEditingSpeakerIndex] = useState<number | null>(null);
  const [speakerInput, setSpeakerInput] = useState<SpeakerItem>({
    initials: "",
    name: "",
    role: "",
    description: "",
    imageUrl: "",
  });

  // CRUD FAQ Form
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [faqInput, setFaqInput] = useState<FAQItem>({
    question: "",
    answer: "",
  });

  // Custom Section Form
  const [editingSectionIndex, setEditingSectionIndex] = useState<number | null>(null);
  const [sectionInput, setSectionInput] = useState<CustomSection>({
    id: `sec_${Date.now()}`,
    title: "",
    subtitle: "",
    content: "",
    bgStyle: "offwhite",
  });

  useEffect(() => {
    setHeroForm({
      topBannerText: content.appConfig.topBannerText || "",
      heroBgUrl: content.appConfig.heroBgUrl || "",
      heroEventBadge: content.appConfig.heroEventBadge || "",
      heroHeadlineTitle: content.appConfig.heroHeadlineTitle || "",
      heroHeadlineSubtitle: content.appConfig.heroHeadlineSubtitle || "",
      heroHeadlineSubtitle2: content.appConfig.heroHeadlineSubtitle2 || "",
      heroFeatureTags: (content.appConfig.heroFeatureTags || []).join(", "),
      heroCountdownTitle: content.appConfig.heroCountdownTitle || "",
      heroCtaText: content.appConfig.heroCtaText || "",
      heroCtaSubtext: content.appConfig.heroCtaSubtext || "",
    });

    setIntroForm({
      introYoutubeUrl: content.appConfig.introYoutubeUrl || "",
      introInstagramUrl: content.appConfig.introInstagramUrl || "",
      introInstagramTitle: content.appConfig.introInstagramTitle || "",
      introInstagramCta: content.appConfig.introInstagramCta || "",
    });

    setPricingForm({
      earlyBirdDeadline: content.appConfig.earlyBirdDeadline || "",
      slotTotal: content.appConfig.slotTotal || 10,
      slotTaken: content.appConfig.slotTaken || 7,
    });

    setWaForm({
      adminWa: content.waConfig.adminWa || "",
      csWa: content.waConfig.csWa || "",
      waMessageTemplate: content.waConfig.waMessageTemplate || "",
      customWaLink: content.waConfig.customWaLink || "",
    });

    setPopupForm({
      exitTitle: content.popupConfig.exitTitle || "",
      exitDesc: content.popupConfig.exitDesc || "",
      exitPriceTag: content.popupConfig.exitPriceTag || "",
      exitCtaText: content.popupConfig.exitCtaText || "",
      stickyLabel: content.popupConfig.stickyLabel || "",
      stickyCtaText: content.popupConfig.stickyCtaText || "",
    });
  }, [content]);

  // Handle Hero Image File Upload
  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file terlalu besar (Maksimal 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setHeroForm((prev) => ({ ...prev, heroBgUrl: base64 }));
      showToast("File gambar berhasil di-load!");
    };
    reader.readAsDataURL(file);
  };

  // Save Hero
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArr = heroForm.heroFeatureTags.split(",").map((s) => s.trim()).filter(Boolean);
    updateAppConfig({
      topBannerText: heroForm.topBannerText,
      heroBgUrl: heroForm.heroBgUrl,
      heroEventBadge: heroForm.heroEventBadge,
      heroHeadlineTitle: heroForm.heroHeadlineTitle,
      heroHeadlineSubtitle: heroForm.heroHeadlineSubtitle,
      heroHeadlineSubtitle2: heroForm.heroHeadlineSubtitle2,
      heroFeatureTags: tagsArr,
      heroCountdownTitle: heroForm.heroCountdownTitle,
      heroCtaText: heroForm.heroCtaText,
      heroCtaSubtext: heroForm.heroCtaSubtext,
    });
    showToast("Pengaturan Hero berhasil disimpan!");
  };

  // Save Intro Video
  const handleSaveIntro = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppConfig({
      introYoutubeUrl: introForm.introYoutubeUrl,
      introInstagramUrl: introForm.introInstagramUrl,
      introInstagramTitle: introForm.introInstagramTitle,
      introInstagramCta: introForm.introInstagramCta,
    });
    showToast("Pengaturan Intro Video berhasil disimpan!");
  };

  // Save Pricing & Datepicker
  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppConfig({
      earlyBirdDeadline: pricingForm.earlyBirdDeadline,
      slotTotal: Number(pricingForm.slotTotal),
      slotTaken: Number(pricingForm.slotTaken),
    });
    showToast("Pengaturan Date & Scarcity berhasil disimpan!");
  };

  // Package Option CRUD
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageInput.name.trim()) return;
    const newPkgs = [...content.packages];
    if (editingPackageIndex !== null) {
      newPkgs[editingPackageIndex] = packageInput;
    } else {
      newPkgs.push(packageInput);
    }
    setPackages(newPkgs);
    setEditingPackageIndex(null);
    setPackageInput({
      code: `Pkg_${Date.now().toString().slice(-4)}`,
      name: "",
      currentPrice: "Rp 1.800.000",
      normalPrice: "Rp 2.500.000",
      badgeTag: "🎓 PROMO",
      subtitle: "",
      features: [""],
      isPopular: false,
    });
    showToast("Opsi Paket Pendaftaran berhasil diperbarui!");
  };

  const handleDeletePackage = (idx: number) => {
    if (window.confirm("Hapus opsi paket harga ini?")) {
      setPackages(content.packages.filter((_, i) => i !== idx));
      showToast("Paket harga berhasil dihapus!");
    }
  };

  // Testimonial CRUD
  const handleSaveTesti = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testiInput.name.trim()) return;
    const newTestis = [...content.testimonials];
    if (editingTestiIndex !== null) {
      newTestis[editingTestiIndex] = testiInput;
    } else {
      newTestis.push(testiInput);
    }
    setTestimonials(newTestis);
    setEditingTestiIndex(null);
    setTestiInput({
      id: `testi-${Date.now()}`,
      name: "",
      role: "",
      company: "",
      quote: "",
      videoEmbedUrl: "",
      avatarUrl: "",
      rating: 5,
    });
    showToast("Testimoni Alumni berhasil diperbarui!");
  };

  const handleDeleteTesti = (idx: number) => {
    if (window.confirm("Hapus testimoni alumni ini?")) {
      setTestimonials(content.testimonials.filter((_, i) => i !== idx));
      showToast("Testimoni berhasil dihapus!");
    }
  };

  // WA & Popup save
  const handleSaveWaPopup = (e: React.FormEvent) => {
    e.preventDefault();
    updateWaConfig(waForm);
    updatePopupConfig(popupForm);
    updateAppConfig({ waAdmin: waForm.adminWa, waCS: waForm.csWa });
    showToast("Pengaturan WhatsApp & Popup berhasil disimpan!");
  };

  // Section Reordering
  const moveSection = (idx: number, direction: "up" | "down") => {
    const list = [...content.sectionOrder];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    setSectionOrder(list);
    showToast("Urutan section berhasil diubah!");
  };

  // Custom Section CRUD
  const handleSaveCustomSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionInput.title.trim()) return;
    const list = [...content.customSections];
    if (editingSectionIndex !== null) {
      list[editingSectionIndex] = sectionInput;
    } else {
      list.push(sectionInput);
    }
    setCustomSections(list);
    setEditingSectionIndex(null);
    setSectionInput({
      id: `sec_${Date.now()}`,
      title: "",
      subtitle: "",
      content: "",
      bgStyle: "offwhite",
    });
    showToast("Section kustom berhasil disimpan!");
  };

  const handleDeleteCustomSection = (idx: number) => {
    if (window.confirm("Hapus section kustom ini?")) {
      setCustomSections(content.customSections.filter((_, i) => i !== idx));
      showToast("Section kustom berhasil dihapus!");
    }
  };

  // Module CRUD
  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleInput.title.trim()) return;
    const list = [...content.modules];
    if (editingModuleIndex !== null) {
      list[editingModuleIndex] = moduleInput;
    } else {
      list.push(moduleInput);
    }
    setModules(list);
    setEditingModuleIndex(null);
    setModuleInput({
      id: `Day ${list.length + 1}`,
      title: "",
      description: "",
      deliverables: [""],
      tools: "",
    });
    showToast("Modul berhasil diperbarui!");
  };

  const handleDeleteModule = (idx: number) => {
    if (window.confirm("Hapus modul ini?")) {
      setModules(content.modules.filter((_, i) => i !== idx));
      showToast("Modul berhasil dihapus!");
    }
  };

  // Speaker CRUD
  const handleSaveSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speakerInput.name.trim()) return;
    const list = [...content.speakers];
    if (editingSpeakerIndex !== null) {
      list[editingSpeakerIndex] = speakerInput;
    } else {
      list.push(speakerInput);
    }
    setSpeakers(list);
    setEditingSpeakerIndex(null);
    setSpeakerInput({ initials: "", name: "", role: "", description: "", imageUrl: "" });
    showToast("Pemateri berhasil diperbarui!");
  };

  const handleDeleteSpeaker = (idx: number) => {
    if (window.confirm("Hapus pemateri ini?")) {
      setSpeakers(content.speakers.filter((_, i) => i !== idx));
      showToast("Pemateri berhasil dihapus!");
    }
  };

  // FAQ CRUD
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqInput.question.trim()) return;
    const list = [...content.faqs];
    if (editingFaqIndex !== null) {
      list[editingFaqIndex] = faqInput;
    } else {
      list.push(faqInput);
    }
    setFaqs(list);
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

  // Filtered Leads
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
        "Reset seluruh isi website (Hero, Teks, Harga, Modul, Pemateri, Testimoni, Section Order) ke data bawaan awal?"
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
              <p className="text-[10px] text-cyan font-mono">Control Panel v2.0</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "hero"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Settings className="w-4 h-4" /> Hero Teks &amp; Media
            </button>

            <button
              onClick={() => setActiveTab("intro")}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "intro"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Video className="w-4 h-4" /> Intro Video (YT &amp; IG)
            </button>

            <button
              onClick={() => setActiveTab("pricing")}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "pricing"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Clock className="w-4 h-4" /> Datepicker &amp; Scarcity
            </button>

            <button
              onClick={() => setActiveTab("packages")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "packages"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" /> CRUD Opsi Paket
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {content.packages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "testimonials"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4" /> CRUD Testimoni Alumni
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {content.testimonials.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("modules")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
              onClick={() => setActiveTab("wa_popup")}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "wa_popup"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" /> WA Links &amp; Popups
            </button>

            <button
              onClick={() => setActiveTab("sections")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "sections"
                  ? "bg-gradient-to-r from-blue to-cyan text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-amber-400" /> Urutan Section
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {content.sectionOrder.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2 mt-4">
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
                {activeTab === "leads" && "Data Pendaftar (CRM & Hapus Rows)"}
                {activeTab === "hero" && "Pengaturan Teks Hero & Upload File Image"}
                {activeTab === "intro" && "Pengaturan Intro Video (YouTube & Instagram)"}
                {activeTab === "pricing" && "Pengaturan Datepicker & Scarcity Timer"}
                {activeTab === "packages" && "CRUD Opsi Paket Pendaftaran"}
                {activeTab === "testimonials" && "CRUD Testimoni Alumni"}
                {activeTab === "modules" && "Kelola Modul Kurikulum (CRUD)"}
                {activeTab === "speakers" && "Kelola Data Pemateri & Mentor"}
                {activeTab === "wa_popup" && "Pengaturan WhatsApp Links & Popup"}
                {activeTab === "sections" && "Urutan & Tambah Section Landing Page"}
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
                    <Trash2 className="w-4 h-4" /> Hapus Semua Leads
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
                        <th className="p-4">Harga / Waktu</th>
                        <th className="p-4 text-center pr-6">Aksi</th>
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
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                              {l.paket}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-black text-cyan-800 font-mono">{l.harga}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3" /> {l.timestamp}
                            </div>
                          </td>
                          <td className="p-4 text-center pr-6">
                            <button
                              onClick={() => handleDeleteSingleLead(l.id)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer"
                              title="Hapus baris lead ini"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-16 text-center">
                    <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h4 className="font-bold text-navy text-sm">Belum ada data leads</h4>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HERO SETTINGS WITH FILE UPLOAD */}
          {activeTab === "hero" && (
            <form onSubmit={handleSaveHero} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-6 max-w-4xl shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-black text-lg text-navy flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue" /> Edit Seluruh Teks &amp; Background Hero Section
                </h3>
              </div>

              {/* File Upload for Hero Background */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                  🖼️ Hero Background Image (Pilih File Komputer atau Masukkan URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="px-5 py-3 bg-blue hover:bg-blue-light text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-2 shadow-sm transition-all flex-shrink-0">
                    <Upload className="w-4 h-4" /> Pilih File Gambar Dari Komputer
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-slate-400 font-mono">atau gunakan URL:</span>
                  <input
                    type="text"
                    value={heroForm.heroBgUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, heroBgUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono"
                  />
                </div>
                {heroForm.heroBgUrl && (
                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                    <span>Preview Background:</span>
                    <img
                      src={heroForm.heroBgUrl}
                      alt="Hero preview"
                      className="h-10 w-20 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Top Running Announcement Banner
                </label>
                <input
                  type="text"
                  value={heroForm.topBannerText}
                  onChange={(e) => setHeroForm({ ...heroForm, topBannerText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Badge Teks Acara (Atas Title)
                </label>
                <input
                  type="text"
                  value={heroForm.heroEventBadge}
                  onChange={(e) => setHeroForm({ ...heroForm, heroEventBadge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Hero Headline Title
                </label>
                <textarea
                  rows={3}
                  value={heroForm.heroHeadlineTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold leading-relaxed"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                    Hero Sub-Headline Utama
                  </label>
                  <textarea
                    rows={3}
                    value={heroForm.heroHeadlineSubtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineSubtitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                    Hero Sub-Headline Tambahan
                  </label>
                  <textarea
                    rows={3}
                    value={heroForm.heroHeadlineSubtitle2}
                    onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineSubtitle2: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy leading-relaxed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Feature Badges (Pisahkan Koma)
                </label>
                <input
                  type="text"
                  value={heroForm.heroFeatureTags}
                  onChange={(e) => setHeroForm({ ...heroForm, heroFeatureTags: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold"
                  placeholder="⚡ 1 ide -> 10 konten/jam, 🤖 Sistem Aktif 24/7, 📈 80% Lebih Efisien"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">Teks Countdown Box</label>
                  <input
                    type="text"
                    value={heroForm.heroCountdownTitle}
                    onChange={(e) => setHeroForm({ ...heroForm, heroCountdownTitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">Teks Tombol CTA</label>
                  <input
                    type="text"
                    value={heroForm.heroCtaText}
                    onChange={(e) => setHeroForm({ ...heroForm, heroCtaText: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">Teks Sub-CTA</label>
                  <input
                    type="text"
                    value={heroForm.heroCtaSubtext}
                    onChange={(e) => setHeroForm({ ...heroForm, heroCtaSubtext: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-blue hover:bg-blue-light text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Teks &amp; Media Hero
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: INTRO VIDEO WITH 2 SEPARATE FIELDS */}
          {activeTab === "intro" && (
            <form onSubmit={handleSaveIntro} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-6 max-w-4xl shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-black text-lg text-navy flex items-center gap-2">
                  <Video className="w-5 h-5 text-rose-600" /> Section Intro Video (2 Field: YouTube &amp; Instagram Reels)
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Atur video pengantar utama (YouTube embed) dan tautan Instagram Reels pendaftaran secara terpisah.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-navy flex items-center gap-2">
                  🎥 1. Main Video Embed (YouTube Video)
                </h4>
                <input
                  type="text"
                  value={introForm.introYoutubeUrl}
                  onChange={(e) => setIntroForm({ ...introForm, introYoutubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/Rt4q44v09qc"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-mono"
                />
              </div>

              <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-200/60 space-y-4">
                <h4 className="font-bold text-sm text-navy flex items-center gap-2">
                  📸 2. Instagram Reels Card &amp; Link
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Card Instagram</label>
                    <input
                      type="text"
                      value={introForm.introInstagramTitle}
                      onChange={(e) => setIntroForm({ ...introForm, introInstagramTitle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol CTA Instagram</label>
                    <input
                      type="text"
                      value={introForm.introInstagramCta}
                      onChange={(e) => setIntroForm({ ...introForm, introInstagramCta: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Link Instagram Reels</label>
                  <input
                    type="text"
                    value={introForm.introInstagramUrl}
                    onChange={(e) => setIntroForm({ ...introForm, introInstagramUrl: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan Intro Video
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: DATEPICKER & SCARCITY */}
          {activeTab === "pricing" && (
            <form onSubmit={handleSavePricing} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-6 max-w-4xl shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-black text-lg text-navy flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" /> Pemilih Tanggal &amp; Waktu (Anti-Typo) &amp; Kuota Slot
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                    📅 Target Tanggal &amp; Waktu Countdown (Anti-Typo Datepicker)
                  </label>
                  <input
                    type="datetime-local"
                    value={pricingForm.earlyBirdDeadline.replace("T", " ").slice(0, 16).replace(" ", "T")}
                    onChange={(e) => {
                      const val = e.target.value ? `${e.target.value}:00` : "";
                      setPricingForm({ ...pricingForm, earlyBirdDeadline: val });
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold focus:outline-none focus:border-blue focus:bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Nilai tersimpan: {pricingForm.earlyBirdDeadline}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">Total Slot</label>
                    <input
                      type="number"
                      value={pricingForm.slotTotal}
                      onChange={(e) => setPricingForm({ ...pricingForm, slotTotal: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">Slot Terisi</label>
                    <input
                      type="number"
                      value={pricingForm.slotTaken}
                      onChange={(e) => setPricingForm({ ...pricingForm, slotTaken: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-navy font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan Datepicker
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: CRUD PACKAGE OPTIONS */}
          {activeTab === "packages" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSavePackage} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue" />
                  {editingPackageIndex !== null ? "Edit Opsi Paket Pendaftaran" : "Tambah Opsi Paket Harga Baru"}
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kode Paket (e.g. Mitra_Universitas)</label>
                    <input
                      type="text"
                      value={packageInput.code}
                      onChange={(e) => setPackageInput({ ...packageInput, code: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Paket</label>
                    <input
                      type="text"
                      value={packageInput.name}
                      onChange={(e) => setPackageInput({ ...packageInput, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                      placeholder="Harga Khusus..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={packageInput.badgeTag}
                      onChange={(e) => setPackageInput({ ...packageInput, badgeTag: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Harga Promo (Saat Ini)</label>
                    <input
                      type="text"
                      value={packageInput.currentPrice}
                      onChange={(e) => setPackageInput({ ...packageInput, currentPrice: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Harga Normal</label>
                    <input
                      type="text"
                      value={packageInput.normalPrice}
                      onChange={(e) => setPackageInput({ ...packageInput, normalPrice: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub-judul Kualifikasi</label>
                    <input
                      type="text"
                      value={packageInput.subtitle}
                      onChange={(e) => setPackageInput({ ...packageInput, subtitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fitur &amp; Benefit Paket (Pisahkan Koma)</label>
                  <input
                    type="text"
                    value={packageInput.features.join(", ")}
                    onChange={(e) =>
                      setPackageInput({
                        ...packageInput,
                        features: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  {editingPackageIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPackageIndex(null);
                        setPackageInput({
                          code: `Pkg_${Date.now().toString().slice(-4)}`,
                          name: "",
                          currentPrice: "Rp 1.800.000",
                          normalPrice: "Rp 2.500.000",
                          badgeTag: "🎓 PROMO",
                          subtitle: "",
                          features: [""],
                          isPopular: false,
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
                    {editingPackageIndex !== null ? "Simpan Perubahan Paket" : "Tambah Paket"}
                  </button>
                </div>
              </form>

              {/* Packages List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Opsi Paket Harga ({content.packages.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.packages.map((pkg, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg uppercase">
                          {pkg.code}
                        </span>
                        <h5 className="font-bold text-sm text-navy mt-1">{pkg.name}</h5>
                        <p className="text-xs text-blue font-mono font-bold mt-0.5">
                          {pkg.currentPrice} <span className="line-through text-slate-400 text-[10px]">{pkg.normalPrice}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingPackageIndex(idx);
                            setPackageInput(pkg);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(idx)}
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

          {/* TAB 6: CRUD TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSaveTesti} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  {editingTestiIndex !== null ? "Edit Testimoni Alumni" : "Tambah Testimoni Alumni Baru"}
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Alumni</label>
                    <input
                      type="text"
                      value={testiInput.name}
                      onChange={(e) => setTestiInput({ ...testiInput, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role / Profesi</label>
                    <input
                      type="text"
                      value={testiInput.role}
                      onChange={(e) => setTestiInput({ ...testiInput, role: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Perusahaan / Instansi</label>
                    <input
                      type="text"
                      value={testiInput.company}
                      onChange={(e) => setTestiInput({ ...testiInput, company: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quote Testimoni Ulasan</label>
                  <textarea
                    rows={3}
                    value={testiInput.quote}
                    onChange={(e) => setTestiInput({ ...testiInput, quote: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Video Embed URL (Opsional)</label>
                  <input
                    type="text"
                    value={testiInput.videoEmbedUrl || ""}
                    onChange={(e) => setTestiInput({ ...testiInput, videoEmbedUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  {editingTestiIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestiIndex(null);
                        setTestiInput({
                          id: `testi-${Date.now()}`,
                          name: "",
                          role: "",
                          company: "",
                          quote: "",
                          videoEmbedUrl: "",
                          avatarUrl: "",
                          rating: 5,
                        });
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
                    {editingTestiIndex !== null ? "Simpan Testimoni" : "Tambah Testimoni"}
                  </button>
                </div>
              </form>

              {/* Testimonials List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                <h4 className="font-bold text-sm text-navy mb-4">Daftar Testimoni Alumni ({content.testimonials.length})</h4>
                <div className="divide-y divide-slate-100">
                  {content.testimonials.map((t, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-sm text-navy">{t.name} ({t.role} @ {t.company})</h5>
                        <p className="text-xs text-slate-500 italic line-clamp-1 mt-0.5">&quot;{t.quote}&quot;</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingTestiIndex(idx);
                            setTestiInput(t);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTesti(idx)}
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

          {/* TAB 7: WA LINKS & POPUPS */}
          {activeTab === "wa_popup" && (
            <form onSubmit={handleSaveWaPopup} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-6 max-w-4xl shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-black text-lg text-navy flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" /> Nomor WA, Pesan Otomatis, Exit Popup &amp; Sticky Footer
                </h3>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/60 space-y-4">
                <h4 className="font-bold text-sm text-navy flex items-center gap-2">
                  💬 Pengaturan WhatsApp Link &amp; Text
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WA Admin Pendaftaran</label>
                    <input
                      type="text"
                      value={waForm.adminWa}
                      onChange={(e) => setWaForm({ ...waForm, adminWa: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WA Customer Service</label>
                    <input
                      type="text"
                      value={waForm.csWa}
                      onChange={(e) => setWaForm({ ...waForm, csWa: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Template Pesan Otomatis WA</label>
                  <textarea
                    rows={3}
                    value={waForm.waMessageTemplate}
                    onChange={(e) => setWaForm({ ...waForm, waMessageTemplate: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-navy flex items-center gap-2">
                  🚪 Pengaturan Teks Exit Popup &amp; Sticky Footer Mobile
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Exit Popup</label>
                    <input
                      type="text"
                      value={popupForm.exitTitle}
                      onChange={(e) => setPopupForm({ ...popupForm, exitTitle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tombol CTA Exit Popup</label>
                    <input
                      type="text"
                      value={popupForm.exitCtaText}
                      onChange={(e) => setPopupForm({ ...popupForm, exitCtaText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Exit Popup</label>
                  <textarea
                    rows={2}
                    value={popupForm.exitDesc}
                    onChange={(e) => setPopupForm({ ...popupForm, exitDesc: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Label Sticky Footer Mobile</label>
                    <input
                      type="text"
                      value={popupForm.stickyLabel}
                      onChange={(e) => setPopupForm({ ...popupForm, stickyLabel: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tombol CTA Sticky Footer</label>
                    <input
                      type="text"
                      value={popupForm.stickyCtaText}
                      onChange={(e) => setPopupForm({ ...popupForm, stickyCtaText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan WA &amp; Popup
                </button>
              </div>
            </form>
          )}

          {/* TAB 8: SECTION REORDERING & CUSTOM SECTIONS */}
          {activeTab === "sections" && (
            <div className="space-y-8 max-w-5xl">
              {/* Reordering Existing Sections */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-500" /> Atur Urutan Section Landing Page (Naik / Turun)
                </h3>
                <p className="text-slate-500 text-xs">
                  Gunakan tombol panah untuk mengubah posisi tampilan section di website.
                </p>

                <div className="space-y-2 pt-2">
                  {content.sectionOrder.map((secId, idx) => (
                    <div
                      key={secId}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-navy text-white text-xs font-mono font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-sm text-navy uppercase font-mono tracking-wider">
                          {secId}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveSection(idx, "up")}
                          disabled={idx === 0}
                          className="p-2 bg-white hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSection(idx, "down")}
                          disabled={idx === content.sectionOrder.length - 1}
                          className="p-2 bg-white hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Custom Section */}
              <form onSubmit={handleSaveCustomSection} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue" />
                  {editingSectionIndex !== null ? "Edit Section Kustom" : "Tambah Section Kustom Baru"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Section</label>
                    <input
                      type="text"
                      value={sectionInput.title}
                      onChange={(e) => setSectionInput({ ...sectionInput, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub-judul Section</label>
                    <input
                      type="text"
                      value={sectionInput.subtitle}
                      onChange={(e) => setSectionInput({ ...sectionInput, subtitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Isi Konten Teks / HTML</label>
                  <textarea
                    rows={4}
                    value={sectionInput.content}
                    onChange={(e) => setSectionInput({ ...sectionInput, content: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy font-mono"
                    placeholder="Tuliskan isi teks atau format HTML sederhana di sini..."
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  {editingSectionIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSectionIndex(null);
                        setSectionInput({
                          id: `sec_${Date.now()}`,
                          title: "",
                          subtitle: "",
                          content: "",
                          bgStyle: "offwhite",
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
                    {editingSectionIndex !== null ? "Simpan Section Kustom" : "Tambah Section"}
                  </button>
                </div>
              </form>

              {/* Custom Sections List */}
              {content.customSections.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                  <h4 className="font-bold text-sm text-navy mb-4">Daftar Section Kustom ({content.customSections.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {content.customSections.map((sec, idx) => (
                      <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                        <div>
                          <h5 className="font-bold text-sm text-navy">{sec.title}</h5>
                          <p className="text-xs text-slate-500 line-clamp-1">{sec.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              setEditingSectionIndex(idx);
                              setSectionInput(sec);
                            }}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomSection(idx)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OTHER TABS: MODULES, SPEAKERS, FAQS */}
          {activeTab === "modules" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSaveModule} className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
                <h3 className="font-black text-base text-navy flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue" />
                  {editingModuleIndex !== null ? "Edit Modul Kurikulum" : "Tambah Modul Kurikulum Baru"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hari / Kode</label>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">AI Tools</label>
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
                    {editingModuleIndex !== null ? "Simpan Modul" : "Tambah Modul"}
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
