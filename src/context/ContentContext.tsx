import React, { createContext, useContext, useState, useEffect } from "react";
import { APP_CONFIG, MODULES, SPEAKERS, FAQS, VIDEOS, AI_TOOLS } from "../data";
import {
  ModulItem,
  SpeakerItem,
  FAQItem,
  VideoItem,
  TestimonialItem,
  PackageOptionItem,
  CustomSection,
  PopupConfig,
  WaConfig,
  AIToolItem,
  ProblemConfig,
  SolutionConfig,
  ValueStackItem
} from "../types";

export interface AppConfigType {
  earlyBirdDeadline: string;
  countdownMode?: "real" | "evergreen";
  evergreenMinutes?: number;
  eventDates: string;
  eventTime: string;
  eventLocation: string;
  waAdmin: string;
  waCS: string;
  prices: {
    masterclassNormal: string;
    masterclassCurrent: string;
    earlyBirdNormal: string;
    earlyBirdCurrent: string;
    mitraNormal: string;
    mitraCurrent: string;
    [key: string]: string;
  };
  slotTotal: number;
  slotTaken: number;
  heroBgUrl?: string;
  heroEventBadge?: string;
  heroHeadlineTitle?: string;
  heroHeadlineSubtitle?: string;
  heroHeadlineSubtitle2?: string;
  heroFeatureTags?: string[];
  heroCountdownTitle?: string;
  heroCtaText?: string;
  heroCtaSubtext?: string;
  heroVideoUrl?: string; // Legacy
  introYoutubeUrl?: string;
  introInstagramUrl?: string;
  introInstagramTitle?: string;
  introInstagramCta?: string;
  topBannerText?: string;
}

export const DEFAULT_VALUE_STACK: ValueStackItem[] = [
  {
    title: "AI Content Ecosystem Systemization",
    desc: "Desain sistem 5 komponen end-to-end & audit mandiri akun sosial mediamu.",
    value: "Rp 4.000.000",
  },
  {
    title: "Virtual CMO & Campaign Strategy Builder",
    desc: "Formula melatih AI menyusun Campaign Brief & merangkai funnel TOFU → BOFU.",
    value: "Rp 5.000.000",
  },
  {
    title: "Senior Level Content Planning Masterclass",
    desc: "Template taktis Content Plan mencakup 9 channel sosial media profesional.",
    value: "Rp 3.000.000",
  },
  {
    title: "Cinematic AI Visual Storytelling Methodology",
    desc: "Formula JSON Prompting untuk konsistensi visual video tanpa keahlian coding.",
    value: "Rp 6.000.000",
  },
  {
    title: "Mass Scale Video Creation & Multi-channel Publishing",
    desc: "Teknis ElevenLabs voiceover, auto-caption CapCut AI, dan sistem distribusi kilat.",
    value: "Rp 5.000.000",
  },
  {
    title: "EXCLUSIVE BONUS — Blueprint, Prompt Library & E-Certificate",
    desc: "Akses Claude AI Skill, Prompt Library, grup diskusi, dan sertifikat kelulusan.",
    value: "FREE BONUS",
    isBonus: true,
  },
];

export interface SiteContentState {
  appConfig: AppConfigType;
  modules: ModulItem[];
  speakers: SpeakerItem[];
  faqs: FAQItem[];
  videos: VideoItem[];
  packages: PackageOptionItem[];
  testimonials: TestimonialItem[];
  customSections: CustomSection[];
  sectionOrder: string[];
  popupConfig: PopupConfig;
  waConfig: WaConfig;
  problemConfig: ProblemConfig;
  solutionConfig: SolutionConfig;
  valueStackItems: ValueStackItem[];
  aiTools: AIToolItem[];
}

