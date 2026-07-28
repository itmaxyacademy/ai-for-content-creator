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
  badgeTag?: string;
}

export interface ModulItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  tools?: string;
}

export interface AIToolItem {
  name: string;
  domain: string;
  color?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
  videoEmbedUrl?: string;
  rating?: number;
}

export interface PackageOptionItem {
  code: string;
  name: string;
  currentPrice: string;
  normalPrice: string;
  badgeTag: string;
  subtitle: string;
  features: string[];
  isPopular?: boolean;
}

export interface PainCardItem {
  icon: string;
  title: string;
  desc: string;
}

export interface ProblemConfig {
  badgeText: string;
  title: string;
  titleHighlight: string;
  cards: PainCardItem[];
  beforeList: string[];
  afterList: string[];
}

export interface SolutionCardItem {
  title: string;
  desc: string;
}

export interface SolutionConfig {
  badgeText: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  cards: SolutionCardItem[];
}

export interface ValueStackItem {
  title: string;
  desc: string;
  value: string;
  isBonus?: boolean;
}

export interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  bgStyle: "white" | "offwhite" | "dark";
}

export interface PopupConfig {
  exitTitle: string;
  exitDesc: string;
  exitPriceTag: string;
  exitCtaText: string;
  stickyLabel: string;
  stickyCtaText: string;
}

export interface WaConfig {
  adminWa: string;
  csWa: string;
  waMessageTemplate: string;
  customWaLink?: string;
}
