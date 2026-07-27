import { FAQItem, SpeakerItem, ModulItem, VideoItem, AIToolItem } from "./types";

export const APP_CONFIG = {
  earlyBirdDeadline: "2026-07-31T23:59:59", // Countdown target
  eventDates: "Mulai 4 Agustus 2026 (Setiap Selasa & Kamis)", // Event starts 4 August 2026, every Tuesday & Thursday
  eventTime: "08.30–17.00 WIB",
  eventLocation: "MAXY AI HUB, Grha Pengharapan 2nd Floor, Jl. Denpasar Raya No.2, Blok F3, Jakarta Selatan",
  waAdmin: "6282144995255",
  waCS: "6282144995255",
  prices: {
    masterclassNormal: "Rp 2.500.000",
    masterclassCurrent: "Rp 1.800.000",
    earlyBirdNormal: "Rp 1.800.000",
    earlyBirdCurrent: "Rp 1.500.000",
    mitraNormal: "Rp 2.500.000",
    mitraCurrent: "Rp 1.500.000",
    // Legacy mapping for compatibility
    normal: "Rp 2.500.000",
    earlyBird: "Rp 1.500.000",
    promoFirst10: "Rp 1.500.000",
    onlineNormal: "Rp 1.800.000",
    onlineEarly: "Rp 1.500.000",
    onsiteNormal: "Rp 2.500.000",
    onsiteEarly: "Rp 1.500.000",
    onsitePromoNormal: "Rp 1.800.000",
    onsitePromoEarly: "Rp 1.500.000"
  },
  slotTotal: 10,
  slotTaken: 7,
};

export const AI_TOOLS: AIToolItem[] = [
  { name: "Gemini", domain: "gemini.google.com", color: "blue" },
  { name: "Answer The Public", domain: "answerthepublic.com", color: "amber" },
  { name: "Claude", domain: "claude.ai", color: "orange" },
  { name: "ChatGPT", domain: "chatgpt.com", color: "emerald" },
  { name: "Google Flow", domain: "labs.google", color: "indigo" },
  { name: "Capcut AI", domain: "capcut.com", color: "cyan" },
  { name: "ElevenLabs", domain: "elevenlabs.io", color: "slate" },
  { name: "Google Vids", domain: "workspace.google.com", color: "rose" },
  { name: "Pomelli", domain: "pomelli.com", color: "purple" }
];

export const MODULES: ModulItem[] = [
  {
    id: "Day 1",
    title: "Strategic Funnel Audit",
    description: "Audit mendalam terhadap funnel dan strategi analitis performa konten bisnis berbasis kapabilitas AI.",
    deliverables: [
      "Strategic Funnel Audit"
    ],
    tools: "Gemini"
  },
  {
    id: "Day 2",
    title: "Pre-Campaign Readiness & Orchestration",
    description: "Persiapan menyeluruh sebelum kampanye dan orkestrasi taktis untuk audiens yang tepat sasaran.",
    deliverables: [
      "Pre-Campaign Readiness",
      "Campaign Orchestration"
    ],
    tools: "Answer The Public, Claude"
  },
  {
    id: "Day 3",
    title: "Strategic Content Planning & Brand DNA",
    description: "Perancangan konten strategis tingkat senior dengan keselarasan penuh pada karakter dan DNA brand kamu.",
    deliverables: [
      "Strategic Content Planning",
      "Brand DNA Alignment"
    ],
    tools: "Claude, Pomelli"
  },
  {
    id: "Day 4",
    title: "Storytelling",
    description: "Teknik merangkai alur cerita (storytelling) bernada emosional yang persuasif dan memikat audiens dengan AI.",
    deliverables: [
      "Storytelling"
    ],
    tools: "ChatGPT"
  },
  {
    id: "Day 5",
    title: "JSON Generator",
    description: "Teknik pemantapan prompt JSON terstruktur untuk konsistensi keluaran visual dan narasi berskala besar.",
    deliverables: [
      "JSON Generator"
    ],
    tools: "Gemini"
  },
  {
    id: "Day 6",
    title: "AI-Avatar",
    description: "Produksi karakter personal dan representasi AI-Avatar profesional sebagai maskot interaktif brand.",
    deliverables: [
      "AI-Avatar"
    ],
    tools: "Gemini"
  },
  {
    id: "Day 7",
    title: "High-Impact Video Production",
    description: "Pengembangan video berkekuatan tinggi dari rancangan alur dinamis hingga video yang siap dieksekusi.",
    deliverables: [
      "High-Impact Video Production"
    ],
    tools: "Google Vids, Google Flow"
  },
  {
    id: "Day 8",
    title: "Editing and Pitching",
    description: "Finishing audio-visual profesional dengan suling suara AI, editing otomatis, hingga taktik commercial pitching.",
    deliverables: [
      "Editing and Pitching"
    ],
    tools: "ElevenLabs, Capcut AI"
  }
];

