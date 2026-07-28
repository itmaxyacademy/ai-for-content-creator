import React, { useState, useEffect, useRef } from "react";
import {
  ModulItem,
  SpeakerItem,
  FAQItem,
  VideoItem,
  TestimonialItem,
  PackageOptionItem,
  CustomSection,
  ValueStackItem,
  PainCardItem,
  SolutionCardItem,
  AIToolItem,
  FutureWorkCardItem
} from "../types";
import { useContent } from "../context/ContentContext";
import {
  Trash2,
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
  Eye,
  CheckCircle2,
  AlertCircle,
  Zap,
  Gift,
  TrendingUp
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
    updateProblemConfig,
    updateSolutionConfig,
    setValueStackItems,
    setAiTools,
    updateFutureWorkConfig,
    resetToDefault,
  } = useContent();

  const [activeTab, setActiveTab] = useState<
    | "hero"
    | "intro"
    | "problem"
    | "future_of_work"
    | "solutions"
    | "pricing"
    | "packages"
    | "valuestack"
    | "testimonials"
    | "modules"
    | "speakers"
    | "faqs"
    | "wa_popup"
    | "sections"
  >("hero");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
    countdownMode: content.appConfig.countdownMode || "real",
    evergreenMinutes: content.appConfig.evergreenMinutes || 45,
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

  const [problemForm, setProblemForm] = useState({
    badgeText: content.problemConfig?.badgeText || "",
    title: content.problemConfig?.title || "",
    titleHighlight: content.problemConfig?.titleHighlight || "",
    beforeList: (content.problemConfig?.beforeList || []).join("\n"),
    afterList: (content.problemConfig?.afterList || []).join("\n"),
  });

  const [solutionForm, setSolutionForm] = useState({
    badgeText: content.solutionConfig?.badgeText || "",
    title: content.solutionConfig?.title || "",
    titleHighlight: content.solutionConfig?.titleHighlight || "",
    subtitle: content.solutionConfig?.subtitle || "",
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
    badgeTag: "",
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

  // CRUD Value Stack Form
  const [editingValueStackIndex, setEditingValueStackIndex] = useState<number | null>(null);
  const [valueStackInput, setValueStackInput] = useState<ValueStackItem>({
    title: "",
    desc: "",
    value: "Rp 3.000.000",
    isBonus: false,
  });

  const handleSaveValueStack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valueStackInput.title.trim()) return;
    const list = [...(content.valueStackItems || [])];
    if (editingValueStackIndex !== null) {
      list[editingValueStackIndex] = valueStackInput;
    } else {
      list.push(valueStackInput);
    }
    setValueStackItems(list);
    setEditingValueStackIndex(null);
    setValueStackInput({ title: "", desc: "", value: "Rp 3.000.000", isBonus: false });
    showToast("Item 'Yang Kamu Dapatkan' berhasil disimpan!");
  };

  const handleDeleteValueStack = (idx: number) => {
    if (window.confirm("Hapus item value stack ini?")) {
      setValueStackItems((content.valueStackItems || []).filter((_, i) => i !== idx));
      showToast("Item berhasil dihapus!");
    }
  };

  // Pain Card Sub-Form State
  const [editingPainCardIndex, setEditingPainCardIndex] = useState<number | null>(null);
  const [painCardInput, setPainCardInput] = useState<PainCardItem>({ icon: "", title: "", desc: "" });

  const handleSavePainCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!painCardInput.title.trim()) return;
    const cards = [...(content.problemConfig?.cards || [])];
    if (editingPainCardIndex !== null) {
      cards[editingPainCardIndex] = painCardInput;
    } else {
      cards.push(painCardInput);
    }
    updateProblemConfig({ cards });
    setEditingPainCardIndex(null);
    setPainCardInput({ icon: "", title: "", desc: "" });
    showToast("Kartu masalah berhasil disimpan!");
  };

  const handleDeletePainCard = (idx: number) => {
    if (window.confirm("Hapus kartu masalah ini?")) {
      const cards = (content.problemConfig?.cards || []).filter((_, i) => i !== idx);
      updateProblemConfig({ cards });
      showToast("Kartu masalah berhasil dihapus!");
    }
  };

  // Solution Card Sub-Form State
  const [editingSolutionCardIndex, setEditingSolutionCardIndex] = useState<number | null>(null);
  const [solutionCardInput, setSolutionCardInput] = useState<SolutionCardItem>({ title: "", desc: "" });

  const handleSaveSolutionCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!solutionCardInput.title.trim()) return;
    const cards = [...(content.solutionConfig?.cards || [])];
    if (editingSolutionCardIndex !== null) {
      cards[editingSolutionCardIndex] = solutionCardInput;
    } else {
      cards.push(solutionCardInput);
    }
    updateSolutionConfig({ cards });
    setEditingSolutionCardIndex(null);
    setSolutionCardInput({ title: "", desc: "" });
    showToast("Kartu solusi berhasil disimpan!");
  };

  const handleDeleteSolutionCard = (idx: number) => {
    if (window.confirm("Hapus kartu solusi ini?")) {
      const cards = (content.solutionConfig?.cards || []).filter((_, i) => i !== idx);
      updateSolutionConfig({ cards });
      showToast("Kartu solusi berhasil dihapus!");
    }
  };

  // AI Tool Sub-Form State
  const aiToolFormRef = useRef<HTMLFormElement>(null);
  const [editingAiToolIndex, setEditingAiToolIndex] = useState<number | null>(null);
  const [aiToolInput, setAiToolInput] = useState<AIToolItem>({ name: "", domain: "" });

  const handleSaveAiTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiToolInput.name.trim()) return;
    const tools = [...(content.aiTools || [])];
    if (editingAiToolIndex !== null) {
      tools[editingAiToolIndex] = aiToolInput;
    } else {
      tools.push(aiToolInput);
    }
    setAiTools(tools);
    setEditingAiToolIndex(null);
    setAiToolInput({ name: "", domain: "" });
    showToast("Alat AI berhasil disimpan!");
  };

  const handleAiToolLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAiToolInput((prev) => ({ ...prev, logoUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAiTool = (idx: number) => {
    if (window.confirm("Hapus alat AI ini dari daftar?")) {
      setAiTools((content.aiTools || []).filter((_, i) => i !== idx));
      showToast("Alat AI berhasil dihapus!");
    }
  };

  // Future of Work Form State
  const futureWorkCardFormRef = useRef<HTMLFormElement>(null);
  const [futureWorkForm, setFutureWorkForm] = useState({
    badgeText: content.futureWorkConfig?.badgeText || "",
    title: content.futureWorkConfig?.title || "",
    titleHighlight: content.futureWorkConfig?.titleHighlight || "",
    subtitle: content.futureWorkConfig?.subtitle || "",
  });

  const [editingFutureWorkCardIndex, setEditingFutureWorkCardIndex] = useState<number | null>(null);
  const [futureWorkCardInput, setFutureWorkCardInput] = useState<FutureWorkCardItem>({
    icon: "",
    stat: "",
    title: "",
    desc: "",
  });

  const handleSaveFutureWorkHeadings = (e: React.FormEvent) => {
    e.preventDefault();
    updateFutureWorkConfig({
      badgeText: futureWorkForm.badgeText,
      title: futureWorkForm.title,
      titleHighlight: futureWorkForm.titleHighlight,
      subtitle: futureWorkForm.subtitle,
    });
    showToast("Teks Headings Future of Work berhasil disimpan!");
  };

  const handleSaveFutureWorkCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!futureWorkCardInput.title.trim()) return;
    const cards = [...(content.futureWorkConfig?.cards || [])];
    if (editingFutureWorkCardIndex !== null) {
      cards[editingFutureWorkCardIndex] = futureWorkCardInput;
    } else {
      cards.push(futureWorkCardInput);
    }
    updateFutureWorkConfig({ cards });
    setEditingFutureWorkCardIndex(null);
    setFutureWorkCardInput({ icon: "", stat: "", title: "", desc: "" });
    showToast("Kartu Future of Work berhasil disimpan!");
  };

  const handleDeleteFutureWorkCard = (idx: number) => {
    if (window.confirm("Hapus kartu Future of Work ini?")) {
      const cards = (content.futureWorkConfig?.cards || []).filter((_, i) => i !== idx);
      updateFutureWorkConfig({ cards });
      showToast("Kartu berhasil dihapus!");
    }
  };

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
      countdownMode: content.appConfig.countdownMode || "real",
      evergreenMinutes: content.appConfig.evergreenMinutes || 45,
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

    setProblemForm({
      badgeText: content.problemConfig?.badgeText || "",
      title: content.problemConfig?.title || "",
      titleHighlight: content.problemConfig?.titleHighlight || "",
      beforeList: (content.problemConfig?.beforeList || []).join("\n"),
      afterList: (content.problemConfig?.afterList || []).join("\n"),
    });

    setSolutionForm({
      badgeText: content.solutionConfig?.badgeText || "",
      title: content.solutionConfig?.title || "",
      titleHighlight: content.solutionConfig?.titleHighlight || "",
      subtitle: content.solutionConfig?.subtitle || "",
    });

    setFutureWorkForm({
      badgeText: content.futureWorkConfig?.badgeText || "",
      title: content.futureWorkConfig?.title || "",
      titleHighlight: content.futureWorkConfig?.titleHighlight || "",
      subtitle: content.futureWorkConfig?.subtitle || "",
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

  // Handle Speaker Photo File Upload
  const handleSpeakerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file terlalu besar (Maksimal 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSpeakerInput((prev) => ({ ...prev, imageUrl: base64 }));
      showToast("Foto pemateri berhasil di-upload!");
    };
    reader.readAsDataURL(file);
  };

  // Save Handlers
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

  const handleSaveProblem = (e: React.FormEvent) => {
    e.preventDefault();
    updateProblemConfig({
      badgeText: problemForm.badgeText,
      title: problemForm.title,
      titleHighlight: problemForm.titleHighlight,
      beforeList: problemForm.beforeList.split("\n").map(s => s.trim()).filter(Boolean),
      afterList: problemForm.afterList.split("\n").map(s => s.trim()).filter(Boolean),
    });
    showToast("Pengaturan Section Masalah & Komparasi berhasil disimpan!");
  };

  const handleSaveSolution = (e: React.FormEvent) => {
    e.preventDefault();
    updateSolutionConfig({
      badgeText: solutionForm.badgeText,
      title: solutionForm.title,
      titleHighlight: solutionForm.titleHighlight,
      subtitle: solutionForm.subtitle,
    });
    showToast("Pengaturan Section Solusi MAXY berhasil disimpan!");
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppConfig({
      earlyBirdDeadline: pricingForm.earlyBirdDeadline,
      countdownMode: pricingForm.countdownMode as "real" | "evergreen",
      evergreenMinutes: Number(pricingForm.evergreenMinutes) || 45,
      slotTotal: Number(pricingForm.slotTotal),
      slotTaken: Number(pricingForm.slotTaken),
    });
    showToast("Pengaturan Countdown & Scarcity berhasil disimpan!");
  };

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
    showToast("Opsi Paket Pendaftaran berhasil disimpan!");
  };

  const handleDeletePackage = (idx: number) => {
    if (window.confirm("Hapus opsi paket harga ini?")) {
      setPackages(content.packages.filter((_, i) => i !== idx));
      showToast("Paket harga berhasil dihapus!");
    }
  };

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
    showToast("Testimoni Alumni berhasil disimpan!");
  };

  const handleDeleteTesti = (idx: number) => {
    if (window.confirm("Hapus testimoni alumni ini?")) {
      setTestimonials(content.testimonials.filter((_, i) => i !== idx));
      showToast("Testimoni berhasil dihapus!");
    }
  };

  const handleSaveWaPopup = (e: React.FormEvent) => {
    e.preventDefault();
    updateWaConfig(waForm);
    updatePopupConfig(popupForm);
    updateAppConfig({ waAdmin: waForm.adminWa, waCS: waForm.csWa });
    showToast("Pengaturan WhatsApp & Popup berhasil disimpan!");
  };

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
    showToast("Modul kurikulum berhasil disimpan!");
  };

  const handleDeleteModule = (idx: number) => {
    if (window.confirm("Hapus modul ini?")) {
      setModules(content.modules.filter((_, i) => i !== idx));
      showToast("Modul berhasil dihapus!");
    }
  };

  const handleSaveSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speakerInput.name.trim()) return;

    const itemToSave: SpeakerItem = {
      ...speakerInput,
      initials: speakerInput.initials.trim() || speakerInput.name.trim().slice(0, 2).toUpperCase(),
    };

    const list = [...content.speakers];
    if (editingSpeakerIndex !== null) {
      list[editingSpeakerIndex] = itemToSave;
    } else {
      list.push(itemToSave);
    }
    setSpeakers(list);
    setEditingSpeakerIndex(null);
    setSpeakerInput({ initials: "", name: "", role: "", badgeTag: "", description: "", imageUrl: "" });
    showToast("Data pemateri berhasil disimpan!");
  };

  const handleDeleteSpeaker = (idx: number) => {
    if (window.confirm("Hapus data pemateri ini?")) {
      setSpeakers(content.speakers.filter((_, i) => i !== idx));
      showToast("Pemateri berhasil dihapus!");
    }
  };

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
    showToast("Pertanyaan FAQ berhasil disimpan!");
  };

  const handleDeleteFaq = (idx: number) => {
    if (window.confirm("Hapus pertanyaan FAQ ini?")) {
      setFaqs(content.faqs.filter((_, i) => i !== idx));
      showToast("FAQ berhasil dihapus!");
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
    <div className="min-h-screen bg-[#0F172A] flex flex-col md:flex-row text-slate-100 font-sans antialiased selection:bg-blue-500/30 relative">
      {/* Toast message popup */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1B4FD8] text-white font-bold text-xs px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2 border border-blue-400">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0B1120] text-white flex flex-col justify-between p-5 border-r border-slate-800 flex-shrink-0">
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-800 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#1B4FD8] flex items-center justify-center text-white font-black text-base">
              M
            </div>
            <div>
              <h2 className="font-bold text-sm text-white leading-tight">MAXY Admin CMS</h2>
              <p className="text-[10px] text-slate-400 font-mono">Control Panel Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
            <button
              onClick={() => setActiveTab("hero")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "hero"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Settings className="w-4 h-4 text-slate-300" /> Hero Teks &amp; Media
            </button>

            <button
              onClick={() => setActiveTab("intro")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "intro"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Video className="w-4 h-4 text-slate-300" /> Intro Video (YT &amp; IG)
            </button>

            <button
              onClick={() => setActiveTab("problem")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "problem"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <AlertCircle className="w-4 h-4 text-slate-300" /> Masalah &amp; Workflow
            </button>

            <button
              onClick={() => setActiveTab("future_of_work")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "future_of_work"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-slate-300" /> Future of Work &amp; Tren
            </button>

            <button
              onClick={() => setActiveTab("solutions")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "solutions"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Zap className="w-4 h-4 text-slate-300" /> Solusi MAXY
            </button>

            <button
              onClick={() => setActiveTab("pricing")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "pricing"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Clock className="w-4 h-4 text-slate-300" /> Datepicker &amp; Scarcity
            </button>

            <button
              onClick={() => setActiveTab("packages")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "packages"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-slate-300" /> Opsi Paket Harga
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {content.packages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("valuestack")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "valuestack"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-slate-300" /> Yang Kamu Dapatkan
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {(content.valueStackItems || []).length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "testimonials"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-slate-300" /> Testimoni Alumni
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {content.testimonials.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("modules")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "modules"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-slate-300" /> Modul Kurikulum
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {content.modules.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("speakers")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "speakers"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4 text-slate-300" /> Pemateri / Mentor
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {content.speakers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "faqs"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-slate-300" /> Tanya Jawab (FAQ)
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {content.faqs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("wa_popup")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "wa_popup"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <MessageCircle className="w-4 h-4 text-slate-300" /> WA &amp; Popups
            </button>

            <button
              onClick={() => setActiveTab("sections")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "sections"
                  ? "bg-[#1B4FD8] text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-slate-300" /> Urutan Section
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {content.sectionOrder.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2 mt-4">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-700"
          >
            <ExternalLink className="w-4 h-4" /> Lihat Landing Page
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-red-500/20 text-red-400 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0B1120]">
        {/* Top Header Bar */}
        <header className="bg-[#0B1120] border-b border-slate-800 px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <h1 className="text-lg font-bold text-white uppercase tracking-wider font-sans">
                {activeTab === "hero" && "Teks Hero &amp; Media Upload"}
                {activeTab === "intro" && "Intro Video (YouTube &amp; Instagram)"}
                {activeTab === "problem" && "Section Masalah &amp; Komparasi Workflow"}
                {activeTab === "future_of_work" && "Section Future of Work &amp; Tren AI"}
                {activeTab === "pricing" && "Datepicker &amp; Scarcity Settings"}
                {activeTab === "packages" && "Opsi Paket Pendaftaran"}
                {activeTab === "valuestack" && "Item 'Yang Kamu Dapatkan' (Value Stack)"}
                {activeTab === "testimonials" && "Testimoni Alumni"}
                {activeTab === "modules" && "Modul Kurikulum"}
                {activeTab === "speakers" && "Data Pemateri &amp; Mentor"}
                {activeTab === "faqs" && "Tanya Jawab &amp; FAQ Settings"}
                {activeTab === "wa_popup" && "WhatsApp &amp; Popup Settings"}
                {activeTab === "sections" && "Urutan &amp; Custom Section"}
              </h1>
            </div>
            <p className="text-slate-400 text-xs mt-0.5 font-mono">
              Dashboard Pengelolaan Konten Website MAXY
            </p>
          </div>

        </header>

        {/* Content Body Container */}
        <div className="flex-1 overflow-auto p-6 md:p-8 space-y-6">

          {/* TAB 1: HERO SETTINGS */}
          {activeTab === "hero" && (
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Form Input Card */}
              <form onSubmit={handleSaveHero} className="lg:col-span-7 bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-400" /> Edit Teks &amp; Background Hero
                  </h3>
                </div>

                {/* File Upload Component */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider">
                    Hero Background Image
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg cursor-pointer flex items-center gap-2 transition-colors flex-shrink-0">
                      <Upload className="w-3.5 h-3.5" /> Pilih Gambar Komputer
                      <input type="file" accept="image/*" onChange={handleHeroFileUpload} className="hidden" />
                    </label>
                    <span className="text-xs text-slate-500 font-mono">atau URL:</span>
                    <input
                      type="text"
                      value={heroForm.heroBgUrl}
                      onChange={(e) => setHeroForm({ ...heroForm, heroBgUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">
                    Top Announcement Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.topBannerText}
                    onChange={(e) => setHeroForm({ ...heroForm, topBannerText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">
                    Badge Teks Acara
                  </label>
                  <input
                    type="text"
                    value={heroForm.heroEventBadge}
                    onChange={(e) => setHeroForm({ ...heroForm, heroEventBadge: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">
                    Hero Headline Title
                  </label>
                  <textarea
                    rows={3}
                    value={heroForm.heroHeadlineTitle}
                    onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold leading-relaxed"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">
                      Sub-Headline Utama
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.heroHeadlineSubtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineSubtitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">
                      Sub-Headline Tambahan
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.heroHeadlineSubtitle2}
                      onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineSubtitle2: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white leading-relaxed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">
                    Feature Badges (Pisahkan Koma)
                  </label>
                  <input
                    type="text"
                    value={heroForm.heroFeatureTags}
                    onChange={(e) => setHeroForm({ ...heroForm, heroFeatureTags: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-medium"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">Teks Countdown</label>
                    <input
                      type="text"
                      value={heroForm.heroCountdownTitle}
                      onChange={(e) => setHeroForm({ ...heroForm, heroCountdownTitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">Teks Tombol CTA</label>
                    <input
                      type="text"
                      value={heroForm.heroCtaText}
                      onChange={(e) => setHeroForm({ ...heroForm, heroCtaText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">Teks Sub-CTA</label>
                    <input
                      type="text"
                      value={heroForm.heroCtaSubtext}
                      onChange={(e) => setHeroForm({ ...heroForm, heroCtaSubtext: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Simpan Teks Hero
                  </button>
                </div>
              </form>

              {/* Live Preview Card */}
              <div className="lg:col-span-5 bg-[#111827] p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="font-bold text-xs text-slate-300 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-400" /> Pratinjau Tampilan Hero
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">Live View</span>
                </div>

                <div className="bg-[#eaf4fd] text-navy p-5 rounded-xl border border-slate-200 relative overflow-hidden space-y-3 text-center">
                  {heroForm.heroBgUrl && (
                    <img src={heroForm.heroBgUrl} alt="Background preview" className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none" />
                  )}

                  <span className="inline-block bg-[#1e293b] text-white text-[10px] font-bold px-3 py-1 rounded-full relative z-10">
                    {heroForm.heroEventBadge || "Masterclass · Mulai 4 Agustus..."}
                  </span>

                  <h3 className="text-lg font-black text-[#0B1628] leading-tight relative z-10 whitespace-pre-line">
                    {heroForm.heroHeadlineTitle || "BANGUN SISTEM KONTEN KAMU..."}
                  </h3>

                  <p className="text-xs text-slate-800 leading-relaxed font-semibold relative z-10">
                    {heroForm.heroHeadlineSubtitle}
                  </p>

                  <div className="bg-[#1B4FD8] text-white p-3 rounded-lg relative z-10">
                    <p className="text-[10px] font-bold uppercase font-mono">{heroForm.heroCountdownTitle}</p>
                    <p className="text-xs font-black font-mono mt-0.5">00j : 45m : 12d</p>
                  </div>

                  <button className="bg-[#25D366] text-white font-bold text-xs py-2.5 px-5 rounded-full relative z-10">
                    {heroForm.heroCtaText} →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTRO VIDEO SETTINGS */}
          {activeTab === "intro" && (
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <form onSubmit={handleSaveIntro} className="lg:col-span-7 bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-400" /> Intro Video (YouTube &amp; Instagram Reels)
                  </h3>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-slate-200">
                    🎥 1. YouTube Video Link
                  </h4>
                  <input
                    type="text"
                    value={introForm.introYoutubeUrl}
                    onChange={(e) => setIntroForm({ ...introForm, introYoutubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/Rt4q44v09qc"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-xs text-slate-200">
                    📸 2. Instagram Reels Card &amp; Link
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Judul Card</label>
                      <input
                        type="text"
                        value={introForm.introInstagramTitle}
                        onChange={(e) => setIntroForm({ ...introForm, introInstagramTitle: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Teks Tombol CTA</label>
                      <input
                        type="text"
                        value={introForm.introInstagramCta}
                        onChange={(e) => setIntroForm({ ...introForm, introInstagramCta: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">URL Link Instagram Reels</label>
                    <input
                      type="text"
                      value={introForm.introInstagramUrl}
                      onChange={(e) => setIntroForm({ ...introForm, introInstagramUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Simpan Video Config
                  </button>
                </div>
              </form>

              {/* Preview Intro Card */}
              <div className="lg:col-span-5 bg-[#111827] p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-slate-300 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" /> Pratinjau Tautan Video
                </h4>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <p className="text-slate-400 font-semibold">YouTube URL:</p>
                  <p className="text-blue-400 font-mono truncate">{introForm.introYoutubeUrl}</p>
                  <hr className="border-slate-800" />
                  <p className="text-slate-400 font-semibold">Instagram Reels URL:</p>
                  <p className="text-blue-400 font-mono truncate">{introForm.introInstagramUrl}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROBLEM & WORKFLOW */}
          {activeTab === "problem" && (
            <div className="max-w-4xl space-y-6">
              <form onSubmit={handleSaveProblem} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" /> Teks Headings &amp; Badge Masalah
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Sub-judul Badge Atas</label>
                    <input
                      type="text"
                      value={problemForm.badgeText}
                      onChange={(e) => setProblemForm({ ...problemForm, badgeText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Utama</label>
                      <input
                        type="text"
                        value={problemForm.title}
                        onChange={(e) => setProblemForm({ ...problemForm, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Highlight Merah</label>
                      <input
                        type="text"
                        value={problemForm.titleHighlight}
                        onChange={(e) => setProblemForm({ ...problemForm, titleHighlight: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold text-red-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <div>
                      <label className="block text-xs font-semibold text-red-400 mb-1 font-mono uppercase">
                        ✕ List "Cara Lama (Kamu Sekarang)" (1 per baris)
                      </label>
                      <textarea
                        rows={5}
                        value={problemForm.beforeList}
                        onChange={(e) => setProblemForm({ ...problemForm, beforeList: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-cyan mb-1 font-mono uppercase">
                        ✓ List "Cara MAXY (Setelah Masterclass)" (1 per baris)
                      </label>
                      <textarea
                        rows={5}
                        value={problemForm.afterList}
                        onChange={(e) => setProblemForm({ ...problemForm, afterList: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Simpan Section Masalah
                  </button>
                </div>
              </form>

              {/* CRUD Pain Cards Sub-Form */}
              <form onSubmit={handleSavePainCard} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-xs text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-red-400" />
                  {editingPainCardIndex !== null ? "Edit Kartu Masalah" : "Tambah Kartu Masalah Baru"}
                </h4>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Emoji Icon</label>
                    <input
                      type="text"
                      value={painCardInput.icon}
                      onChange={(e) => setPainCardInput({ ...painCardInput, icon: e.target.value })}
                      placeholder="😩"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Masalah</label>
                    <input
                      type="text"
                      value={painCardInput.title}
                      onChange={(e) => setPainCardInput({ ...painCardInput, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Detail Masalah</label>
                  <textarea
                    rows={2}
                    value={painCardInput.desc}
                    onChange={(e) => setPainCardInput({ ...painCardInput, desc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  {editingPainCardIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPainCardIndex(null);
                        setPainCardInput({ icon: "😩", title: "", desc: "" });
                      }}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> {editingPainCardIndex !== null ? "Simpan Kartu" : "Tambah Kartu Masalah"}
                  </button>
                </div>
              </form>

              {/* Pain Cards List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Daftar Kartu Masalah ({(content.problemConfig?.cards || []).length})
                </h4>
                {(content.problemConfig?.cards || []).map((card, idx) => (
                  <div key={idx} className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{card.icon}</span>
                      <div>
                        <h5 className="font-bold text-xs text-white">{card.title}</h5>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{card.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingPainCardIndex(idx);
                          setPainCardInput(card);
                        }}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePainCard(idx)}
                        className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FUTURE OF WORK */}
          {activeTab === "future_of_work" && (
            <div className="max-w-4xl space-y-6">
              {/* Headings Form */}
              <form onSubmit={handleSaveFutureWorkHeadings} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan" /> Teks Headings &amp; Badge Future of Work
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Sub-judul Badge Atas</label>
                    <input
                      type="text"
                      value={futureWorkForm.badgeText}
                      onChange={(e) => setFutureWorkForm({ ...futureWorkForm, badgeText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Utama</label>
                      <input
                        type="text"
                        value={futureWorkForm.title}
                        onChange={(e) => setFutureWorkForm({ ...futureWorkForm, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Highlight Gradient</label>
                      <input
                        type="text"
                        value={futureWorkForm.titleHighlight}
                        onChange={(e) => setFutureWorkForm({ ...futureWorkForm, titleHighlight: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold text-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Subtitle</label>
                    <textarea
                      rows={3}
                      value={futureWorkForm.subtitle}
                      onChange={(e) => setFutureWorkForm({ ...futureWorkForm, subtitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Simpan Headings Future of Work
                  </button>
                </div>
              </form>

              {/* CRUD Future of Work Cards Sub-Form */}
              <form ref={futureWorkCardFormRef} onSubmit={handleSaveFutureWorkCard} className={`p-6 rounded-2xl border transition-all space-y-4 ${editingFutureWorkCardIndex !== null ? 'bg-cyan-950/20 border-cyan/50 shadow-lg shadow-cyan/10' : 'bg-[#111827] border-slate-800'}`}>
                <h4 className="font-bold text-xs text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan" />
                  {editingFutureWorkCardIndex !== null ? `Edit Kartu Future of Work #${editingFutureWorkCardIndex + 1}` : "Tambah Kartu Future of Work Baru"}
                </h4>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Emoji Icon</label>
                    <input
                      type="text"
                      value={futureWorkCardInput.icon || ""}
                      onChange={(e) => setFutureWorkCardInput({ ...futureWorkCardInput, icon: e.target.value })}
                      placeholder="misal: 🚀"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Angka Stat / Angka Kunci</label>
                    <input
                      type="text"
                      value={futureWorkCardInput.stat || ""}
                      onChange={(e) => setFutureWorkCardInput({ ...futureWorkCardInput, stat: e.target.value })}
                      placeholder="misal: 10x / 85% / 24/7"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-cyan font-black font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Kartu</label>
                    <input
                      type="text"
                      value={futureWorkCardInput.title}
                      onChange={(e) => setFutureWorkCardInput({ ...futureWorkCardInput, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Penjelasan</label>
                  <textarea
                    rows={2}
                    value={futureWorkCardInput.desc}
                    onChange={(e) => setFutureWorkCardInput({ ...futureWorkCardInput, desc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  {editingFutureWorkCardIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFutureWorkCardIndex(null);
                        setFutureWorkCardInput({ icon: "", stat: "", title: "", desc: "" });
                      }}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> {editingFutureWorkCardIndex !== null ? "Simpan Kartu" : "Tambah Kartu"}
                  </button>
                </div>
              </form>

              {/* Cards List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Daftar Kartu Future of Work ({(content.futureWorkConfig?.cards || []).length})
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(content.futureWorkConfig?.cards || []).map((card, idx) => (
                    <div key={idx} className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {card.icon && <span className="text-xl shrink-0">{card.icon}</span>}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            {card.stat && <span className="text-xs font-mono font-black text-cyan">{card.stat}</span>}
                            <h5 className="font-bold text-xs text-white truncate">{card.title}</h5>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{card.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingFutureWorkCardIndex(idx);
                            setFutureWorkCardInput(card);
                            setTimeout(() => futureWorkCardFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
                          }}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFutureWorkCard(idx)}
                          className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
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

          {/* TAB: SOLUTIONS */}
          {activeTab === "solutions" && (
            <div className="max-w-4xl space-y-6">
              <form onSubmit={handleSaveSolution} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan" /> Teks Headings &amp; Deskripsi Solusi
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Sub-judul Badge Atas</label>
                    <input
                      type="text"
                      value={solutionForm.badgeText}
                      onChange={(e) => setSolutionForm({ ...solutionForm, badgeText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Utama</label>
                      <input
                        type="text"
                        value={solutionForm.title}
                        onChange={(e) => setSolutionForm({ ...solutionForm, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Highlight Gradient</label>
                      <input
                        type="text"
                        value={solutionForm.titleHighlight}
                        onChange={(e) => setSolutionForm({ ...solutionForm, titleHighlight: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold text-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Subtitle Solusi</label>
                    <textarea
                      rows={3}
                      value={solutionForm.subtitle}
                      onChange={(e) => setSolutionForm({ ...solutionForm, subtitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Simpan Section Solusi
                  </button>
                </div>
              </form>

              {/* CRUD Solution Cards Sub-Form */}
              <form onSubmit={handleSaveSolutionCard} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-xs text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan" />
                  {editingSolutionCardIndex !== null ? "Edit Kartu Solusi" : "Tambah Kartu Solusi Baru"}
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Kartu Solusi</label>
                  <input
                    type="text"
                    value={solutionCardInput.title}
                    onChange={(e) => setSolutionCardInput({ ...solutionCardInput, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Kartu Solusi</label>
                  <textarea
                    rows={2}
                    value={solutionCardInput.desc}
                    onChange={(e) => setSolutionCardInput({ ...solutionCardInput, desc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  {editingSolutionCardIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSolutionCardIndex(null);
                        setSolutionCardInput({ title: "", desc: "" });
                      }}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> {editingSolutionCardIndex !== null ? "Simpan Kartu" : "Tambah Kartu Solusi"}
                  </button>
                </div>
              </form>

              {/* Solution Cards List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Daftar Kartu Solusi ({(content.solutionConfig?.cards || []).length})
                </h4>
                {(content.solutionConfig?.cards || []).map((card, idx) => (
                  <div key={idx} className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-xs text-white">{card.title}</h5>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{card.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingSolutionCardIndex(idx);
                          setSolutionCardInput(card);
                        }}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSolutionCard(idx)}
                        className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* CRUD AI Tools Sub-Form */}
              <form ref={aiToolFormRef} onSubmit={handleSaveAiTool} className={`p-6 rounded-2xl border transition-all space-y-4 ${editingAiToolIndex !== null ? 'bg-cyan-950/20 border-cyan/50 shadow-lg shadow-cyan/10' : 'bg-[#111827] border-slate-800'}`}>
                <h4 className="font-bold text-xs text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan" />
                  {editingAiToolIndex !== null ? `Edit Alat AI #${editingAiToolIndex + 1}` : "Tambah Alat AI Baru"}
                </h4>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Alat AI</label>
                    <input
                      type="text"
                      value={aiToolInput.name}
                      onChange={(e) => setAiToolInput({ ...aiToolInput, name: e.target.value })}
                      placeholder="misal: Midjourney"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Domain Website (Favicon Icon)</label>
                    <input
                      type="text"
                      value={aiToolInput.domain}
                      onChange={(e) => setAiToolInput({ ...aiToolInput, domain: e.target.value })}
                      placeholder="misal: midjourney.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Upload File Logo (Opsional)</label>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer font-bold transition-colors">
                        <Upload className="w-3.5 h-3.5 text-cyan" />
                        <span className="truncate">{aiToolInput.logoUrl ? "Ganti Logo" : "Pilih File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAiToolLogoUpload}
                          className="hidden"
                        />
                      </label>
                      {aiToolInput.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setAiToolInput({ ...aiToolInput, logoUrl: "" })}
                          className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold border border-slate-700 cursor-pointer"
                          title="Hapus custom logo"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Logo Preview */}
                <div className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold">Pratinjau Logo:</span>
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center p-1 overflow-hidden shrink-0 border border-slate-700">
                    <img
                      src={aiToolInput.logoUrl || (aiToolInput.domain ? `https://www.google.com/s2/favicons?domain=${aiToolInput.domain}&sz=64` : "")}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </div>
                  <span className="text-slate-400 text-[11px] font-mono">
                    {aiToolInput.logoUrl ? "Menggunakan Custom File Logo Upload" : aiToolInput.domain ? "Menggunakan Favicon Otomatis dari Domain" : "Belum ada logo"}
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  {editingAiToolIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAiToolIndex(null);
                        setAiToolInput({ name: "", domain: "" });
                      }}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> {editingAiToolIndex !== null ? "Simpan Alat AI" : "Tambah Alat AI"}
                  </button>
                </div>
              </form>

              {/* AI Tools List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Daftar Alat AI Utama Yang Bakal Dikuasai ({(content.aiTools || []).length})
                </h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(content.aiTools || []).map((tool, idx) => (
                    <div key={idx} className="bg-[#111827] p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                          <img
                            src={tool.logoUrl || (tool.domain ? `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64` : "")}
                            alt={tool.name}
                            className="w-full h-full object-contain"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-white truncate">{tool.name}</h5>
                          <p className="text-[10px] text-slate-400 font-mono truncate">{tool.domain}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingAiToolIndex(idx);
                            setAiToolInput(tool);
                            setTimeout(() => aiToolFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteAiTool(idx)}
                          className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: VALUE STACK (YANG KAMU DAPATKAN) */}
          {activeTab === "valuestack" && (
            <div className="max-w-4xl space-y-6">
              <form onSubmit={handleSaveValueStack} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Gift className="w-4 h-4 text-blue-400" />
                  {editingValueStackIndex !== null ? "Edit Item Value Stack" : "Tambah Item Value Stack Baru"}
                </h3>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Program / Modul</label>
                    <input
                      type="text"
                      value={valueStackInput.title}
                      onChange={(e) => setValueStackInput({ ...valueStackInput, title: e.target.value })}
                      placeholder="misal: Virtual CMO Strategy"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Perkiraan Nilai Riil (Price Tag / Free Bonus)</label>
                    <input
                      type="text"
                      value={valueStackInput.value}
                      onChange={(e) => setValueStackInput({ ...valueStackInput, value: e.target.value })}
                      placeholder="Rp 4.000.000 atau FREE BONUS"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Manfaat</label>
                  <textarea
                    rows={2}
                    value={valueStackInput.desc}
                    onChange={(e) => setValueStackInput({ ...valueStackInput, desc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={valueStackInput.isBonus || false}
                      onChange={(e) => setValueStackInput({ ...valueStackInput, isBonus: e.target.checked })}
                      className="rounded border-slate-800 bg-slate-900"
                    />
                    <span>Tandai sebagai 🎁 EXCLUSIVE BONUS</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  {editingValueStackIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingValueStackIndex(null);
                        setValueStackInput({ title: "", desc: "", value: "Rp 3.000.000", isBonus: false });
                      }}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {editingValueStackIndex !== null ? "Simpan Item" : "Tambah Item Value Stack"}
                  </button>
                </div>
              </form>

              {/* Value Stack Items List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Daftar Item "Yang Kamu Dapatkan" ({(content.valueStackItems || []).length})
                </h4>
                {(content.valueStackItems || []).map((item, idx) => (
                  <div key={idx} className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.isBonus ? "🎁" : "💎"}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-white">{item.title}</h5>
                          {item.isBonus && (
                            <span className="text-[9px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                              BONUS
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.desc}</p>
                        <span className="text-[10px] text-cyan font-mono font-bold">{item.value}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingValueStackIndex(idx);
                          setValueStackInput(item);
                        }}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteValueStack(idx)}
                        className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRICING & DATEPICKER */}
          {activeTab === "pricing" && (
            <div className="max-w-3xl space-y-6">
              <form onSubmit={handleSavePricing} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" /> Countdown Timer Mode &amp; Kuota Slot
                  </h3>
                </div>

                {/* Mode Selector */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <label className="block text-xs font-semibold text-slate-300 font-mono uppercase tracking-wider">
                    ⚙️ Pilih Opsi Mode Hitung Mundur (Countdown Timer)
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                        pricingForm.countdownMode === "real"
                          ? "bg-[#1B4FD8]/20 border-blue-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="countdownMode"
                        value="real"
                        checked={pricingForm.countdownMode === "real"}
                        onChange={(e) => setPricingForm({ ...pricingForm, countdownMode: e.target.value as "real" })}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-bold text-xs block text-white">📅 1. Real Target Date</span>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Hitung mundur menuju tanggal &amp; jam pasti yang dipilih dari Datepicker.
                        </span>
                      </div>
                    </label>

                    <label
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                        pricingForm.countdownMode === "evergreen"
                          ? "bg-[#1B4FD8]/20 border-blue-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="countdownMode"
                        value="evergreen"
                        checked={pricingForm.countdownMode === "evergreen"}
                        onChange={(e) => setPricingForm({ ...pricingForm, countdownMode: e.target.value as "evergreen" })}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-bold text-xs block text-white">⚡ 2. Evergreen Loop (Menit)</span>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Hitung mundur otomatis X menit setiap kali pengunjung membuka halaman.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {pricingForm.countdownMode === "real" ? (
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">
                        📅 Target Tanggal &amp; Waktu (Datepicker)
                      </label>
                      <input
                        type="datetime-local"
                        value={pricingForm.earlyBirdDeadline.replace("T", " ").slice(0, 16).replace(" ", "T")}
                        onChange={(e) => {
                          const val = e.target.value ? `${e.target.value}:00` : "";
                          setPricingForm({ ...pricingForm, earlyBirdDeadline: val });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Tersimpan: {pricingForm.earlyBirdDeadline}</p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">
                        ⏳ Durasi Hitung Mundur (Dalam Menit)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={1440}
                        value={pricingForm.evergreenMinutes}
                        onChange={(e) => setPricingForm({ ...pricingForm, evergreenMinutes: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Setiap dibeli/dibuka: langsung {pricingForm.evergreenMinutes} menit</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">Total Slot</label>
                      <input
                        type="number"
                        value={pricingForm.slotTotal}
                        onChange={(e) => setPricingForm({ ...pricingForm, slotTotal: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase tracking-wider">Slot Terisi</label>
                      <input
                        type="number"
                        value={pricingForm.slotTaken}
                        onChange={(e) => setPricingForm({ ...pricingForm, slotTaken: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Simpan Datepicker
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: CRUD PACKAGE OPTIONS */}
          {activeTab === "packages" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSavePackage} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-400" />
                  {editingPackageIndex !== null ? "Edit Opsi Paket Pendaftaran" : "Tambah Opsi Paket Harga Baru"}
                </h3>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Kode Paket (ID)</label>
                    <input
                      type="text"
                      value={packageInput.code}
                      onChange={(e) => setPackageInput({ ...packageInput, code: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-blue-400 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Paket</label>
                    <input
                      type="text"
                      value={packageInput.name}
                      onChange={(e) => setPackageInput({ ...packageInput, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={packageInput.badgeTag}
                      onChange={(e) => setPackageInput({ ...packageInput, badgeTag: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-semibold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Harga Promo (Saat Ini)</label>
                    <input
                      type="text"
                      value={packageInput.currentPrice}
                      onChange={(e) => setPackageInput({ ...packageInput, currentPrice: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-emerald-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Harga Normal</label>
                    <input
                      type="text"
                      value={packageInput.normalPrice}
                      onChange={(e) => setPackageInput({ ...packageInput, normalPrice: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Sub-judul Kualifikasi</label>
                    <input
                      type="text"
                      value={packageInput.subtitle}
                      onChange={(e) => setPackageInput({ ...packageInput, subtitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Fitur &amp; Benefit (Pisahkan Koma)</label>
                  <input
                    type="text"
                    value={packageInput.features.join(", ")}
                    onChange={(e) =>
                      setPackageInput({
                        ...packageInput,
                        features: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
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
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingPackageIndex !== null ? "Simpan Perubahan Paket" : "Tambah Paket"}
                  </button>
                </div>
              </form>

              {/* Package Card Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {content.packages.map((pkg, idx) => (
                  <div key={idx} className="bg-[#111827] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between relative">
                    <span className="absolute top-4 right-4 bg-slate-800 text-slate-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md">
                      {pkg.code}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">{pkg.badgeTag}</span>
                      <h4 className="text-base font-bold text-white mt-1">{pkg.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{pkg.subtitle}</p>

                      <div className="my-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Promo:</span>
                          <span className="text-lg font-bold text-emerald-400 font-mono">{pkg.currentPrice}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Normal:</span>
                          <span className="text-xs line-through text-slate-500 font-mono">{pkg.normalPrice}</span>
                        </div>
                      </div>

                      <ul className="space-y-1 text-xs text-slate-300">
                        {pkg.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-800 mt-4">
                      <button
                        onClick={() => {
                          setEditingPackageIndex(idx);
                          setPackageInput(pkg);
                        }}
                        className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit Paket
                      </button>
                      <button
                        onClick={() => handleDeletePackage(idx)}
                        className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CRUD TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6 max-w-5xl">
              <form onSubmit={handleSaveTesti} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-400" />
                  {editingTestiIndex !== null ? "Edit Testimoni Alumni" : "Tambah Testimoni Alumni Baru"}
                </h3>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Alumni</label>
                    <input
                      type="text"
                      value={testiInput.name}
                      onChange={(e) => setTestiInput({ ...testiInput, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Profesi</label>
                    <input
                      type="text"
                      value={testiInput.role}
                      onChange={(e) => setTestiInput({ ...testiInput, role: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Perusahaan / Instansi</label>
                    <input
                      type="text"
                      value={testiInput.company}
                      onChange={(e) => setTestiInput({ ...testiInput, company: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Quote Testimoni Ulasan</label>
                  <textarea
                    rows={3}
                    value={testiInput.quote}
                    onChange={(e) => setTestiInput({ ...testiInput, quote: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube Video Embed URL (Opsional)</label>
                  <input
                    type="text"
                    value={testiInput.videoEmbedUrl || ""}
                    onChange={(e) => setTestiInput({ ...testiInput, videoEmbedUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
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
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingTestiIndex !== null ? "Simpan Testimoni" : "Tambah Testimoni"}
                  </button>
                </div>
              </form>

              {/* Testimonials Card Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {content.testimonials.map((t, idx) => (
                  <div key={idx} className="bg-[#111827] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 text-yellow-400 mb-2">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-300 text-xs italic leading-relaxed mb-3">&quot;{t.quote}&quot;</p>
                      {t.videoEmbedUrl && (
                        <span className="inline-block bg-slate-800 text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded-md mb-3">
                          🎥 Video Embed Ready
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <div>
                        <h5 className="font-bold text-sm text-white">{t.name}</h5>
                        <p className="text-xs text-blue-400 font-semibold">{t.role} @ {t.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingTestiIndex(idx);
                            setTestiInput(t);
                          }}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTesti(idx)}
                          className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: WA LINKS & POPUPS */}
          {activeTab === "wa_popup" && (
            <form onSubmit={handleSaveWaPopup} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-5 max-w-3xl">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-400" /> WhatsApp &amp; Popup Config Card
                </h3>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-slate-200">
                  💬 Pengaturan WhatsApp Admin &amp; CS
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Nomor WA Admin</label>
                    <input
                      type="text"
                      value={waForm.adminWa}
                      onChange={(e) => setWaForm({ ...waForm, adminWa: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Nomor WA CS</label>
                    <input
                      type="text"
                      value={waForm.csWa}
                      onChange={(e) => setWaForm({ ...waForm, csWa: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Template Pesan Otomatis WA</label>
                  <textarea
                    rows={3}
                    value={waForm.waMessageTemplate}
                    onChange={(e) => setWaForm({ ...waForm, waMessageTemplate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-slate-200">
                  🚪 Exit Popup &amp; Sticky Footer Mobile Text
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Judul Exit Popup</label>
                    <input
                      type="text"
                      value={popupForm.exitTitle}
                      onChange={(e) => setPopupForm({ ...popupForm, exitTitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Tombol CTA Exit Popup</label>
                    <input
                      type="text"
                      value={popupForm.exitCtaText}
                      onChange={(e) => setPopupForm({ ...popupForm, exitCtaText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Deskripsi Exit Popup</label>
                  <textarea
                    rows={2}
                    value={popupForm.exitDesc}
                    onChange={(e) => setPopupForm({ ...popupForm, exitDesc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan WA &amp; Popup
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: SECTION ORDER & CUSTOM SECTIONS */}
          {activeTab === "sections" && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" /> Atur Urutan Section Landing Page
                </h3>

                <div className="space-y-2 pt-1">
                  {content.sectionOrder.map((secId, idx) => (
                    <div
                      key={secId}
                      className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center border border-slate-700">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-xs text-white uppercase font-mono tracking-wider">
                          {secId}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => moveSection(idx, "up")}
                          disabled={idx === 0}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveSection(idx, "down")}
                          disabled={idx === content.sectionOrder.length - 1}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS: MODULES, SPEAKERS, FAQS */}
          {activeTab === "modules" && (
            <div className="space-y-5 max-w-4xl">
              <form onSubmit={handleSaveModule} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  {editingModuleIndex !== null ? "Edit Modul Kurikulum" : "Tambah Modul Kurikulum Baru"}
                </h3>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hari / Kode</label>
                    <input
                      type="text"
                      value={moduleInput.id}
                      onChange={(e) => setModuleInput({ ...moduleInput, id: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Topik Modul</label>
                    <input
                      type="text"
                      value={moduleInput.title}
                      onChange={(e) => setModuleInput({ ...moduleInput, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Ringkas Materi</label>
                  <textarea
                    rows={2}
                    value={moduleInput.description}
                    onChange={(e) => setModuleInput({ ...moduleInput, description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
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
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingModuleIndex !== null ? "Simpan Modul" : "Tambah Modul"}
                  </button>
                </div>
              </form>

              {/* Modules Card List */}
              <div className="space-y-2.5">
                {content.modules.map((m, idx) => (
                  <div key={idx} className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold bg-slate-800 text-blue-400 px-2 py-0.5 rounded-md">
                        {m.id}
                      </span>
                      <h5 className="font-bold text-sm text-white mt-1">{m.title}</h5>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{m.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingModuleIndex(idx);
                          setModuleInput(m);
                        }}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteModule(idx)}
                        className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "speakers" && (
            <div className="space-y-5 max-w-4xl">
              <form onSubmit={handleSaveSpeaker} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  {editingSpeakerIndex !== null ? "Edit Data Pemateri" : "Tambah Pemateri Baru"}
                </h3>

                <div className="grid md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={speakerInput.name}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Inisial / Kode</label>
                    <input
                      type="text"
                      value={speakerInput.initials}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, initials: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Jabatan</label>
                    <input
                      type="text"
                      value={speakerInput.role}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, role: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">🏷️ Lencana / Badge Bawah</label>
                    <input
                      type="text"
                      value={speakerInput.badgeTag || ""}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, badgeTag: e.target.value })}
                      placeholder="Konsultan Bisnis AI Terpercaya"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Pengalaman</label>
                  <textarea
                    rows={2}
                    value={speakerInput.description}
                    onChange={(e) => setSpeakerInput({ ...speakerInput, description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Speaker Photo Upload & URL */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider">
                    🖼️ Foto Profile Pemateri (Upload File atau URL)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg cursor-pointer flex items-center gap-2 transition-colors flex-shrink-0">
                      <Upload className="w-3.5 h-3.5" /> Pilih File Foto Komputer
                      <input type="file" accept="image/*" onChange={handleSpeakerFileUpload} className="hidden" />
                    </label>
                    <span className="text-xs text-slate-500 font-mono">atau URL:</span>
                    <input
                      type="text"
                      value={speakerInput.imageUrl || ""}
                      onChange={(e) => setSpeakerInput({ ...speakerInput, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  {speakerInput.imageUrl && (
                    <div className="mt-2 flex items-center gap-3 bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <img src={speakerInput.imageUrl} alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">✓ Pratinjau Foto Pemateri Loaded</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  {editingSpeakerIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSpeakerIndex(null);
                        setSpeakerInput({ initials: "", name: "", role: "", description: "", imageUrl: "" });
                      }}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingSpeakerIndex !== null ? "Simpan Pemateri" : "Tambah Pemateri"}
                  </button>
                </div>
              </form>

              {/* Speakers Grid Card */}
              <div className="grid md:grid-cols-2 gap-4">
                {content.speakers.map((s, idx) => (
                  <div key={idx} className="bg-[#111827] p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-blue-400 text-sm border border-slate-700">
                        {s.imageUrl ? (
                          <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover" />
                        ) : (
                          s.initials
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-white">{s.name}</h5>
                        <p className="text-xs text-blue-400 font-semibold">{s.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingSpeakerIndex(idx);
                          setSpeakerInput(s);
                        }}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSpeaker(idx)}
                        className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="space-y-5 max-w-4xl">
              <form onSubmit={handleSaveFaq} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  {editingFaqIndex !== null ? "Edit Pertanyaan FAQ" : "Tambah Pertanyaan FAQ Baru"}
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pertanyaan (Question)</label>
                  <input
                    type="text"
                    value={faqInput.question}
                    onChange={(e) => setFaqInput({ ...faqInput, question: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Jawaban (Answer)</label>
                  <textarea
                    rows={3}
                    value={faqInput.answer}
                    onChange={(e) => setFaqInput({ ...faqInput, answer: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white leading-relaxed"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  {editingFaqIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaqIndex(null);
                        setFaqInput({ question: "", answer: "" });
                      }}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4FD8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {editingFaqIndex !== null ? "Simpan FAQ" : "Tambah FAQ"}
                  </button>
                </div>
              </form>

              {/* FAQs Card List */}
              <div className="space-y-2.5">
                {content.faqs.map((f, idx) => (
                  <div key={idx} className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex items-start justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-sm text-white">❓ {f.question}</h5>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{f.answer}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingFaqIndex(idx);
                          setFaqInput(f);
                        }}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(idx)}
                        className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer border border-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
