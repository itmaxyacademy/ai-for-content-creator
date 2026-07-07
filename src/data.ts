import { FAQItem, SpeakerItem, ModulItem, VideoItem } from "./types";

export const APP_CONFIG = {
  earlyBirdDeadline: "2026-07-24T23:59:59", // Countdown target set strictly to 24 July 2026
  eventDates: "12-13 Agustus 2026", // Event date set strictly to 12-13 August 2026
  eventTime: "08.30–17.00 WIB",
  eventLocation: "MAXY AI HUB, Grha Pengharapan 2nd Floor, Jl. Denpasar Raya No.2, Blok F3, Jakarta Selatan",
  waAdmin: "6282144995255",
  waCS: "6282144995255",
  prices: {
    onlineNormal: "Rp 2.500.000",
    onlineEarly: "Rp 1.800.000",
    onsiteNormal: "Rp 3.500.000",
    onsiteEarly: "Rp 2.500.000",
    onsitePromoNormal: "Rp 3.500.000",
    onsitePromoEarly: "Rp 2.000.000" // Special Onsite Early Bird Promo
  },
  slotTotal: 30,
  slotTaken: 23,
};

export const MODULES: ModulItem[] = [
  {
    id: "M1",
    title: "AI Content Ecosystem",
    description: "Mindset shift ke AI-powered content machine. 5 komponen sistem konten end-to-end.",
    deliverables: [
      "Audit konten & funnel pakai Gemini",
      "Studi kasus: audit akunmu sendiri secara terpadu"
    ]
  },
  {
    id: "M2",
    title: "Campaign Strategy",
    description: "Latih AI jadi CMO virtual. Campaign Brief + funnel TOFU → MOFU → BOFU → Retention.",
    deliverables: [
      "Research pasar dengan AnswerThePublic",
      "Eksperimen terarah: Campaign Brief via Claude"
    ]
  },
  {
    id: "M3",
    title: "Content Planning",
    description: "Template Content Plan level Senior Strategist, mencakup 9 channel.",
    deliverables: [
      "Multi-channel plan tanpa tumpang tindih",
      "Penerapan langsung: isi template via AI Skill"
    ]
  },
  {
    id: "M4",
    title: "AI Visual Storytelling",
    description: "Video sinematik tanpa skill editing pakai storyboard AI: script → JSON prompt → generate → animasi.",
    deliverables: [
      "JSON Prompting untuk konsistensi visual",
      "Proses mandiri: 2 format video AI dari nol"
    ]
  },
  {
    id: "M5",
    title: "Video Creation & Publish",
    description: "Raw AI footage → konten siap viral. Alumni kelas ini sudah tembus 1,8 juta & 3 juta views.",
    deliverables: [
      "AI voiceover + auto-caption CapCut AI",
      "Langkah publikasi: publish hari itu juga"
    ]
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
    question: "Apa bedanya paket Online dan Onsite?",
    answer: "Materi sama persis. Onsite: kelas interaktif didampingi mentor secara langsung, konten direview oleh pemateri, ada sesi networking eksklusif di MAXY AI HUB. Online cocok untuk peserta dari luar Jakarta yang terhalang jarak."
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