export const SPEAKERS: SpeakerItem[] = [
  {
    initials: "SL",
    name: "Steven Laksana",
    role: "Applied AI Expert & Product Manager",
    description: "50+ perusahaan sebagai AI Marketing Consultant. Ahli implementasi AI untuk workflow produksi & campaign kreatif.",
    imageUrl: "https://lh3.googleusercontent.com/d/1guqfUVCAQCRNQIfa_zVE2dayFOWwL84b"
  },
  {
    initials: "GA",
    name: "Gama Anom",
    role: "Ads Expertise & Digital Marketing Trainer",
    description: "Mencetak 1 Miliar Omzet dalam 6 bulan. Pelatih berpengalaman di digital marketing & kreasi konten taktis.",
    imageUrl: "https://lh3.googleusercontent.com/d/1YuoJWgsL5mB5YFu9PB4gOtiXmzAXwWLX"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Saya tidak punya latar belakang editing/desain. Apakah bisa ikut?",
    answer: "Sangat bisa. Kelas ini dirancang khusus bagi yang tidak memiliki tim atau keahlian teknis khusus. Seluruh proses produksi dipermudah menggunakan AI — kamu hanya memerlukan laptop dan koneksi internet."
  },
  {
    question: "Apakah wajib berlangganan tools AI berbayar?",
    answer: "Sebagian besar materi kelas dapat diikuti menggunakan versi gratis. Untuk hasil paling optimal, kami merekomendasikan minimal satu tools premium (detail akan diinfokan sebelum kelas), namun hal ini tidak diwajibkan."
  },
  {
    question: "Bagaimana proses setelah mendaftar?",
    answer: "Setelah mengisi formulir, kamu akan diarahkan ke tim Admin via WhatsApp untuk konfirmasi pembayaran. Setelah proses selesai, tautan kelas dan pengingat akan otomatis terkirim ke emailmu."
  },
  {
    question: "Bagaimana format kelas 8 Pertemuan Hybrid berlangsung?",
    answer: "Kelas diadakan secara Hybrid (bisa hadir offline langsung di MAXY AI HUB Jakarta atau online live eksekusi via Zoom) selama 8 pertemuan. Kelas secara rutin dilangsungkan setiap hari Selasa & Kamis mulai 4 Agustus 2026, didampingi mentor secara intensif, dengan sesi review konten dan networking eksklusif."
  }
];

export const VIDEOS: VideoItem[] = [
  // Video paling atas -> mengarah ke pendaftaran
  {
    id: "header-ig",
    title: "Informasi Pendaftaran (Instagram Reels)",
    url: "https://www.instagram.com/reel/DZ4bquZzePJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    category: "pendaftaran",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "header-yt",
    title: "Overview Program Pendaftaran (YouTube)",
    embedId: "Rt4q44v09qc",
    url: "https://youtu.be/Rt4q44v09qc",
    category: "pendaftaran"
  },
  // Video testimoni
  {
    id: "testi-ig",
    title: "Testimoni Peserta (Instagram Reels)",
    url: "https://www.instagram.com/reel/DZ60asPTBl1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    category: "testimoni",
    thumbnail: "https://images.unsplash.com/photo-1552581230-c01bc0d48453?q=80&w=600&auto=format&fit=crop"
  },
  // Video portfolio (dibawah setelah FAQ)
  {
    id: "port-1",
    title: "MAXY Portfolio #1",
    embedId: "jE6exc9n_vc",
    url: "https://youtu.be/jE6exc9n_vc",
    category: "portfolio"
  },
  {
    id: "port-2",
    title: "MAXY Portfolio #2",
    embedId: "wsejlcmzpIk",
    url: "https://youtu.be/wsejlcmzpIk?si=SD7QgFdbCHaW9FF9",
    category: "portfolio"
  },
  {
    id: "port-3",
    title: "MAXY Portfolio #3",
    embedId: "GJPSaOcA9Ks",
    url: "https://youtu.be/GJPSaOcA9Ks",
    category: "portfolio"
  },
  {
    id: "port-4",
    title: "MAXY Portfolio #4",
    embedId: "8ki-Scsaalc",
    url: "https://youtu.be/8ki-Scsaalc",
    category: "portfolio"
  }
];