export const DEFAULT_PROBLEM_CONFIG: ProblemConfig = {
  badgeText: "Mohon maaf jika sedikit menyinggung, tapi...",
  title: "Yakin masih mau bangga jadi",
  titleHighlight: "one-man show sampai kurang tidur?",
  cards: [
    {
      icon: "😩",
      title: "Posting kalau lagi sempat (dan ingat)",
      desc: "Ide brilian kamu akan selalu kalah dengan ide biasa-biasa saja yang diposting konsisten. Kompetitormu tidak lebih pintar — mereka cuma punya sistem yang mempublikasikan karyanya setiap hari."
    },
    {
      icon: "😤",
      title: "Udah coba AI, tapi hasilnya \"kaku banget\"",
      desc: "Niatnya mau cepat, malah nambah kerjaan edit caption yang terdengar seperti robot tanpa emosi. Bukan AI-nya yang salah — tapi workflow kamu yang belum tepat."
    },
    {
      icon: "📉",
      title: "Views lumayan, tapi dompet tetap aman (alias kosong)",
      desc: "Konten viral ke mana-mana, tapi tidak ada satupun yang convert jadi pembeli. Kenapa? Karena belum ada sistem yang menyambungkan penonton ke funnel penjualanmu."
    },
    {
      icon: "😰",
      title: "Tiap buka FYP, makin insecure",
      desc: "Melihat kreator lain terus berkembang sementara kamu stuck di tempat? Mereka tidak kenal lelah karena punya 'mesin konten' yang tidak pernah minta cuti. FYP bukan soal hoki — itu murni soal sistem."
    }
  ],
  beforeList: [
    "Seharian penuh cuma buat 1 konten tunggal",
    "Upload bergantung sepenuhnya pada mood & energi",
    "Mengalami burnout karena pegang akun sendirian",
    "Melihat kompetitor terus naik, kamu jalan di tempat"
  ],
  afterList: [
    "1 ide diproduksi otomatis jadi 10+ format konten",
    "Sistem aktif 24/7 mempublikasi karya secara konsisten",
    "Hemat 80% waktu kerja, pikiran bebas dari burnout",
    "Menguasai pasar lebih cepat dengan akselerasi AI"
  ]
};

export const DEFAULT_SOLUTION_CONFIG: SolutionConfig = {
  badgeText: "Solusi Pintar Bersama MAXY",
  title: "8 Pertemuan Hybrid. Satu Mesin Konten",
  titleHighlight: "Yang Mengubah Cara Kerja Kamu Selamanya.",
  subtitle: "Masterclass 8 pertemuan hybrid (setiap Selasa & Kamis mulai 4 Agustus 2026): bangun sistem produksi konten end-to-end terintegrasi AI — dari riset tren, pembuatan video, hingga distribusi terjadwal secara terarah.",
  cards: [
    {
      title: "Output Berlipat Ganda",
      desc: "Hasilkan puluhan konten berkualitas tinggi dalam waktu yang sama. Mengelola banyak klien atau brand akun sekaligus tidak akan lagi menjadi kendala fisik."
    },
    {
      title: "Fokus Sistem Terpadu",
      desc: "Kami tidak sekadar mengajarkan trik prompt biasa. Kamu akan menyusun rancangan alur produksi 1 ide dasar menjadi 10+ konten lintas platform yang scalable."
    },
    {
      title: "Efisien Tanpa Buang Waktu",
      desc: "Pangkas hingga 80% waktu kerja dari tugas edit dan caption manual yang melelahkan. Kembalikan fokus utama kamu pada aspek konseptual bisnis."
    }
  ]
};

export const DEFAULT_PACKAGES: PackageOptionItem[] = [
  {
    code: "Mitra_Universitas",
    name: "Harga Khusus Mitra Universitas",
    currentPrice: "Rp 1.800.000",
    normalPrice: "Rp 2.500.000",
    badgeTag: "🎓 KEMITRAAN KAMPUS",
    subtitle: "Spesial Civitas Akademika",
    features: [
      "Potongan harga spesial sebesar Rp 700.000 khusus mitra universitas & mahasiswa",
      "Akses lengkap 8 pertemuan kelas hybrid + mentoring & sertifikat"
    ],
    isPopular: true
  },
  {
    code: "Masterclass_Regular",
    name: "Harga Masterclass (8 Pertemuan)",
    currentPrice: "Rp 1.800.000",
    normalPrice: "Rp 2.500.000",
    badgeTag: "⚡ TARIF MASTERCLASS REGULAR",
    subtitle: "8 Pertemuan Utuh",
    features: [
      "Akses 8 pertemuan hybrid, networking eksklusif, lunch & snack onsite",
      "Akses rekaman seumur hidup dan grup diskusi eksklusif alumni MAXY"
    ]
  }
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Anisa",
    role: "Content Creator",
    company: "Insta Beauty Center, Jakarta",
    quote: "Belajarnya disini tuh santai, temen dan mentor yang bimbing juga seru banget. Awalnya aku cuma pengen tau visual AI, ternyata aku bisa tau lebih banyak — AI bisa jadi asisten pribadi dan ngelakuin banyak hal yang detail-detail juga. Bener-bener melebihi ekspektasiku sihh…",
    videoEmbedUrl: "https://www.youtube.com/embed/VTJR4NSjN3s",
    rating: 5
  },
  {
    id: "testi-2",
    name: "Rhaditya",
    role: "Publikasi & Desain",
    company: "Yayasan Gorontalo Baik, Jakarta",
    quote: "Pas belajar disini dari hari pertama pun kita diajarin gimana caranya nge-prompt yang bener dan hasilnya bakal bagus. Bener-bener diajarin sampe kita ngeter, kita ga dibiarin pulang tuh dengan keadaan masih bingung. Banyak hal yang bisa dipelajari!",
    videoEmbedUrl: "https://www.youtube.com/embed/zUIhNoIrFqw",
    rating: 5
  }
];

