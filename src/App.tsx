import React, { useState, useEffect } from "react";
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
import AdminLogin from "./components/AdminLogin";
import { useContent } from "./context/ContentContext";

export default function App() {
  const { content } = useContent();

  // Route state checking: /admin path or #admin hash
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    return (
      window.location.pathname.toLowerCase() === "/admin" ||
      window.location.hash.toLowerCase() === "#admin"
    );
  });

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("maxy_admin_auth") === "true";
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const isAdmin =
        window.location.pathname.toLowerCase() === "/admin" ||
        window.location.hash.toLowerCase() === "#admin";
      setIsAdminRoute(isAdmin);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("maxy_admin_auth");
    setIsAuthenticated(false);
  };

  const handleBackToSite = () => {
    window.location.hash = "";
    if (window.location.pathname.toLowerCase() === "/admin") {
      window.history.pushState({}, "", "/");
    }
    setIsAdminRoute(false);
  };

  // If on /admin route: render Admin Page or Login Screen
  if (isAdminRoute) {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBackToSite={handleBackToSite}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={handleLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Otherwise render CLEAN PUBLIC LANDING PAGE (NO ADMIN BUTTONS)
  return (
    <div className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-cyan/30 relative">
      {/* 1. URGENCY TOP BAR */}
      <div className="bg-gradient-to-r from-ember to-amber py-2.5 px-4 text-white text-center text-xs md:text-sm font-bold tracking-wide flex items-center justify-center gap-x-2 flex-wrap shadow-md">
        <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block"></span>
        <span>
          {content.appConfig.topBannerText ||
            "🔥 HARGA KHUSUS MITRA UNIVERSITAS & MASTERCLASS: Rp 1.800.000!"}
        </span>
        <span className="hidden sm:inline">· Kuota Promo Terbatas!</span>
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

      {/* 12. PORTFOLIO VIDEOS GRID */}
      <Portfolio />

      {/* 13. FOOTER (CLEAN PUBLIC FOOTER - NO ADMIN BUTTON) */}
      <footer className="py-12 bg-[#0B1628] text-center text-slate-500 border-t border-white/5 pb-24 md:pb-12 relative">
        <div className="max-w-4xl mx-auto px-5 text-sm">
          <p className="font-black text-white text-base mb-1">MAXY Academy</p>
          <p className="text-cyan text-xs font-mono mb-4">
            Driven by AI. Led by Humanity.
          </p>

          <p className="text-slate-600 text-xs">
            © 2026 MAXY Academy. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="text-slate-700 text-[10px] mt-2 font-mono">
            Grha Pengharapan 2nd Floor, Jl. Denpasar Raya No.2, Blok F3, Jakarta
            Selatan
          </p>
        </div>
      </footer>

      {/* Floating live social proof toasts */}
      <LiveTicker />

      {/* Mobile-only sticky checkout footer with countdown */}
      <StickyFooter />

      {/* Floating WhatsApp Help CS widget */}
      <FloatingWaCs />

      {/* Desktop-only Mouseleave Exit-Intent popup */}
      <ExitIntentModal />
    </div>
  );
}
