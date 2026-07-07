export interface Lead {
  id: string;
  nama: string;
  email: string;
  whatsapp: string;
  kota: string;
  pekerjaan: string;
  namaPerusahaan: string;
  paket: string;
  harga: string;
  timestamp: string;
}

export interface VideoItem {
  id: string;
  title: string;
  embedId?: string;
  url: string;
  category: "pendaftaran" | "testimoni" | "portfolio";
  thumbnail?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SpeakerItem {
  initials: string;
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
}

export interface ModulItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
}