export const DEFAULT_SECTION_ORDER = [
  "hero",
  "introVideo",
  "trustBanner",
  "problem",
  "solutions",
  "curriculum",
  "speakers",
  "testimonials",
  "pricing",
  "valueStack",
  "faq",
  "portfolio"
];

export const DEFAULT_POPUP_CONFIG: PopupConfig = {
  exitTitle: "Tunggu — jangan pergi dulu! ✋",
  exitDesc: "Peluang kuasai AI dengan Harga Khusus Mitra Universitas masih di depan mata! Setelah kuota promo habis, harga kembali ke tarif Masterclass Normal.",
  exitPriceTag: "🔥 Harga Khusus Mitra Universitas",
  exitCtaText: "Oke, Amankan Harga Diskon",
  stickyLabel: "Diskon Spesial",
  stickyCtaText: "Daftar Sekarang →"
};

export const DEFAULT_WA_CONFIG: WaConfig = {
  adminWa: "6282144995255",
  csWa: "6282144995255",
  waMessageTemplate: "Halo Admin MAXY, saya mau mendaftar Masterclass AI-Driven Content Creation (8 Pertemuan Hybrid) yang mulai 4 Agustus 2026.",
  customWaLink: ""
};

import heroBgImg from "../assets/hero-bg.png";
import stevenImg from "../assets/steven-laksana.jpg";
import gamaImg from "../assets/gama-anom.jpg";

const DEFAULT_CONFIG: AppConfigType = {
  ...APP_CONFIG,
  countdownMode: "real",
  evergreenMinutes: 45,
  heroBgUrl: heroBgImg,
  heroEventBadge: "Masterclass · Mulai 4 Agustus 2026 · 8 Pertemuan Hybrid",
  heroHeadlineTitle: "BANGUN SISTEM\nKONTEN KAMU\nDENGAN AI SEKARANG!",
  heroHeadlineSubtitle: "Stop bikin konten manual satu per satu! Kreator yang tumbuh cepat bukan karena timnya lebih besar — tapi karena mereka punya sistem.",
  heroHeadlineSubtitle2: "Sambil kamu masih begadang edit satu video, ada kreator yang sudah tidur pulas — tapi kontennya tetap berjalan otomatis sampai pagi.",
  heroFeatureTags: [
    "⚡ 1 ide → 10 konten / jam",
    "🤖 Sistem Aktif 24/7",
    "📈 80% Lebih Efisien"
  ],
  heroCountdownTitle: "⏳ Penawaran Special Promo Berakhir Dalam:",
  heroCtaText: "Amankan Kursi Kamu Sekarang",
  heroCtaSubtext: "Tinggalkan cara manual. Mulai adu sistem bersama MAXY.",
  introYoutubeUrl: "https://www.youtube.com/embed/Rt4q44v09qc",
  introInstagramUrl: "https://www.instagram.com/reel/DZ4bquZzePJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  introInstagramTitle: "Lihat di Instagram Reels",
  introInstagramCta: "Buka Instagram Reels",
  topBannerText: "🔥 HARGA KHUSUS MITRA UNIVERSITAS & MASTERCLASS: Rp 1.800.000 (Diskon hingga Rp 700 Ribu)!",
};

