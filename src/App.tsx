import React, { useState } from "react";
import { Users, Shield, ArrowUp } from "lucide-react";
import Hero from "./components/Hero";
import IntroVideo from "./components/IntroVideo";
import TrustBanner from "./components/TrustBanner";
import Problem from "./components/Problem";
import Curriculum from "./components/Curriculum";
import Speakers from "./components/Speakers";
import Solutions from "./components/Solutions";
import Testimonials from "./components/Testimonials";
import PricingForm from "./components/PricingForm";
import ValueStack from "./components/ValueStack";
import FAQ from "./components/FAQ";
import Portfolio from "./components/Portfolio";
import LiveTicker from "./components/LiveTicker";
import StickyFooter from "./components/StickyFooter";
import FloatingWaCs from "./components/FloatingWaCs";
import ExitIntentModal from "./components/ExitIntentModal";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-cyan/30">
      {/* 1. URGENCY TOP BAR */}
      <div className="bg-gradient-to-r from-ember to-amber py-2.5 px-4 text-white text-center text-xs md:text-sm font-bold tracking-wide flex items-center justify-center gap-x-2 flex-wrap shadow-md">
        <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block"></span>
        <span>🔥 EARLY BIRD TERBATAS — Harga naik otomatis setelah slot terisi penuh!</span>
        <span className="hidden sm:inline">· Hanya tinggal <strong>7 slot tersisa!</strong></span>
      </div>

      {/* 2. HERO SECTION */}
      <Hero />

      {/* 2b. INTRODUCTORY VIDEO SECTION */}
      <IntroVideo />

      {/* 3. TRUST BANNER */}
      <TrustBanner />

      {/* 4. PROBLEM SECTION & BEFORE/AFTER */}
      <Problem />

      {/* 5. SOLUTIONS & HIGHLIGHTS */}
      <Solutions />

      {/* 6. CURRICULUM SECTION */}
      <Curriculum />

      {/* 7. SPEAKERS & COST OF INACTION */}
      <Speakers />

      {/* 8. TESTIMONIALS SECTION */}
      <Testimonials />

      {/* 9. PRICING & REGISTRATION FORM */}
      <PricingForm />

      {/* 10. VALUE STACK ACCUMULATOR */}
      <ValueStack />

      {/* 11. FAQ SECTION */}
      <FAQ />

      {/* 12. PORTFOLIO VIDEOS GRID (Placed below FAQ as requested) */}
      <Portfolio />

      {/* 13. FOOTER */}
      <footer className="py-12 bg-[#0B1628] text-center text-slate-500 border-t border-white/5 pb-24 md:pb-12 relative">
        <div className="max-w-4xl mx-auto px-5 text-sm">
          <p className="font-black text-white text-base mb-1">MAXY Academy</p>
          <p className="text-cyan text-xs font-mono mb-4">Driven by AI. Led by Humanity.</p>
          
          {/* Subtle CRM Lead Panel Trigger */}
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-all font-mono shadow-xs cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" /> Akses CRM Panel (Lihat Leads)
            </button>
          </div>

          <p className="text-slate-600 text-xs">
            © 2026 MAXY Academy. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="text-slate-700 text-[10px] mt-2 font-mono">
            Grha Pengharapan 2nd Floor, Jl. Denpasar Raya No.2, Blok F3, Jakarta Selatan
          </p>
        </div>
      </footer>

      {/* ====== MARKETING TRIGGERS & UTILITIES ====== */}

      {/* Floating live social proof toasts */}
      <LiveTicker />

      {/* Mobile-only sticky checkout footer with countdown */}
      <StickyFooter />

      {/* Floating WhatsApp Help CS widget */}
      <FloatingWaCs />

      {/* Desktop-only Mouseleave Exit-Intent popup */}
      <ExitIntentModal />

      {/* Hidden Admin CRM leads panel */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