interface ContentContextType {
  content: SiteContentState;
  updateAppConfig: (partial: Partial<AppConfigType>) => void;
  setModules: (modules: ModulItem[]) => void;
  setSpeakers: (speakers: SpeakerItem[]) => void;
  setFaqs: (faqs: FAQItem[]) => void;
  setVideos: (videos: VideoItem[]) => void;
  setPackages: (packages: PackageOptionItem[]) => void;
  setTestimonials: (testimonials: TestimonialItem[]) => void;
  setCustomSections: (sections: CustomSection[]) => void;
  setSectionOrder: (order: string[]) => void;
  updatePopupConfig: (partial: Partial<PopupConfig>) => void;
  updateWaConfig: (partial: Partial<WaConfig>) => void;
  updateProblemConfig: (partial: Partial<ProblemConfig>) => void;
  updateSolutionConfig: (partial: Partial<SolutionConfig>) => void;
  setValueStackItems: (items: ValueStackItem[]) => void;
  setAiTools: (aiTools: AIToolItem[]) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = "maxy_aicc_site_content_v3";

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentState>(() => {
    try {
      const stored = localStorage.getItem("maxy_aicc_site_content_v3") ||
                     localStorage.getItem("maxy_aicc_site_content_v2") ||
                     localStorage.getItem("maxy_aicc_site_content");
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedAppConfig = parsed.appConfig || {};

        // Replace any Google Drive URL in heroBgUrl with local heroBgImg
        if (storedAppConfig.heroBgUrl && storedAppConfig.heroBgUrl.includes("lh3.googleusercontent.com")) {
          storedAppConfig.heroBgUrl = heroBgImg;
        }

        // Replace any Google Drive URLs in speakers with local images
        let loadedSpeakers = Array.isArray(parsed.speakers) ? parsed.speakers : SPEAKERS;
        loadedSpeakers = loadedSpeakers.map((sp: SpeakerItem) => {
          if (sp.imageUrl && sp.imageUrl.includes("1guqfUVCAQCRNQIfa_zVE2dayFOWwL84b")) {
            return { ...sp, imageUrl: stevenImg };
          }
          if (sp.imageUrl && sp.imageUrl.includes("1YuoJWgsL5mB5YFu9PB4gOtiXmzAXwWLX")) {
            return { ...sp, imageUrl: gamaImg };
          }
          return sp;
        });

        return {
          appConfig: {
            ...DEFAULT_CONFIG,
            ...storedAppConfig,
            prices: {
              ...DEFAULT_CONFIG.prices,
              ...(storedAppConfig.prices || {}),
            },
          },
          modules: Array.isArray(parsed.modules) ? parsed.modules : MODULES,
          speakers: loadedSpeakers,
          faqs: Array.isArray(parsed.faqs) ? parsed.faqs : FAQS,
          videos: Array.isArray(parsed.videos) ? parsed.videos : VIDEOS,
          packages: Array.isArray(parsed.packages) ? parsed.packages : DEFAULT_PACKAGES,
          testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : DEFAULT_TESTIMONIALS,
          customSections: Array.isArray(parsed.customSections) ? parsed.customSections : [],
          sectionOrder: Array.isArray(parsed.sectionOrder) && parsed.sectionOrder.length > 0 ? parsed.sectionOrder : DEFAULT_SECTION_ORDER,
          popupConfig: { ...DEFAULT_POPUP_CONFIG, ...(parsed.popupConfig || {}) },
          waConfig: { ...DEFAULT_WA_CONFIG, ...(parsed.waConfig || {}) },
          problemConfig: {
            ...DEFAULT_PROBLEM_CONFIG,
            ...(parsed.problemConfig || {}),
            cards: Array.isArray(parsed.problemConfig?.cards)
              ? parsed.problemConfig.cards
              : DEFAULT_PROBLEM_CONFIG.cards,
          },
          solutionConfig: {
            ...DEFAULT_SOLUTION_CONFIG,
            ...(parsed.solutionConfig || {}),
            cards: Array.isArray(parsed.solutionConfig?.cards)
              ? parsed.solutionConfig.cards
              : DEFAULT_SOLUTION_CONFIG.cards,
          },
          valueStackItems: Array.isArray(parsed.valueStackItems) ? parsed.valueStackItems : DEFAULT_VALUE_STACK,
          aiTools: Array.isArray(parsed.aiTools) ? parsed.aiTools : AI_TOOLS,
        };
      }
    } catch (e) {
      console.error("Failed to load custom site content:", e);
    }
    return {
      appConfig: DEFAULT_CONFIG,
      modules: MODULES,
      speakers: SPEAKERS,
      faqs: FAQS,
      videos: VIDEOS,
      packages: DEFAULT_PACKAGES,
      testimonials: DEFAULT_TESTIMONIALS,
      customSections: [],
      sectionOrder: DEFAULT_SECTION_ORDER,
      popupConfig: DEFAULT_POPUP_CONFIG,
      waConfig: DEFAULT_WA_CONFIG,
      problemConfig: DEFAULT_PROBLEM_CONFIG,
      solutionConfig: DEFAULT_SOLUTION_CONFIG,
      valueStackItems: DEFAULT_VALUE_STACK,
      aiTools: AI_TOOLS,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error("Failed to save site content:", e);
    }
  }, [content]);

  const updateAppConfig = (partial: Partial<AppConfigType>) => {
    setContent((prev) => ({
      ...prev,
      appConfig: {
        ...prev.appConfig,
        ...partial,
        prices: {
          ...prev.appConfig.prices,
          ...(partial.prices || {}),
        },
      },
    }));
  };

  const setModules = (modules: ModulItem[]) => {
    setContent((prev) => ({ ...prev, modules }));
  };

  const setSpeakers = (speakers: SpeakerItem[]) => {
    setContent((prev) => ({ ...prev, speakers }));
  };

  const setFaqs = (faqs: FAQItem[]) => {
    setContent((prev) => ({ ...prev, faqs }));
  };

  const setVideos = (videos: VideoItem[]) => {
    setContent((prev) => ({ ...prev, videos }));
  };

  const setPackages = (packages: PackageOptionItem[]) => {
    setContent((prev) => ({ ...prev, packages }));
  };

  const setTestimonials = (testimonials: TestimonialItem[]) => {
    setContent((prev) => ({ ...prev, testimonials }));
  };

  const setCustomSections = (customSections: CustomSection[]) => {
    setContent((prev) => ({ ...prev, customSections }));
  };

  const setSectionOrder = (sectionOrder: string[]) => {
    setContent((prev) => ({ ...prev, sectionOrder }));
  };

  const updatePopupConfig = (partial: Partial<PopupConfig>) => {
    setContent((prev) => ({
      ...prev,
      popupConfig: { ...prev.popupConfig, ...partial },
    }));
  };

  const updateWaConfig = (partial: Partial<WaConfig>) => {
    setContent((prev) => ({
      ...prev,
      waConfig: { ...prev.waConfig, ...partial },
    }));
  };

  const updateProblemConfig = (partial: Partial<ProblemConfig>) => {
    setContent((prev) => ({
      ...prev,
      problemConfig: { ...prev.problemConfig, ...partial },
    }));
  };

  const updateSolutionConfig = (partial: Partial<SolutionConfig>) => {
    setContent((prev) => ({
      ...prev,
      solutionConfig: { ...prev.solutionConfig, ...partial },
    }));
  };

  const setValueStackItems = (valueStackItems: ValueStackItem[]) => {
    setContent((prev) => ({ ...prev, valueStackItems }));
  };

  const setAiTools = (aiTools: AIToolItem[]) => {
    setContent((prev) => ({ ...prev, aiTools }));
  };

  const resetToDefault = () => {
    const defaultState: SiteContentState = {
      appConfig: DEFAULT_CONFIG,
      modules: MODULES,
      speakers: SPEAKERS,
      faqs: FAQS,
      videos: VIDEOS,
      packages: DEFAULT_PACKAGES,
      testimonials: DEFAULT_TESTIMONIALS,
      customSections: [],
      sectionOrder: DEFAULT_SECTION_ORDER,
      popupConfig: DEFAULT_POPUP_CONFIG,
      waConfig: DEFAULT_WA_CONFIG,
      problemConfig: DEFAULT_PROBLEM_CONFIG,
      solutionConfig: DEFAULT_SOLUTION_CONFIG,
      valueStackItems: DEFAULT_VALUE_STACK,
      aiTools: AI_TOOLS,
    };
    setContent(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider
      value={{
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
        resetToDefault,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
};
